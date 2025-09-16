#!/bin/bash

# Website startup script
echo "🚀 Starting Optivize AI website..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Function to check if port is available
check_port() {
    if lsof -i :$1 >/dev/null 2>&1; then
        echo "Port $1 is already in use. Please stop the process or use a different port."
        return 1
    fi
    return 0
}

# Check if port 3000 is available
if ! check_port 3000; then
    exit 1
fi

# Start frontend server
print_info "Starting React website on port 3000..."
cd client
npm start

print_success "Website started!"
echo ""
echo "Website: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the website"