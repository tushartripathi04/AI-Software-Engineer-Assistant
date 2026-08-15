import { useState } from "react";
import {
  BookOpen,
  Check,
  Copy,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import api from "../../lib/axios";

interface ReadmeGenerationResponse {
  project_name: string;
  readme: string;
}

export default function ReadmeGenerator() {
  const [projectName, setProjectName] = useState("");
  const [techStack, setTechStack] = useState("");
  const [description, setDescription] = useState("");

  const [readme, setReadme] = useState("");
  const [copied, setCopied] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // COPY README
  // ==========================================

  const handleCopy = async () => {
    if (!readme) return;

    await navigator.clipboard.writeText(readme);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // ==========================================
  // RESET
  // ==========================================

  const handleReset = () => {
    setProjectName("");
    setTechStack("");
    setDescription("");
    setReadme("");
    setCopied(false);
    setError("");
  };

  // ==========================================
  // GENERATE README
  // ==========================================

  const handleGenerate = async () => {
    if (
      !projectName.trim() ||
      !techStack.trim() ||
      !description.trim()
    ) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post<ReadmeGenerationResponse>(
        "/readme/generate",
        {
          project_name: projectName,
          tech_stack: techStack,
          description,
        }
      );

      setReadme(response.data.readme);
    } catch (error: any) {
      console.error("README generation failed:", error);

      setError(
        error?.response?.data?.detail ||
          "Failed to generate README. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        flex h-full min-h-0 flex-col
        bg-primary text-primary
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
            <BookOpen
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
              README Generator
            </h1>

            <p
              className="
                mt-1 text-sm
                text-secondary
              "
            >
              Generate professional README documentation for your projects
              using AI.
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
            grid max-w-7xl
            gap-6
            lg:grid-cols-2
          "
        >

          {/* ==========================================
              LEFT PANEL
          ========================================== */}

          <div
            className="
              rounded-2xl
              border border-theme
              bg-secondary
              p-6
              shadow-sm
            "
          >

            {/* Section Header */}

            <div className="mb-6 flex items-center gap-3">

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
                Project Information
              </h2>

            </div>

            {/* ==========================================
                PROJECT NAME
            ========================================== */}

            <div className="mb-6">

              <label
                className="
                  mb-2 block
                  text-sm font-medium
                  text-primary
                "
              >
                Project Name
              </label>

              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Example: AI Software Engineer Assistant"
                className="
                  w-full
                  rounded-xl
                  border border-theme
                  bg-input
                  px-4 py-3
                  text-sm
                  text-primary
                  placeholder:text-muted
                  outline-none
                  transition-all
                  focus:border-[#d4a72c]/60
                  focus:ring-1
                  focus:ring-[#d4a72c]/20
                "
              />

            </div>

            {/* ==========================================
                TECH STACK
            ========================================== */}

            <div className="mb-6">

              <label
                className="
                  mb-2 block
                  text-sm font-medium
                  text-primary
                "
              >
                Technology Stack
              </label>

              <input
                type="text"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                placeholder="Example: React, TypeScript, FastAPI, PostgreSQL, Groq"
                className="
                  w-full
                  rounded-xl
                  border border-theme
                  bg-input
                  px-4 py-3
                  text-sm
                  text-primary
                  placeholder:text-muted
                  outline-none
                  transition-all
                  focus:border-[#d4a72c]/60
                  focus:ring-1
                  focus:ring-[#d4a72c]/20
                "
              />

            </div>

            {/* ==========================================
                DESCRIPTION
            ========================================== */}

            <div className="mb-6">

              <label
                className="
                  mb-2 block
                  text-sm font-medium
                  text-primary
                "
              >
                Project Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what your project does, its main features, and its purpose..."
                rows={16}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border border-theme
                  bg-input
                  px-4 py-3
                  text-sm
                  leading-6
                  text-primary
                  placeholder:text-muted
                  outline-none
                  transition-all
                  focus:border-[#d4a72c]/60
                  focus:ring-1
                  focus:ring-[#d4a72c]/20
                "
              />

            </div>

            {/* ==========================================
                ERROR
            ========================================== */}

            {error && (
              <div
                className="
                  mb-4
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

            <div className="flex gap-3">

              {/* Generate */}

              <button
                type="button"
                onClick={handleGenerate}
                disabled={
                  !projectName.trim() ||
                  !techStack.trim() ||
                  !description.trim() ||
                  loading
                }
                className="
                  flex flex-1
                  items-center justify-center gap-2
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

                    Generating...
                  </>
                ) : (
                  <>
                    <BookOpen size={18} />
                    Generate README
                  </>
                )}
              </button>

              {/* Reset */}

              <button
                type="button"
                onClick={handleReset}
                className="
                  flex items-center
                  justify-center gap-2
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
              RIGHT PANEL
          ========================================== */}

          <div
            className="
              flex min-h-[700px]
              flex-col
              rounded-2xl
              border border-theme
              bg-secondary
            "
          >

            {/* Output Header */}

            <div
              className="
                flex items-center
                justify-between
                border-b border-theme
                px-5 py-4
              "
            >

              <div>

                <h2
                  className="
                    font-semibold
                    text-primary
                  "
                >
                  Generated README
                </h2>

                <p
                  className="
                    mt-1 text-xs
                    text-muted
                  "
                >
                  AI-generated project documentation
                </p>

              </div>

              {/* Copy */}

              <button
                type="button"
                onClick={handleCopy}
                disabled={!readme}
                className="
                  flex items-center
                  gap-2
                  rounded-lg
                  border border-theme
                  bg-tertiary
                  px-3 py-2
                  text-xs
                  text-secondary
                  transition-all
                  hover:border-[#d4a72c]/40
                  hover:text-primary
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                {copied ? (
                  <>
                    <Check size={15} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={15} />
                    Copy
                  </>
                )}
              </button>

            </div>

            {/* README Output */}

            <div
              className="
                min-h-0
                flex-1
                overflow-auto
                bg-input
                p-6
              "
            >

              {readme ? (
                <pre
                  className="
                    whitespace-pre-wrap
                    font-mono
                    text-sm
                    leading-6
                    text-primary
                  "
                >
                  {readme}
                </pre>
              ) : (
                <div
                  className="
                    flex h-full
                    min-h-[600px]
                    items-center
                    justify-center
                  "
                >

                  <div className="text-center">

                    <BookOpen
                      size={46}
                      strokeWidth={1.5}
                      className="
                        mx-auto mb-4
                        text-muted
                      "
                    />

                    <p
                      className="
                        text-sm
                        text-muted
                      "
                    >
                      Generated README will appear here.
                    </p>

                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}