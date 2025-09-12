# ahmadi98.ir — Admin + API (Next.js 14 + Prisma + PostgreSQL)

This project powers the personal website and admin panel. It runs on Next.js App Router, Prisma (PostgreSQL), and NextAuth with optional 2FA. Media uploads store files on local disk and index them in DB. Blog/Projects/Skills/Contacts expose CRUD APIs and minimal admin pages under `/admin`.

## Environment Variables
Copy `.env.example` to `.env.local` and set the following:

Required
- `DATABASE_URL`: PostgreSQL connection string (e.g., `postgres://USER:PASS@HOST:5432/postgres`).
- `NEXTAUTH_URL`: Public site URL with protocol (e.g., `https://ahmadi98.ir`).
- `NEXTAUTH_SECRET`: Strong random secret for NextAuth sessions.
- `NEXT_PUBLIC_API_URL`: Base URL for server-side fetches (prod: `https://ahmadi98.ir`, dev: `http://localhost:3000`).
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`: Initial admin used by seed script.

Optional
- `ROBOTS_POLICY`: `allow` | `disallow` (default: `allow`).
- `GTAG_ID`: GA4 measurement ID to enable analytics.
- `STORAGE_DRIVER`: `local` | `s3` (currently local is implemented).
- `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`: S3-compatible storage (future use).

Deprecated/Not used
- Legacy MySQL env variables and `JWT_SECRET` are no longer used.

## Setup (Dev)
1. Create `.env.local` from `.env.example` and fill values.
2. Install dependencies: `npm install`
3. Generate Prisma client: `npx prisma generate`
4. Initialize DB and seed:
   - `npx prisma migrate dev --name init`
   - `npm run db:seed`
5. Start app: `npm run dev` (default at `http://localhost:3000`).

## Admin & Auth
- Login at `/auth/login` (NextAuth credentials: email/password). If 2FA is enabled for your user, provide the TOTP token.
- Admin area under `/admin` (Dashboard, Profile, Skills, Projects, Blog, Media, Contacts, Settings).
- 2FA endpoints (for authenticated users):
  - `POST /api/auth/enable-2fa` → returns `otpauth://` URI
  - `POST /api/auth/verify-2fa` with `{ token }`

## APIs (MVP)
- Blog: `GET/POST/PUT/DELETE /api/blog`, `GET /api/blog/[id]`
- Projects: `GET/POST/PUT/DELETE /api/projects`
- Skills: `GET/POST/PUT/DELETE /api/skills`
- Media: `GET/DELETE /api/media`, `POST /api/media/upload` (multipart form, field: `files`)
- Contacts: `GET/POST /api/contacts` (public POST with basic rate-limit)
- Health: `GET /api/health`
- SEO: `GET /sitemap.xml`, `GET /robots.txt`

## Notes
- Public site pages (blog/projects) should fetch from DB (ISR). Blog list/detail already use `/api/blog`.
- Media files are stored under `public/uploads`. `.gitignore` excludes them.
- Consider adding CSP headers and Markdown sanitization before production.

## Deploy (Coolify)
- Provide env vars above, build with `npm run build`.
- Run `prisma migrate deploy` on startup (Coolify hook or entrypoint).
- Healthcheck: `/api/health`.

