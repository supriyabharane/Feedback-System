// Demo data for GitHub Pages deployment when backend is not available
import { User, Feedback, AuthToken, ManagerDashboard, EmployeeDashboard } from '../types';

export const demoUsers: User[] = [
  {
    id: 1,
    email: 'manager@example.com',
    name: 'Demo Manager',
    role: 'manager',
    manager_id: undefined,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    email: 'employee@example.com',
    name: 'Demo Employee',
    role: 'employee',
    manager_id: 1,
    created_at: '2024-01-01T00:00:00Z'
  }
];

export const demoFeedback: Feedback[] = [
  {
    id: 1,
    manager_id: 1,
    employee_id: 2,
    strengths: 'Great communication skills and always meets deadlines. Shows initiative in problem-solving.',
    areas_to_improve: 'Could benefit from taking on more leadership opportunities and sharing knowledge with team members.',
    sentiment: 'positive',
    acknowledged: false,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    manager: demoUsers[0],
    employee: demoUsers[1]
  },
  {
    id: 2,
    manager_id: 1,
    employee_id: 2,
    strengths: 'Excellent technical skills and attention to detail.',
    areas_to_improve: 'Time management during busy periods.',
    sentiment: 'positive',
    acknowledged: true,
    created_at: '2024-01-10T14:30:00Z',
    updated_at: '2024-01-10T14:30:00Z',
    manager: demoUsers[0],
    employee: demoUsers[1]
  }
];

export const demoDashboard: ManagerDashboard = {
  team_size: 1,
  total_feedback: 2,
  recent_feedback: demoFeedback,
  sentiment_summary: {
    positive: 2,
    neutral: 0,
    negative: 0
  }
};

export const demoEmployeeDashboard: EmployeeDashboard = {
  total_feedback_received: 2,
  unacknowledged_feedback: 1,
  recent_feedback: demoFeedback,
  sentiment_summary: {
    positive: 2,
    neutral: 0,
    negative: 0
  }
};

// Demo authentication
export const demoAuth = {
  login: async (credentials: { email: string; password: string }): Promise<{ token: AuthToken; user: User }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = demoUsers.find(u => u.email === credentials.email);
    if (!user || credentials.password !== 'password123') {
      throw new Error('Invalid credentials');
    }
    
    const token: AuthToken = {
      access_token: 'demo-token-' + user.role + '-' + Date.now(),
      token_type: 'bearer'
    };
    
    // Store in localStorage for demo
    localStorage.setItem('token', token.access_token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { token, user };
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
