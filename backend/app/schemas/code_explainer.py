from pydantic import BaseModel


class CodeExplainerRequest(BaseModel):
    language: str
    code: str


class CodeExplainerResponse(BaseModel):
    overview: str
    line_by_line: str
    algorithm: str
    time_complexity: str
    space_complexity: str
    real_world_use: str
    improvements: str