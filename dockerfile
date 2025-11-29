# Use smaller image for production
FROM node:20-slim

WORKDIR /app

# Install PM2 globally
RUN npm install pm2 -g

# Copy package files first
COPY package*.json ./

# Install only production deps
RUN npm ci --only=production

# Copy all app source code
COPY . .

# Expose port
EXPOSE 3000

# Start with PM2 in cluster mode
CMD ["pm2-runtime", "ecosystem.config.js"]
