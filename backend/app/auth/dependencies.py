from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.orm import Session

from app.auth.jwt_handler import decode_access_token
from app.db.session import get_db
from app.repositories.user_repository import UserRepository

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)



def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    print("========== AUTH DEBUG ==========")
    print("TOKEN:", token)

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )

    try:
        payload = decode_access_token(token)
        print("PAYLOAD:", payload)

        user_id = payload.get("sub")
        print("USER_ID:", user_id)

        if user_id is None:
            print("sub claim missing")
            raise credentials_exception

    except Exception as e:
        print("JWT ERROR:", e)
        raise credentials_exception

    user = UserRepository.get_by_id(db, user_id)
    print("USER:", user)

    if user is None:
        print("User not found")
        raise credentials_exception

    print("Authentication successful")
    return user