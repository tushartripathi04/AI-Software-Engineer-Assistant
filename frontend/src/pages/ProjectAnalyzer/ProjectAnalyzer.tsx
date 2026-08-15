import { useState } from "react";
import {
  CheckCircle2,
  FileArchive,
  FolderSearch,
  RotateCcw,
  Sparkles,
  Upload,
} from "lucide-react";

import api from "../../lib/axios";

interface ProjectAnalysisResponse {
  project_name: string;
  language: string;
  framework: string;
  architecture: string;
  total_files: number;
  total_lines: number;
  technologies: string[];
  recommendations: string[];
}

export default function ProjectAnalyzer() {
  const [file, setFile] = useState<File | null>(null);

  const [projectName, setProjectName] = useState("");
  const [language, setLanguage] = useState("");
  const [framework, setFramework] = useState("");
  const [architecture, setArchitecture] = useState("");

  const [totalFiles, setTotalFiles] = useState<number | null>(null);
  const [totalLines, setTotalLines] = useState<number | null>(null);

  const [technologies, setTechnologies] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // FILE SELECTION
  // ==========================================

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith(".zip")) {
      alert("Only ZIP files are supported.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
    setError("");
  };

  // ==========================================
  // RESET
  // ==========================================

  const handleReset = () => {
    setFile(null);
    setProjectName("");
    setLanguage("");
    setFramework("");
    setArchitecture("");
    setTotalFiles(null);
    setTotalLines(null);
    setTechnologies([]);
    setRecommendations([]);
    setError("");
  };

  // ==========================================
  // ANALYZE PROJECT
  // ==========================================

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await api.post<ProjectAnalysisResponse>(
        "/project/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;

      setProjectName(data.project_name);
      setLanguage(data.language);
      setFramework(data.framework);
      setArchitecture(data.architecture);
      setTotalFiles(data.total_files);
      setTotalLines(data.total_lines);
      setTechnologies(data.technologies);
      setRecommendations(data.recommendations);
    } catch (error: any) {
      console.error("Project analysis failed:", error);

      setError(
        error?.response?.data?.detail ||
          "Failed to analyze project. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        flex h-full min-h-0 flex-col
        bg-primary
        text-primary
      "
    >
      {/* ==========================================
          HEADER
      ========================================== */}

      <div
        className="
          shrink-0
          border-b border-theme
          bg-primary
          px-8 py-6
        "
      >
        <div className="flex items-center gap-4">

          {/* Icon */}

          <div
            className="
              flex h-12 w-12 shrink-0
              items-center justify-center
              rounded-xl
              border border-[#d4a72c]/20
              bg-[#1b1810]
            "
          >
            <FolderSearch
              size={24}
              strokeWidth={1.8}
              className="text-[#d4a72c]"
            />
          </div>

          {/* Title */}

          <div>
            <h1
              className="
                text-2xl font-bold
                tracking-tight
                text-primary
              "
            >
              Project Analyzer
            </h1>

            <p
              className="
                mt-1 text-sm
                text-secondary
              "
            >
              Upload your project ZIP and let AI analyze its architecture,
              technologies, and structure.
            </p>
          </div>

        </div>
      </div>

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <div
        className="
          min-h-0 flex-1
          overflow-y-auto
          bg-primary
          p-6
          lg:p-8
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
            space-y-6
          "
        >

          {/* ==========================================
              UPLOAD SECTION
          ========================================== */}

          <div
            className="
              rounded-2xl
              border border-theme
              bg-secondary
              p-6
            "
          >

            <div className="mb-5 flex items-center gap-3">

              <Sparkles
                size={20}
                strokeWidth={1.8}
                className="text-[#d4a72c]"
              />

              <h2
                className="
                  text-lg font-semibold
                  text-primary
                "
              >
                Upload Project
              </h2>

            </div>

            {/* Upload Area */}

            <label
              htmlFor="project-upload"
              className="
                flex cursor-pointer
                flex-col items-center
                justify-center
                rounded-2xl
                border-2 border-dashed
                border-theme
                bg-input
                px-6 py-12
                transition-all
                hover:border-[#d4a72c]/60
                hover:bg-tertiary
              "
            >

              <div
                className="
                  mb-4
                  rounded-full
                  border border-[#d4a72c]/20
                  bg-[#1b1810]
                  p-4
                "
              >
                <Upload
                  size={30}
                  strokeWidth={1.8}
                  className="text-[#d4a72c]"
                />
              </div>

              <p
                className="
                  text-sm font-medium
                  text-primary
                "
              >
                Click to upload your project
              </p>

              <p
                className="
                  mt-2 text-xs
                  text-muted
                "
              >
                ZIP files only
              </p>

              <input
                id="project-upload"
                type="file"
                accept=".zip"
                onChange={handleFileChange}
                className="hidden"
              />

            </label>

            {/* ==========================================
                SELECTED FILE
            ========================================== */}

            {file && (
              <div
                className="
                  mt-5
                  flex items-center
                  justify-between
                  rounded-xl
                  border border-theme
                  bg-input
                  px-4 py-4
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      rounded-lg
                      border border-[#d4a72c]/20
                      bg-[#1b1810]
                      p-2
                    "
                  >
                    <FileArchive
                      size={20}
                      strokeWidth={1.8}
                      className="text-[#d4a72c]"
                    />
                  </div>

                  <div>

                    <p
                      className="
                        text-sm font-medium
                        text-primary
                      "
                    >
                      {file.name}
                    </p>

                    <p
                      className="
                        mt-1 text-xs
                        text-muted
                      "
                    >
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>

                  </div>

                </div>

                <CheckCircle2
                  size={20}
                  strokeWidth={1.8}
                  className="text-emerald-500"
                />

              </div>
            )}

            {/* ==========================================
                ERROR
            ========================================== */}

            {error && (
              <div
                className="
                  mt-4
                  rounded-xl
                  border border-red-500/20
                  bg-red-500/10
                  px-4 py-3
                  text-sm
                  text-red-500
                "
              >
                {error}
              </div>
            )}

            {/* ==========================================
                BUTTONS
            ========================================== */}

            <div className="mt-6 flex gap-3">

              {/* Analyze */}

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={!file || loading}
                className="
                  flex flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#d4a72c]
                  px-5 py-3
                  text-sm font-semibold
                  text-[#17130a]
                  transition-all
                  hover:bg-[#e8b83a]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                {loading ? (
                  <>
                    <span
                      className="
                        h-4 w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-[#17130a]
                        border-t-transparent
                      "
                    />

                    Analyzing...
                  </>
                ) : (
                  <>
                    <FolderSearch size={18} />
                    Analyze Project
                  </>
                )}
              </button>

              {/* Reset */}

              <button
                type="button"
                onClick={handleReset}
                className="
                  flex items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border border-theme
                  bg-tertiary
                  px-5 py-3
                  text-sm font-medium
                  text-secondary
                  transition-all
                  hover:border-[#d4a72c]/40
                  hover:bg-secondary
                  hover:text-primary
                "
              >
                <RotateCcw size={17} />
                Reset
              </button>

            </div>

          </div>

          {/* ==========================================
              ANALYSIS RESULTS
          ========================================== */}

          <div className="grid gap-6 lg:grid-cols-2">

            {/* ==========================================
                PROJECT OVERVIEW
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-theme
                bg-secondary
                p-6
              "
            >

              <div className="mb-5 flex items-center gap-3">

                <FolderSearch
                  size={20}
                  strokeWidth={1.8}
                  className="text-[#d4a72c]"
                />

                <h2
                  className="
                    text-lg font-semibold
                    text-primary
                  "
                >
                  Project Overview
                </h2>

              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                {/* Project Name */}

                <div
                  className="
                    rounded-xl
                    border border-theme
                    bg-input
                    p-4
                  "
                >
                  <p
                    className="
                      text-xs
                      text-muted
                    "
                  >
                    Project Name
                  </p>

                  <p
                    className="
                      mt-2 text-sm
                      font-medium
                      text-primary
                    "
                  >
                    {projectName || "Not analyzed yet"}
                  </p>
                </div>

                {/* Language */}

                <div
                  className="
                    rounded-xl
                    border border-theme
                    bg-input
                    p-4
                  "
                >
                  <p
                    className="
                      text-xs
                      text-muted
                    "
                  >
                    Language
                  </p>

                  <p
                    className="
                      mt-2 text-sm
                      font-medium
                      text-primary
                    "
                  >
                    {language || "Not analyzed yet"}
                  </p>
                </div>

                {/* Framework */}

                <div
                  className="
                    rounded-xl
                    border border-theme
                    bg-input
                    p-4
                  "
                >
                  <p
                    className="
                      text-xs
                      text-muted
                    "
                  >
                    Framework
                  </p>

                  <p
                    className="
                      mt-2 text-sm
                      font-medium
                      text-primary
                    "
                  >
                    {framework || "Not analyzed yet"}
                  </p>
                </div>

                {/* Architecture */}

                <div
                  className="
                    rounded-xl
                    border border-theme
                    bg-input
                    p-4
                  "
                >
                  <p
                    className="
                      text-xs
                      text-muted
                    "
                  >
                    Architecture
                  </p>

                  <p
                    className="
                      mt-2 text-sm
                      font-medium
                      text-primary
                    "
                  >
                    {architecture || "Not analyzed yet"}
                  </p>
                </div>

              </div>

            </div>

            {/* ==========================================
                PROJECT STATISTICS
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-theme
                bg-secondary
                p-6
              "
            >

              <div className="mb-5 flex items-center gap-3">

                <Sparkles
                  size={20}
                  strokeWidth={1.8}
                  className="text-[#d4a72c]"
                />

                <h2
                  className="
                    text-lg font-semibold
                    text-primary
                  "
                >
                  Project Statistics
                </h2>

              </div>

              <div className="grid grid-cols-2 gap-4">

                {/* Total Files */}

                <div
                  className="
                    rounded-xl
                    border border-theme
                    bg-input
                    p-5
                  "
                >
                  <p
                    className="
                      text-xs
                      text-muted
                    "
                  >
                    Total Files
                  </p>

                  <p
                    className="
                      mt-2 text-2xl
                      font-bold
                      text-primary
                    "
                  >
                    {totalFiles ?? "--"}
                  </p>
                </div>

                {/* Total Lines */}

                <div
                  className="
                    rounded-xl
                    border border-theme
                    bg-input
                    p-5
                  "
                >
                  <p
                    className="
                      text-xs
                      text-muted
                    "
                  >
                    Total Lines
                  </p>

                  <p
                    className="
                      mt-2 text-2xl
                      font-bold
                      text-primary
                    "
                  >
                    {totalLines ?? "--"}
                  </p>
                </div>

              </div>

            </div>

            {/* ==========================================
                TECHNOLOGIES
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-theme
                bg-secondary
                p-6
              "
            >

              <h2
                className="
                  mb-4
                  text-lg font-semibold
                  text-primary
                "
              >
                Technologies
              </h2>

              {technologies.length > 0 ? (
                <div className="flex flex-wrap gap-2">

                  {technologies.map((technology) => (
                    <span
                      key={technology}
                      className="
                        rounded-full
                        border border-[#d4a72c]/25
                        bg-[#d4a72c]/10
                        px-3 py-2
                        text-xs font-medium
                        text-[#b88d1f]
                        dark:text-[#e8b83a]
                      "
                    >
                      {technology}
                    </span>
                  ))}

                </div>
              ) : (
                <p
                  className="
                    text-sm
                    text-muted
                  "
                >
                  Technologies will appear after analysis.
                </p>
              )}

            </div>

            {/* ==========================================
                RECOMMENDATIONS
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-theme
                bg-secondary
                p-6
              "
            >

              <h2
                className="
                  mb-4
                  text-lg font-semibold
                  text-primary
                "
              >
                Recommendations
              </h2>

              {recommendations.length > 0 ? (
                <ul className="space-y-3">

                  {recommendations.map(
                    (recommendation, index) => (
                      <li
                        key={index}
                        className="
                          rounded-xl
                          border border-theme
                          bg-input
                          px-4 py-3
                          text-sm
                          leading-6
                          text-secondary
                        "
                      >
                        {recommendation}
                      </li>
                    )
                  )}

                </ul>
              ) : (
                <p
                  className="
                    text-sm
                    text-muted
                  "
                >
                  Recommendations will appear after analysis.
                </p>
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}