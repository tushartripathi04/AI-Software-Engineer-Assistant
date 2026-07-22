from pydantic import BaseModel
from typing import List


class CodeReviewRequest(BaseModel):
    language: str
    code: str


class CodeReviewResponse(BaseModel):
    summary: str
    issues: List[str]
    suggestions: List[str]
    optimized_code: str