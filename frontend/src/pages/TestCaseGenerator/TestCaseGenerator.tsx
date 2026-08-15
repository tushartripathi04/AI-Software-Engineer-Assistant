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

  // ==========================================
  // COPY TEST CASES
  // ==========================================

  const handleCopy = async () => {
    if (!testCases) return;

    await navigator.clipboard.writeText(testCases);

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
    setFramework("");
    setTestCases("");
    setCopied(false);
    setError("");
  };

  // ==========================================
  // GENERATE TEST CASES
  // ==========================================

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
            <TestTube2
              size={24}
              strokeWidth={1.8}
              className="text-[#d4a72c]"
            />
          </div>

          {/* Heading */}

          <div>
            <h1
              className="
                text-2xl font-bold tracking-tight
                text-primary
              "
            >
              Test Case Generator
            </h1>

            <p
              className="
                mt-1 text-sm
                text-secondary
              "
            >
              Generate comprehensive test cases for your code using AI.
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
                Code to Test
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
                CODE INPUT
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
                placeholder="Paste the code for which you want to generate test cases..."
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

              {/* Generate */}

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
                    <TestTube2 size={18} />
                    Generate Test Cases
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
              RIGHT PANEL
          ========================================== */}

          <div className="flex flex-col gap-6">

            {/* ==========================================
                FRAMEWORK
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-theme
                bg-secondary
                p-5
              "
            >

              <div className="mb-3 flex items-center gap-2">

                <Sparkles
                  size={18}
                  strokeWidth={1.8}
                  className="text-[#d4a72c]"
                />

                <h2
                  className="
                    font-semibold
                    text-primary
                  "
                >
                  Recommended Framework
                </h2>

              </div>

              <p
                className="
                  font-mono
                  text-sm
                  text-[#d4a72c]
                "
              >
                {framework || "Framework will appear here."}
              </p>

            </div>

            {/* ==========================================
                TEST CASES
            ========================================== */}

            <div
              className="
                flex min-h-[600px]
                flex-col
                rounded-2xl
                border border-theme
                bg-secondary
              "
            >

              {/* Header */}

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
                    Generated Test Cases
                  </h2>

                  <p
                    className="
                      mt-1 text-xs
                      text-muted
                    "
                  >
                    AI-generated test cases for your code
                  </p>

                </div>

                {/* Copy */}

                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!testCases}
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

              {/* Generated Output */}

              <div
                className="
                  min-h-0
                  flex-1
                  overflow-auto
                  bg-input
                  p-5
                "
              >

                {testCases ? (
                  <pre
                    className="
                      whitespace-pre-wrap
                      font-mono
                      text-sm
                      leading-6
                      text-primary
                    "
                  >
                    {testCases}
                  </pre>
                ) : (
                  <div
                    className="
                      flex h-full
                      min-h-[500px]
                      items-center
                      justify-center
                    "
                  >

                    <div className="text-center">

                      <Code2
                        size={42}
                        strokeWidth={1.5}
                        className="
                          mx-auto mb-4
                          text-muted
                        "
                      />

                      <p className="text-sm text-muted">
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