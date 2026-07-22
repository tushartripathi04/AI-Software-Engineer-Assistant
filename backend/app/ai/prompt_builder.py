class PromptBuilder:
    @staticmethod
    def build(system_prompt: str, user_prompt: str):
        return [
            {
                "role": "system",
                "content": system_prompt,
            },
            {
                "role": "user",
                "content": user_prompt,
            },
        ]