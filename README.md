# Lightweight Feedback System

A modern, full-stack feedback management system for internal team communication between managers and employees. Built with Python FastAPI backend and React TypeScript frontend.

🌐 **Live Demo:** https://supriyabharane.github.io/Feedback-System

## 🚀 Quick Setup Instructions

### Option 1: Docker (Recommended)
```bash
git clone https://github.com/supriyabharane/Feedback-System.git
cd Feedback-System
docker-compose up --build
```
- Backend: http://localhost:8000
- Frontend: http://localhost:3000
- API Docs: http://localhost:8000/docs

### Option 2: Local Development
```bash
# Clone repository
git clone https://github.com/supriyabharane/Feedback-System.git
cd Feedback-System

# Backend setup
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python main.py

# Frontend setup (new terminal)
cd frontend
npm install
npm start
```

### Option 3: VS Code Tasks
Open in VS Code and use these predefined tasks:
- `Ctrl+Shift+P` → "Tasks: Run Task"
- Select "Start Feedback System" for both backend and frontend

## 🛠 Technology Stack & Design Decisions

### Backend Architecture
- **FastAPI** - High-performance async web framework with automatic API documentation
- **SQLAlchemy ORM** - Database abstraction layer with type safety
- **SQLite** - Lightweight database for development (easily upgradable to PostgreSQL)
- **JWT Authentication** - Stateless, secure token-based authentication
- **Pydantic Models** - Runtime type checking and data validation
- **CORS Support** - Cross-origin resource sharing for frontend integration

### Frontend Architecture  
- **React 18 + TypeScript** - Type-safe component-based UI development
- **Tailwind CSS** - Utility-first styling for rapid UI development
- **React Router** - Client-side routing with protected routes
- **Axios** - Promise-based HTTP client with interceptors
- **React Hook Form** - Performant forms with minimal re-renders
- **React Toastify** - User-friendly notifications

### Key Design Decisions

#### 1. **Monorepo Structure**
- Separate `backend/` and `frontend/` directories
- Shared configuration files at root level
- Independent deployment strategies

#### 2. **Role-Based Architecture**
- Two distinct user roles: Manager and Employee
- Hierarchical relationship (Employee belongs to Manager)
- Role-specific UI components and API endpoints

#### 3. **Security Implementation**
- JWT tokens with expiration
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Protected API routes and frontend pages

#### 4. **Database Design**
```sql
Users: id, email, name, role, manager_id, password_hash
Feedback: id, manager_id, employee_id, strengths, areas_to_improve, sentiment, acknowledged
```

#### 5. **API Design**
- RESTful endpoints with clear resource naming
- Consistent error handling and status codes
- Automatic OpenAPI documentation
- Request/response validation with Pydantic

#### 6. **Frontend State Management**
- Local state with React hooks
- Authentication state in localStorage
- API service layer for data fetching
- Protected routes with authentication checks

## 🌟 Key Features

### Core Functionality
- ✅ **User Authentication** - Secure login with JWT tokens
- ✅ **Role-Based Access** - Manager and Employee roles with different permissions
- ✅ **Feedback Creation** - Managers can submit structured feedback for team members
- ✅ **Feedback Management** - View, edit, and acknowledge feedback
- ✅ **Dashboard Analytics** - Comprehensive insights for both roles
- ✅ **Sentiment Analysis** - Track feedback sentiment (positive/neutral/negative)
- ✅ **Responsive Design** - Works seamlessly on desktop and mobile

### Manager Features
- Create and edit feedback for team members
- View team dashboard with analytics
- Track acknowledgment rates
- Manage team member relationships

### Employee Features  
- View received feedback
- Acknowledge feedback items
- Personal dashboard with feedback insights
- Track feedback history and trends

### Technical Features
- RESTful API with automatic documentation
- Real-time form validation
- Error handling and user notifications
- Docker containerization
- GitHub Pages deployment ready
- Demo mode for showcasing

## 📋 API Documentation

The backend provides a comprehensive REST API:

### Authentication Endpoints
- `POST /token` - User login (returns JWT token)
- `GET /users/me` - Get current user info

### User Management
- `POST /users/` - Create new user (registration)
- `GET /users/` - List all users (admin)
- `GET /teams/my-team` - Get manager's team members

### Feedback Operations
- `POST /feedback/` - Create feedback (managers only)
- `GET /feedback/` - Get feedback (role-based filtering)
- `PUT /feedback/{id}` - Update feedback (managers only)
- `POST /feedback/{id}/acknowledge` - Acknowledge feedback (employees only)

### Dashboard Data
- `GET /dashboard/manager` - Manager dashboard analytics
- `GET /dashboard/employee` - Employee dashboard analytics

**Live API Documentation:** http://localhost:8000/docs (when running locally)

## 🐳 Docker Deployment

### Backend Dockerfile
The backend includes a production-ready Dockerfile with the following features:
- **Multi-stage build** for optimized image size
- **Non-root user** for enhanced security  
- **Health checks** for container monitoring
- **System dependencies** for Python packages

```dockerfile
# Build and run backend only
cd backend
docker build -t feedback-backend .
docker run -p 8000:8000 feedback-backend
```

### Full Stack with Docker Compose
```bash
# Build and run both backend and frontend
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Docker Setup
```bash
# Use production Docker Compose file
docker-compose -f docker-compose.prod.yml up --build
```

The production setup includes:
- **Nginx** reverse proxy for frontend
- **Optimized builds** for both services
- **Health checks** and restart policies
- **Volume mounts** for persistent data

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
