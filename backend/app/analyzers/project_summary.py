class ProjectSummary:

    def create_summary(
        self,
        scan_result,
        technologies,
        parsed_files,
    ):

        summary = []

        summary.append(
            f"Project Name: {scan_result['project_name']}"
        )

        summary.append(
            f"Total Files: {scan_result['total_files']}"
        )

        summary.append(
            f"Total Folders: {scan_result['total_folders']}"
        )

        summary.append(
            f"Total Lines: {scan_result['total_lines']}"
        )

        summary.append(
            "Technologies: "
            + ", ".join(technologies)
        )

        summary.append("\nImportant Files:\n")

        for file in parsed_files[:10]:

            summary.append(
                f"File: {file['path']}"
            )

            summary.append(
                file["content"][:500]
            )

            summary.append("\n")

        return "\n".join(summary)