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

  const handleCopy = async () => {
    if (!result) return;

    await navigator.clipboard.writeText(result);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleReset = () => {
    setTask("commit");
    setDescription("");
    setResult("");
    setCopied(false);
    setError("");
  };
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
    <div className="flex h-full min-h-0 flex-col bg-slate-950">

      {/* Header */}
      <div className="shrink-0 border-b border-slate-800 px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 p-3">
            <GitBranch
              size={24}
              className="text-white"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Git Assistant
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Generate professional commit messages, pull requests,
              and release notes using AI.
            </p>
          </div>

        </div>

      </div>

      {/* Main Content */}
      <div className="min-h-0 flex-1 overflow-y-auto p-6 lg:p-8">

        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">

          {/* Left Panel */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

            <div className="mb-6 flex items-center gap-3">

              <Sparkles
                size={20}
                className="text-blue-400"
              />

              <h2 className="text-lg font-semibold text-white">
                Git Task
              </h2>

            </div>

            {/* Task Selection */}
            <div className="mb-6">

              <label className="mb-3 block text-sm font-medium text-slate-300">
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
                        flex w-full items-start gap-4
                        rounded-xl border p-4
                        text-left transition
                        ${
                          isSelected
                            ? "border-blue-500/50 bg-blue-500/10"
                            : "border-slate-700 bg-slate-950 hover:border-slate-600 hover:bg-slate-900"
                        }
                      `}
                    >

                      <div
                        className={`
                          rounded-lg p-2
                          ${
                            isSelected
                              ? "bg-blue-500/20"
                              : "bg-slate-800"
                          }
                        `}
                      >
                        <Icon
                          size={20}
                          className={
                            isSelected
                              ? "text-blue-400"
                              : "text-slate-400"
                          }
                        />
                      </div>

                      <div className="min-w-0">

                        <p className="text-sm font-semibold text-white">
                          {item.label}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {item.description}
                        </p>

                      </div>

                    </button>
                  );
                })}

              </div>

            </div>

            {/* Description */}
            <div className="mb-6">

              <label className="mb-2 block text-sm font-medium text-slate-300">
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
                  w-full resize-none rounded-xl border border-slate-700
                  bg-slate-950 px-4 py-3
                  text-sm leading-6 text-white
                  placeholder:text-slate-600
                  outline-none transition
                  focus:border-blue-500
                  focus:ring-1 focus:ring-blue-500
                "
              />

            </div>

            {/* Buttons */}
            <div className="flex gap-3">

              <button
  type="button"
  onClick={handleGenerate}
  disabled={!description.trim() || loading}
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
      Generating...
    </>
  ) : (
    <>
      <Sparkles size={18} />
      Generate {selectedTask?.label}
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

          {/* Right Panel */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60">

            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-violet-500/10 p-2">
                  <FileText
                    size={18}
                    className="text-violet-400"
                  />
                </div>

                <div>

                  <h2 className="font-semibold text-white">
                    Generated Result
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedTask?.label}
                  </p>

                </div>

              </div>

              <button
                type="button"
                disabled={!result}
                onClick={handleCopy}
                className="
                  flex items-center gap-2 rounded-lg
                  border border-slate-700
                  px-3 py-2 text-xs
                  text-slate-300
                  transition
                  hover:bg-slate-800
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

            <div className="p-6">

              {result ? (
                <div className="rounded-xl bg-slate-950 p-5">

                  <pre className="whitespace-pre-wrap font-mono text-sm leading-7 text-slate-300">
                    {result}
                  </pre>

                </div>
              ) : (
                <div className="flex min-h-[450px] flex-col items-center justify-center text-center">

                  <div className="mb-5 rounded-full bg-blue-500/10 p-5">

                    <GitBranch
                      size={42}
                      className="text-blue-400"
                    />

                  </div>

                  <h3 className="text-lg font-semibold text-white">
                    Ready to generate
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                    Select a Git task, describe your changes,
                    and AI will generate professional Git content
                    for your project.
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