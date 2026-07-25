from fastapi import APIRouter

from app.schemas.sql_generator import (
    SQLGenerationRequest,
    SQLGenerationResponse,
)
from app.services.sql_generator_service import (
    SQLGeneratorService,
)

router = APIRouter()

sql_generator_service = SQLGeneratorService()


@router.post(
    "/generate",
    response_model=SQLGenerationResponse,
)
def generate_sql(
    request: SQLGenerationRequest,
):
    return sql_generator_service.generate_sql(request)