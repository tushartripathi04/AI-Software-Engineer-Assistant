# from pydantic import BaseModel, Field


# class ChatRequest(BaseModel):
#     message: str = Field(..., min_length=1, max_length=5000)


# class ChatResponse(BaseModel):
#     response: str

from uuid import UUID

from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str
    conversation_id: UUID | None = None


class ChatResponse(BaseModel):
    conversation_id: UUID
    response: str