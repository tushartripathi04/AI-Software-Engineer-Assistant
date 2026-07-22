from app.ai.ai_service import AIService
from app.ai.response_parser import ResponseParser
from app.schemas.bug_fix import (
    BugFixRequest,
    BugFixResponse,
)


class BugFixService:

    def __init__(self):
        self.ai_service = AIService()

    def fix_code(
        self,
        request: BugFixRequest,
    ) -> BugFixResponse:

        system_prompt = (
            "You are an expert Software Engineer.\n\n"
            "Analyze the code, identify bugs, fix them, and explain the changes.\n\n"
            "Return EXACTLY in this format:\n\n"
            "SUMMARY:\n"
            "<summary>\n\n"
            "BUGS:\n"
            "- bug 1\n"
            "- bug 2\n\n"
            "FIXED CODE:\n"
            "<corrected code>\n\n"
            "EXPLANATION:\n"
            "<detailed explanation>\n\n"
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
                    "BUGS:",
                    "FIXED CODE:",
                    "EXPLANATION:",
                ],
            )

            summary = sections["SUMMARY:"]

            bugs = ResponseParser.parse_list(
                sections["BUGS:"]
            )

            fixed_code = sections["FIXED CODE:"]
            explanation = sections["EXPLANATION:"]

        except Exception:

            summary = response
            bugs = []
            fixed_code = ""
            explanation = ""

        return BugFixResponse(
            summary=summary,
            bugs=bugs,
            fixed_code=fixed_code,
            explanation=explanation,
        )