#!/bin/sh
set -e

cd /app/server

echo "Running database migration..."
node migrate.js

echo "Running database seed..."
node seed.js

cd /app

echo "Starting Next.js server..."
node_modules/.bin/next start -p 3000
