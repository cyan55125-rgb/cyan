#!/bin/bash
cd "$(dirname "$0")"
PORT=5173

echo "╔══════════════════════════════════════╗"
echo "║   销售团队管理系统 - 正在启动...       ║"
echo "╚══════════════════════════════════════╝"
echo ""
echo "启动中，请稍候..."
echo ""

python3 -m http.server $PORT &
SERVER_PID=$!

sleep 2

open "http://localhost:$PORT"

echo ""
echo "✅ 系统已启动！"
echo "🌐 浏览器地址: http://localhost:$PORT"
echo ""
echo "按 Ctrl+C 可停止服务"
echo ""

wait $SERVER_PID
