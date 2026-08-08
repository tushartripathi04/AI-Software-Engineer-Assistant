from typing import List, Optional
from uuid import UUID

from sqlalchemy.orm import Session

from app.models.conversation import Conversation
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
    ) -> Conversation:

        return self.repository.create(
            user_id=user_id,
            title=title,
        )

    def get_by_id(
        self,
        conversation_id: UUID,
        user_id: UUID,
    ) -> Optional[Conversation]:

        return self.repository.get_by_id_for_user(
            conversation_id=conversation_id,
            user_id=user_id,
        )

    def get_all(
        self,
        user_id: UUID,
    ) -> List[Conversation]:

        return self.repository.get_user_conversations(
            user_id
        )

    def delete(
        self,
        conversation: Conversation,
    ) -> None:

        self.repository.delete(conversation)