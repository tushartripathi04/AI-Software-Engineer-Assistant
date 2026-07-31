from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ==========================
    # Application
    # ==========================
    APP_NAME: str
    APP_VERSION: str
    APP_ENV: str = "development"
    DEBUG: bool

    HOST: str = "127.0.0.1"
    PORT: int = 8000

    # ==========================
    # Database
    # ==========================
    DATABASE_URL: str

    # ==========================
    # Authentication
    # ==========================
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # ==========================
    # AI Configuration
    # ==========================
    GROQ_API_KEY: str
    GROQ_MODEL: str

    # ==========================
    # Logging
    # ==========================
    LOG_LEVEL: str = "INFO"

    # ==========================
    # API
    # ==========================
    REQUEST_TIMEOUT: int = 120
    MAX_REQUEST_SIZE: int = 10 * 1024 * 1024

    # ==========================
    # CORS
    # ==========================
    ALLOWED_ORIGINS: str = ""

    @property
    def allowed_origins_list(self) -> List[str]:
        return [
            origin.strip()
            for origin in self.ALLOWED_ORIGINS.split(",")
            if origin.strip()
        ]

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()