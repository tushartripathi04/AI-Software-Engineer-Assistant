from fastapi import FastAPI

from app.core.config import settings
from fastapi.middleware.cors import CORSMiddleware
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
from app.middleware.request_logger import (
    RequestLoggingMiddleware,
)
from app.middleware.request_id import RequestIDMiddleware
from app.services.health_service import HealthService
from app.api.v1.endpoints.sql_generator import (
    router as sql_generator_router,
)
from app.api.v1.endpoints.api_generator import (
    router as api_generator_router,
)
from app.api.v1.endpoints.diagram_generator import (
    router as diagram_generator_router,
)
from app.api.v1.endpoints.readme_generator import (
    router as readme_generator_router,
)
from app.api.v1.endpoints.resume_generator import (
    router as resume_generator_router,
)
from app.api.v1.endpoints.interview_assistant import (
    router as interview_assistant_router,
)
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)
logger.info("Starting AI Software Engineer Assistant API...")

# Add Middleware

app.add_middleware(RequestLoggingMiddleware)
app.add_middleware(RequestIDMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
# AI SQL Generator
app.include_router(
    sql_generator_router,
    prefix="/sql",
    tags=["AI SQL Generator"],
)
# AI API Generator
app.include_router(
    api_generator_router,
    prefix="/api",
    tags=["AI API Generator"],
)
# AI Diagram Generator
app.include_router(
    diagram_generator_router,
    prefix="/diagram",
    tags=["AI Diagram Generator"],
)
# AI README Generator
app.include_router(
    readme_generator_router,
    prefix="/readme",
    tags=["AI README Generator"],
)
# AI Resume & Portfolio Generator
app.include_router(
    resume_generator_router,
    prefix="/resume",
    tags=["AI Resume Generator"],
)
# AI Interview Assistant
app.include_router(
    interview_assistant_router,
    prefix="/interview",
    tags=["AI Interview Assistant"],
)
@app.get("/")
def root():
    return {
        "message": "Welcome to AI Software Engineer Assistant API 🚀"
    }


@app.get("/health")
def health():
    return HealthService.get_health_status()