from app.ai.ai_service import AIService
from app.ai.response_parser import ResponseParser
from app.schemas.code import (
    CodeGenerationRequest,
    CodeGenerationResponse,
)


class CodeGenerationService:

    def __init__(self):
        self.ai_service = AIService()

    def generate_code(
        self,
        request: CodeGenerationRequest,
    ) -> CodeGenerationResponse:

        system_prompt = (
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

        user_prompt = (
            f"Programming Language: {request.language}\n\n"
            f"Task:\n{request.prompt}"
        )

        response = self.ai_service.execute(
            system_prompt=system_prompt,
            user_prompt=user_prompt,
        )

        try:

            sections = ResponseParser.split_sections(
                response,
                [
                    "CODE:",
                    "EXPLANATION:",
                    "TIME COMPLEXITY:",
                ],
            )

            code = sections["CODE:"]
            explanation = sections["EXPLANATION:"]
            complexity = sections["TIME COMPLEXITY:"]

        except Exception:

            code = response
            explanation = ""
            complexity = ""

        return CodeGenerationResponse(
            language=request.language,
            generated_code=code,
            explanation=explanation,
            complexity=complexity,
        )