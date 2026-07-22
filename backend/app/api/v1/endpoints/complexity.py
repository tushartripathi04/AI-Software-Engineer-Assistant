from fastapi import APIRouter

from app.schemas.complexity import (
    ComplexityRequest,
    ComplexityResponse,
)
from app.services.complexity_service import (
    ComplexityService,
)


router = APIRouter()

complexity_service = ComplexityService()


@router.post(
    "/analyze",
    response_model=ComplexityResponse,
)
def analyze_complexity(
    request: ComplexityRequest,
):
    return complexity_service.analyze_complexity(
        request
    )