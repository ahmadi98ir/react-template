FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
RUN apk add --no-cache libc6-compat git

# Copy package files
COPY package*.json ./

# Install ALL dependencies
RUN npm install --legacy-peer-deps
RUN npm install react-quill@latest isotope-layout react-slick bcryptjs jsonwebtoken html-react-parser mysql2 sequelize

# Copy project files
COPY . .

# Set environment variables
ENV DB_HOST=localhost
ENV DB_USER=root
ENV DB_PASSWORD=
ENV DB_NAME=myapp
ENV NEXT_TELEMETRY_DISABLED=1

# Build the project
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copy built assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]