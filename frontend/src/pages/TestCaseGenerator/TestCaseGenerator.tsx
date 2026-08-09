import { useState } from "react";
import {
  Check,
  Code2,
  Copy,
  RotateCcw,
  Sparkles,
  TestTube2,
} from "lucide-react";
import api from "../../lib/axios";
interface TestCaseResponse {
  framework: string;
  test_cases: string;
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

export default function TestCaseGenerator() {
  const [language, setLanguage] = useState("C++");
  const [code, setCode] = useState("");

  const [framework, setFramework] = useState("");
  const [testCases, setTestCases] = useState("");

  const [copied, setCopied] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
  const handleCopy = async () => {
    if (!testCases) return;

    await navigator.clipboard.writeText(testCases);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleReset = () => {
    setCode("");
    setFramework("");
    setTestCases("");
    setCopied(false);
    setError("");
  };
  const handleGenerate = async () => {
  if (!code.trim()) return;

  setLoading(true);
  setError("");

  try {
    const response = await api.post<TestCaseResponse>(
      "/test-cases/generate",
      {
        language,
        code,
      }
    );

    setFramework(response.data.framework);
    setTestCases(response.data.test_cases);
  } catch (error: any) {
    console.error("Test case generation failed:", error);

    setError(
      error?.response?.data?.detail ||
        "Failed to generate test cases. Please try again."
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
            <TestTube2 size={24} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Test Case Generator
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Generate comprehensive test cases for your code using AI.
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
                Code to Test
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
                placeholder="Paste the code for which you want to generate test cases..."
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
      <TestTube2 size={18} />
      Generate Test Cases
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

            {/* Framework */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <div className="mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-blue-400" />

                <h2 className="font-semibold text-white">
                  Recommended Framework
                </h2>
              </div>

              <p className="font-mono text-sm text-blue-400">
                {framework || "Framework will appear here."}
              </p>

            </div>

            {/* Test Cases */}
            <div className="flex min-h-[600px] flex-col rounded-2xl border border-slate-800 bg-slate-900/60">

              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

                <div>
                  <h2 className="font-semibold text-white">
                    Generated Test Cases
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    AI-generated test cases for your code
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!testCases}
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

                {testCases ? (
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-6 text-slate-300">
                    {testCases}
                  </pre>
                ) : (
                  <div className="flex h-full min-h-[500px] items-center justify-center">

                    <div className="text-center">

                      <Code2
                        size={42}
                        className="mx-auto mb-4 text-slate-700"
                      />

                      <p className="text-sm text-slate-500">
                        Generated test cases will appear here.
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