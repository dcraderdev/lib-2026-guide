#!/bin/bash

# LIB 2026 Guide - Dev Server Startup Script
# Kills conflicting processes and starts the frontend (and backend if present)

echo "🧹 Cleaning up any existing dev server processes..."

# Kill any processes using our dev ports
PORTS=(2626 2727)
for PORT in "${PORTS[@]}"; do
  PID=$(lsof -ti:$PORT 2>/dev/null)
  if [ ! -z "$PID" ]; then
    echo "  ⚠️  Killing process $PID on port $PORT"
    kill -9 $PID 2>/dev/null
  fi
done

echo "✅ Cleanup complete!"
echo ""

# Install frontend deps if missing
if [ ! -d "node_modules" ]; then
  echo "📦 Installing frontend dependencies..."
  npm install
fi

# Install backend deps if backend exists and missing
if [ -d "backend" ] && [ ! -d "backend/node_modules" ]; then
  echo "📦 Installing backend dependencies..."
  (cd backend && npm install)
fi

echo "🚀 Starting development servers..."
echo "   📱 Frontend (Vite):    http://localhost:2626"
echo "   🔧 Backend (reserved): http://localhost:2727"

# Start backend server in background if a backend folder exists
BACKEND_PID=""
if [ -d "backend" ]; then
  (cd backend && PORT=2727 NODE_ENV=development npm run start:development) &
  BACKEND_PID=$!
  sleep 2
fi

# Open browser after a short delay (in background)
(sleep 3 && open http://localhost:2626) &

# Start frontend server (this keeps the script running)
npm run dev -- --port 2626 --strictPort

# Cleanup: if frontend exits, kill the backend too
if [ ! -z "$BACKEND_PID" ]; then
  kill $BACKEND_PID 2>/dev/null
fi
