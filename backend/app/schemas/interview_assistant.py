from pydantic import BaseModel
from typing import List


class InterviewGenerationRequest(BaseModel):
    company: str
    category: str
    difficulty: str


class InterviewGenerationResponse(BaseModel):
    company: str
    category: str
    difficulty: str
    questions: List[str]
    expected_answers: List[str]
    interview_tips: List[str]