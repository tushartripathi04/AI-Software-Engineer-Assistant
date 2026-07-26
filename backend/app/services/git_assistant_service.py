from app.ai.ai_service import AIService

from app.schemas.git_assistant import (
    GitAssistantRequest,
    GitAssistantResponse,
)


class GitAssistantService:

    def __init__(self):
        self.ai_service = AIService()

    def generate(
        self,
        request: GitAssistantRequest,
    ) -> GitAssistantResponse:

        task_prompts = {
            "commit": (
                "Generate a professional Git commit message "
                "following the Conventional Commits specification."
            ),
            "pull_request": (
                "Generate a professional GitHub Pull Request description "
                "with Summary, Changes, Testing, and Notes."
            ),
            "release_notes": (
                "Generate professional software release notes."
            ),
        }

        system_prompt = (
            "You are an experienced Software Engineer and Git expert.\n\n"
            + task_prompts[request.task]
            + "\n\n"
            "Return only the final result without markdown code fences."
        )

        response = self.ai_service.execute(
            system_prompt=system_prompt,
            user_prompt=request.description,
        )

        return GitAssistantResponse(
            task=request.task,
            result=response.strip(),
        )