from app.ai.ai_service import AIService
from app.ai.response_parser import ResponseParser
from app.schemas.resume_generator import (
    ResumeGenerationRequest,
    ResumeGenerationResponse,
)


class ResumeGeneratorService:

    def __init__(self):
        self.ai_service = AIService()

    def generate_resume_content(
        self,
        request: ResumeGenerationRequest,
    ) -> ResumeGenerationResponse:

        system_prompt = (
            "You are an expert Resume Writer, Technical Recruiter, "
            "and LinkedIn Profile Consultant.\n\n"

            "Generate professional resume and portfolio content.\n\n"

            "Return the response EXACTLY in this format:\n\n"

            "RESUME DESCRIPTION:\n"
            "<Professional resume description>\n\n"

            "LINKEDIN DESCRIPTION:\n"
            "<Professional LinkedIn description>\n\n"

            "PORTFOLIO DESCRIPTION:\n"
            "<Professional portfolio description>\n\n"

            "ATS BULLET POINTS:\n"
            "- Bullet 1\n"
            "- Bullet 2\n"
            "- Bullet 3\n"
            "- Bullet 4\n"
            "- Bullet 5\n\n"

            "Do not use markdown code fences."
        )

        user_prompt = (
            f"Project Name: {request.project_name}\n\n"
            f"Technology Stack: {request.tech_stack}\n\n"
            f"Project Description:\n{request.description}"
        )

        response = self.ai_service.execute(
            system_prompt=system_prompt,
            user_prompt=user_prompt,
        )

        try:

            sections = ResponseParser.split_sections(
                response,
                [
                    "RESUME DESCRIPTION:",
                    "LINKEDIN DESCRIPTION:",
                    "PORTFOLIO DESCRIPTION:",
                    "ATS BULLET POINTS:",
                ],
            )

            resume_description = sections["RESUME DESCRIPTION:"]

            linkedin_description = sections[
                "LINKEDIN DESCRIPTION:"
            ]

            portfolio_description = sections[
                "PORTFOLIO DESCRIPTION:"
            ]

            ats_bullet_points = ResponseParser.parse_list(
                sections["ATS BULLET POINTS:"]
            )

        except Exception:

            resume_description = response
            linkedin_description = ""
            portfolio_description = ""
            ats_bullet_points = []

        return ResumeGenerationResponse(
            project_name=request.project_name,
            resume_description=resume_description,
            linkedin_description=linkedin_description,
            portfolio_description=portfolio_description,
            ats_bullet_points=ats_bullet_points,
        )