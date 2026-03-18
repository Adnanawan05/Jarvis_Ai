#!/bin/bash

# JARVIS AI Desktop - Run Script
# This script starts both the backend and frontend

echo "=========================================="
echo "  Starting J.A.R.V.I.S."
echo "=========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo -e "${RED}Error: Node modules not found${NC}"
    echo "Please run ./setup.sh first"
    exit 1
fi

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Shutting down JARVIS..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up trap to catch Ctrl+C
trap cleanup SIGINT SIGTERM

# Start the backend server
echo -e "${GREEN}Starting Backend Server...${NC}"
python3 backend/server.py > logs/backend.log 2>&1 &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 2

# Check if backend started successfully
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo -e "${RED}Failed to start backend server${NC}"
    echo "Check logs/backend.log for details"
    exit 1
fi

echo -e "${GREEN}✓ Backend server started (PID: $BACKEND_PID)${NC}"
echo ""

# Start the frontend
echo -e "${GREEN}Starting Frontend Application...${NC}"
npm run dev > logs/frontend.log 2>&1 &
FRONTEND_PID=$!

echo -e "${GREEN}✓ Frontend application started (PID: $FRONTEND_PID)${NC}"
echo ""

echo "=========================================="
echo -e "${GREEN}J.A.R.V.I.S. is now running!${NC}"
echo "=========================================="
echo ""
echo "The application window should open shortly."
echo ""
echo "Logs:"
echo "  Backend:  logs/backend.log"
echo "  Frontend: logs/frontend.log"
echo ""
echo "Press Ctrl+C to stop the application"
echo ""

# Wait for processes
wait
