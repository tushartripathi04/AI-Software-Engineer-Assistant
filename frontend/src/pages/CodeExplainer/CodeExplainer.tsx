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

  // ==========================================
  // COPY EXPLANATION
  // ==========================================

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

  // ==========================================
  // RESET
  // ==========================================

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

  // ==========================================
  // EXPLAIN CODE
  // ==========================================

  const handleExplain = async () => {
    if (!code.trim()) return;

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
      console.error("Code explanation failed:", error);

      setError(
        error?.response?.data?.detail ||
          "Failed to explain the code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        flex h-full min-h-0 flex-col
        bg-[var(--bg-primary)]
        text-[var(--text-primary)]
        transition-colors duration-300
      "
    >

      {/* ==========================================
          HEADER
      ========================================== */}

      <div
        className="
          shrink-0
          border-b border-[var(--border)]
          px-6 py-5 lg:px-8 lg:py-6
          transition-colors duration-300
        "
      >
        <div className="flex items-center gap-4">

          {/* Icon */}

          <div
            className="
              flex h-12 w-12 shrink-0
              items-center justify-center
              rounded-xl
              border border-[var(--border)]
              bg-[var(--card-bg)]
              text-[var(--accent)]
            "
          >
            <Code2
              size={24}
              strokeWidth={1.8}
            />
          </div>

          {/* Title */}

          <div className="min-w-0">

            <h1
              className="
                text-2xl font-semibold tracking-tight
                text-[var(--text-primary)]
              "
            >
              Code Explainer
            </h1>

            <p
              className="
                mt-1 max-w-3xl
                text-sm leading-6
                text-[var(--text-secondary)]
              "
            >
              Understand your code, algorithms, complexity,
              real-world usage, and possible improvements using AI.
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
          p-5 sm:p-6 lg:p-8
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
              border border-[var(--border)]
              bg-[var(--card-bg)]
              p-5 sm:p-6
              shadow-sm
              transition-colors duration-300
            "
          >

            {/* Section Heading */}

            <div className="mb-6 flex items-center gap-3">

              <div
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-lg
                  border border-[var(--border)]
                  bg-[var(--bg-tertiary)]
                "
              >
                <Sparkles
                  size={18}
                  strokeWidth={1.8}
                  className="text-[var(--accent)]"
                />
              </div>

              <h2
                className="
                  text-lg font-semibold
                  text-[var(--text-primary)]
                "
              >
                Code to Explain
              </h2>

            </div>

            {/* ==========================================
                LANGUAGE
            ========================================== */}

            <div className="mb-6">

              <label
                className="
                  mb-2 block
                  text-sm font-medium
                  text-[var(--text-primary)]
                "
              >
                Programming Language
              </label>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="
                  w-full rounded-xl
                  border border-[var(--border)]
                  bg-[var(--input-bg)]
                  px-4 py-3
                  text-sm
                  text-[var(--text-primary)]
                  outline-none
                  transition-all duration-200
                  focus:border-[var(--accent)]
                  focus:ring-1
                  focus:ring-[var(--accent)]
                "
              >
                {languages.map((item) => (
                  <option
                    key={item}
                    value={item}
                    className="
                      bg-[var(--input-bg)]
                      text-[var(--text-primary)]
                    "
                  >
                    {item}
                  </option>
                ))}
              </select>

            </div>

            {/* ==========================================
                CODE INPUT
            ========================================== */}

            <div className="mb-6">

              <label
                className="
                  mb-2 block
                  text-sm font-medium
                  text-[var(--text-primary)]
                "
              >
                Paste Your Code
              </label>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste the code you want to understand..."
                rows={20}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border border-[var(--border)]
                  bg-[var(--input-bg)]
                  px-4 py-3
                  font-mono
                  text-sm leading-6
                  text-[var(--text-primary)]
                  placeholder:text-[var(--text-muted)]
                  outline-none
                  transition-all duration-200
                  focus:border-[var(--accent)]
                  focus:ring-1
                  focus:ring-[var(--accent)]
                "
              />

            </div>

            {/* ==========================================
                BUTTONS
            ========================================== */}

            <div className="flex gap-3">

              {/* Explain */}

              <button
                type="button"
                onClick={handleExplain}
                disabled={!code.trim() || loading}
                className="
                  flex flex-1
                  items-center justify-center gap-2
                  rounded-xl
                  border border-[var(--accent)]
                  bg-[var(--accent)]
                  px-5 py-3
                  text-sm font-semibold
                  text-white
                  transition-all duration-200
                  hover:opacity-90
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
                        border-white
                        border-t-transparent
                      "
                    />

                    Explaining...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Explain Code
                  </>
                )}
              </button>

              {/* Reset */}

              <button
                type="button"
                onClick={handleReset}
                className="
                  flex
                  items-center justify-center gap-2
                  rounded-xl
                  border border-[var(--border)]
                  bg-[var(--bg-tertiary)]
                  px-5 py-3
                  text-sm font-medium
                  text-[var(--text-secondary)]
                  transition-all duration-200
                  hover:border-[var(--accent)]
                  hover:text-[var(--text-primary)]
                "
              >
                <RotateCcw size={17} />
                Reset
              </button>

            </div>

            {/* ==========================================
                ERROR
            ========================================== */}

            {error && (
              <div
                className="
                  mt-4
                  rounded-xl
                  border border-red-500/30
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

          <div className="flex flex-col gap-5">

            {/* ==========================================
                GENERATED EXPLANATION HEADER
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--card-bg)]
                transition-colors duration-300
              "
            >

              <div
                className="
                  flex items-center justify-between
                  border-b border-[var(--border)]
                  px-5 py-4
                "
              >

                <div>

                  <h2
                    className="
                      font-semibold
                      text-[var(--text-primary)]
                    "
                  >
                    Code Explanation
                  </h2>

                  <p
                    className="
                      mt-1 text-xs
                      text-[var(--text-muted)]
                    "
                  >
                    AI-generated technical explanation
                  </p>

                </div>

                {/* Copy */}

                <button
                  type="button"
                  disabled={!overview}
                  onClick={handleCopy}
                  className="
                    flex items-center gap-2
                    rounded-lg
                    border border-[var(--border)]
                    bg-[var(--bg-tertiary)]
                    px-3 py-2
                    text-xs
                    text-[var(--text-secondary)]
                    transition-all duration-200
                    hover:border-[var(--accent)]
                    hover:text-[var(--text-primary)]
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

            {/* ==========================================
                OVERVIEW
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--card-bg)]
                p-5
                transition-colors duration-300
              "
            >

              <h2
                className="
                  mb-3 font-semibold
                  text-[var(--text-primary)]
                "
              >
                Overview
              </h2>

              <p
                className="
                  whitespace-pre-wrap
                  text-sm leading-6
                  text-[var(--text-secondary)]
                "
              >
                {overview ||
                  "A high-level explanation of your code will appear here."}
              </p>

            </div>

            {/* ==========================================
                LINE BY LINE
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--card-bg)]
                p-5
                transition-colors duration-300
              "
            >

              <h2
                className="
                  mb-3 font-semibold
                  text-[var(--text-primary)]
                "
              >
                Line-by-Line Explanation
              </h2>

              <p
                className="
                  whitespace-pre-wrap
                  text-sm leading-6
                  text-[var(--text-secondary)]
                "
              >
                {lineByLine ||
                  "A detailed line-by-line explanation will appear here."}
              </p>

            </div>

            {/* ==========================================
                ALGORITHM
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--card-bg)]
                p-5
                transition-colors duration-300
              "
            >

              <h2
                className="
                  mb-3 font-semibold
                  text-[var(--text-primary)]
                "
              >
                Algorithm
              </h2>

              <p
                className="
                  whitespace-pre-wrap
                  text-sm leading-6
                  text-[var(--text-secondary)]
                "
              >
                {algorithm ||
                  "The algorithm and approach will appear here."}
              </p>

            </div>

            {/* ==========================================
                COMPLEXITY
            ========================================== */}

            <div className="grid gap-5 sm:grid-cols-2">

              <div
                className="
                  rounded-2xl
                  border border-[var(--border)]
                  bg-[var(--card-bg)]
                  p-5
                  transition-colors duration-300
                "
              >

                <h2
                  className="
                    mb-3 font-semibold
                    text-[var(--text-primary)]
                  "
                >
                  Time Complexity
                </h2>

                <p
                  className="
                    text-sm font-medium
                    text-[var(--accent)]
                  "
                >
                  {timeComplexity || "—"}
                </p>

              </div>

              <div
                className="
                  rounded-2xl
                  border border-[var(--border)]
                  bg-[var(--card-bg)]
                  p-5
                  transition-colors duration-300
                "
              >

                <h2
                  className="
                    mb-3 font-semibold
                    text-[var(--text-primary)]
                  "
                >
                  Space Complexity
                </h2>

                <p
                  className="
                    text-sm font-medium
                    text-[var(--accent)]
                  "
                >
                  {spaceComplexity || "—"}
                </p>

              </div>

            </div>

            {/* ==========================================
                REAL WORLD USE
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--card-bg)]
                p-5
                transition-colors duration-300
              "
            >

              <h2
                className="
                  mb-3 font-semibold
                  text-[var(--text-primary)]
                "
              >
                Real-World Use
              </h2>

              <p
                className="
                  whitespace-pre-wrap
                  text-sm leading-6
                  text-[var(--text-secondary)]
                "
              >
                {realWorldUse ||
                  "Real-world applications of this code will appear here."}
              </p>

            </div>

            {/* ==========================================
                IMPROVEMENTS
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--card-bg)]
                p-5
                transition-colors duration-300
              "
            >

              <h2
                className="
                  mb-3 font-semibold
                  text-[var(--text-primary)]
                "
              >
                Possible Improvements
              </h2>

              <p
                className="
                  whitespace-pre-wrap
                  text-sm leading-6
                  text-[var(--text-secondary)]
                "
              >
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