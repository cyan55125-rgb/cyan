@echo off
chcp 65001 >nul
cd /d "%~dp0"
set PORT=5173

echo ╔══════════════════════════════════════╗
echo ║   销售团队管理系统 - 正在启动...       ║
echo ╚══════════════════════════════════════╝
echo.
echo 启动中，请稍候...
echo.

start "" http://localhost:%PORT%

python -m http.server %PORT%
pause
