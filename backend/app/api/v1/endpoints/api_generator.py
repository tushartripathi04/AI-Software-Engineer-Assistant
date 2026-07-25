from fastapi import APIRouter

from app.schemas.api_generator import (
    APIGenerationRequest,
    APIGenerationResponse,
)
from app.services.api_generator_service import (
    APIGeneratorService,
)

router = APIRouter()

api_generator_service = APIGeneratorService()


@router.post(
    "/generate",
    response_model=APIGenerationResponse,
)
def generate_api(
    request: APIGenerationRequest,
):
    return api_generator_service.generate_api(request)