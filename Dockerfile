# backend/Dockerfile
FROM node:20-alpine
WORKDIR /app

# 1) Instalar solo dependencias necesarias para producción
COPY package*.json ./
RUN npm ci --only=production

# 2) Copiar el código
COPY . .

# (Opcional) utilidades para healthcheck
RUN apk add --no-cache curl

# 3) Variables y puertos
ENV NODE_ENV=production
EXPOSE 8080

# 4) Healthcheck (usa tu endpoint /health)
# HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
# CMD curl -fsS http://localhost:8080/health || exit 1

# 5) Arranque
CMD ["node","app.js"]
