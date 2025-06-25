#!/bin/bash

# GitHub Pages Deployment Script for Frontend

echo "🚀 Deploying Frontend to GitHub Pages..."

# Navigate to frontend directory
cd frontend

# Install dependencies if not already installed
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deployment complete!"
echo "Your frontend should be available at: https://supriyabharane.github.io/Feedback-System"
echo ""
echo "Note: Make sure to update the REACT_APP_API_URL in .env.production with your deployed backend URL"
