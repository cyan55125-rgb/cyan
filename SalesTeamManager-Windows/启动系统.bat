@echo off
chcp 65001 >nul 2>&1
title 销售团队管理系统
cd /d "%~dp0"
set PORT=5173

echo.
echo   ╔══════════════════════════════════════╗
echo   ║    销售团队管理系统 - 正在启动...     ║
echo   ╚══════════════════════════════════════╝
echo.
echo   正在启动服务，请稍候...
echo.

where python >nul 2>&1
if %errorlevel% equ 0 (
    echo   [OK] 检测到 Python，正在启动...
    start "" http://localhost:%PORT%
    python -m http.server %PORT%
    goto :end
)

where python3 >nul 2>&1
if %errorlevel% equ 0 (
    echo   [OK] 检测到 Python3，正在启动...
    start "" http://localhost:%PORT%
    python3 -m http.server %PORT%
    goto :end
)

where npx >nul 2>&1
if %errorlevel% equ 0 (
    echo   [OK] 检测到 Node.js，正在启动...
    start "" http://localhost:%PORT%
    npx -y http-server -p %PORT% -c-1
    goto :end
)

where node >nul 2>&1
if %errorlevel% equ 0 (
    echo   [OK] 检测到 Node.js，正在启动...
    start "" http://localhost:%PORT%
    node -e "require('http').createServer(function(req,res){var fs=require('fs');var path=require('path');var fp=path.join(__dirname,req.url==='/'?'index.html':req.url);fs.readFile(fp,function(e,d){if(e){res.writeHead(404);res.end('Not Found')}else{var ext=path.extname(fp);var types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml'};res.writeHead(200,{'Content-Type':types[ext]||'text/plain'});res.end(d)}})}).listen(%PORT,function(){console.log('Running')})"
    goto :end
)

echo.
echo   [错误] 未检测到 Python 或 Node.js！
echo   请先安装: https://www.python.org/downloads/
echo         或 https://nodejs.org/
echo.
pause
exit

:end
