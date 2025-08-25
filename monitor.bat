@echo off
REM QWEN-NEWS Monitoring Batch Script

TITLE QWEN-NEWS Monitoring

echo ========================================
echo    QWEN-NEWS Project Monitoring
echo ========================================
echo.

REM Check if PowerShell is available
where powershell >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: PowerShell is not available on this system.
    echo Please install PowerShell to use this monitoring script.
    pause
    exit /b 1
)

echo Starting QWEN-NEWS monitoring...
echo.

REM Run the PowerShell monitoring script
powershell -ExecutionPolicy Bypass -File "%~dp0monitor.ps1" -Continuous

echo.
echo Monitoring script completed.
pause