from pathlib import Path


class TechnologyDetector:

    def detect(self, project_path: str):

        technologies = set()

        for file in Path(project_path).rglob("*"):

            name = file.name.lower()

            if name == "requirements.txt":
                technologies.add("Python")

            if name == "package.json":
                technologies.add("Node.js")

            if name == "pom.xml":
                technologies.add("Java")

            if name == "build.gradle":
                technologies.add("Spring Boot")

            if name == "dockerfile":
                technologies.add("Docker")

            if file.suffix == ".py":
                technologies.add("Python")

            elif file.suffix in [".js", ".jsx"]:
                technologies.add("JavaScript")

            elif file.suffix in [".ts", ".tsx"]:
                technologies.add("TypeScript")

            elif file.suffix == ".java":
                technologies.add("Java")

            elif file.suffix in [".cpp", ".cc", ".cxx"]:
                technologies.add("C++")

            elif file.suffix == ".c":
                technologies.add("C")

        return sorted(list(technologies))