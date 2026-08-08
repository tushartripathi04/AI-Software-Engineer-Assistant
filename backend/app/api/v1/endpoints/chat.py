from typing import Optional
from uuid import UUID

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

        service = ChatService(db)

        result = service.chat(
            user_id=current_user.id,
            message=request.message,
            conversation_id=request.conversation_id,
        )

        return ChatResponse(
            conversation_id=result[
                "conversation_id"
            ],
            response=result["response"],
        )

    except HTTPException:
        raise

    except Exception as e:

        print("=" * 80)
        print("CHAT ENDPOINT ERROR")
        print(repr(e))
        print("=" * 80)

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )