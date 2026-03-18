@echo off
REM JARVIS AI Desktop - Setup Script for Windows
REM This script sets up all dependencies for the JARVIS application

echo ==========================================
echo   J.A.R.V.I.S. Setup Script
echo ==========================================
echo.

REM Check if Node.js is installed
echo Checking prerequisites...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Python is installed
where python >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Python is not installed
    echo Please install Python 3.10+ from https://www.python.org/
    pause
    exit /b 1
)

node --version
python --version
echo.

REM Install Node.js dependencies
echo Installing Node.js dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Failed to install Node.js dependencies
    pause
    exit /b 1
)
echo Node.js dependencies installed successfully
echo.

REM Install Python dependencies
echo Installing Python dependencies...
pip install -r requirements.txt
if %ERRORLEVEL% NEQ 0 (
    echo Failed to install Python dependencies
    pause
    exit /b 1
)
echo Python dependencies installed successfully
echo.

REM Install Playwright browsers (optional but recommended)
echo Installing Playwright browsers (this may take a few minutes)...
python -m playwright install
if %ERRORLEVEL% NEQ 0 (
    echo Warning: Failed to install Playwright browsers
    echo Browser automation features may not work properly
)
echo.

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file from template...
    copy .env.example .env
    echo .env file created
    echo Note: Edit .env file to add your API keys (optional)
) else (
    echo .env file already exists
)
echo.

REM Create necessary directories
if not exist logs mkdir logs
if not exist temp mkdir temp

echo ==========================================
echo Setup completed successfully!
echo ==========================================
echo.
echo Next steps:
echo 1. (Optional) Edit .env file to configure API keys
echo 2. Run the application with: run.bat
echo.
echo Or run manually:
echo   Terminal 1: python backend/server.py
echo   Terminal 2: npm run dev
echo.
pause
