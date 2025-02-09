# Base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the React application
RUN npm run build

# Production image
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy build files from builder
COPY --from=builder /app/build ./build

# Expose the listening port
EXPOSE 3000

# Run the application
CMD ["serve", "-s", "build", "-l", "3000"]