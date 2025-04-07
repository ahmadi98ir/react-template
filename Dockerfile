FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies at once
RUN npm install

# Copy all files
COPY . .

# Build with caching
RUN npm run build

# Expose port
EXPOSE 3000

# Set environment variables
ENV PORT 3000
ENV NODE_ENV production
ENV HOSTNAME "0.0.0.0"
ENV NODE_TLS_REJECT_UNAUTHORIZED 0

# Start the application
CMD ["npm", "start"] 