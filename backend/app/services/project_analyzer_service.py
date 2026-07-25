from app.ai.ai_service import AIService
from app.ai.response_parser import ResponseParser

from app.analyzers.project_scanner import (
    ProjectScanner,
)
from app.analyzers.tech_detector import (
    TechnologyDetector,
)
from app.analyzers.file_parser import (
    FileParser,
)
from app.analyzers.project_summary import (
    ProjectSummary,
)

from app.schemas.project_analyzer import (
    ProjectAnalysisResponse,
)


class ProjectAnalyzerService:

    def __init__(self):

        self.ai_service = AIService()

        self.project_scanner = ProjectScanner()

        self.tech_detector = TechnologyDetector()

        self.file_parser = FileParser()

        self.project_summary = ProjectSummary()

    def analyze_project(
        self,
        project_path: str,
    ) -> ProjectAnalysisResponse:

        scan_result = self.project_scanner.scan(
            project_path
        )

        technologies = self.tech_detector.detect(
            project_path
        )

        parsed_files = self.file_parser.parse(
            project_path
        )

        summary = self.project_summary.create_summary(
            scan_result,
            technologies,
            parsed_files,
        )

        system_prompt = (
            "You are a Senior Software Architect.\n\n"

            "Analyze the software project summary.\n\n"

            "Return EXACTLY in this format:\n\n"

            "LANGUAGE:\n"
            "<language>\n\n"

            "FRAMEWORK:\n"
            "<framework>\n\n"

            "ARCHITECTURE:\n"
            "<architecture>\n\n"

            "RECOMMENDATIONS:\n"
            "- recommendation 1\n"
            "- recommendation 2\n"
            "- recommendation 3\n\n"

            "Do not use markdown."
        )

        response = self.ai_service.execute(
            system_prompt=system_prompt,
            user_prompt=summary,
        )

        language = "Unknown"
        framework = "Unknown"
        architecture = "Unknown"
        recommendations = []

        try:

            sections = ResponseParser.split_sections(
                response,
                [
                    "LANGUAGE:",
                    "FRAMEWORK:",
                    "ARCHITECTURE:",
                    "RECOMMENDATIONS:",
                ],
            )

            language = sections["LANGUAGE:"].strip()

            framework = sections["FRAMEWORK:"].strip()

            architecture = sections["ARCHITECTURE:"].strip()

            recommendations = ResponseParser.parse_list(
                sections["RECOMMENDATIONS:"]
            )

        except Exception:
            pass

        return ProjectAnalysisResponse(
            project_name=scan_result["project_name"],
            language=language,
            framework=framework,
            architecture=architecture,
            total_files=scan_result["total_files"],
            total_lines=scan_result["total_lines"],
            technologies=technologies,
            recommendations=recommendations,
        )