from fastapi import APIRouter

from app.schemas.git_assistant import (
    GitAssistantRequest,
    GitAssistantResponse,
)
from app.services.git_assistant_service import (
    GitAssistantService,
)

router = APIRouter()

git_service = GitAssistantService()


@router.post(
    "/generate",
    response_model=GitAssistantResponse,
)
def generate_git_content(
    request: GitAssistantRequest,
):
    return git_service.generate(request)