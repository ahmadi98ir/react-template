# Coolify Deployment Guide

## Prerequisites

- Coolify installed on Ubuntu 24.04 with a running Docker daemon
- A Postgres database reachable from your server (Neon, Supabase, or self-hosted)
- GitHub repo at `ahmadi98ir/react-template` with a GitHub OAuth App or PAT connected to Coolify

---

## Step 1 — Create the Application in Coolify

1. Open the Coolify dashboard → **Projects** → select your project → **+ New Resource**
2. Choose **Application** → **GitHub** → select the `ahmadi98ir/react-template` repository
3. Set:
   - **Branch**: `main`
   - **Build Pack**: `Dockerfile` (Coolify auto-detects the `Dockerfile` in the repo root)
   - **Port**: `3000`
   - **Base Directory**: `/` (default)
4. Click **Save**

> Coolify uses the multi-stage `Dockerfile` in the repo root. The final image runs
> `node server.js` from the Next.js standalone output — it does **not** call `npm start`.

---

## Step 2 — Set Environment Variables

In the application's **Environment Variables** tab, add the following **before your first build**:

```
# ── Required ─────────────────────────────────────────────────────────────────
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Generate with: openssl rand -base64 32
BETTER_AUTH_SECRET=<your-32+-char-secret>

BETTER_AUTH_URL=https://ahmadi98.ir
BETTER_AUTH_TRUSTED_ORIGINS=https://ahmadi98.ir,https://www.ahmadi98.ir

NEXT_PUBLIC_APP_URL=https://ahmadi98.ir

# ── Optional ──────────────────────────────────────────────────────────────────
GTAG_ID=G-XXXXXXXXXX
```

> **Important:** `NEXT_PUBLIC_APP_URL` is baked into the client bundle at build time.
> Set it before deploying, then redeploy whenever it changes.
>
> The old `NEXTAUTH_*` variables are no longer used — this project uses `better-auth`.

---

## Step 3 — Enable Auto Deploy (Webhook)

1. In the application's **Settings** tab, scroll to **Git Webhooks**
2. Copy the **Webhook URL** shown by Coolify
3. Go to GitHub → `ahmadi98ir/react-template` → **Settings** → **Webhooks** → **Add webhook**
   - **Payload URL**: paste the Coolify webhook URL
   - **Content type**: `application/json`
   - **Events**: select **Just the push event**
   - Click **Add webhook**
4. Back in Coolify, toggle **Auto Deploy** to **On** in the application Settings tab

Every `git push` to `main` will now trigger a fresh Docker build and rolling restart automatically.

---

## Database Migration

After the first successful deploy, run the schema migration once:

```bash
# From your local machine with DATABASE_URL set in .env.local
npm run db:push
```

Or execute it inside the running container via Coolify's **Terminal** tab:

```bash
node -e "require('./drizzle/db')" && npx drizzle-kit push
```

---

## Reverse Proxy / Domain

Coolify's built-in Traefik handles SSL termination. In the application's **Domains** tab:

- Add `ahmadi98.ir` and `www.ahmadi98.ir`
- Enable **Force HTTPS**
- Coolify will provision a Let's Encrypt certificate automatically

The middleware reads `cf-ipcountry` / `x-real-ip` headers for geo-based locale detection.
Traefik forwards these headers by default — no additional configuration required.
