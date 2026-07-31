from typing import List
from uuid import UUID

from sqlalchemy.orm import Session

from app.models.message import Message


class ChatRepository:

    def __init__(self, db: Session):
        self.db = db

    def create_message(
        self,
        conversation_id: UUID,
        role: str,
        content: str,
    ) -> Message:
        """
        Save a message inside a conversation.
        """

        db_message = Message(
            conversation_id=conversation_id,
            role=role,
            content=content,
        )

        self.db.add(db_message)
        self.db.commit()
        self.db.refresh(db_message)

        return db_message

    def get_conversation_messages(
        self,
        conversation_id: UUID,
    ) -> List[Message]:
        """
        Return all messages for a conversation.
        """

        return (
            self.db.query(Message)
            .filter(Message.conversation_id == conversation_id)
            .order_by(Message.created_at.asc())
            .all()
        )

    def get_last_messages(
        self,
        conversation_id: UUID,
        limit: int = 20,
    ) -> List[Message]:
        """
        Return the latest N messages.
        """

        messages = (
            self.db.query(Message)
            .filter(Message.conversation_id == conversation_id)
            .order_by(Message.created_at.desc())
            .limit(limit)
            .all()
        )

        return list(reversed(messages))

    def delete_conversation_messages(
        self,
        conversation_id: UUID,
    ) -> None:
        """
        Delete every message belonging to a conversation.
        """

        (
            self.db.query(Message)
            .filter(Message.conversation_id == conversation_id)
            .delete()
        )

        self.db.commit()

    def count_messages(
        self,
        conversation_id: UUID,
    ) -> int:
        """
        Count messages in a conversation.
        """

        return (
            self.db.query(Message)
            .filter(Message.conversation_id == conversation_id)
            .count()
        )