#!/bin/bash

# Optivize AI Website Setup Script
echo "🚀 Setting up Optivize AI Website..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 16+ from https://nodejs.org/"
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    print_error "Python is not installed. Please install Python 3.8+ from https://python.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_warning "Node.js version is less than 16. Some features may not work correctly."
fi

print_status "Node.js version: $(node --version)"
print_status "Python version: $(python3 --version 2>/dev/null || python --version)"

# Setup Backend
print_status "Setting up Flask backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    print_status "Creating Python virtual environment..."
    python3 -m venv venv 2>/dev/null || python -m venv venv
fi

# Activate virtual environment
print_status "Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
print_status "Installing Python dependencies..."
pip install -r requirements.txt

if [ $? -eq 0 ]; then
    print_success "Backend setup completed!"
else
    print_error "Failed to install Python dependencies"
    exit 1
fi

# Go back to root directory
cd ..

# Setup Frontend
print_status "Setting up React frontend..."
cd frontend

# Install Node.js dependencies
print_status "Installing Node.js dependencies..."
npm install

if [ $? -eq 0 ]; then
    print_success "Frontend setup completed!"
else
    print_error "Failed to install Node.js dependencies"
    exit 1
fi

# Go back to root directory
cd ..

print_success "🎉 Setup completed successfully!"
echo ""
echo "To start the development servers:"
echo ""
echo "Backend (Flask):"
echo "  cd backend"
echo "  source venv/bin/activate  # On Windows: venv\\Scripts\\activate"
echo "  python app.py"
echo ""
echo "Frontend (React):"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "The website will be available at: http://localhost:3000"
echo "The API will be available at: http://localhost:5000"
echo ""
print_status "Happy coding! 🚀"
