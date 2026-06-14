#!/bin/bash
# server-auto-deploy.sh — run on the Coolify server as a cron job
#
# Purpose: check if GHCR has a newer react-template image and trigger
#          Coolify to redeploy it via the localhost API.
#
# Setup (run once on the server as root):
#   1. echo "YOUR_COOLIFY_TOKEN" > /root/.coolify-token && chmod 600 /root/.coolify-token
#   2. cp scripts/server-auto-deploy.sh /usr/local/bin/coolify-auto-deploy
#   3. chmod +x /usr/local/bin/coolify-auto-deploy
#   4. echo "*/5 * * * * root /usr/local/bin/coolify-auto-deploy >> /var/log/coolify-auto-deploy.log 2>&1" \
#        > /etc/cron.d/coolify-auto-deploy
#
# One-shot manual trigger (run this from the server to redeploy right now):
#   COOLIFY_TOKEN=$(cat /root/.coolify-token) /usr/local/bin/coolify-auto-deploy

set -euo pipefail

IMAGE="ghcr.io/ahmadi98ir/react-template:latest"
COOLIFY_API="http://localhost:8000/api/v1"
LOG_PREFIX="$(date '+%Y-%m-%d %H:%M:%S') [auto-deploy]"

# Load token
COOLIFY_TOKEN="${COOLIFY_TOKEN:-$(cat /root/.coolify-token 2>/dev/null || echo '')}"
if [ -z "$COOLIFY_TOKEN" ]; then
  echo "$LOG_PREFIX ERROR: no token. Create /root/.coolify-token or set COOLIFY_TOKEN env var."
  exit 1
fi

# Find app UUID — search by name since .image may be null for source-based apps
# Hardcoded fallback UUID for ahmadi98.ir (veqq7052vw0zjhal6ubztog6)
UUID=$(curl -fs "$COOLIFY_API/applications" \
  -H "Authorization: Bearer $COOLIFY_TOKEN" | \
  jq -r '(if type=="array" then . else (.data // []) end)[]
    | select(
        ((.name // "") | ascii_downcase | contains("react-template"))
        or ((.image // "") | contains("react-template"))
        or (.uuid == "veqq7052vw0zjhal6ubztog6")
      ) | .uuid' 2>/dev/null | head -1)

# Fallback to known UUID if API search fails
UUID="${UUID:-veqq7052vw0zjhal6ubztog6}"

if [ -z "$UUID" ]; then
  echo "$LOG_PREFIX ERROR: react-template app not found in Coolify"
  exit 1
fi

# Pull latest image (needed to compare digests; also pre-warms the image)
PULL_OUTPUT=$(docker pull "$IMAGE" 2>&1)
NEW_DIGEST=$(echo "$PULL_OUTPUT" | grep -oP 'sha256:[a-f0-9]+' | head -1 || echo "")

# Get digest of the currently running container
RUNNING_DIGEST=$(docker inspect \
  "$(docker ps -q --filter "ancestor=$IMAGE" 2>/dev/null | head -1)" \
  --format '{{.Image}}' 2>/dev/null || echo "")

if [ -n "$RUNNING_DIGEST" ] && [ "$RUNNING_DIGEST" = "$NEW_DIGEST" ]; then
  echo "$LOG_PREFIX Image up to date ($NEW_DIGEST) — no deploy needed"
  exit 0
fi

echo "$LOG_PREFIX New image detected (running=${RUNNING_DIGEST:-none}, remote=$NEW_DIGEST)"
echo "$LOG_PREFIX Triggering Coolify deploy for UUID=$UUID ..."

RESULT=$(curl -fs "$COOLIFY_API/deploy?uuid=$UUID&force=true" \
  -H "Authorization: Bearer $COOLIFY_TOKEN" 2>&1)

echo "$LOG_PREFIX Deploy response: $RESULT"
