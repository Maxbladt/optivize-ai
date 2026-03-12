# Stage 1: Build React client
FROM node:18-alpine AS client-build
WORKDIR /app
COPY client/package*.json ./
RUN npm install --legacy-peer-deps
COPY client/ .
RUN npm run build

# Stage 2: Install server dependencies
FROM node:18-alpine AS server-deps
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install --production

# Stage 3: Final image with Node + Nginx
FROM node:18-alpine
RUN apk add --no-cache nginx

# Copy built React app
COPY --from=client-build /app/build /usr/share/nginx/html

# Copy server
WORKDIR /app/server
COPY --from=server-deps /app/server/node_modules ./node_modules
COPY server/ .

# Copy nginx config
COPY nginx.conf /etc/nginx/http.d/default.conf

# Create uploads directory
RUN mkdir -p /app/pictures_good

# Copy entrypoint
COPY server/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 80

CMD ["/app/entrypoint.sh"]
