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

  // ==========================================
  // COPY RESULT
  // ==========================================

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

  // ==========================================
  // RESET
  // ==========================================

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

  // ==========================================
  // ANALYZE
  // ==========================================

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
          px-6 py-6
          lg:px-8
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
            <Gauge
              size={24}
              strokeWidth={1.8}
              className="text-[#d4a72c]"
            />
          </div>

          {/* Title */}

          <div className="min-w-0">

            <h1
              className="
                text-2xl font-bold tracking-tight
                text-primary
              "
            >
              Complexity Analyzer
            </h1>

            <p
              className="
                mt-1 max-w-3xl
                text-sm leading-6
                text-secondary
              "
            >
              Analyze time and space complexity, identify
              bottlenecks, and discover optimization strategies
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
              LEFT — CODE INPUT
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
                Code to Analyze
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
                  text-primary
                "
              >
                Programming Language
              </label>

              <select
                value={language}
                onChange={(e) =>
                  setLanguage(e.target.value)
                }
                className="
                  w-full
                  rounded-xl
                  border border-theme
                  bg-input
                  px-4 py-3
                  text-sm
                  text-primary
                  outline-none
                  transition-all
                  focus:border-[#d4a72c]/60
                  focus:ring-1
                  focus:ring-[#d4a72c]/20
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

            {/* ==========================================
                CODE
            ========================================== */}

            <div className="mb-6">

              <label
                className="
                  mb-2 block
                  text-sm font-medium
                  text-primary
                "
              >
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
                  w-full
                  resize-none
                  rounded-xl
                  border border-theme
                  bg-input
                  px-4 py-3
                  font-mono
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

              {/* Analyze */}

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={!code.trim() || loading}
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

                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Analyze Complexity
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
              RIGHT — RESULTS
          ========================================== */}

          <div className="flex flex-col gap-5">

            {/* ==========================================
                RESULT HEADER
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-theme
                bg-secondary
              "
            >

              <div
                className="
                  flex items-center justify-between
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
                    Complexity Analysis
                  </h2>

                  <p
                    className="
                      mt-1 text-xs
                      text-muted
                    "
                  >
                    AI-generated complexity analysis
                  </p>

                </div>

                {/* Copy */}

                <button
                  type="button"
                  disabled={!timeComplexity}
                  onClick={handleCopy}
                  className="
                    flex items-center gap-2
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

            </div>

            {/* ==========================================
                COMPLEXITY CARDS
            ========================================== */}

            <div className="grid gap-5 sm:grid-cols-2">

              {/* Time */}

              <div
                className="
                  rounded-2xl
                  border border-theme
                  bg-secondary
                  p-5
                "
              >

                <p
                  className="
                    text-xs font-medium
                    uppercase tracking-wide
                    text-muted
                  "
                >
                  Time Complexity
                </p>

                <p
                  className="
                    mt-3
                    text-2xl font-bold
                    text-[#d4a72c]
                  "
                >
                  {timeComplexity || "—"}
                </p>

              </div>

              {/* Space */}

              <div
                className="
                  rounded-2xl
                  border border-theme
                  bg-secondary
                  p-5
                "
              >

                <p
                  className="
                    text-xs font-medium
                    uppercase tracking-wide
                    text-muted
                  "
                >
                  Space Complexity
                </p>

                <p
                  className="
                    mt-3
                    text-2xl font-bold
                    text-[#b894e8]
                  "
                >
                  {spaceComplexity || "—"}
                </p>

              </div>

            </div>

            {/* ==========================================
                EXPLANATION
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-theme
                bg-secondary
                p-5
              "
            >

              <h2
                className="
                  mb-3
                  font-semibold
                  text-primary
                "
              >
                Explanation
              </h2>

              <p
                className="
                  whitespace-pre-wrap
                  text-sm
                  leading-6
                  text-secondary
                "
              >
                {explanation ||
                  "A detailed explanation of the complexity will appear here."}
              </p>

            </div>

            {/* ==========================================
                BOTTLENECKS
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-theme
                bg-secondary
                p-5
              "
            >

              <h2
                className="
                  mb-3
                  font-semibold
                  text-primary
                "
              >
                Bottlenecks
              </h2>

              <p
                className="
                  whitespace-pre-wrap
                  text-sm
                  leading-6
                  text-secondary
                "
              >
                {bottlenecks ||
                  "Potential performance bottlenecks will appear here."}
              </p>

            </div>

            {/* ==========================================
                OPTIMIZATIONS
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-theme
                bg-secondary
                p-5
              "
            >

              <h2
                className="
                  mb-3
                  font-semibold
                  text-primary
                "
              >
                Optimizations
              </h2>

              <p
                className="
                  whitespace-pre-wrap
                  text-sm
                  leading-6
                  text-secondary
                "
              >
                {optimizations ||
                  "Optimization recommendations will appear here."}
              </p>

            </div>

            {/* ==========================================
                ALTERNATIVE APPROACH
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-theme
                bg-secondary
                p-5
              "
            >

              <h2
                className="
                  mb-3
                  font-semibold
                  text-primary
                "
              >
                Alternative Approach
              </h2>

              <p
                className="
                  whitespace-pre-wrap
                  text-sm
                  leading-6
                  text-secondary
                "
              >
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