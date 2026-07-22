from fastapi import APIRouter

from app.schemas.documentation import (
    DocumentationRequest,
    DocumentationResponse,
)
from app.services.documentation_service import DocumentationService


router = APIRouter()

documentation_service = DocumentationService()


@router.post(
    "/generate",
    response_model=DocumentationResponse,
)
def generate_documentation(
    request: DocumentationRequest,
):
    return documentation_service.generate_documentation(
        request
    )