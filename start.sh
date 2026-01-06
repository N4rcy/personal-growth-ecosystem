#!/bin/bash

echo "�� Starting Relationship Insights App..."

# Start backend in background
echo "Starting backend server..."
cd backend
npm install 2>/dev/null || echo "Backend dependencies already installed"
node server.mjs &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 2

# Start frontend
echo "Starting frontend..."
npm install 2>/dev/null || echo "Frontend dependencies already installed"
npm run dev

# Cleanup on exit
trap "kill $BACKEND_PID 2>/dev/null" EXIT
