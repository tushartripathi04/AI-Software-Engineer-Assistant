from pydantic import BaseModel


class DocumentationRequest(BaseModel):
    language: str
    code: str


class DocumentationResponse(BaseModel):
    overview: str
    purpose: str
    parameters: str
    returns: str
    time_complexity: str
    space_complexity: str
    example: str
    best_practices: str