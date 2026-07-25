from pydantic import BaseModel


class APIGenerationRequest(BaseModel):
    framework: str
    prompt: str


class APIGenerationResponse(BaseModel):
    framework: str
    models: str
    schemas: str
    repository: str
    service: str
    routes: str
    explanation: str