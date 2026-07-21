# from groq import Groq

# from app.core.config import settings


# class GroqClient:
#     def __init__(self):
#         self.client = Groq(
#             api_key=settings.GROQ_API_KEY
#         )

#     def generate_response(
#         self,
#         prompt: str,
#         system_prompt: str = "You are an expert AI Software Engineering Assistant.",
#     ) -> str:
#         """
#         Generate a response using the Groq API.
#         """

#         response = self.client.chat.completions.create(
#             model=settings.GROQ_MODEL,
#             messages=[
#                 {
#                     "role": "system",
#                     "content": system_prompt,
#                 },
#                 {
#                     "role": "user",
#                     "content": prompt,
#                 },
#             ],
#             temperature=0.3,
#             max_tokens=1024,
#         )

#         return response.choices[0].message.content

from groq import Groq

from app.core.config import settings


class GroqClient:

    def __init__(self):
        self.client = Groq(
            api_key=settings.GROQ_API_KEY
        )

    def generate_response(
        self,
        messages: list,
    ) -> str:
        """
        Generate AI response using the complete conversation history.
        """

        response = self.client.chat.completions.create(
            model=settings.GROQ_MODEL,
            messages=messages,
            temperature=0.3,
            max_tokens=1024,
        )

        return response.choices[0].message.content