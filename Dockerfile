# ─── Stage 1: Install all dependencies (needed for build) ─────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps
# Stub only the three kysely dialect files that import symbols missing from the
# installed kysely version. index.mjs is intentionally left intact so that
# better-auth can still find createKyselyAdapter / getKyselyDatabaseType.
RUN node -e "const fs=require('fs');const d='node_modules/@better-auth/kysely-adapter/dist/';const s={'bun-sqlite-dialect-DzNwOpKv.mjs':'export class BunSqliteDialect {}\nexport default {};\n','d1-sqlite-dialect-C2B7YsIT.mjs':'export class D1SqliteDialect {}\nexport default {};\n','node-sqlite-dialect.mjs':'export class NodeSqliteDialect {}\nexport default {};\n'};Object.entries(s).forEach(([f,c])=>{const p=d+f;if(fs.existsSync(p))fs.writeFileSync(p,c);});" || true

# ─── Stage 2: Build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# NEXT_PUBLIC_* vars are baked into the client bundle at build time
ARG NEXT_PUBLIC_APP_URL=https://ahmadi98.ir
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
RUN npm run build

# ─── Stage 3: Runtime (minimal image) ─────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Static assets must be served directly by Next.js standalone server
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static   ./.next/static

USER nextjs
EXPOSE 3000
# HOSTNAME must be 0.0.0.0 so the standalone server binds to all interfaces
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
