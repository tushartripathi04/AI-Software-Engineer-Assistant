from fastapi import FastAPI

from app.core.config import settings

from app.api.v1.endpoints.auth import router as auth_router
from app.api.v1.endpoints.users import router as users_router
from app.api.v1.endpoints.chat import router as chat_router
from app.api.v1.endpoints.code import router as code_router
from app.api.v1.endpoints.review import router as review_router
from app.api.v1.endpoints.bug_fix import router as bug_fix_router
from app.api.v1.endpoints.documentation import router as documentation_router
from app.api.v1.endpoints.test_case import router as test_case_router
from app.api.v1.endpoints.code_explainer import (
    router as code_explainer_router,
)
from app.api.v1.endpoints.complexity import (
    router as complexity_router,
)
from fastapi.exceptions import RequestValidationError

from app.core.exceptions import AIAssistantException
from app.core.handlers import (
    ai_exception_handler,
    validation_exception_handler,
    global_exception_handler,
)
from app.core.logger import logger


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)
logger.info("Starting AI Software Engineer Assistant API...")

# Register Exception Handlers
app.add_exception_handler(
    AIAssistantException,
    ai_exception_handler,
)

app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler,
)

app.add_exception_handler(
    Exception,
    global_exception_handler,
)
# Authentication
app.include_router(auth_router)

# User APIs
app.include_router(users_router)

# AI Chat
app.include_router(chat_router)

# AI Code Generator
app.include_router(
    code_router,
    prefix="/code",
    tags=["Code Generator"],
)

# AI Code Reviewer
app.include_router(
    review_router,
    prefix="/review",
    tags=["Code Reviewer"],
)

# AI Bug Fixer
app.include_router(
    bug_fix_router,
    prefix="/bug-fix",
    tags=["AI Bug Fixer"],
)


# AI Documentation Generator
app.include_router(
    documentation_router,
    prefix="/documentation",
    tags=["Documentation"],
)
# AI Test Case Generator
app.include_router(
    test_case_router,
    prefix="/test-cases",
    tags=["Test Case Generator"],
)
# AI Code Explainer
app.include_router(
    code_explainer_router,
    prefix="/code-explainer",
    tags=["Code Explainer"],
)
# AI Complexity Analyzer
app.include_router(
    complexity_router,
    prefix="/complexity",
    tags=["Complexity Analyzer"],
)

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