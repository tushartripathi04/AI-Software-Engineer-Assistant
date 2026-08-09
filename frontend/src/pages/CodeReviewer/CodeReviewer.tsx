import { useState } from "react";
import {
  Check,
  Code2,
  Copy,
  RotateCcw,
  SearchCheck,
  Sparkles,
} from "lucide-react";
import api from "../../lib/axios";
interface CodeReviewResponse {
  summary: string;
  issues: string[];
  suggestions: string[];
  optimized_code: string;
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

export default function CodeReviewer() {
  const [language, setLanguage] = useState("C++");
  const [code, setCode] = useState("");
  const [summary, setSummary] = useState("");
  const [issues, setIssues] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [optimizedCode, setOptimizedCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReview = async () => {
  if (!code.trim()) return;

  setLoading(true);
  setError("");

  try {
    const response = await api.post<CodeReviewResponse>(
      "/review/code",
      {
        language,
        code,
      }
    );

    setSummary(response.data.summary);
    setIssues(response.data.issues);
    setSuggestions(response.data.suggestions);
    setOptimizedCode(response.data.optimized_code);
  } catch (error: any) {
    console.error("Code review failed:", error);

    setError(
      error?.response?.data?.detail ||
        "Failed to review code. Please try again."
    );
  } finally {
    setLoading(false);
  }
};
  const handleCopy = async () => {
    if (!optimizedCode) return;

    await navigator.clipboard.writeText(optimizedCode);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleReset = () => {
    setCode("");
    setSummary("");
    setIssues([]);
    setSuggestions([]);
    setOptimizedCode("");
    setCopied(false);
    setError("");
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-slate-950">

      {/* Header */}
      <div className="shrink-0 border-b border-slate-800 px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 p-3">
            <SearchCheck size={24} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Code Reviewer
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Analyze your code for issues, quality, performance, and improvements.
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
              <Sparkles size={20} className="text-blue-400" />

              <h2 className="text-lg font-semibold text-white">
                Code to Review
              </h2>
            </div>

            {/* Language */}
            <div className="mb-6">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Programming Language
              </label>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="
                  w-full rounded-xl border border-slate-700
                  bg-slate-950 px-4 py-3
                  text-sm text-white outline-none
                  transition
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
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste the code you want the AI to review..."
                rows={18}
                className="
                  w-full resize-none rounded-xl border border-slate-700
                  bg-slate-950 px-4 py-3
                  font-mono text-sm leading-6 text-white
                  placeholder:font-sans
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
  onClick={handleReview}
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
      Reviewing...
    </>
  ) : (
    <>
      <SearchCheck size={18} />
      Review Code
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
          <div className="flex flex-col gap-6">

            {/* Summary */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <div className="mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-blue-400" />

                <h2 className="font-semibold text-white">
                  Review Summary
                </h2>
              </div>

              <p className="text-sm leading-6 text-slate-400">
                {summary ||
                  "The AI review summary will appear here after reviewing your code."}
              </p>

            </div>

            {/* Issues */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-4 font-semibold text-white">
                Issues Found
              </h2>

              {issues.length > 0 ? (
                <ul className="space-y-3">
                  {issues.map((issue, index) => (
                    <li
                      key={index}
                      className="rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-3 text-sm leading-6 text-slate-300"
                    >
                      {issue}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500">
                  No issues to display yet.
                </p>
              )}

            </div>

            {/* Suggestions */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-4 font-semibold text-white">
                Suggestions
              </h2>

              {suggestions.length > 0 ? (
                <ul className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="rounded-xl border border-blue-500/10 bg-blue-500/5 px-4 py-3 text-sm leading-6 text-slate-300"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500">
                  AI suggestions will appear here after the review.
                </p>
              )}

            </div>

            {/* Optimized Code */}
            <div className="flex min-h-[350px] flex-col rounded-2xl border border-slate-800 bg-slate-900/60">

              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

                <div>
                  <h2 className="font-semibold text-white">
                    Optimized Code
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Suggested improved implementation
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!optimizedCode}
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

              <div className="min-h-0 flex-1 overflow-auto p-5">

                {optimizedCode ? (
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-6 text-slate-300">
                    {optimizedCode}
                  </pre>
                ) : (
                  <div className="flex h-full min-h-[250px] items-center justify-center">

                    <div className="text-center">

                      <Code2
                        size={42}
                        className="mx-auto mb-4 text-slate-700"
                      />

                      <p className="text-sm text-slate-500">
                        Optimized code will appear here
                      </p>

                    </div>

                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}