import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FeedbackList from './pages/FeedbackList';
import GiveFeedback from './pages/GiveFeedback';
import { authService } from './services/api';

function App() {
  const isAuthenticated = authService.isAuthenticated();
  const isDemoMode = process.env.REACT_APP_DEMO_MODE === 'true';

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isDemoMode && (
          <div className="bg-blue-600 text-white text-center py-2 px-4 text-sm">
            🚀 <strong>Demo Mode:</strong> This is a demonstration. Use <strong>manager@example.com</strong> or <strong>employee@example.com</strong> with password <strong>password123</strong>
          </div>
        )}
        {isAuthenticated && <Navbar />}
        <main className={isAuthenticated ? 'pt-0' : ''}>
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
              } 
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/feedback"
              element={
                <ProtectedRoute>
                  <FeedbackList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/feedback/new"
              element={
                <ProtectedRoute requiredRole="manager">
                  <GiveFeedback />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
