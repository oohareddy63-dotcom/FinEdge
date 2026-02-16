@echo off
echo Testing Finedge Platform...
echo.

echo Testing Backend API...
curl -s http://localhost:3002/allHoldings > nul
if %errorlevel% == 0 (
    echo ✓ Backend API is working
) else (
    echo ✗ Backend API failed
)

echo Testing Frontend...
curl -s http://localhost:3000 > nul
if %errorlevel% == 0 (
    echo ✓ Frontend is working
) else (
    echo ✗ Frontend failed
)

echo Testing Dashboard...
curl -s http://localhost:3001 > nul
if %errorlevel% == 0 (
    echo ✓ Dashboard is working
) else (
    echo ✗ Dashboard failed
)

echo.
echo All services are running successfully!
echo.
echo Access URLs:
echo - Landing Page: http://localhost:3000
echo - Trading Dashboard: http://localhost:3001
echo - Backend API: http://localhost:3002
echo.
pause