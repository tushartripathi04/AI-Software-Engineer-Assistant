from pydantic import BaseModel


class TestCaseRequest(BaseModel):
    language: str
    code: str


class TestCaseResponse(BaseModel):
    framework: str
    test_cases: str