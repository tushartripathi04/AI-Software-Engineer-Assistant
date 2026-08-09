import { useState } from "react";
import {
  Check,
  Code2,
  Copy,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import api from "../../lib/axios";
interface CodeExplainerResponse {
  overview: string;
  line_by_line: string;
  algorithm: string;
  time_complexity: string;
  space_complexity: string;
  real_world_use: string;
  improvements: string;
}

const languages = [
  "C++",
  "C",
  "Java",
  "Python",
  "JavaScript",
  "TypeScript",
  "Go",
  "Rust",
];

export default function CodeExplainer() {
  const [language, setLanguage] = useState("C++");
  const [code, setCode] = useState("");

  const [overview, setOverview] = useState("");
  const [lineByLine, setLineByLine] = useState("");
  const [algorithm, setAlgorithm] = useState("");
  const [timeComplexity, setTimeComplexity] = useState("");
  const [spaceComplexity, setSpaceComplexity] = useState("");
  const [realWorldUse, setRealWorldUse] = useState("");
  const [improvements, setImprovements] = useState("");

  const [copied, setCopied] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleCopy = async () => {
    const text = `
Overview:
${overview}

Line by Line:
${lineByLine}

Algorithm:
${algorithm}

Time Complexity:
${timeComplexity}

Space Complexity:
${spaceComplexity}

Real World Use:
${realWorldUse}

Improvements:
${improvements}
`;

    if (!text.trim()) return;

    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleReset = () => {
    setLanguage("C++");
    setCode("");

    setOverview("");
    setLineByLine("");
    setAlgorithm("");
    setTimeComplexity("");
    setSpaceComplexity("");
    setRealWorldUse("");
    setImprovements("");

    setCopied(false);
    setError("");
  };
  const handleExplain = async () => {
  if (!code.trim()) {
    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await api.post<CodeExplainerResponse>(
      "/code-explainer/explain",
      {
        language,
        code,
      }
    );

    const data = response.data;

    setOverview(data.overview);
    setLineByLine(data.line_by_line);
    setAlgorithm(data.algorithm);
    setTimeComplexity(data.time_complexity);
    setSpaceComplexity(data.space_complexity);
    setRealWorldUse(data.real_world_use);
    setImprovements(data.improvements);
  } catch (error: any) {
    console.error(
      "Code explanation failed:",
      error
    );

    setError(
      error?.response?.data?.detail ||
        "Failed to explain the code. Please try again."
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
            <Code2 size={24} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Code Explainer
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Understand your code, algorithms, complexity,
              real-world usage, and possible improvements using AI.
            </p>
          </div>

        </div>

      </div>

      {/* Main */}
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
                Code to Explain
              </h2>

            </div>

            {/* Language */}
            <div className="mb-6">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Programming Language
              </label>

              <select
                value={language}
                onChange={(e) =>
                  setLanguage(e.target.value)
                }
                className="
                  w-full rounded-xl border border-slate-700
                  bg-slate-950 px-4 py-3
                  text-sm text-white
                  outline-none transition
                  focus:border-blue-500
                  focus:ring-1 focus:ring-blue-500
                "
              >
                {languages.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

            </div>

            {/* Code */}
            <div className="mb-6">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Paste Your Code
              </label>

              <textarea
                value={code}
                onChange={(e) =>
                  setCode(e.target.value)
                }
                placeholder="Paste the code you want to understand..."
                rows={20}
                className="
                  w-full resize-none rounded-xl border border-slate-700
                  bg-slate-950 px-4 py-3
                  font-mono text-sm leading-6 text-white
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
  onClick={handleExplain}
  disabled={!code.trim() || loading}
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
      Explaining...
    </>
  ) : (
    <>
      <Sparkles size={18} />
      Explain Code
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
          <div className="flex flex-col gap-5">

            {/* Generated Explanation */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60">

              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

                <div>
                  <h2 className="font-semibold text-white">
                    Code Explanation
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    AI-generated technical explanation
                  </p>
                </div>

                <button
                  type="button"
                  disabled={!overview}
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

            </div>

            {/* Overview */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Overview
              </h2>

              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
                {overview ||
                  "A high-level explanation of your code will appear here."}
              </p>

            </div>

            {/* Line by Line */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Line-by-Line Explanation
              </h2>

              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
                {lineByLine ||
                  "A detailed line-by-line explanation will appear here."}
              </p>

            </div>

            {/* Algorithm */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Algorithm
              </h2>

              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
                {algorithm ||
                  "The algorithm and approach will appear here."}
              </p>

            </div>

            {/* Complexity */}
            <div className="grid gap-5 sm:grid-cols-2">

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

                <h2 className="mb-3 font-semibold text-white">
                  Time Complexity
                </h2>

                <p className="text-sm font-medium text-blue-400">
                  {timeComplexity || "—"}
                </p>

              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

                <h2 className="mb-3 font-semibold text-white">
                  Space Complexity
                </h2>

                <p className="text-sm font-medium text-blue-400">
                  {spaceComplexity || "—"}
                </p>

              </div>

            </div>

            {/* Real World Use */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Real-World Use
              </h2>

              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
                {realWorldUse ||
                  "Real-world applications of this code will appear here."}
              </p>

            </div>

            {/* Improvements */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Possible Improvements
              </h2>

              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
                {improvements ||
                  "Potential optimizations and improvements will appear here."}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}