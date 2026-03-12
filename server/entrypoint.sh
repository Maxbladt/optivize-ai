#!/bin/sh
set -e

cd /app/server

echo "Running database migration..."
node migrate.js

echo "Running database seed..."
node seed.js

echo "Starting API server..."
node index.js &

echo "Starting Nginx..."
nginx -g 'daemon off;'
