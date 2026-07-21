from fastapi import FastAPI

from app.api.v1.endpoints.auth import router as auth_router
from app.api.v1.endpoints.users import router as users_router
from app.core.config import settings
from app.api.v1.endpoints.chat import router as chat_router
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(chat_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to AI Software Engineer Assistant API 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "version": settings.APP_VERSION,
    }