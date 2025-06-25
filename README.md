# Lightweight Feedback System

A modern feedback management system for internal team communication between managers and employees.

## 🌟 Features

### Core Features (MVP)
- **Authentication & Roles**: Manager and Employee roles with secure login
- **Feedback Submission**: Structured feedback with strengths, areas to improve, and sentiment
- **Feedback Visibility**: Role-based access control and acknowledgment system
- **Dashboard**: Comprehensive analytics for both managers and employees

### Key Capabilities
- ✅ Manager can submit feedback for team members
- ✅ Employees can view and acknowledge feedback
- ✅ Feedback history and timeline
- ✅ Sentiment analysis (positive/neutral/negative)
- ✅ Manager dashboard with team overview
- ✅ Employee dashboard with feedback insights
- ✅ Responsive modern UI

## 🛠 Tech Stack

### Backend
- **Python FastAPI** - Modern, fast web framework
- **SQLAlchemy** - Database ORM
- **SQLite** - Database (easily configurable to PostgreSQL)
- **JWT Authentication** - Secure token-based auth
- **Pydantic** - Data validation and serialization

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hook Form** - Form handling

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-service orchestration

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.11+
- Docker (optional)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the server**
   ```bash
   python main.py
   ```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

### Docker Setup

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

## 📋 API Documentation

Once the backend is running, visit `http://localhost:8000/docs` for the interactive API documentation.

### Key Endpoints
- `POST /token` - Login and get access token
- `POST /users/` - Register new user
- `GET /users/me` - Get current user info
- `GET /teams/my-team` - Get team members (managers only)
- `POST /feedback/` - Create feedback (managers only)
- `GET /feedback/` - Get feedback (role-based)
- `PUT /feedback/{id}` - Update feedback (managers only)
- `POST /feedback/{id}/acknowledge` - Acknowledge feedback (employees only)
- `GET /dashboard/manager` - Manager dashboard
- `GET /dashboard/employee` - Employee dashboard

## 👥 Demo Accounts

For testing purposes, you can create demo accounts:

**Manager Account:**
- Email: manager@example.com
- Password: password123
- Role: manager

**Employee Account:**
- Email: employee@example.com  
- Password: password123
- Role: employee
- Manager: manager@example.com

## 🏗 Architecture & Design Decisions

### Database Schema
- **Users Table**: Stores user information with role and manager relationship
- **Feedback Table**: Stores feedback with foreign keys to manager and employee

### Security
- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control
- CORS configuration for frontend integration

### Frontend Architecture
- Component-based architecture
- Custom hooks for API integration
- Protected routes based on authentication
- Responsive design with Tailwind CSS

### Key Design Decisions
1. **SQLite for simplicity**: Easy setup while being production-ready
2. **JWT Authentication**: Stateless and scalable
3. **Role-based UI**: Different interfaces for managers and employees
4. **Sentiment Analysis**: Simple categorical approach for actionable insights
5. **Acknowledgment System**: Ensures feedback is read and processed

## 🔄 Development Workflow

### Backend Development
```bash
cd backend
python main.py
```

### Frontend Development
```bash
cd frontend
npm start
```

### Database Management
The SQLite database is automatically created when you first run the backend. Tables are created using SQLAlchemy's `create_all()` method.

## 🐳 Docker Deployment

### Backend Dockerfile
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Building and Running
```bash
# Backend only
cd backend
docker build -t feedback-backend .
docker run -p 8000:8000 feedback-backend

# Full stack with docker-compose
docker-compose up --build
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:
```
DATABASE_URL=sqlite:///./feedback_system.db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend Configuration
The frontend automatically proxies API requests to `http://localhost:8000` in development.

## 🌐 GitHub Pages Deployment

Deploy the React frontend to GitHub Pages:

### Prerequisites
- Backend must be deployed to a public URL (Render, Railway, etc.)
- Update `REACT_APP_API_URL` in `frontend/.env.production` with your backend URL

### Deploy Frontend

1. **Update backend URL**
   ```bash
   # Edit frontend/.env.production
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

2. **Deploy to GitHub Pages**
   ```bash
   cd frontend
   npm run deploy
   ```

3. **Or use the deployment script**
   ```bash
   ./deploy-frontend.sh
   ```

The frontend will be available at: `https://supriyabharane.github.io/Feedback-System`

### Important Notes
- GitHub Pages can only host static sites (frontend only)
- The backend must be deployed separately to a cloud service
- Update CORS settings in the backend to allow your GitHub Pages domain
- Demo accounts will only work if the backend is running and accessible

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

---

Built with ❤️ for better team feedback and communication.
