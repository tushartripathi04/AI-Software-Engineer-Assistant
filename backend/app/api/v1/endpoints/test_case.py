from fastapi import APIRouter

from app.schemas.test_case import (
    TestCaseRequest,
    TestCaseResponse,
)
from app.services.test_case_service import TestCaseService


router = APIRouter()

test_case_service = TestCaseService()


@router.post(
    "/generate",
    response_model=TestCaseResponse,
)
def generate_test_cases(
    request: TestCaseRequest,
):
    return test_case_service.generate_test_cases(
        request
    )