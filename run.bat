@echo off
REM JARVIS AI Desktop - Run Script for Windows
REM This script starts both the backend and frontend

echo ==========================================
echo   Starting J.A.R.V.I.S.
echo ==========================================
echo.

REM Check if dependencies are installed
if not exist node_modules (
    echo Error: Node modules not found
    echo Please run setup.bat first
    pause
    exit /b 1
)

REM Create logs directory if it doesn't exist
if not exist logs mkdir logs

REM Start the backend server in a new window
echo Starting Backend Server...
start "JARVIS Backend" /MIN cmd /c "python backend/server.py > logs/backend.log 2>&1"
timeout /t 3 /nobreak >nul

echo Backend server started
echo.

REM Start the frontend
echo Starting Frontend Application...
start "JARVIS Frontend" cmd /c "npm run dev"

echo.
echo ==========================================
echo J.A.R.V.I.S. is now running!
echo ==========================================
echo.
echo Two windows have been opened:
echo   1. Backend Server (minimized)
echo   2. Frontend Application
echo.
echo The application window should open shortly.
echo.
echo To stop the application:
echo   Close both command windows
echo.
echo Logs are saved in the 'logs' directory
echo.
pause
