@echo off
echo Starting Finedge Trading Platform...
echo.

echo Starting Backend Server (Port 3002)...
start "Backend" cmd /k "cd backend && npm start"

timeout /t 3 /nobreak > nul

echo Starting Frontend Landing Page (Port 3000)...
start "Frontend" cmd /k "cd frontend && npm start"

timeout /t 3 /nobreak > nul

echo Starting Trading Dashboard (Port 3001)...
start "Dashboard" cmd /k "cd dashboard && npm start"

echo.
echo All services are starting...
echo.
echo Access URLs:
echo - Landing Page: http://localhost:3000
echo - Trading Dashboard: http://localhost:3001
echo - Backend API: http://localhost:3002
echo.
echo To add sample data, visit:
echo - http://localhost:3002/addHoldings
echo - http://localhost:3002/addPositions
echo.
pause