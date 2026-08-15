import { useState } from "react";
import {
  Check,
  Copy,
  GitBranch,
  GitPullRequest,
  FileText,
  RotateCcw,
  Sparkles,
  Tag,
} from "lucide-react";

import api from "../../lib/axios";

interface GitAssistantResponse {
  task: string;
  result: string;
}

const tasks = [
  {
    value: "commit",
    label: "Commit Message",
    description: "Generate a clean Git commit message.",
    icon: GitBranch,
  },
  {
    value: "pull_request",
    label: "Pull Request",
    description: "Generate a professional pull request description.",
    icon: GitPullRequest,
  },
  {
    value: "release_notes",
    label: "Release Notes",
    description: "Generate structured release notes.",
    icon: Tag,
  },
] as const;

type GitTask = (typeof tasks)[number]["value"];

export default function GitAssistant() {
  const [task, setTask] = useState<GitTask>("commit");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");

  const [copied, setCopied] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedTask = tasks.find(
    (item) => item.value === task
  );

  // ==========================================
  // COPY RESULT
  // ==========================================

  const handleCopy = async () => {
    if (!result) return;

    await navigator.clipboard.writeText(result);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // ==========================================
  // RESET
  // ==========================================

  const handleReset = () => {
    setTask("commit");
    setDescription("");
    setResult("");
    setCopied(false);
    setError("");
  };

  // ==========================================
  // GENERATE
  // ==========================================

  const handleGenerate = async () => {
    if (!description.trim()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response =
        await api.post<GitAssistantResponse>(
          "/git/generate",
          {
            task,
            description: description.trim(),
          }
        );

      setResult(response.data.result);
    } catch (error: any) {
      console.error(
        "Git content generation failed:",
        error
      );

      setError(
        error?.response?.data?.detail ||
          "Failed to generate Git content. Please try again."
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
            <GitBranch
              size={24}
              strokeWidth={1.8}
              className="text-[#d4a72c]"
            />
          </div>

          {/* Heading */}

          <div>
            <h1
              className="
                text-2xl font-bold
                tracking-tight
                text-primary
              "
            >
              Git Assistant
            </h1>

            <p
              className="
                mt-1 text-sm
                text-secondary
              "
            >
              Generate professional commit messages,
              pull requests, and release notes using AI.
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
          p-6 lg:p-8
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
            "
          >

            {/* Panel Header */}

            <div
              className="
                mb-6
                flex items-center gap-3
              "
            >
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
                Git Task
              </h2>
            </div>

            {/* ==========================================
                TASK SELECTION
            ========================================== */}

            <div className="mb-6">

              <label
                className="
                  mb-3 block
                  text-sm font-medium
                  text-secondary
                "
              >
                What do you want to generate?
              </label>

              <div className="space-y-3">

                {tasks.map((item) => {
                  const Icon = item.icon;

                  const isSelected =
                    task === item.value;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() =>
                        setTask(item.value)
                      }
                      className={`
                        flex w-full items-start
                        gap-4 rounded-xl
                        border p-4
                        text-left
                        transition-all duration-200

                        ${
                          isSelected
                            ? "border-[#d4a72c]/50 bg-[#d4a72c]/10"
                            : "border-theme bg-input hover:border-[#d4a72c]/30 hover:bg-tertiary"
                        }
                      `}
                    >

                      {/* Task Icon */}

                      <div
                        className={`
                          rounded-lg p-2
                          transition-colors

                          ${
                            isSelected
                              ? "bg-[#d4a72c]/15"
                              : "bg-tertiary"
                          }
                        `}
                      >
                        <Icon
                          size={20}
                          strokeWidth={1.8}
                          className={
                            isSelected
                              ? "text-[#d4a72c]"
                              : "text-secondary"
                          }
                        />
                      </div>

                      {/* Task Information */}

                      <div className="min-w-0">

                        <p
                          className="
                            text-sm font-semibold
                            text-primary
                          "
                        >
                          {item.label}
                        </p>

                        <p
                          className="
                            mt-1 text-xs
                            leading-5
                            text-muted
                          "
                        >
                          {item.description}
                        </p>

                      </div>

                    </button>
                  );
                })}

              </div>
            </div>

            {/* ==========================================
                DESCRIPTION
            ========================================== */}

            <div className="mb-6">

              <label
                className="
                  mb-2 block
                  text-sm font-medium
                  text-secondary
                "
              >
                Change Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder={
                  task === "commit"
                    ? "Example: Added authentication middleware and protected dashboard routes..."
                    : task === "pull_request"
                    ? "Example: Implemented Git Assistant UI and connected it to the FastAPI backend..."
                    : "Example: Added Git Assistant, Complexity Analyzer, and Code Explainer features..."
                }
                rows={14}
                className="
                  w-full resize-none
                  rounded-xl
                  border border-theme
                  bg-input
                  px-4 py-3
                  text-sm leading-6
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
                BUTTONS
            ========================================== */}

            <div className="flex gap-3">

              {/* Generate */}

              <button
                type="button"
                onClick={handleGenerate}
                disabled={
                  !description.trim() ||
                  loading
                }
                className="
                  flex flex-1
                  items-center justify-center
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

                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />

                    Generate{" "}
                    {selectedTask?.label}
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

            {/* Error */}

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

          </div>

          {/* ==========================================
              RIGHT PANEL
          ========================================== */}

          <div
            className="
              rounded-2xl
              border border-theme
              bg-secondary
            "
          >

            {/* Result Header */}

            <div
              className="
                flex items-center
                justify-between
                border-b border-theme
                px-5 py-4
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
                  <FileText
                    size={18}
                    strokeWidth={1.8}
                    className="text-[#d4a72c]"
                  />
                </div>

                <div>

                  <h2
                    className="
                      font-semibold
                      text-primary
                    "
                  >
                    Generated Result
                  </h2>

                  <p
                    className="
                      mt-1 text-xs
                      text-muted
                    "
                  >
                    {selectedTask?.label}
                  </p>

                </div>

              </div>

              {/* Copy */}

              <button
                type="button"
                disabled={!result}
                onClick={handleCopy}
                className="
                  flex items-center
                  gap-2 rounded-lg
                  border border-theme
                  bg-input
                  px-3 py-2
                  text-xs
                  text-secondary
                  transition-all
                  hover:border-[#d4a72c]/40
                  hover:bg-tertiary
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

            {/* Result Content */}

            <div className="p-6">

              {result ? (
                <div
                  className="
                    rounded-xl
                    border border-theme
                    bg-input
                    p-5
                  "
                >
                  <pre
                    className="
                      whitespace-pre-wrap
                      font-mono
                      text-sm
                      leading-7
                      text-secondary
                    "
                  >
                    {result}
                  </pre>
                </div>
              ) : (
                <div
                  className="
                    flex min-h-[450px]
                    flex-col
                    items-center
                    justify-center
                    text-center
                  "
                >

                  <div
                    className="
                      mb-5
                      rounded-full
                      border border-[#d4a72c]/20
                      bg-[#1b1810]
                      p-5
                    "
                  >
                    <GitBranch
                      size={42}
                      strokeWidth={1.6}
                      className="text-[#d4a72c]"
                    />
                  </div>

                  <h3
                    className="
                      text-lg font-semibold
                      text-primary
                    "
                  >
                    Ready to generate
                  </h3>

                  <p
                    className="
                      mt-2 max-w-md
                      text-sm leading-6
                      text-muted
                    "
                  >
                    Select a Git task, describe your
                    changes, and AI will generate
                    professional Git content for
                    your project.
                  </p>

                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}