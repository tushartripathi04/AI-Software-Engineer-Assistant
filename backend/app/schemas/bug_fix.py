from typing import List
from pydantic import BaseModel


class BugFixRequest(BaseModel):
    language: str
    code: str


class BugFixResponse(BaseModel):
    summary: str
    bugs: List[str]
    fixed_code: str
    explanation: str