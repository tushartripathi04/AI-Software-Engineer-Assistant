from app.ai.ai_service import AIService
from app.ai.response_parser import ResponseParser
from app.schemas.sql_generator import (
    SQLGenerationRequest,
    SQLGenerationResponse,
)


class SQLGeneratorService:

    def __init__(self):
        self.ai_service = AIService()

    def generate_sql(
        self,
        request: SQLGenerationRequest,
    ) -> SQLGenerationResponse:

        system_prompt = (
            "You are an expert Database Engineer and SQL Developer.\n\n"

            "Generate an optimized SQL query based on the user's request.\n\n"

            "Return the response EXACTLY in this format:\n\n"

            "SQL QUERY:\n"
            "<Generated SQL query>\n\n"

            "EXPLANATION:\n"
            "<Explanation>\n\n"

            "QUERY TYPE:\n"
            "<SELECT / INSERT / UPDATE / DELETE / CREATE / ALTER>\n\n"

            "OPTIMIZATION TIPS:\n"
            "<Optimization suggestions>\n\n"

            "Do not use markdown code fences."
        )

        user_prompt = (
            f"Database: {request.database}\n\n"
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
                    "SQL QUERY:",
                    "EXPLANATION:",
                    "QUERY TYPE:",
                    "OPTIMIZATION TIPS:",
                ],
            )

            sql_query = sections["SQL QUERY:"]
            explanation = sections["EXPLANATION:"]
            query_type = sections["QUERY TYPE:"]
            optimization_tips = sections["OPTIMIZATION TIPS:"]

        except Exception:

            sql_query = response
            explanation = ""
            query_type = ""
            optimization_tips = ""

        return SQLGenerationResponse(
            database=request.database,
            sql_query=sql_query,
            explanation=explanation,
            query_type=query_type,
            optimization_tips=optimization_tips,
        )