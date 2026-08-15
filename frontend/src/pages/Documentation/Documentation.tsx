import { useState } from "react";
import {
  BookOpen,
  Check,
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

  // ==========================================
  // DOCUMENTATION TEXT
  // ==========================================

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

  // ==========================================
  // COPY
  // ==========================================

  const handleCopy = async () => {
    if (!documentationText) return;

    await navigator.clipboard.writeText(documentationText);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // ==========================================
  // RESET
  // ==========================================

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

  // ==========================================
  // GENERATE DOCUMENTATION
  // ==========================================

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

          <div
            className="
              flex h-12 w-12 shrink-0
              items-center justify-center
              rounded-xl
              border border-[#d4a72c]/20
              bg-[#1b1810]
            "
          >
            <BookOpen
              size={24}
              strokeWidth={1.8}
              className="text-[#d4a72c]"
            />
          </div>

          <div>
            <h1
              className="
                text-2xl font-bold tracking-tight
                text-primary
              "
            >
              Documentation Generator
            </h1>

            <p
              className="
                mt-1 text-sm
                text-secondary
              "
            >
              Generate clear and structured documentation for your code using AI.
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
              LEFT PANEL
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
                Code to Document
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
                onChange={(e) => setLanguage(e.target.value)}
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
                  <option key={item} value={item}>
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
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste the code you want to document..."
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
                  placeholder:font-sans
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
                ACTIONS
            ========================================== */}

            <div className="flex gap-3">

              <button
                type="button"
                onClick={handleGenerate}
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
                    Generating...
                  </>
                ) : (
                  <>
                    <BookOpen size={18} />
                    Generate Documentation
                  </>
                )}
              </button>

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
              RIGHT PANEL
          ========================================== */}

          <div className="flex flex-col gap-6">

            {/* ==========================================
                DOCUMENTATION HEADER
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-theme
                bg-secondary
                p-5
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <h2
                    className="
                      font-semibold
                      text-primary
                    "
                  >
                    Generated Documentation
                  </h2>

                  <p
                    className="
                      mt-1 text-xs
                      text-muted
                    "
                  >
                    AI-generated technical documentation
                  </p>

                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!documentationText}
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
                OVERVIEW
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
                  mb-3 font-semibold
                  text-primary
                "
              >
                Overview
              </h2>

              <p
                className="
                  text-sm leading-6
                  text-secondary
                "
              >
                {overview || "Code overview will appear here."}
              </p>
            </div>

            {/* ==========================================
                PURPOSE
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
                  mb-3 font-semibold
                  text-primary
                "
              >
                Purpose
              </h2>

              <p
                className="
                  text-sm leading-6
                  text-secondary
                "
              >
                {purpose || "The purpose of the code will appear here."}
              </p>
            </div>

            {/* ==========================================
                PARAMETERS
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
                  mb-3 font-semibold
                  text-primary
                "
              >
                Parameters
              </h2>

              <p
                className="
                  whitespace-pre-wrap
                  text-sm leading-6
                  text-secondary
                "
              >
                {parameters || "Parameter information will appear here."}
              </p>
            </div>

            {/* ==========================================
                RETURNS
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
                  mb-3 font-semibold
                  text-primary
                "
              >
                Returns
              </h2>

              <p
                className="
                  whitespace-pre-wrap
                  text-sm leading-6
                  text-secondary
                "
              >
                {returns || "Return value information will appear here."}
              </p>
            </div>

            {/* ==========================================
                COMPLEXITY
            ========================================== */}

            <div className="grid gap-6 sm:grid-cols-2">

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
                    mb-3 font-semibold
                    text-primary
                  "
                >
                  Time Complexity
                </h2>

                <p
                  className="
                    font-mono text-sm
                    text-[#d4a72c]
                  "
                >
                  {timeComplexity || "—"}
                </p>
              </div>

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
                    mb-3 font-semibold
                    text-primary
                  "
                >
                  Space Complexity
                </h2>

                <p
                  className="
                    font-mono text-sm
                    text-[#d4a72c]
                  "
                >
                  {spaceComplexity || "—"}
                </p>
              </div>

            </div>

            {/* ==========================================
                EXAMPLE
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
                  mb-3 font-semibold
                  text-primary
                "
              >
                Example
              </h2>

              <pre
                className="
                  whitespace-pre-wrap
                  font-mono
                  text-sm leading-6
                  text-secondary
                "
              >
                {example || "Usage example will appear here."}
              </pre>
            </div>

            {/* ==========================================
                BEST PRACTICES
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
                  mb-3 font-semibold
                  text-primary
                "
              >
                Best Practices
              </h2>

              <p
                className="
                  whitespace-pre-wrap
                  text-sm leading-6
                  text-secondary
                "
              >
                {bestPractices ||
                  "Recommended best practices will appear here."}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}