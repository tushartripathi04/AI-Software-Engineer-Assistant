from sqlalchemy.orm import Session

from app.ai.groq_client import GroqClient
from app.ai.prompts import SOFTWARE_ENGINEER_SYSTEM_PROMPT
from app.repositories.chat_repository import ChatRepository
from app.services.conversation_service import ConversationService


class ChatService:

    def __init__(self, db: Session):
        self.db = db
        self.chat_repository = ChatRepository(db)
        self.conversation_service = ConversationService(db)
        self.groq_client = GroqClient()

    def chat(
        self,
        user_id,
        message: str,
        conversation_id=None,
    ):

        # Create new conversation if required
        if conversation_id is None:
            title = message[:50]
            conversation = self.conversation_service.create(
                user_id=user_id,
                title=title,
            )
        else:
            conversation = self.conversation_service.get_by_id(
                conversation_id
            )

            if conversation is None:
                raise ValueError("Conversation not found.")

        # Save user message
        self.chat_repository.create_message(
            conversation_id=conversation.id,
            role="user",
            content=message,
        )

        # Load complete conversation
        history = self.chat_repository.get_conversation_messages(
            conversation.id
        )

        # Build prompt
        messages = [
            {
                "role": "system",
                "content": SOFTWARE_ENGINEER_SYSTEM_PROMPT,
            }
        ]

        for item in history:
            messages.append(
                {
                    "role": item.role,
                    "content": item.content,
                }
            )

        # AI response
        ai_response = self.groq_client.generate_response(messages)

        # Save assistant message
        self.chat_repository.create_message(
            conversation_id=conversation.id,
            role="assistant",
            content=ai_response,
        )

        return {
            "conversation_id": str(conversation.id),
            "response": ai_response,
        }