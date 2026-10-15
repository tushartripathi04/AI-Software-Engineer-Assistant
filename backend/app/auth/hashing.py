
from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)


def hash_password(password: str) -> str:
    """Hash a password after validating its UTF-8 byte length."""
    if len(password.encode("utf-8")) > 72:
        raise ValueError(
            "Password must not exceed 72 bytes when encoded as UTF-8."
        )

    return pwd_context.hash(password)


def verify_password(
    plain_password: str,
    hashed_password: str,
) -> bool:
    """Verify a plain-text password against its stored hash."""
    return pwd_context.verify(
        plain_password,
        hashed_password,
    )
