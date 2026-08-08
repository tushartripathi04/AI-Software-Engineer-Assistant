from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class ChatRequest(BaseModel):

    message: str

    conversation_id: Optional[UUID] = None


class ChatResponse(BaseModel):

    conversation_id: UUID

    response: str