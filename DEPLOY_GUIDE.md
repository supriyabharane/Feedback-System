# 🚀 Easy Deployment Guide

## Option 1: Render (Recommended - Free)

### Step 1: Deploy Backend to Render

1. **Go to [render.com](https://render.com)** and sign up
2. **Connect GitHub** - Link your `Feedback-System` repository
3. **Create Web Service:**
   - Click "New" → "Web Service"
   - Select your repository
   - Name: `feedback-system-backend`
   - Root Directory: `backend`
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python create_demo_data.py && uvicorn main:app --host 0.0.0.0 --port $PORT`

4. **Add Environment Variables:**
   ```
   SECRET_KEY=your-super-secret-key-change-this-in-production
   DATABASE_URL=sqlite:///./feedback_system.db
   ENVIRONMENT=production
   ```

5. **Deploy** - Click "Create Web Service"

### Step 2: Deploy Frontend to Render

1. **Create Static Site:**
   - Click "New" → "Static Site"
   - Select your repository
   - Name: `feedback-system-frontend`
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`

2. **Add Environment Variables:**
   ```
   REACT_APP_API_URL=https://your-backend-name.onrender.com
   ```
   (Replace with your actual backend URL from step 1)

3. **Deploy** - Click "Create Static Site"

## Option 2: Railway + Vercel

### Backend on Railway:
```bash
# Install Railway CLI
npm install -g @railway/cli

# From project root
railway login
railway init
railway up
```

### Frontend on Vercel:
```bash
# Install Vercel CLI
npm install -g vercel

# From frontend directory
cd frontend
vercel
```

## Option 3: Docker (Self-hosted)

### Using Docker Compose:
```bash
# Set environment variables
export SECRET_KEY="your-production-secret-key"
export BACKEND_URL="https://your-backend-domain.com"

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

## 🔧 Configuration Updates

### After Backend Deployment:
1. Copy your backend URL (e.g., `https://feedback-system-backend.onrender.com`)
2. Update frontend environment variable `REACT_APP_API_URL`
3. Redeploy frontend

### After Frontend Deployment:
1. Copy your frontend URL
2. Add it to backend CORS allowed origins
3. Redeploy backend

## 🎯 Demo URLs

Once deployed, your app will be accessible at:
- **Frontend:** `https://your-frontend-name.onrender.com`
- **Backend API:** `https://your-backend-name.onrender.com`
- **API Docs:** `https://your-backend-name.onrender.com/docs`

## 👥 Test Accounts

Use these accounts to test your deployed app:
- **Manager:** manager@example.com / password123
- **Employee:** alice@example.com / password123

## 📱 Mobile Testing

Test on different devices:
- Desktop browser
- Mobile browser (Chrome, Safari)
- Tablet
- Different screen sizes

## 🎬 Ready for Video Demo!

Your app is now live and ready for the video demonstration required for the assignment submission.

## 🔍 Troubleshooting

### Common Issues:
1. **CORS errors:** Update allowed origins in backend
2. **API not found:** Check REACT_APP_API_URL
3. **Database issues:** Ensure demo data script runs
4. **Build failures:** Check dependency versions

### Logs:
- Render: Check deployment logs in dashboard
- Railway: Use `railway logs`
- Docker: Use `docker-compose logs`
