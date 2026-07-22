from fastapi import APIRouter

from app.schemas.review import (
    CodeReviewRequest,
    CodeReviewResponse,
)

from app.services.review_service import (
    ReviewService,
)

router = APIRouter()

service = ReviewService()


@router.post(
    "/code",
    response_model=CodeReviewResponse,
)
def review_code(
    request: CodeReviewRequest,
):
    return service.review_code(request)