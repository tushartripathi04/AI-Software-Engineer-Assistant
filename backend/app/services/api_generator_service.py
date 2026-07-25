from app.ai.ai_service import AIService
from app.ai.response_parser import ResponseParser
from app.schemas.api_generator import (
    APIGenerationRequest,
    APIGenerationResponse,
)


class APIGeneratorService:

    def __init__(self):
        self.ai_service = AIService()

    def generate_api(
        self,
        request: APIGenerationRequest,
    ) -> APIGenerationResponse:

        system_prompt = (
            "You are an expert Backend Software Engineer.\n\n"

            "Generate a complete REST API architecture.\n\n"

            "Return the response EXACTLY in this format:\n\n"

            "MODELS:\n"
            "<SQLAlchemy Models>\n\n"

            "SCHEMAS:\n"
            "<Pydantic Schemas>\n\n"

            "REPOSITORY:\n"
            "<Repository Layer>\n\n"

            "SERVICE:\n"
            "<Service Layer>\n\n"

            "ROUTES:\n"
            "<FastAPI Routes>\n\n"

            "EXPLANATION:\n"
            "<Short explanation>\n\n"

            "Do not use markdown code fences."
        )

        user_prompt = (
            f"Framework: {request.framework}\n\n"
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
                    "MODELS:",
                    "SCHEMAS:",
                    "REPOSITORY:",
                    "SERVICE:",
                    "ROUTES:",
                    "EXPLANATION:",
                ],
            )

            models = sections["MODELS:"]
            schemas = sections["SCHEMAS:"]
            repository = sections["REPOSITORY:"]
            service = sections["SERVICE:"]
            routes = sections["ROUTES:"]
            explanation = sections["EXPLANATION:"]

        except Exception:

            models = response
            schemas = ""
            repository = ""
            service = ""
            routes = ""
            explanation = ""

        return APIGenerationResponse(
            framework=request.framework,
            models=models,
            schemas=schemas,
            repository=repository,
            service=service,
            routes=routes,
            explanation=explanation,
        )