from app.ai.ai_service import AIService
from app.ai.response_parser import ResponseParser
from app.schemas.diagram_generator import (
    DiagramGenerationRequest,
    DiagramGenerationResponse,
)


class DiagramGeneratorService:

    def __init__(self):
        self.ai_service = AIService()

    def generate_diagram(
        self,
        request: DiagramGenerationRequest,
    ) -> DiagramGenerationResponse:

        system_prompt = (
            "You are an expert Software Architect and UML Designer.\n\n"

            "Generate the requested software engineering diagram in Mermaid syntax.\n\n"

            "Supported diagram types include:\n"
            "- class\n"
            "- sequence\n"
            "- activity\n"
            "- flowchart\n"
            "- er\n"
            "- state\n"
            "- component\n"
            "- deployment\n\n"

            "Return the response EXACTLY in this format:\n\n"

            "MERMAID CODE:\n"
            "<Mermaid diagram>\n\n"

            "EXPLANATION:\n"
            "<Diagram explanation>\n\n"

            "DESIGN NOTES:\n"
            "<Architecture and design recommendations>\n\n"

            "Do not use markdown code fences."
        )

        user_prompt = (
            f"Diagram Type: {request.diagram_type}\n\n"
            f"Requirement:\n{request.prompt}"
        )

        response = self.ai_service.execute(
            system_prompt=system_prompt,
            user_prompt=user_prompt,
        )

        try:

            sections = ResponseParser.split_sections(
                response,
                [
                    "MERMAID CODE:",
                    "EXPLANATION:",
                    "DESIGN NOTES:",
                ],
            )

            mermaid_code = sections["MERMAID CODE:"]
            explanation = sections["EXPLANATION:"]
            design_notes = sections["DESIGN NOTES:"]

        except Exception:

            mermaid_code = response
            explanation = ""
            design_notes = ""

        return DiagramGenerationResponse(
            diagram_type=request.diagram_type,
            mermaid_code=mermaid_code,
            explanation=explanation,
            design_notes=design_notes,
        )