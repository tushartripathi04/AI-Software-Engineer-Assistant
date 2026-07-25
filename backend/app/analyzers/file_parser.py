from pathlib import Path


class FileParser:

    SUPPORTED_EXTENSIONS = {
        ".py",
        ".js",
        ".ts",
        ".tsx",
        ".jsx",
        ".java",
        ".cpp",
        ".c",
        ".h",
        ".hpp",
        ".json",
        ".yaml",
        ".yml",
        ".md",
        ".txt",
    }

    def parse(self, project_path: str):

        parsed_files = []

        for file in Path(project_path).rglob("*"):

            if not file.is_file():
                continue

            if file.suffix.lower() not in self.SUPPORTED_EXTENSIONS:
                continue

            try:

                with open(
                    file,
                    "r",
                    encoding="utf-8",
                    errors="ignore",
                ) as f:

                    content = f.read()

                parsed_files.append(
                    {
                        "path": str(file),
                        "extension": file.suffix,
                        "size": len(content),
                        "content": content[:3000],   # Limit tokens
                    }
                )

            except Exception:
                pass

        return parsed_files