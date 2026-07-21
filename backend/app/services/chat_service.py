

# from sqlalchemy.orm import Session

# from app.ai.ai_service import AIService
# from app.repositories.chat_repository import ChatRepository


# class ChatService:

#     def __init__(self, db: Session):
#         self.db = db
#         self.ai_service = AIService()
#         self.chat_repository = ChatRepository(db)

#     def chat(
#         self,
#         user_id,
#         message: str,
#     ) -> str:

#         # Save user message
#         self.chat_repository.create_message(
#             user_id=user_id,
#             role="user",
#             message=message,
#         )

#         # Generate AI response
#         ai_response = self.ai_service.chat(message)

#         # Save AI response
#         self.chat_repository.create_message(
#             user_id=user_id,
#             role="assistant",
#             message=ai_response,
#         )

#         return ai_response


from sqlalchemy.orm import Session

from app.ai.groq_client import GroqClient
from app.ai.prompts import SOFTWARE_ENGINEER_SYSTEM_PROMPT
from app.repositories.chat_repository import ChatRepository


class ChatService:

    def __init__(self, db: Session):
        self.db = db
        self.chat_repository = ChatRepository(db)
        self.groq_client = GroqClient()

    def chat(
        self,
        user_id,
        message: str,
    ) -> str:

        # Save current user message
        self.chat_repository.create_message(
            user_id=user_id,
            role="user",
            message=message,
        )

        # Load previous conversation
        history = self.chat_repository.get_chat_history(user_id)

        # Build conversation for Groq
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
                    "content": chat.message,
                }
            )

        # Generate AI response
        ai_response = self.groq_client.generate_response(messages)

        # Save AI response
        self.chat_repository.create_message(
            user_id=user_id,
            role="assistant",
            message=ai_response,
        )

        return ai_response