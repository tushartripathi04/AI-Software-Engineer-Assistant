from pydantic import BaseModel


class DiagramGenerationRequest(BaseModel):
    diagram_type: str
    prompt: str


class DiagramGenerationResponse(BaseModel):
    diagram_type: str
    mermaid_code: str
    explanation: str
    design_notes: str