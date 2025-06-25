#!/bin/bash

# Render Deployment Script for Backend
echo "🚀 Deploying to Render..."

# Install dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Create demo data
echo "🗄️ Creating demo data..."
python create_demo_data.py

echo "✅ Backend deployment ready!"
echo "🌐 Backend will be available at: https://your-app-name.onrender.com"

# Instructions for manual deployment:
echo ""
echo "📋 Manual Render Deployment Steps:"
echo "1. Go to https://render.com and create account"
echo "2. Connect your GitHub repository"
echo "3. Create new Web Service"
echo "4. Set Root Directory: backend"
echo "5. Set Build Command: pip install -r requirements.txt"
echo "6. Set Start Command: uvicorn main:app --host 0.0.0.0 --port \$PORT"
echo "7. Add environment variables:"
echo "   - SECRET_KEY=your-secret-key-here"
echo "   - DATABASE_URL=sqlite:///./feedback_system.db"
