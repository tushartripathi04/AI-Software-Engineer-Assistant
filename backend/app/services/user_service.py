from sqlalchemy.orm import Session

from app.auth.hashing import hash_password, verify_password
from app.auth.jwt_handler import create_access_token
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate


class UserService:

    @staticmethod
    def register_user(
        db: Session,
        user_data: UserCreate,
    ):
        """
        Register a new user.
        """

        # Check if email already exists
        existing_user = UserRepository.get_by_email(
            db,
            user_data.email,
        )

        if existing_user:
            raise ValueError("Email already registered.")

        # Hash the password
        password_hash = hash_password(user_data.password)

        # Create user
        user = UserRepository.create(
            db=db,
            full_name=user_data.full_name,
            email=user_data.email,
            password_hash=password_hash,
        )

        return user

    @staticmethod
    def login_user(
        db: Session,
        email: str,
        password: str,
    ):
        """
        Authenticate user and generate JWT access token.
        """

        # Find user by email
        user = UserRepository.get_by_email(
            db,
            email,
        )

        if not user:
            raise ValueError("Invalid email or password.")

        # Verify password
        if not verify_password(
            password,
            user.password_hash,
        ):
            raise ValueError("Invalid email or password.")

        # Generate JWT Token
        access_token = create_access_token(
            data={
                "sub": str(user.id),
                "email": user.email,
            }
        )

        return {
            "access_token": access_token,
            "token_type": "bearer",
        }