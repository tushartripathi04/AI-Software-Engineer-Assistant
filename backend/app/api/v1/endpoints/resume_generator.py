from fastapi import APIRouter

from app.schemas.resume_generator import (
    ResumeGenerationRequest,
    ResumeGenerationResponse,
)
from app.services.resume_generator_service import (
    ResumeGeneratorService,
)

router = APIRouter()

resume_generator_service = ResumeGeneratorService()


@router.post(
    "/generate",
    response_model=ResumeGenerationResponse,
)
def generate_resume(
    request: ResumeGenerationRequest,
):
    return resume_generator_service.generate_resume_content(request)