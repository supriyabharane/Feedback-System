from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

import models
import schemas
from auth import get_password_hash

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        name=user.name,
        hashed_password=hashed_password,
        role=user.role,
        manager_id=user.manager_id
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_team_members(db: Session, manager_id: int):
    return db.query(models.User).filter(models.User.manager_id == manager_id).all()

def create_feedback(db: Session, feedback: schemas.FeedbackCreate, manager_id: int):
    db_feedback = models.Feedback(
        manager_id=manager_id,
        employee_id=feedback.employee_id,
        strengths=feedback.strengths,
        areas_to_improve=feedback.areas_to_improve,
        sentiment=feedback.sentiment
    )
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback

def get_feedback(db: Session, feedback_id: int):
    return db.query(models.Feedback).filter(models.Feedback.id == feedback_id).first()

def get_feedback_by_manager(db: Session, manager_id: int):
    return db.query(models.Feedback).filter(models.Feedback.manager_id == manager_id).all()

def get_feedback_by_employee(db: Session, employee_id: int):
    return db.query(models.Feedback).filter(models.Feedback.employee_id == employee_id).all()

def update_feedback(db: Session, feedback_id: int, feedback_update: schemas.FeedbackUpdate):
    db_feedback = db.query(models.Feedback).filter(models.Feedback.id == feedback_id).first()
    if db_feedback:
        for key, value in feedback_update.dict(exclude_unset=True).items():
            setattr(db_feedback, key, value)
        db_feedback.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_feedback)
    return db_feedback

def acknowledge_feedback(db: Session, feedback_id: int):
    db_feedback = db.query(models.Feedback).filter(models.Feedback.id == feedback_id).first()
    if db_feedback:
        db_feedback.acknowledged = True
        db_feedback.acknowledged_at = datetime.utcnow()
        db.commit()
        db.refresh(db_feedback)
    return db_feedback

def get_manager_dashboard(db: Session, manager_id: int):
    # Get team members
    team_members = get_team_members(db, manager_id)
    team_size = len(team_members)
    
    # Get all feedback given by manager
    all_feedback = get_feedback_by_manager(db, manager_id)
    total_feedback = len(all_feedback)
    
    # Get recent feedback (last 5)
    recent_feedback = db.query(models.Feedback)\
        .filter(models.Feedback.manager_id == manager_id)\
        .order_by(models.Feedback.created_at.desc())\
        .limit(5).all()
    
    # Calculate sentiment summary
    sentiment_counts = {"positive": 0, "neutral": 0, "negative": 0}
    for feedback in all_feedback:
        sentiment_counts[feedback.sentiment.value] += 1
    
    return schemas.ManagerDashboard(
        team_size=team_size,
        total_feedback=total_feedback,
        recent_feedback=recent_feedback,
        sentiment_summary=schemas.SentimentSummary(**sentiment_counts)
    )

def get_employee_dashboard(db: Session, employee_id: int):
    # Get all feedback received by employee
    all_feedback = get_feedback_by_employee(db, employee_id)
    total_feedback_received = len(all_feedback)
    
    # Count unacknowledged feedback
    unacknowledged_feedback = len([f for f in all_feedback if not f.acknowledged])
    
    # Get recent feedback (last 5)
    recent_feedback = db.query(models.Feedback)\
        .filter(models.Feedback.employee_id == employee_id)\
        .order_by(models.Feedback.created_at.desc())\
        .limit(5).all()
    
    # Calculate sentiment summary
    sentiment_counts = {"positive": 0, "neutral": 0, "negative": 0}
    for feedback in all_feedback:
        sentiment_counts[feedback.sentiment.value] += 1
    
    return schemas.EmployeeDashboard(
        total_feedback_received=total_feedback_received,
        unacknowledged_feedback=unacknowledged_feedback,
        recent_feedback=recent_feedback,
        sentiment_summary=schemas.SentimentSummary(**sentiment_counts)
    )
