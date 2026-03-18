#!/bin/bash

# JARVIS AI Desktop - Setup Script
# This script sets up all dependencies for the JARVIS application

echo "=========================================="
echo "  J.A.R.V.I.S. Setup Script"
echo "=========================================="
echo ""

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo "Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Error: Python is not installed${NC}"
    echo "Please install Python 3.10+ from https://www.python.org/"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node --version) found${NC}"
echo -e "${GREEN}✓ Python $(python3 --version) found${NC}"
echo ""

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Node.js dependencies installed successfully${NC}"
else
    echo -e "${RED}✗ Failed to install Node.js dependencies${NC}"
    exit 1
fi
echo ""

# Install Python dependencies
echo "Installing Python dependencies..."
pip3 install -r requirements.txt
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Python dependencies installed successfully${NC}"
else
    echo -e "${RED}✗ Failed to install Python dependencies${NC}"
    exit 1
fi
echo ""

# Install Playwright browsers (optional but recommended)
echo "Installing Playwright browsers (this may take a few minutes)..."
python3 -m playwright install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Playwright browsers installed successfully${NC}"
else
    echo -e "${YELLOW}⚠ Warning: Failed to install Playwright browsers${NC}"
    echo "Browser automation features may not work properly"
fi
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created${NC}"
    echo -e "${YELLOW}Note: Edit .env file to add your API keys (optional)${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi
echo ""

# Create necessary directories
mkdir -p logs temp

echo "=========================================="
echo -e "${GREEN}✓ Setup completed successfully!${NC}"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. (Optional) Edit .env file to configure API keys"
echo "2. Run the application with: ./run.sh"
echo ""
echo "Or run manually:"
echo "  Terminal 1: python3 backend/server.py"
echo "  Terminal 2: npm run dev"
echo ""
