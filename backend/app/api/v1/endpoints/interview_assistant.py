from fastapi import APIRouter

from app.schemas.interview_assistant import (
    InterviewGenerationRequest,
    InterviewGenerationResponse,
)
from app.services.interview_assistant_service import (
    InterviewAssistantService,
)

router = APIRouter()

interview_assistant_service = InterviewAssistantService()


@router.post(
    "/generate",
    response_model=InterviewGenerationResponse,
)
def generate_interview(
    request: InterviewGenerationRequest,
):
    return interview_assistant_service.generate_interview(request)