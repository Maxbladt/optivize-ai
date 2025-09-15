#!/bin/bash

# Development server startup script
echo "🚀 Starting Optivize AI development servers..."

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

# Check if ports are available
if ! check_port 5000; then
    exit 1
fi

if ! check_port 3000; then
    exit 1
fi

# Start backend server in background
print_info "Starting Flask backend server on port 5000..."
cd backend
source venv/bin/activate
python app.py &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 2

# Start frontend server
print_info "Starting React frontend server on port 3000..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

print_success "Both servers are starting up!"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup background processes
cleanup() {
    echo ""
    print_info "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    print_success "Servers stopped"
    exit 0
}

# Trap Ctrl+C and call cleanup
trap cleanup INT

# Wait for frontend process
wait $FRONTEND_PID
