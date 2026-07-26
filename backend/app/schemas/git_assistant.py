from pydantic import BaseModel
from typing import Literal


class GitAssistantRequest(BaseModel):
    task: Literal[
        "commit",
        "pull_request",
        "release_notes",
    ]
    description: str


class GitAssistantResponse(BaseModel):
    task: str
    result: str