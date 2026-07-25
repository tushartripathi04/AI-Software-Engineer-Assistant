from app.ai.ai_service import AIService
from app.ai.response_parser import ResponseParser
from app.schemas.interview_assistant import (
    InterviewGenerationRequest,
    InterviewGenerationResponse,
)


class InterviewAssistantService:

    def __init__(self):
        self.ai_service = AIService()

    def generate_interview(
        self,
        request: InterviewGenerationRequest,
    ) -> InterviewGenerationResponse:

        system_prompt = (
            "You are an experienced Technical Interviewer, "
            "HR Interviewer, and Hiring Manager.\n\n"

            "Generate interview preparation material.\n\n"

            "Return the response EXACTLY in this format:\n\n"

            "QUESTIONS:\n"
            "- Question 1\n"
            "- Question 2\n"
            "- Question 3\n"
            "- Question 4\n"
            "- Question 5\n\n"

            "EXPECTED ANSWERS:\n"
            "- Answer 1\n"
            "- Answer 2\n"
            "- Answer 3\n"
            "- Answer 4\n"
            "- Answer 5\n\n"

            "INTERVIEW TIPS:\n"
            "- Tip 1\n"
            "- Tip 2\n"
            "- Tip 3\n"
            "- Tip 4\n"
            "- Tip 5\n\n"

            "Do not use markdown code fences."
        )

        user_prompt = (
            f"Company: {request.company}\n\n"
            f"Category: {request.category}\n\n"
            f"Difficulty: {request.difficulty}"
        )

        response = self.ai_service.execute(
            system_prompt=system_prompt,
            user_prompt=user_prompt,
        )

        try:

            sections = ResponseParser.split_sections(
                response,
                [
                    "QUESTIONS:",
                    "EXPECTED ANSWERS:",
                    "INTERVIEW TIPS:",
                ],
            )

            questions = ResponseParser.parse_list(
                sections["QUESTIONS:"]
            )

            expected_answers = ResponseParser.parse_list(
                sections["EXPECTED ANSWERS:"]
            )

            interview_tips = ResponseParser.parse_list(
                sections["INTERVIEW TIPS:"]
            )

        except Exception:

            questions = []
            expected_answers = []
            interview_tips = []

        return InterviewGenerationResponse(
            company=request.company,
            category=request.category,
            difficulty=request.difficulty,
            questions=questions,
            expected_answers=expected_answers,
            interview_tips=interview_tips,
        )