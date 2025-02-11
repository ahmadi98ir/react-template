# Base image
FROM node:18-alpine AS builder

# Add necessary packages for build
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Install dependencies only when needed
COPY package*.json ./
# Changed from npm ci to npm install
RUN npm install --frozen-lockfile
# Copy source files
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build application
RUN npm run build

# Production image
FROM node:18-alpine AS runner

# Add necessary packages for production
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "server.js"]
