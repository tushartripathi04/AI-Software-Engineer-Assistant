from fastapi import APIRouter

from app.schemas.bug_fix import (
    BugFixRequest,
    BugFixResponse,
)

from app.services.bug_fix_service import (
    BugFixService,
)

router = APIRouter()

service = BugFixService()


@router.post(
    "/fix",
    response_model=BugFixResponse,
)
def fix_code(request: BugFixRequest):
    return service.fix_code(request)