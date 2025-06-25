import axios from 'axios';
import { User, Feedback, AuthToken, ManagerDashboard, EmployeeDashboard } from '../types';
import { 
  demoUsers, 
  demoFeedback, 
  demoDashboard, 
  demoEmployeeDashboard, 
  demoAuth 
} from './demoData';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const DEMO_MODE = process.env.REACT_APP_DEMO_MODE === 'true';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async login(email: string, password: string): Promise<{ token: AuthToken; user: User }> {
    if (DEMO_MODE) {
      return await demoAuth.login({ email, password });
    }
    
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    
    const tokenResponse = await api.post('/token', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    
    const token = tokenResponse.data;
    localStorage.setItem('token', token.access_token);
    
    const userResponse = await api.get('/users/me');
    const user = userResponse.data;
    localStorage.setItem('user', JSON.stringify(user));
    
    return { token, user };
  },

  async register(userData: {
    email: string;
    password: string;
    name: string;
    role: 'manager' | 'employee';
    manager_id?: number;
  }): Promise<User> {
    const response = await api.post('/users/', userData);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },
};

export const userService = {
  async getUsers(): Promise<User[]> {
    if (DEMO_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return demoUsers;
    }
    const response = await api.get('/users/');
    return response.data;
  },

  async getMyTeam(): Promise<User[]> {
    if (DEMO_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return demoUsers.filter(u => u.role === 'employee');
    }
    const response = await api.get('/teams/my-team');
    return response.data;
  },
};

export const feedbackService = {
  async createFeedback(feedbackData: {
    employee_id: number;
    strengths: string;
    areas_to_improve: string;
    sentiment: 'positive' | 'neutral' | 'negative';
  }): Promise<Feedback> {
    if (DEMO_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newFeedback: Feedback = {
        id: Date.now(),
        manager_id: 1,
        employee_id: feedbackData.employee_id,
        strengths: feedbackData.strengths,
        areas_to_improve: feedbackData.areas_to_improve,
        sentiment: feedbackData.sentiment,
        acknowledged: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        manager: demoUsers[0],
        employee: demoUsers.find(u => u.id === feedbackData.employee_id)!
      };
      return newFeedback;
    }
    const response = await api.post('/feedback/', feedbackData);
    return response.data;
  },

  async getFeedback(): Promise<Feedback[]> {
    if (DEMO_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return demoFeedback;
    }
    const response = await api.get('/feedback/');
    return response.data;
  },

  async updateFeedback(
    feedbackId: number,
    updateData: {
      strengths?: string;
      areas_to_improve?: string;
      sentiment?: 'positive' | 'neutral' | 'negative';
    }
  ): Promise<Feedback> {
    if (DEMO_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const feedback = demoFeedback.find(f => f.id === feedbackId);
      if (!feedback) throw new Error('Feedback not found');
      return { ...feedback, ...updateData, updated_at: new Date().toISOString() };
    }
    const response = await api.put(`/feedback/${feedbackId}`, updateData);
    return response.data;
  },
  async acknowledgeFeedback(feedbackId: number): Promise<void> {
    if (DEMO_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const feedback = demoFeedback.find(f => f.id === feedbackId);
      if (feedback) feedback.acknowledged = true;
      return;
    }
    await api.post(`/feedback/${feedbackId}/acknowledge`);
  },
};

export const dashboardService = {
  async getManagerDashboard(): Promise<ManagerDashboard> {
    if (DEMO_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return demoDashboard;
    }
    const response = await api.get('/dashboard/manager');
    return response.data;
  },

  async getEmployeeDashboard(): Promise<EmployeeDashboard> {
    if (DEMO_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return demoEmployeeDashboard;
    }
    const response = await api.get('/dashboard/employee');
    return response.data;
  },
};
