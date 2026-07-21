from app.ai.groq_client import GroqClient
from app.ai.prompts import SOFTWARE_ENGINEER_SYSTEM_PROMPT


class AIService:

    def __init__(self):
        self.client = GroqClient()

    def chat(
        self,
        message: str,
    ) -> str:

        return self.client.generate_response(
            prompt=message,
            system_prompt=SOFTWARE_ENGINEER_SYSTEM_PROMPT,
        )