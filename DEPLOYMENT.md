# Deployment Guide for Lightweight Feedback System

This guide covers multiple deployment options for your Feedback System.

## 🚀 Quick Deploy Options

### Option 1: GitHub Pages (Frontend) + Cloud Backend

#### Frontend on GitHub Pages:
1. **Configure package.json** (already done):
   ```json
   {
     "homepage": "https://supriyabharane.github.io/Feedback-System",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

2. **Set production API URL**:
   ```bash
   # Edit frontend/.env.production
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

3. **Deploy**:
   ```bash
   cd frontend
   npm run deploy
   ```
   
   **Live URL:** https://supriyabharane.github.io/Feedback-System

#### Backend on Render/Railway:
- Deploy backend to Render or Railway (see options below)
- Update frontend `.env.production` with backend URL
- Redeploy frontend: `npm run deploy`

### Option 2: Render (Full Stack - Free Tier Available)

#### Backend Deployment on Render:
1. Create account at [render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service with these settings:
   - **Name:** feedback-system-backend
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment:** Python 3
   - **Instance Type:** Free

#### Frontend Deployment on Render:
1. Create a new Static Site with these settings:
   - **Name:** feedback-system-frontend
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`

### Option 3: Railway

#### Backend on Railway:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Frontend on Vercel:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from frontend directory
cd frontend
vercel
```

### Option 4: Docker Deployment

#### Using Docker Compose:
```bash
# Build and run
docker-compose up --build

# For production
docker-compose -f docker-compose.prod.yml up --build
```

## 🔧 Environment Variables

### Backend Environment Variables:
```
DATABASE_URL=sqlite:///./feedback_system.db
SECRET_KEY=your-production-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend Environment Variables:
```
REACT_APP_API_URL=https://your-backend-url.com
```

## 📋 Pre-deployment Checklist

- [ ] Update CORS origins in backend/main.py
- [ ] Set production SECRET_KEY
- [ ] Update frontend API URL
- [ ] Test all functionality
- [ ] Ensure demo data is created

## 🔗 Post-deployment Steps

1. Update frontend API URL to point to deployed backend
2. Test authentication flow
3. Verify all API endpoints work
4. Test demo account login
5. Check responsive design on mobile

## 📱 Mobile-Responsive Design

The application is built with Tailwind CSS and is fully responsive across:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔒 Security Considerations

- Change default SECRET_KEY in production
- Use HTTPS for production deployment
- Update CORS settings for production domains
- Consider using PostgreSQL for production database
