from app.ai.groq_client import GroqClient
from app.ai.prompts import SOFTWARE_ENGINEER_SYSTEM_PROMPT
from app.ai.prompt_builder import PromptBuilder


class AIService:

    def __init__(self):
        self.client = GroqClient()

    def chat(
        self,
        message: str,
    ) -> str:
        """
        General AI Chat
        """

        return self.client.generate_response(
            prompt=message,
            system_prompt=SOFTWARE_ENGINEER_SYSTEM_PROMPT,
        )

    def execute(
        self,
        system_prompt: str,
        user_prompt: str,
    ) -> str:
        """
        Execute any AI task.

        Used by:
        - Code Generator
        - Code Reviewer
        - Bug Fixer
        - Documentation Generator
        - Unit Test Generator
        - Code Explainer
        """

        messages = PromptBuilder.build(
            system_prompt=system_prompt,
            user_prompt=user_prompt,
        )

        return self.client.generate_response(
            messages=messages
        )