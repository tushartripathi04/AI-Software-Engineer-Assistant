from pydantic import BaseModel


class ComplexityRequest(BaseModel):
    language: str
    code: str


class ComplexityResponse(BaseModel):
    time_complexity: str
    space_complexity: str
    explanation: str
    bottlenecks: str
    optimizations: str
    alternative_approach: str