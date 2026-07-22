from pydantic import BaseModel


class CodeGenerationRequest(BaseModel):
    language: str
    prompt: str


class CodeGenerationResponse(BaseModel):
    language: str
    generated_code: str
    explanation: str
    complexity: str