from fastapi import APIRouter

from app.schemas.code_explainer import (
    CodeExplainerRequest,
    CodeExplainerResponse,
)
from app.services.code_explainer_service import (
    CodeExplainerService,
)


router = APIRouter()

code_explainer_service = CodeExplainerService()


@router.post(
    "/explain",
    response_model=CodeExplainerResponse,
)
def explain_code(
    request: CodeExplainerRequest,
):
    return code_explainer_service.explain_code(
        request
    )