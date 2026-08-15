import { useState } from "react";
import {
  Code2,
  Copy,
  Check,
  Sparkles,
  RotateCcw,
} from "lucide-react";

import api from "../../lib/axios";

interface CodeGenerationResponse {
  language: string;
  generated_code: string;
  explanation: string;
  complexity: string;
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

export default function CodeGenerator() {
  const [language, setLanguage] = useState("C++");
  const [prompt, setPrompt] = useState("");

  const [generatedCode, setGeneratedCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [complexity, setComplexity] = useState("");

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // GENERATE CODE
  // ==========================================

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post<CodeGenerationResponse>(
        "/code/generate",
        {
          language,
          prompt,
        }
      );

      setGeneratedCode(response.data.generated_code);
      setExplanation(response.data.explanation);
      setComplexity(response.data.complexity);
    } catch (error: any) {
      console.error("Code generation failed:", error);

      setError(
        error?.response?.data?.detail ||
          "Failed to generate code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // COPY GENERATED CODE
  // ==========================================

  const handleCopy = async () => {
    if (!generatedCode) {
      return;
    }

    await navigator.clipboard.writeText(generatedCode);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // ==========================================
  // RESET
  // ==========================================

  const handleReset = () => {
    setPrompt("");
    setGeneratedCode("");
    setExplanation("");
    setComplexity("");
    setCopied(false);
    setError("");
  };

  return (
    <div
      className="
        flex h-full min-h-0 flex-col
        bg-primary
        text-primary
        transition-colors duration-300
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
          transition-colors duration-300
        "
      >
        <div className="flex items-center gap-4">

          {/* Icon */}

         <div className="rounded-xl bg-[#d4a72c] p-3">
            <Code2
              size={24}
              className="text-white"
            />
          </div>

          {/* Heading */}

          <div>
            <h1 className="text-2xl font-bold text-primary">
              Code Generator
            </h1>

            <p className="mt-1 text-sm text-secondary">
              Generate clean and production-quality code using AI.
            </p>
          </div>

        </div>
      </div>

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <div
        className="
          min-h-0
          flex-1
          overflow-y-auto
          bg-primary
          p-6
          lg:p-8
          transition-colors duration-300
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-7xl
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
              transition-colors duration-300
            "
          >

            {/* Panel Header */}

            <div className="mb-6 flex items-center gap-3">

              <Sparkles
                size={20}
                className="text-blue-500"
              />

              <h2 className="text-lg font-semibold text-primary">
                Code Requirements
              </h2>

            </div>

            {/* ==========================================
                LANGUAGE
            ========================================== */}

            <div className="mb-6">

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-secondary
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
                  transition-all duration-200

                  focus:border-blue-500
                  focus:ring-1
                  focus:ring-blue-500/30
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
                PROMPT
            ========================================== */}

            <div className="mb-6">

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-secondary
                "
              >
                Describe what you want to build
              </label>

              <textarea
                value={prompt}
                onChange={(e) =>
                  setPrompt(e.target.value)
                }
                placeholder="Example: Create a binary search implementation for a sorted array..."
                rows={12}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border border-theme
                  bg-input
                  px-4 py-3
                  text-sm
                  leading-6
                  text-primary

                  placeholder:text-muted

                  outline-none
                  transition-all duration-200

                  focus:border-blue-500
                  focus:ring-1
                  focus:ring-blue-500/30
                "
              />

            </div>

            {/* ==========================================
                ACTION BUTTONS
            ========================================== */}

            <div className="flex gap-3">

              {/* Generate */}

              <button
                type="button"
                onClick={handleGenerate}
                disabled={!prompt.trim() || loading}
                className="
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
            
                  text-sm
                  font-semibold
                  text-white

                 
                  transition-colors
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                     bg-[#d4a72c]
                 hover:bg-[#c49a25]

                "
              >
                {loading ? (
                  <>
                    <span
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white
                        border-t-transparent
                      "
                    />

                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Generate Code
                  </>
                )}
              </button>

              {/* Reset */}

              <button
                type="button"
                onClick={handleReset}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border border-theme
                  bg-secondary
                  px-5 py-3
                  text-sm
                  font-medium
                  text-secondary

                  transition-all duration-200

                  hover:bg-tertiary
                  hover:text-primary
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
                  border
                  border-red-500/20
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

          <div className="flex flex-col gap-6">

            {/* ==========================================
                GENERATED CODE
            ========================================== */}

            <div
              className="
                flex
                min-h-[420px]
                flex-col
                rounded-2xl
                border border-theme
                bg-secondary
                transition-colors duration-300
              "
            >

              {/* Header */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b border-theme
                  px-5 py-4
                "
              >

                <div>

                  <h2 className="font-semibold text-primary">
                    Generated Code
                  </h2>

                  <p className="mt-1 text-xs text-muted">
                    {language}
                  </p>

                </div>

                {/* Copy */}

                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!generatedCode}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    border border-theme
                    bg-secondary
                    px-3 py-2
                    text-xs
                    text-secondary

                    transition-all duration-200

                    hover:bg-tertiary
                    hover:text-primary

                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  {copied ? (
                    <>
                      <Check
                        size={15}
                        className="text-emerald-500"
                      />

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

              {/* Code Area */}

              <div
                className="
                  min-h-0
                  flex-1
                  overflow-auto
                  bg-input
                  p-5
                  rounded-b-2xl
                "
              >

                {generatedCode ? (
                  <pre
                    className="
                      whitespace-pre-wrap
                      font-mono
                      text-sm
                      leading-6
                      text-primary
                    "
                  >
                    {generatedCode}
                  </pre>
                ) : (
                  <div
                    className="
                      flex
                      h-full
                      min-h-[330px]
                      items-center
                      justify-center
                    "
                  >
                    <div className="text-center">

                      <Code2
                        size={42}
                        className="
                          mx-auto
                          mb-4
                          text-muted
                        "
                      />

                      <p className="text-sm text-muted">
                        Generated code will appear here
                      </p>

                    </div>
                  </div>
                )}

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
                transition-colors duration-300
              "
            >

              <h2 className="mb-3 font-semibold text-primary">
                Explanation
              </h2>

              <p
                className="
                  text-sm
                  leading-6
                  text-secondary
                "
              >
                {explanation ||
                  "AI explanation will appear here after code generation."}
              </p>

            </div>

            {/* ==========================================
                COMPLEXITY
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-theme
                bg-secondary
                p-5
                transition-colors duration-300
              "
            >

              <h2 className="mb-3 font-semibold text-primary">
                Time Complexity
              </h2>

              <p
                className="
                  font-mono
                  text-sm
                  text-blue-500
                "
              >
                {complexity || "—"}
              </p>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}