#!/bin/bash
# deploy.sh — build and push to GHCR, transfer to server, trigger Coolify
# Usage: ./deploy.sh [server_user@server_host] [ssh_port]
#
# Required env vars (or set them in a .env.deploy file):
#   COOLIFY_TOKEN   — Coolify API token
#
# Optional env vars:
#   COOLIFY_WEBHOOK — full webhook URL (e.g. https://cool.rpim.ir/api/v1/deploy?uuid=xxx)

set -e

# Load local deploy config if present (not committed to git)
if [ -f "$(dirname "$0")/.env.deploy" ]; then
  # shellcheck disable=SC1091
  source "$(dirname "$0")/.env.deploy"
fi

SERVER="${1:-root@cool.rpim.ir}"
SSH_PORT="${2:-22}"
IMAGE="ghcr.io/ahmadi98ir/react-template:latest"

if [ -z "$COOLIFY_TOKEN" ]; then
  echo "ERROR: COOLIFY_TOKEN env var is not set."
  echo "  export COOLIFY_TOKEN='your-token' before running this script,"
  echo "  or create .env.deploy with COOLIFY_TOKEN=your-token"
  exit 1
fi

echo "==> Building Docker image..."
docker build \
  --build-arg NEXT_PUBLIC_APP_URL=https://ahmadi98.ir \
  -t "$IMAGE" \
  "$(dirname "$0")"

echo ""
echo "==> Transferring image to $SERVER (this takes a few minutes)..."
docker save "$IMAGE" | gzip | \
  ssh -p "$SSH_PORT" -o StrictHostKeyChecking=no "$SERVER" \
    'gzip -d | docker load'

echo ""
echo "==> Triggering Coolify deploy..."
if [ -n "$COOLIFY_WEBHOOK" ]; then
  # Use the webhook URL directly from the server via SSH (bypasses host restriction)
  WEBHOOK_PATH="$(echo "$COOLIFY_WEBHOOK" | grep -oP '/api/v1/[^"]+')"
  ssh -p "$SSH_PORT" -o StrictHostKeyChecking=no "$SERVER" \
    "for port in 8000 80; do
       resp=\$(curl -sf \"http://localhost:\${port}${WEBHOOK_PATH}\" \
         -H 'Authorization: Bearer ${COOLIFY_TOKEN}' 2>&1) \
       && echo \"Deploy triggered on port \${port}: \${resp}\" && exit 0
     done
     echo 'WARNING: deploy trigger failed — click Deploy in Coolify dashboard'" || true
else
  # No webhook URL — trigger via Coolify API using the app UUID lookup
  ssh -p "$SSH_PORT" -o StrictHostKeyChecking=no "$SERVER" \
    "UUID=\$(docker exec coolify php artisan tinker --execute=\"echo \App\Models\Application::where('image','like','%react-template%')->first()->uuid ?? 'not-found';\" 2>/dev/null | tail -1)
     if [ \"\$UUID\" = 'not-found' ] || [ -z \"\$UUID\" ]; then
       echo 'WARNING: could not look up app UUID — click Deploy in Coolify dashboard'
       exit 0
     fi
     curl -sf \"http://localhost:8000/api/v1/deploy?uuid=\${UUID}\" \
       -H 'Authorization: Bearer ${COOLIFY_TOKEN}' \
       && echo \"Deploy triggered for UUID: \${UUID}\" \
       || echo 'WARNING: deploy trigger failed — click Deploy in Coolify dashboard'" || true
fi

echo ""
echo "=== Done! Check Coolify dashboard for deployment status ==="
