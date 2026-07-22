from app.ai.ai_service import AIService
from app.ai.response_parser import ResponseParser
from app.schemas.complexity import (
    ComplexityRequest,
    ComplexityResponse,
)


class ComplexityService:

    def __init__(self):
        self.ai_service = AIService()

    def analyze_complexity(
        self,
        request: ComplexityRequest,
    ) -> ComplexityResponse:

        system_prompt = (
            "You are a Senior Software Engineer and Algorithm Expert.\n\n"

            "Analyze the given source code and determine its computational complexity.\n\n"

            "Return the response EXACTLY in this format:\n\n"

            "TIME COMPLEXITY:\n"
            "<Big-O time complexity>\n\n"

            "SPACE COMPLEXITY:\n"
            "<Big-O space complexity>\n\n"

            "EXPLANATION:\n"
            "<Detailed explanation>\n\n"

            "BOTTLENECKS:\n"
            "<Performance bottlenecks>\n\n"

            "OPTIMIZATIONS:\n"
            "<Optimization suggestions>\n\n"

            "ALTERNATIVE APPROACH:\n"
            "<Alternative algorithm or approach>\n\n"

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
                    "TIME COMPLEXITY:",
                    "SPACE COMPLEXITY:",
                    "EXPLANATION:",
                    "BOTTLENECKS:",
                    "OPTIMIZATIONS:",
                    "ALTERNATIVE APPROACH:",
                ],
            )

            time_complexity = sections["TIME COMPLEXITY:"]
            space_complexity = sections["SPACE COMPLEXITY:"]
            explanation = sections["EXPLANATION:"]
            bottlenecks = sections["BOTTLENECKS:"]
            optimizations = sections["OPTIMIZATIONS:"]
            alternative_approach = sections["ALTERNATIVE APPROACH:"]

        except Exception:

            time_complexity = ""
            space_complexity = ""
            explanation = response
            bottlenecks = ""
            optimizations = ""
            alternative_approach = ""

        return ComplexityResponse(
            time_complexity=time_complexity,
            space_complexity=space_complexity,
            explanation=explanation,
            bottlenecks=bottlenecks,
            optimizations=optimizations,
            alternative_approach=alternative_approach,
        )