#!/bin/bash

echo "🚀 Starting Relationship Insights App..."
echo ""

# Kill any existing processes
echo "Cleaning up old processes..."
pkill -f "vite" 2>/dev/null || true
pkill -f "node.*server" 2>/dev/null || true

# Kill processes on ports 5173 and 3001
lsof -ti:5173,3001 | xargs kill -9 2>/dev/null || true

echo ""
echo "🔧 Starting Backend Server (port 3001)..."
cd backend
npm start &
BACKEND_PID=$!
cd ..

echo "Backend started with PID: $BACKEND_PID"
echo "Waiting for backend to be ready..."
sleep 3

echo ""
echo "🎨 Starting Frontend (port 5173)..."
npm run dev &
FRONTEND_PID=$!

echo "Frontend started with PID: $FRONTEND_PID"

echo ""
echo "✅ Both servers are starting!"
echo ""
echo "📱 Open your browser to:"
echo "   - Frontend: http://localhost:5173"
echo "   - Backend API: http://localhost:3001/health"
echo ""
echo "🛑 To stop both servers, press: Ctrl + C"
echo ""

# Wait for user to press Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo '❌ Servers stopped.'; exit" INT

# Keep script running
wait
