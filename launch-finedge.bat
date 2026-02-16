@echo off
color 0A
echo.
echo ========================================
echo    Finedge Trading Platform
echo ========================================
echo.
echo Starting your full-stack trading platform...
echo.

echo Starting Backend Server...
start "Finedge Backend" cmd /k "cd backend && npm start"
timeout /t 3 /nobreak > nul

echo Starting Landing Page...
start "Finedge Frontend" cmd /k "cd frontend && npm start"
timeout /t 3 /nobreak > nul

echo Starting Trading Dashboard...
start "Finedge Dashboard" cmd /k "cd dashboard && npm start"
timeout /t 5 /nobreak > nul

echo.
echo Finedge features:
echo - Modern UI with gradients and animations
echo - Fully responsive design
echo - Real-time market data updates
echo - Interactive charts and graphs
echo - Professional trading interface
echo.
echo Access:
echo   Landing Page:     http://localhost:3000
echo   Trading Dashboard: http://localhost:3001
echo   Backend API:      http://localhost:3002
echo.
echo Sample data: http://localhost:3002/addHoldings  and  /addPositions
echo.
pause
