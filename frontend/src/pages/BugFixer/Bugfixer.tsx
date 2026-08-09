import { useState } from "react";
import {
  Bug,
  Check,
  Code2,
  Copy,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import api from "../../lib/axios";
interface BugFixResponse {
  summary: string;
  bugs: string[];
  fixed_code: string;
  explanation: string;
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

export default function BugFixer() {
  const [language, setLanguage] = useState("C++");
  const [code, setCode] = useState("");
  const [summary, setSummary] = useState("");
  const [bugs, setBugs] = useState<string[]>([]);
  const [fixedCode, setFixedCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleFix = async () => {
  console.log("🐞 handleFix clicked");

  if (!code.trim()) {
    console.log("❌ Code is empty");
    return;
  }

  console.log("🚀 Sending bug-fix request:", {
    language,
    code,
  });

  setLoading(true);
  setError("");

  try {
    const response = await api.post<BugFixResponse>(
      "/bug-fix/fix",
      {
        language,
        code,
      }
    );

    setSummary(response.data.summary);
    setBugs(response.data.bugs);
    setFixedCode(response.data.fixed_code);
    setExplanation(response.data.explanation);
  } catch (error: any) {
    console.error("Bug fixing failed:", error);

    setError(
      error?.response?.data?.detail ||
        "Failed to analyze and fix the code. Please try again."
    );
  } finally {
    setLoading(false);
  }
};
  const handleCopy = async () => {
    if (!fixedCode) return;

    await navigator.clipboard.writeText(fixedCode);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleReset = () => {
    setCode("");
    setSummary("");
    setBugs([]);
    setFixedCode("");
    setExplanation("");
    setCopied(false);
    setError("");
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-slate-950">

      {/* Header */}
      <div className="shrink-0 border-b border-slate-800 px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 p-3">
            <Bug size={24} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Bug Fixer
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Find bugs, understand the problem, and generate corrected code using AI.
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
                Code to Debug
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
                Paste Your Buggy Code
              </label>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste the code containing the bug..."
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
  onClick={handleFix}
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
      Fixing...
    </>
  ) : (
    <>
      <Bug size={18} />
      Fix Code
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
                  Bug Analysis
                </h2>
              </div>

              <p className="text-sm leading-6 text-slate-400">
                {summary ||
                  "The AI bug analysis summary will appear here after debugging your code."}
              </p>

            </div>

            {/* Bugs */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <div className="mb-4 flex items-center gap-2">
                <Bug size={18} className="text-red-400" />

                <h2 className="font-semibold text-white">
                  Bugs Found
                </h2>
              </div>

              {bugs.length > 0 ? (
                <ul className="space-y-3">
                  {bugs.map((bug, index) => (
                    <li
                      key={index}
                      className="
                        rounded-xl border border-red-500/10
                        bg-red-500/5 px-4 py-3
                        text-sm leading-6 text-slate-300
                      "
                    >
                      {bug}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500">
                  Detected bugs will appear here.
                </p>
              )}

            </div>

            {/* Explanation */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Explanation
              </h2>

              <p className="text-sm leading-6 text-slate-400">
                {explanation ||
                  "The AI explanation of the bug and its fix will appear here."}
              </p>

            </div>

            {/* Fixed Code */}
            <div className="flex min-h-[350px] flex-col rounded-2xl border border-slate-800 bg-slate-900/60">

              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

                <div>
                  <h2 className="font-semibold text-white">
                    Fixed Code
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Corrected implementation generated by AI
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!fixedCode}
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

                {fixedCode ? (
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-6 text-slate-300">
                    {fixedCode}
                  </pre>
                ) : (
                  <div className="flex h-full min-h-[250px] items-center justify-center">

                    <div className="text-center">

                      <Code2
                        size={42}
                        className="mx-auto mb-4 text-slate-700"
                      />

                      <p className="text-sm text-slate-500">
                        Fixed code will appear here
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