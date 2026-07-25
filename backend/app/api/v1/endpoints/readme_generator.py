from fastapi import APIRouter

from app.schemas.readme_generator import (
    ReadmeGenerationRequest,
    ReadmeGenerationResponse,
)
from app.services.readme_generator_service import (
    ReadmeGeneratorService,
)

router = APIRouter()

readme_generator_service = ReadmeGeneratorService()


@router.post(
    "/generate",
    response_model=ReadmeGenerationResponse,
)
def generate_readme(
    request: ReadmeGenerationRequest,
):
    return readme_generator_service.generate_readme(request)