
```
✔ PM2 process manager inside container
✔ Auto-restart on crash
✔ Log management
✔ Production-only dependencies
✔ Clean + optimized Docker image
```
---

# ✅ 1. Create `ecosystem.config.js`

Create this file in your project root:

```js
module.exports = {
  apps: [
    {
      name: "app",
      script: "./server.js",   // CHANGE if your entry file is index.js or app.js
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M"
    }
  ]
};
```

If your entry file is `index.js`, then change:

```js
script: "./index.js",
```

---

# ✅ 2. Production Dockerfile with PM2

Replace your Dockerfile with this:

```dockerfile
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
```

---

# ✅ 3. Build the Docker Image

```bash
docker build -t docker-test-pm2 .
```

---

# ✅ 4. Run the PM2 container

👉 **Use NO bind mount** for production:

```bash
docker run -d \
  --name docker-test \
  -p 3000:3000 \
  docker-test-pm2
```

---

# 🔍 5. Check logs inside PM2 container

```bash
docker logs -f docker-test
```

Or open shell:

```bash
docker exec -it docker-test sh
pm2 ls
pm2 logs
```

---

# 🧪 6. If you want dev mode with mounting (optional)

```bash
docker run -d \
  --name docker-test \
  -p 3000:3000 \
  -v "$(pwd)":/app \
  -v docker_test_node_modules:/app/node_modules \
  docker-test-pm2
```

---

# 🚀 Recommended: PM2 + Docker Compose (production)

Create a file:

### `docker-compose.yml`

```yaml
version: '3.8'

services:
  app:
    build: .
    image: docker-test-pm2
    container_name: docker-test
    ports:
      - "3000:3000"
    restart: always
```

Run:

```bash
docker compose up -d --build
```
