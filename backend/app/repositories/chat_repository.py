from typing import List, Optional
from uuid import UUID

from sqlalchemy.orm import Session

from app.models.message import Message


class ChatRepository:

    def __init__(self, db: Session):
        self.db = db

    def create_message(
        self,
        user_id: UUID,
        role: str,
        message: str,
        conversation_id: UUID,
    ) -> Message:
        """
        Create and save a message inside a conversation.
        """

        chat = Message(
            conversation_id=conversation_id,
            role=role,
            content=message,
        )

        self.db.add(chat)
        self.db.commit()
        self.db.refresh(chat)

        return chat

    def get_conversation_messages(
        self,
        conversation_id: UUID,
        limit: int = 20,
    ) -> List[Message]:
        """
        Get messages belonging to a specific conversation.
        """

        return (
            self.db.query(Message)
            .filter(
                Message.conversation_id == conversation_id
            )
            .order_by(Message.created_at.asc())
            .limit(limit)
            .all()
        )

    def get_message_by_id(
        self,
        message_id: UUID,
    ) -> Optional[Message]:
        """
        Get a single message by ID.
        """

        return (
            self.db.query(Message)
            .filter(Message.id == message_id)
            .first()
        )