from typing import Optional
from uuid import UUID

from sqlalchemy.orm import Session

from app.ai.groq_client import GroqClient
from app.ai.prompts import SOFTWARE_ENGINEER_SYSTEM_PROMPT
from app.repositories.chat_repository import ChatRepository
from app.repositories.conversation_repository import ConversationRepository


class ChatService:

    def __init__(self, db: Session):
        self.db = db

        self.chat_repository = ChatRepository(db)
        self.conversation_repository = ConversationRepository(db)

        self.groq_client = GroqClient()

    def chat(
        self,
        user_id: UUID,
        message: str,
        conversation_id: Optional[UUID] = None,
    ) -> dict:
        """
        Process a chat message.

        If conversation_id is not provided,
        create a new conversation.

        If conversation_id is provided,
        continue the existing conversation.
        """

        # -------------------------------------------------
        # 1. Get or create conversation
        # -------------------------------------------------

        if conversation_id is None:

            # Use the first message as the conversation title
            title = message.strip()

            # Keep title reasonably short
            if len(title) > 50:
                title = title[:50] + "..."

            conversation = self.conversation_repository.create(
                user_id=user_id,
                title=title,
            )

        else:

            # Get existing conversation
            conversation = self.conversation_repository.get_by_id(
                conversation_id
            )

            # Conversation doesn't exist
            if conversation is None:
                raise ValueError(
                    "Conversation not found."
                )

            # Make sure this conversation belongs
            # to the currently authenticated user
            if conversation.user_id != user_id:
                raise ValueError(
                    "You do not have access to this conversation."
                )

        # -------------------------------------------------
        # 2. Save user message
        # -------------------------------------------------

        self.chat_repository.create_message(
            user_id=user_id,
            role="user",
            message=message,
            conversation_id=conversation.id,
        )

        # -------------------------------------------------
        # 3. Load conversation history
        # -------------------------------------------------

        history = self.chat_repository.get_conversation_messages(
            conversation.id,
            limit=20,
        )

        # -------------------------------------------------
        # 4. Build Groq messages
        # -------------------------------------------------

        messages = [
            {
                "role": "system",
                "content": SOFTWARE_ENGINEER_SYSTEM_PROMPT,
            }
        ]

        for chat in history:
            messages.append(
                {
                    "role": chat.role,
                    "content": chat.content,
                }
            )

        # -------------------------------------------------
        # 5. Generate AI response
        # -------------------------------------------------

        ai_response = self.groq_client.generate_response(
            messages
        )

        # -------------------------------------------------
        # 6. Save AI response
        # -------------------------------------------------

        self.chat_repository.create_message(
            user_id=user_id,
            role="assistant",
            message=ai_response,
            conversation_id=conversation.id,
        )

        # -------------------------------------------------
        # 7. Return conversation ID + response
        # -------------------------------------------------

        return {
            "conversation_id": str(conversation.id),
            "response": ai_response,
        }