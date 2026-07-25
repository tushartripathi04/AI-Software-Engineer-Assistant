from datetime import datetime
from sqlalchemy import text

from app.core.config import settings
from app.db.database import engine


class HealthService:

    @staticmethod
    def get_health_status():

        database_status = "disconnected"

        try:
            with engine.connect() as connection:
                connection.execute(text("SELECT 1"))
            database_status = "connected"

        except Exception:
            database_status = "disconnected"

        groq_status = (
            "configured"
            if settings.GROQ_API_KEY
            else "missing"
        )

        return {
            "status": "healthy",
            "application": settings.APP_NAME,
            "version": settings.APP_VERSION,
            "environment": settings.APP_ENV,
            "database": database_status,
            "groq": groq_status,
            "timestamp": datetime.utcnow().isoformat() + "Z",
        }