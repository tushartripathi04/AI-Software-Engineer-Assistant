import { useState } from "react";
import {
  BookOpen,
  Check,
  Code2,
  Copy,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import api from "../../lib/axios";
interface DocumentationResponse {
  overview: string;
  purpose: string;
  parameters: string;
  returns: string;
  time_complexity: string;
  space_complexity: string;
  example: string;
  best_practices: string;
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

export default function Documentation() {
  const [language, setLanguage] = useState("C++");
  const [code, setCode] = useState("");

  const [overview, setOverview] = useState("");
  const [purpose, setPurpose] = useState("");
  const [parameters, setParameters] = useState("");
  const [returns, setReturns] = useState("");
  const [timeComplexity, setTimeComplexity] = useState("");
  const [spaceComplexity, setSpaceComplexity] = useState("");
  const [example, setExample] = useState("");
  const [bestPractices, setBestPractices] = useState("");

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const documentationText = `
OVERVIEW
${overview}

PURPOSE
${purpose}

PARAMETERS
${parameters}

RETURNS
${returns}

TIME COMPLEXITY
${timeComplexity}

SPACE COMPLEXITY
${spaceComplexity}

EXAMPLE
${example}

BEST PRACTICES
${bestPractices}
`.trim();

  const handleCopy = async () => {
    if (!documentationText) return;

    await navigator.clipboard.writeText(documentationText);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleReset = () => {
    setCode("");
    setOverview("");
    setPurpose("");
    setParameters("");
    setReturns("");
    setTimeComplexity("");
    setSpaceComplexity("");
    setExample("");
    setBestPractices("");
    setCopied(false);
    setError("");
  };
  const handleGenerate = async () => {
  if (!code.trim()) return;

  setLoading(true);
  setError("");

  try {
    const response = await api.post<DocumentationResponse>(
      "/documentation/generate",
      {
        language,
        code,
      }
    );

    setOverview(response.data.overview);
    setPurpose(response.data.purpose);
    setParameters(response.data.parameters);
    setReturns(response.data.returns);
    setTimeComplexity(response.data.time_complexity);
    setSpaceComplexity(response.data.space_complexity);
    setExample(response.data.example);
    setBestPractices(response.data.best_practices);
  } catch (error: any) {
    console.error("Documentation generation failed:", error);

    setError(
      error?.response?.data?.detail ||
        "Failed to generate documentation. Please try again."
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
            <BookOpen size={24} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Documentation Generator
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Generate clear and structured documentation for your code using AI.
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
                Code to Document
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
                placeholder="Paste the code you want to document..."
                rows={20}
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
  onClick={handleGenerate}
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
      Generating...
    </>
  ) : (
    <>
      <BookOpen size={18} />
      Generate Documentation
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

            {/* Documentation Header */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="font-semibold text-white">
                    Generated Documentation
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    AI-generated technical documentation
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!documentationText}
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

              <p className="text-sm leading-6 text-slate-400">
                {overview || "Code overview will appear here."}
              </p>

            </div>

            {/* Purpose */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Purpose
              </h2>

              <p className="text-sm leading-6 text-slate-400">
                {purpose || "The purpose of the code will appear here."}
              </p>

            </div>

            {/* Parameters */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Parameters
              </h2>

              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
                {parameters || "Parameter information will appear here."}
              </p>

            </div>

            {/* Returns */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Returns
              </h2>

              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
                {returns || "Return value information will appear here."}
              </p>

            </div>

            {/* Complexity */}
            <div className="grid gap-6 sm:grid-cols-2">

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

                <h2 className="mb-3 font-semibold text-white">
                  Time Complexity
                </h2>

                <p className="font-mono text-sm text-blue-400">
                  {timeComplexity || "—"}
                </p>

              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

                <h2 className="mb-3 font-semibold text-white">
                  Space Complexity
                </h2>

                <p className="font-mono text-sm text-blue-400">
                  {spaceComplexity || "—"}
                </p>

              </div>

            </div>

            {/* Example */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Example
              </h2>

              <pre className="whitespace-pre-wrap font-mono text-sm leading-6 text-slate-400">
                {example || "Usage example will appear here."}
              </pre>

            </div>

            {/* Best Practices */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Best Practices
              </h2>

              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
                {bestPractices || "Recommended best practices will appear here."}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}