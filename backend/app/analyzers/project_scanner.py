from pathlib import Path


class ProjectScanner:

    def scan(self, project_path: str):

        root = Path(project_path)

        total_files = 0
        total_folders = 0
        total_lines = 0

        file_paths = []

        for item in root.rglob("*"):

            if item.is_dir():
                total_folders += 1
                continue

            total_files += 1

            file_paths.append(str(item))

            try:
                with open(
                    item,
                    "r",
                    encoding="utf-8",
                    errors="ignore",
                ) as file:

                    total_lines += len(file.readlines())

            except Exception:
                pass

        return {
            "project_name": root.name,
            "total_files": total_files,
            "total_folders": total_folders,
            "total_lines": total_lines,
            "files": file_paths,
        }