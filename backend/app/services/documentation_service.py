from app.ai.ai_service import AIService
from app.ai.response_parser import ResponseParser
from app.schemas.documentation import (
    DocumentationRequest,
    DocumentationResponse,
)


class DocumentationService:

    def __init__(self):
        self.ai_service = AIService()

    def generate_documentation(
        self,
        request: DocumentationRequest,
    ) -> DocumentationResponse:

        system_prompt = (
            "You are a Senior Software Engineer and Technical Documentation Expert.\n\n"

            "Generate professional documentation for the given code.\n\n"

            "Return the response EXACTLY in this format:\n\n"

            "OVERVIEW:\n"
            "<overview>\n\n"

            "PURPOSE:\n"
            "<purpose>\n\n"

            "PARAMETERS:\n"
            "<parameters>\n\n"

            "RETURNS:\n"
            "<returns>\n\n"

            "TIME COMPLEXITY:\n"
            "<time complexity>\n\n"

            "SPACE COMPLEXITY:\n"
            "<space complexity>\n\n"

            "EXAMPLE:\n"
            "<usage example>\n\n"

            "BEST PRACTICES:\n"
            "<best practices>\n\n"

            "Do not use markdown code fences."
        )

        user_prompt = (
            f"Programming Language: {request.language}\n\n"
            f"Code:\n{request.code}"
        )

        response = self.ai_service.execute(
            system_prompt=system_prompt,
            user_prompt=user_prompt,
        )

        try:

            sections = ResponseParser.split_sections(
                response,
                [
                    "OVERVIEW:",
                    "PURPOSE:",
                    "PARAMETERS:",
                    "RETURNS:",
                    "TIME COMPLEXITY:",
                    "SPACE COMPLEXITY:",
                    "EXAMPLE:",
                    "BEST PRACTICES:",
                ],
            )

            overview = sections["OVERVIEW:"]
            purpose = sections["PURPOSE:"]
            parameters = sections["PARAMETERS:"]
            returns = sections["RETURNS:"]
            time_complexity = sections["TIME COMPLEXITY:"]
            space_complexity = sections["SPACE COMPLEXITY:"]
            example = sections["EXAMPLE:"]
            best_practices = sections["BEST PRACTICES:"]

        except Exception:

            overview = response
            purpose = ""
            parameters = ""
            returns = ""
            time_complexity = ""
            space_complexity = ""
            example = ""
            best_practices = ""

        return DocumentationResponse(
            overview=overview,
            purpose=purpose,
            parameters=parameters,
            returns=returns,
            time_complexity=time_complexity,
            space_complexity=space_complexity,
            example=example,
            best_practices=best_practices,
        )