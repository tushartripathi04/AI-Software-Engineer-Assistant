from app.ai.ai_service import AIService
from app.ai.response_parser import ResponseParser
from app.schemas.readme_generator import (
    ReadmeGenerationRequest,
    ReadmeGenerationResponse,
)


class ReadmeGeneratorService:

    def __init__(self):
        self.ai_service = AIService()

    def generate_readme(
        self,
        request: ReadmeGenerationRequest,
    ) -> ReadmeGenerationResponse:

        system_prompt = (
            "You are an expert Open Source Software Engineer.\n\n"

            "Generate a professional GitHub README.md file.\n\n"

            "Return the response EXACTLY in this format:\n\n"

            "README:\n"
            "<Complete GitHub README in Markdown>\n\n"

            "Do not use markdown code fences."
        )

        user_prompt = (
            f"Project Name: {request.project_name}\n\n"
            f"Tech Stack: {request.tech_stack}\n\n"
            f"Description:\n{request.description}"
        )

        response = self.ai_service.execute(
            system_prompt=system_prompt,
            user_prompt=user_prompt,
        )

        try:

            sections = ResponseParser.split_sections(
                response,
                [
                    "README:",
                ],
            )

            readme = sections["README:"]

        except Exception:

            readme = response

        return ReadmeGenerationResponse(
            project_name=request.project_name,
            readme=readme,
        )