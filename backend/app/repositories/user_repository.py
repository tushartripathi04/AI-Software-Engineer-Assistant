from sqlalchemy.orm import Session

from app.models.user import User


class UserRepository:

    @staticmethod
    def get_by_email(db: Session, email: str):
        """
        Find a user by email.
        """
        return (
            db.query(User)
            .filter(User.email == email)
            .first()
        )


    @staticmethod
    def create(
        db: Session,
        full_name: str,
        email: str,
        password_hash: str,
    ):
        """
        Create a new user.
        """
        user = User(
            full_name=full_name,
            email=email,
            password_hash=password_hash,
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return user
    @staticmethod
    def get_by_id(db: Session, user_id):
        return (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )