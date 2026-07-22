from app.ai.ai_service import AIService
from app.ai.response_parser import ResponseParser
from app.schemas.test_case import (
    TestCaseRequest,
    TestCaseResponse,
)


class TestCaseService:

    def __init__(self):
        self.ai_service = AIService()

    def generate_test_cases(
        self,
        request: TestCaseRequest,
    ) -> TestCaseResponse:

        system_prompt = (
            "You are a Senior Software Test Engineer.\n\n"

            "Generate professional unit test cases for the given code.\n\n"

            "Choose the most appropriate testing framework based on the programming language.\n"
            "Examples:\n"
            "- Python -> pytest\n"
            "- Java -> JUnit\n"
            "- JavaScript -> Jest\n"
            "- C# -> xUnit\n"
            "- C++ -> GoogleTest\n\n"

            "Return the response EXACTLY in this format:\n\n"

            "FRAMEWORK:\n"
            "<framework name>\n\n"

            "TEST CASES:\n"
            "<complete test code>\n\n"

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
                    "FRAMEWORK:",
                    "TEST CASES:",
                ],
            )

            framework = sections["FRAMEWORK:"]
            test_cases = sections["TEST CASES:"]

        except Exception:

            framework = "Unknown"
            test_cases = response

        return TestCaseResponse(
            framework=framework,
            test_cases=test_cases,
        )