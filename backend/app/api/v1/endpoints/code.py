from fastapi import APIRouter

from app.schemas.code import (
    CodeGenerationRequest,
    CodeGenerationResponse,
)

from app.services.code_generation_service import (
    CodeGenerationService,
)

router = APIRouter()

service = CodeGenerationService()


@router.post(
    "/generate",
    response_model=CodeGenerationResponse
)
def generate_code(
    request: CodeGenerationRequest,
):
    return service.generate_code(request)