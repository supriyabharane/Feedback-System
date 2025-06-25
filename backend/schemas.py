from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    MANAGER = "manager"
    EMPLOYEE = "employee"

class SentimentType(str, Enum):
    POSITIVE = "positive"
    NEUTRAL = "neutral"
    NEGATIVE = "negative"

class UserBase(BaseModel):
    email: EmailStr
    name: str
    role: UserRole = UserRole.EMPLOYEE
    manager_id: Optional[int] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    manager_id: Optional[int] = None

class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class FeedbackBase(BaseModel):
    employee_id: int
    strengths: str
    areas_to_improve: str
    sentiment: SentimentType

class FeedbackCreate(FeedbackBase):
    pass

class FeedbackUpdate(BaseModel):
    strengths: Optional[str] = None
    areas_to_improve: Optional[str] = None
    sentiment: Optional[SentimentType] = None

class Feedback(FeedbackBase):
    id: int
    manager_id: int
    created_at: datetime
    updated_at: datetime
    acknowledged: bool
    acknowledged_at: Optional[datetime] = None
    
    # Relationships
    manager: User
    employee: User

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class SentimentSummary(BaseModel):
    positive: int
    neutral: int
    negative: int

class ManagerDashboard(BaseModel):
    team_size: int
    total_feedback: int
    recent_feedback: List[Feedback]
    sentiment_summary: SentimentSummary

class EmployeeDashboard(BaseModel):
    total_feedback_received: int
    unacknowledged_feedback: int
    recent_feedback: List[Feedback]
    sentiment_summary: SentimentSummary
