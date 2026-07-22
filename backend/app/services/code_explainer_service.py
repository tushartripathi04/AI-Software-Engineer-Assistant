from app.ai.ai_service import AIService
from app.ai.response_parser import ResponseParser
from app.schemas.code_explainer import (
    CodeExplainerRequest,
    CodeExplainerResponse,
)


class CodeExplainerService:

    def __init__(self):
        self.ai_service = AIService()

    def explain_code(
        self,
        request: CodeExplainerRequest,
    ) -> CodeExplainerResponse:

        system_prompt = (
            "You are a Senior Software Engineer and Programming Instructor.\n\n"

            "Explain the given source code in a way that is easy for developers "
            "and students to understand.\n\n"

            "Return the response EXACTLY in this format:\n\n"

            "OVERVIEW:\n"
            "<brief overview>\n\n"

            "LINE BY LINE:\n"
            "<line by line explanation>\n\n"

            "ALGORITHM:\n"
            "<algorithm explanation>\n\n"

            "TIME COMPLEXITY:\n"
            "<time complexity>\n\n"

            "SPACE COMPLEXITY:\n"
            "<space complexity>\n\n"

            "REAL WORLD USE:\n"
            "<real world applications>\n\n"

            "IMPROVEMENTS:\n"
            "<possible improvements>\n\n"

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
                    "LINE BY LINE:",
                    "ALGORITHM:",
                    "TIME COMPLEXITY:",
                    "SPACE COMPLEXITY:",
                    "REAL WORLD USE:",
                    "IMPROVEMENTS:",
                ],
            )

            overview = sections["OVERVIEW:"]
            line_by_line = sections["LINE BY LINE:"]
            algorithm = sections["ALGORITHM:"]
            time_complexity = sections["TIME COMPLEXITY:"]
            space_complexity = sections["SPACE COMPLEXITY:"]
            real_world_use = sections["REAL WORLD USE:"]
            improvements = sections["IMPROVEMENTS:"]

        except Exception:

            overview = response
            line_by_line = ""
            algorithm = ""
            time_complexity = ""
            space_complexity = ""
            real_world_use = ""
            improvements = ""

        return CodeExplainerResponse(
            overview=overview,
            line_by_line=line_by_line,
            algorithm=algorithm,
            time_complexity=time_complexity,
            space_complexity=space_complexity,
            real_world_use=real_world_use,
            improvements=improvements,
        )