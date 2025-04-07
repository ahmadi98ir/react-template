FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
RUN apk add --no-cache libc6-compat git

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Install additional packages
RUN npm install react-quill@latest isotope-layout react-slick bcryptjs jsonwebtoken html-react-parser mysql2 sequelize wow.js react-countup react-visibility-sensor bootstrap react-bootstrap next-auth

# Copy all files
COPY . .

# Set environment variables for build
ENV NEXT_PUBLIC_API_URL=https://cool.ahmadi98.ir
ENV NODE_ENV=production

# Build
RUN npm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./package.json

# Expose port
EXPOSE 3000

# Set environment variables
ENV PORT 3000
ENV NODE_ENV production
ENV HOSTNAME "0.0.0.0"
ENV NODE_TLS_REJECT_UNAUTHORIZED 0

# Add Docker registry authentication
ARG DOCKER_USERNAME
ARG DOCKER_PASSWORD
RUN echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

# Start the application
CMD ["node", "server.js"]