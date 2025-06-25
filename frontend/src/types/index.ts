export interface User {
  id: number;
  email: string;
  name: string;
  role: 'manager' | 'employee';
  manager_id?: number;
  created_at: string;
}

export interface Feedback {
  id: number;
  manager_id: number;
  employee_id: number;
  strengths: string;
  areas_to_improve: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  created_at: string;
  updated_at: string;
  acknowledged: boolean;
  acknowledged_at?: string;
  manager: User;
  employee: User;
}

export interface AuthToken {
  access_token: string;
  token_type: string;
}

export interface ManagerDashboard {
  team_size: number;
  total_feedback: number;
  recent_feedback: Feedback[];
  sentiment_summary: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export interface EmployeeDashboard {
  total_feedback_received: number;
  unacknowledged_feedback: number;
  recent_feedback: Feedback[];
  sentiment_summary: {
    positive: number;
    neutral: number;
    negative: number;
  };
}
