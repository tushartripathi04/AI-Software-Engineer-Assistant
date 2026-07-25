from fastapi import APIRouter

from app.schemas.diagram_generator import (
    DiagramGenerationRequest,
    DiagramGenerationResponse,
)
from app.services.diagram_generator_service import (
    DiagramGeneratorService,
)

router = APIRouter()

diagram_generator_service = DiagramGeneratorService()


@router.post(
    "/generate",
    response_model=DiagramGenerationResponse,
)
def generate_diagram(
    request: DiagramGenerationRequest,
):
    return diagram_generator_service.generate_diagram(request)