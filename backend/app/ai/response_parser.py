class ResponseParser:

    @staticmethod
    def split_sections(
        response: str,
        sections: list[str],
    ) -> dict:

        parsed = {}

        for i, section in enumerate(sections):

            start = response.find(section)

            if start == -1:
                parsed[section] = ""
                continue

            start += len(section)

            if i < len(sections) - 1:

                end = response.find(
                    sections[i + 1],
                    start,
                )

                if end == -1:
                    end = len(response)

            else:
                end = len(response)

            parsed[section] = response[start:end].strip()

        return parsed

    @staticmethod
    def parse_list(section: str) -> list[str]:

        return [
            line.replace("-", "").strip()
            for line in section.splitlines()
            if line.strip()
        ]