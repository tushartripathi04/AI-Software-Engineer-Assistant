from uuid import UUID

from sqlalchemy.orm import Session

from app.repositories.conversation_repository import (
    ConversationRepository,
)


class ConversationService:

    def __init__(self, db: Session):
        self.repository = ConversationRepository(db)

    def create(
        self,
        user_id: UUID,
        title: str,
    ):
        return self.repository.create(
            user_id=user_id,
            title=title,
        )

    def get_all(
        self,
        user_id: UUID,
    ):
        return self.repository.get_user_conversations(
            user_id
        )

    def delete(
        self,
        conversation,
    ):
        self.repository.delete(conversation)