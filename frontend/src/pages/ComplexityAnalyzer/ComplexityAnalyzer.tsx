import { useState } from "react";
import {
  Check,
  Copy,
  Gauge,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import api from "../../lib/axios";
interface ComplexityResponse {
  time_complexity: string;
  space_complexity: string;
  explanation: string;
  bottlenecks: string;
  optimizations: string;
  alternative_approach: string;
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

export default function ComplexityAnalyzer() {
  const [language, setLanguage] = useState("C++");
  const [code, setCode] = useState("");

  const [timeComplexity, setTimeComplexity] = useState("");
  const [spaceComplexity, setSpaceComplexity] = useState("");
  const [explanation, setExplanation] = useState("");
  const [bottlenecks, setBottlenecks] = useState("");
  const [optimizations, setOptimizations] = useState("");
  const [alternativeApproach, setAlternativeApproach] =
    useState("");

  const [copied, setCopied] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleCopy = async () => {
    const text = `
Time Complexity:
${timeComplexity}

Space Complexity:
${spaceComplexity}

Explanation:
${explanation}

Bottlenecks:
${bottlenecks}

Optimizations:
${optimizations}

Alternative Approach:
${alternativeApproach}
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

    setTimeComplexity("");
    setSpaceComplexity("");
    setExplanation("");
    setBottlenecks("");
    setOptimizations("");
    setAlternativeApproach("");

    setCopied(false);
    setError("");
  };
const handleAnalyze = async () => {
  if (!code.trim()) {
    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await api.post<ComplexityResponse>(
      "/complexity/analyze",
      {
        language,
        code,
      }
    );

    const data = response.data;

    setTimeComplexity(data.time_complexity);
    setSpaceComplexity(data.space_complexity);
    setExplanation(data.explanation);
    setBottlenecks(data.bottlenecks);
    setOptimizations(data.optimizations);
    setAlternativeApproach(data.alternative_approach);
  } catch (error: any) {
    console.error(
      "Complexity analysis failed:",
      error
    );

    setError(
      error?.response?.data?.detail ||
        "Failed to analyze complexity. Please try again."
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
            <Gauge
              size={24}
              className="text-white"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Complexity Analyzer
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Analyze time and space complexity, identify bottlenecks,
              and discover optimization strategies using AI.
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
                Code to Analyze
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
                  <option
                    key={item}
                    value={item}
                  >
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
                placeholder="Paste the code you want to analyze..."
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
  onClick={handleAnalyze}
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
      Analyzing...
    </>
  ) : (
    <>
      <Sparkles size={18} />
      Analyze Complexity
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

            {/* Header / Copy */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60">

              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

                <div>
                  <h2 className="font-semibold text-white">
                    Complexity Analysis
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    AI-generated complexity analysis
                  </p>
                </div>

                <button
                  type="button"
                  disabled={!timeComplexity}
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

            {/* Complexity Cards */}
            <div className="grid gap-5 sm:grid-cols-2">

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Time Complexity
                </p>

                <p className="mt-3 text-2xl font-bold text-blue-400">
                  {timeComplexity || "—"}
                </p>

              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Space Complexity
                </p>

                <p className="mt-3 text-2xl font-bold text-violet-400">
                  {spaceComplexity || "—"}
                </p>

              </div>

            </div>

            {/* Explanation */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Explanation
              </h2>

              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
                {explanation ||
                  "A detailed explanation of the complexity will appear here."}
              </p>

            </div>

            {/* Bottlenecks */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Bottlenecks
              </h2>

              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
                {bottlenecks ||
                  "Potential performance bottlenecks will appear here."}
              </p>

            </div>

            {/* Optimizations */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Optimizations
              </h2>

              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
                {optimizations ||
                  "Optimization recommendations will appear here."}
              </p>

            </div>

            {/* Alternative Approach */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Alternative Approach
              </h2>

              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
                {alternativeApproach ||
                  "An alternative algorithm or implementation approach will appear here."}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}