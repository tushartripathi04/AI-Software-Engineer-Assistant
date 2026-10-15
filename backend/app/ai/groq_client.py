from groq import Groq
from app.core.config import settings


class GroqClient:
    def __init__(self):
        self.client = Groq(
            api_key=settings.GROQ_API_KEY
        )

    def generate_response(self, messages: list) -> str:
        """Generate an AI response using the complete conversation history."""

        response = self.client.chat.completions.create(
            model=settings.GROQ_MODEL,
            messages=messages,
            temperature=0.3,
            max_tokens=1024,
        )

        return response.choices[0].message.content or ""