"""
Demo data creation script for the Feedback System
Creates sample users and feedback for testing purposes
"""

from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
from auth import get_password_hash
from datetime import datetime, timedelta

def create_demo_data():
    # Create tables
    models.Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Check if demo data already exists
        existing_manager = db.query(models.User).filter(models.User.email == "manager@example.com").first()
        if existing_manager:
            print("Demo data already exists!")
            return
        
        # Create demo manager
        manager = models.User(
            email="manager@example.com",
            name="John Manager",
            hashed_password=get_password_hash("password123"),
            role=models.UserRole.MANAGER
        )
        db.add(manager)
        db.commit()
        db.refresh(manager)
        
        # Create demo employees
        employees = [
            {
                "email": "alice@example.com",
                "name": "Alice Johnson",
                "manager_id": manager.id
            },
            {
                "email": "bob@example.com",
                "name": "Bob Smith",
                "manager_id": manager.id
            },
            {
                "email": "carol@example.com",
                "name": "Carol Davis",
                "manager_id": manager.id
            }
        ]
        
        created_employees = []
        for emp_data in employees:
            employee = models.User(
                email=emp_data["email"],
                name=emp_data["name"],
                hashed_password=get_password_hash("password123"),
                role=models.UserRole.EMPLOYEE,
                manager_id=emp_data["manager_id"]
            )
            db.add(employee)
            created_employees.append(employee)
        
        db.commit()
        
        # Create sample feedback
        feedback_data = [
            {
                "employee": created_employees[0],
                "strengths": "Excellent problem-solving skills and great attention to detail. Always delivers high-quality work on time.",
                "areas_to_improve": "Could benefit from being more proactive in team meetings and sharing ideas more frequently.",
                "sentiment": models.SentimentType.POSITIVE,
                "days_ago": 5
            },
            {
                "employee": created_employees[1],
                "strengths": "Strong technical skills and very reliable team member. Great at helping colleagues when needed.",
                "areas_to_improve": "Time management could be improved, especially for larger projects. Consider breaking tasks into smaller chunks.",
                "sentiment": models.SentimentType.NEUTRAL,
                "days_ago": 10
            },
            {
                "employee": created_employees[2],
                "strengths": "Outstanding communication skills and natural leadership qualities. Excellent at coordinating with different teams.",
                "areas_to_improve": "Could focus more on technical depth in some areas to complement strong leadership skills.",
                "sentiment": models.SentimentType.POSITIVE,
                "days_ago": 3
            },
            {
                "employee": created_employees[0],
                "strengths": "Has shown great improvement in communication and is becoming more confident in presentations.",
                "areas_to_improve": "Continue working on code review feedback implementation and documentation practices.",
                "sentiment": models.SentimentType.POSITIVE,
                "days_ago": 15
            }
        ]
        
        for feedback_info in feedback_data:
            created_date = datetime.utcnow() - timedelta(days=feedback_info["days_ago"])
            feedback = models.Feedback(
                manager_id=manager.id,
                employee_id=feedback_info["employee"].id,
                strengths=feedback_info["strengths"],
                areas_to_improve=feedback_info["areas_to_improve"],
                sentiment=feedback_info["sentiment"],
                created_at=created_date,
                updated_at=created_date,
                acknowledged=(feedback_info["days_ago"] > 7)  # Older feedback is acknowledged
            )
            db.add(feedback)
        
        db.commit()
        
        print("Demo data created successfully!")
        print("\nDemo Accounts:")
        print("Manager: manager@example.com / password123")
        print("Employees:")
        for emp in created_employees:
            print(f"  {emp.name}: {emp.email} / password123")
        
    except Exception as e:
        print(f"Error creating demo data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_demo_data()
