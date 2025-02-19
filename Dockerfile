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

# Expose port
EXPOSE 3000

# Set environment variables
ENV PORT 3000
ENV NODE_ENV production
ENV HOSTNAME "0.0.0.0"

# Start the application
CMD ["node", "server.js"]