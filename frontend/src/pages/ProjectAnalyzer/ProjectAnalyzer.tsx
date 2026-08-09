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
  };

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
    <div className="flex h-full min-h-0 flex-col bg-slate-950">

      {/* Header */}
      <div className="shrink-0 border-b border-slate-800 px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 p-3">
            <FolderSearch size={24} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Project Analyzer
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Upload your project ZIP and let AI analyze its architecture,
              technologies, and structure.
            </p>
          </div>

        </div>

      </div>

      {/* Main Content */}
      <div className="min-h-0 flex-1 overflow-y-auto p-6 lg:p-8">

        <div className="mx-auto max-w-7xl space-y-6">

          {/* Upload Section */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

            <div className="mb-5 flex items-center gap-3">

              <Sparkles
                size={20}
                className="text-blue-400"
              />

              <h2 className="text-lg font-semibold text-white">
                Upload Project
              </h2>

            </div>

            <label
              htmlFor="project-upload"
              className="
                flex cursor-pointer flex-col items-center
                justify-center rounded-2xl border-2
                border-dashed border-slate-700
                bg-slate-950/60 px-6 py-12
                transition
                hover:border-blue-500
                hover:bg-slate-950
              "
            >

              <div className="mb-4 rounded-full bg-blue-500/10 p-4">
                <Upload
                  size={30}
                  className="text-blue-400"
                />
              </div>

              <p className="text-sm font-medium text-white">
                Click to upload your project
              </p>

              <p className="mt-2 text-xs text-slate-500">
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

            {/* Selected File */}
            {file && (
              <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950 px-4 py-4">

                <div className="flex items-center gap-3">

                  <div className="rounded-lg bg-violet-500/10 p-2">
                    <FileArchive
                      size={20}
                      className="text-violet-400"
                    />
                  </div>

                  <div>

                    <p className="text-sm font-medium text-white">
                      {file.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>

                  </div>

                </div>

                <CheckCircle2
                  size={20}
                  className="text-emerald-400"
                />

              </div>
            )}

            {/* Buttons */}
            <div className="mt-6 flex gap-3">

              <button
  type="button"
  onClick={handleAnalyze}
  disabled={!file || loading}
  className="
    flex flex-1 items-center justify-center gap-2
    rounded-xl px-5 py-3
    text-sm font-semibold text-white
    transition
    disabled:cursor-not-allowed
    disabled:opacity-40
    bg-gradient-to-r from-blue-600 to-indigo-600
    hover:from-blue-500
    hover:to-indigo-500
  "
>
  {loading ? (
    <>
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      Analyzing...
    </>
  ) : (
    <>
      <FolderSearch size={18} />
      Analyze Project
    </>
  )}
</button>
{error && (
  <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
    {error}
  </div>
)}

              <button
                type="button"
                onClick={handleReset}
                className="
                  flex items-center justify-center gap-2
                  rounded-xl border border-slate-700
                  bg-slate-900 px-5 py-3
                  text-sm font-medium text-slate-300
                  transition
                  hover:bg-slate-800
                  hover:text-white
                "
              >
                <RotateCcw size={17} />
                Reset
              </button>

            </div>

          </div>

          {/* Analysis Results */}
          <div className="grid gap-6 lg:grid-cols-2">

            {/* Project Overview */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

              <div className="mb-5 flex items-center gap-3">

                <FolderSearch
                  size={20}
                  className="text-blue-400"
                />

                <h2 className="text-lg font-semibold text-white">
                  Project Overview
                </h2>

              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <div className="rounded-xl bg-slate-950 p-4">
                  <p className="text-xs text-slate-500">
                    Project Name
                  </p>

                  <p className="mt-2 text-sm font-medium text-white">
                    {projectName || "Not analyzed yet"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-950 p-4">
                  <p className="text-xs text-slate-500">
                    Language
                  </p>

                  <p className="mt-2 text-sm font-medium text-white">
                    {language || "Not analyzed yet"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-950 p-4">
                  <p className="text-xs text-slate-500">
                    Framework
                  </p>

                  <p className="mt-2 text-sm font-medium text-white">
                    {framework || "Not analyzed yet"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-950 p-4">
                  <p className="text-xs text-slate-500">
                    Architecture
                  </p>

                  <p className="mt-2 text-sm font-medium text-white">
                    {architecture || "Not analyzed yet"}
                  </p>
                </div>

              </div>

            </div>

            {/* Project Statistics */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

              <div className="mb-5 flex items-center gap-3">

                <Sparkles
                  size={20}
                  className="text-violet-400"
                />

                <h2 className="text-lg font-semibold text-white">
                  Project Statistics
                </h2>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-slate-950 p-5">

                  <p className="text-xs text-slate-500">
                    Total Files
                  </p>

                  <p className="mt-2 text-2xl font-bold text-white">
                    {totalFiles ?? "--"}
                  </p>

                </div>

                <div className="rounded-xl bg-slate-950 p-5">

                  <p className="text-xs text-slate-500">
                    Total Lines
                  </p>

                  <p className="mt-2 text-2xl font-bold text-white">
                    {totalLines ?? "--"}
                  </p>

                </div>

              </div>

            </div>

            {/* Technologies */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

              <h2 className="mb-4 text-lg font-semibold text-white">
                Technologies
              </h2>

              {technologies.length > 0 ? (
                <div className="flex flex-wrap gap-2">

                  {technologies.map((technology) => (
                    <span
                      key={technology}
                      className="
                        rounded-full border border-blue-500/20
                        bg-blue-500/10 px-3 py-2
                        text-xs font-medium text-blue-300
                      "
                    >
                      {technology}
                    </span>
                  ))}

                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  Technologies will appear after analysis.
                </p>
              )}

            </div>

            {/* Recommendations */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

              <h2 className="mb-4 text-lg font-semibold text-white">
                Recommendations
              </h2>

              {recommendations.length > 0 ? (
                <ul className="space-y-3">

                  {recommendations.map(
                    (recommendation, index) => (
                      <li
                        key={index}
                        className="
                          rounded-xl bg-slate-950
                          px-4 py-3 text-sm
                          leading-6 text-slate-400
                        "
                      >
                        {recommendation}
                      </li>
                    )
                  )}

                </ul>
              ) : (
                <p className="text-sm text-slate-500">
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