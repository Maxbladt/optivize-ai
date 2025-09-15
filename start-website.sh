#!/bin/bash

# Quick start script for the Optivize AI website
echo "🚀 Starting Optivize AI Website..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if we're in the right directory
if [ ! -d "client" ] || [ ! -d "server" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Start backend server
print_info "Starting Flask backend server..."
cd server
if [ -d "venv" ]; then
    source venv/bin/activate
    python app.py &
    BACKEND_PID=$!
    print_success "Backend server started (PID: $BACKEND_PID)"
else
    print_warning "Virtual environment not found. Please run setup.sh first."
    exit 1
fi

# Wait for backend to start
sleep 2

# Go back to root and start frontend
cd ../client
print_info "Starting React frontend server..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    print_info "Installing dependencies first..."
    npm install
fi

npm start &
FRONTEND_PID=$!

print_success "Both servers are starting!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000"
echo ""
echo "🎯 Website Features:"
echo "   ✅ Updated logo (optivaize.png)"
echo "   ✅ Real company logos in slider"
echo "   ✅ Presentation section with 30+ companies stats"
echo "   ✅ Expandable cases section (Fonteyn, Aanhuis, Blosh)"
echo "   ✅ Real team photos (Max, Filip)"
echo "   ✅ Smooth animations throughout"
echo ""
echo "Press Ctrl+C to stop both servers"

# Cleanup function
cleanup() {
    echo ""
    print_info "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    print_success "Servers stopped"
    exit 0
}

# Trap Ctrl+C
trap cleanup INT

# Wait for frontend process
wait $FRONTEND_PID
