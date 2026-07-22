from app.ai.ai_service import AIService
from app.ai.response_parser import ResponseParser
from app.schemas.review import (
    CodeReviewRequest,
    CodeReviewResponse,
)


class ReviewService:

    def __init__(self):
        self.ai_service = AIService()

    def review_code(
        self,
        request: CodeReviewRequest,
    ) -> CodeReviewResponse:

        system_prompt = (
            "You are a Senior Software Engineer.\n\n"
            "Review the given code professionally.\n\n"
            "Return the answer EXACTLY in this format:\n\n"
            "SUMMARY:\n"
            "<summary>\n\n"
            "ISSUES:\n"
            "- issue 1\n"
            "- issue 2\n\n"
            "SUGGESTIONS:\n"
            "- suggestion 1\n"
            "- suggestion 2\n\n"
            "OPTIMIZED CODE:\n"
            "<optimized code>\n\n"
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
                    "SUMMARY:",
                    "ISSUES:",
                    "SUGGESTIONS:",
                    "OPTIMIZED CODE:",
                ],
            )

            summary = sections["SUMMARY:"]

            issues = ResponseParser.parse_list(
                sections["ISSUES:"]
            )

            suggestions = ResponseParser.parse_list(
                sections["SUGGESTIONS:"]
            )

            optimized_code = sections["OPTIMIZED CODE:"]

        except Exception:

            summary = response
            issues = []
            suggestions = []
            optimized_code = ""

        return CodeReviewResponse(
            summary=summary,
            issues=issues,
            suggestions=suggestions,
            optimized_code=optimized_code,
        )