from pydantic import BaseModel


class ReadmeGenerationRequest(BaseModel):
    project_name: str
    tech_stack: str
    description: str


class ReadmeGenerationResponse(BaseModel):
    project_name: str
    readme: str