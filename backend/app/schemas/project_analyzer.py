from pydantic import BaseModel
from typing import List


class ProjectAnalysisResponse(BaseModel):
    project_name: str
    language: str
    framework: str
    architecture: str
    total_files: int
    total_lines: int
    technologies: List[str]
    recommendations: List[str]