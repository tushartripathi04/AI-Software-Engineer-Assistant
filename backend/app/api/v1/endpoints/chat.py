from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"],
)


@router.post(
    "",
    response_model=ChatResponse,
)
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    try:
        chat_service = ChatService(db)

        response = chat_service.chat(
            user_id=current_user.id,
            message=request.message,
        )

        return ChatResponse(response=response)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )