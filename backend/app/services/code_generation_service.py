# from app.services.groq_client import GroqClient
from app.ai.groq_client import GroqClient
from app.schemas.code import (
    CodeGenerationRequest,
    CodeGenerationResponse,
)


class CodeGenerationService:
    def __init__(self):
        self.groq_client = GroqClient()

    def generate_code(
        self,
        request: CodeGenerationRequest
    ) -> CodeGenerationResponse:

        messages = [
            {
                "role": "system",
                "content": (
                    "You are an expert Software Engineer.\n"
                    "Generate clean, production-quality code.\n\n"

                    "Return the response in EXACTLY this format:\n\n"

                    "CODE:\n"
                    "<generated code>\n\n"

                    "EXPLANATION:\n"
                    "<short explanation>\n\n"

                    "TIME COMPLEXITY:\n"
                    "<Big-O>\n\n"

                    "Do not use markdown code fences."
                )
            },
            {
                "role": "user",
                "content": (
                    f"Programming Language: {request.language}\n\n"
                    f"Task:\n{request.prompt}"
                )
            }
        ]

        response = self.groq_client.generate_response(messages)

        code = ""
        explanation = ""
        complexity = ""

        if "EXPLANATION:" in response:

            code_part, remaining = response.split(
                "EXPLANATION:",
                1
            )

            code = code_part.replace(
                "CODE:",
                ""
            ).strip()

            if "TIME COMPLEXITY:" in remaining:

                explanation_part, complexity_part = remaining.split(
                    "TIME COMPLEXITY:",
                    1
                )

                explanation = explanation_part.strip()

                complexity = complexity_part.strip()

            else:
                explanation = remaining.strip()

        else:
            code = response

        return CodeGenerationResponse(
            language=request.language,
            generated_code=code,
            explanation=explanation,
            complexity=complexity,
        )