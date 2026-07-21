from app.ai.ai_service import AIService

ai = AIService()

response = ai.chat(
    "Explain Dependency Injection in FastAPI."
)

print(response)