from pydantic import BaseModel


class ResumeGenerationRequest(BaseModel):
    project_name: str
    tech_stack: str
    description: str


class ResumeGenerationResponse(BaseModel):
    project_name: str
    resume_description: str
    linkedin_description: str
    portfolio_description: str
    ats_bullet_points: list[str]