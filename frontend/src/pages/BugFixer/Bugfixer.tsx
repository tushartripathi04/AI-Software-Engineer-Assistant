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

  // ==========================================
  // FIX CODE
  // ==========================================

  const handleFix = async () => {
    if (!code.trim()) {
      return;
    }

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

  // ==========================================
  // COPY FIXED CODE
  // ==========================================

  const handleCopy = async () => {
    if (!fixedCode) {
      return;
    }

    await navigator.clipboard.writeText(fixedCode);

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
    setSummary("");
    setBugs([]);
    setFixedCode("");
    setExplanation("");
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

          <div
            className="
              rounded-xl
              bg-[#d4a72c]
              p-3
              shadow-sm
            "
          >
            <Bug
              size={24}
              className="text-white"
            />
          </div>

          {/* Heading */}

          <div>
            <h1 className="text-2xl font-bold text-primary">
              Bug Fixer
            </h1>

            <p className="mt-1 text-sm text-secondary">
              Find bugs, understand the problem, and generate
              corrected code using AI.
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
                className="text-[#d4a72c]"
              />

              <h2 className="text-lg font-semibold text-primary">
                Code to Debug
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
                  bg-secondary
                  px-4 py-3
                  text-sm
                  text-primary
                  outline-none
                  transition-all duration-200

                  focus:border-[#d4a72c]
                  focus:ring-1
                  focus:ring-[#d4a72c]/30
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
                CODE INPUT
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
                Paste Your Buggy Code
              </label>

              <textarea
                value={code}
                onChange={(e) =>
                  setCode(e.target.value)
                }
                placeholder="Paste the code containing the bug..."
                rows={18}
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
                  transition-all duration-200

                  focus:border-[#d4a72c]
                  focus:ring-1
                  focus:ring-[#d4a72c]/30
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
                  border
                  border-red-500/30
                  bg-red-500/10
                  px-4 py-3
                  text-sm
                  leading-6
                  text-red-500
                "
              >
                {error}
              </div>
            )}

            {/* ==========================================
                ACTION BUTTONS
            ========================================== */}

            <div className="flex gap-3">

              {/* Fix Button */}

              <button
                type="button"
                onClick={handleFix}
                disabled={!code.trim() || loading}
                className="
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl

                  bg-[#d4a72c]

                  px-5 py-3
                  text-sm
                  font-semibold
                  text-white

                  transition-all duration-200

                  hover:bg-[#c59a24]

                  disabled:cursor-not-allowed
                  disabled:opacity-40
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

                    Fixing...
                  </>
                ) : (
                  <>
                    <Bug size={18} />
                    Fix Code
                  </>
                )}
              </button>

              {/* Reset Button */}

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
          </div>

          {/* ==========================================
              RIGHT PANEL
          ========================================== */}

          <div className="flex flex-col gap-6">

            {/* ==========================================
                BUG ANALYSIS
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

              <div className="mb-3 flex items-center gap-2">

                <Sparkles
                  size={18}
                  className="text-[#d4a72c]"
                />

                <h2 className="font-semibold text-primary">
                  Bug Analysis
                </h2>

              </div>

              <p
                className="
                  text-sm
                  leading-6
                  text-secondary
                "
              >
                {summary ||
                  "The AI bug analysis summary will appear here after debugging your code."}
              </p>

            </div>

            {/* ==========================================
                BUGS FOUND
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

              <div className="mb-4 flex items-center gap-2">

                <Bug
                  size={18}
                  className="text-red-500"
                />

                <h2 className="font-semibold text-primary">
                  Bugs Found
                </h2>

              </div>

              {bugs.length > 0 ? (
                <ul className="space-y-3">

                  {bugs.map((bug, index) => (
                    <li
                      key={index}
                      className="
                        rounded-xl
                        border
                        border-red-500/20
                        bg-red-500/5
                        px-4 py-3
                        text-sm
                        leading-6
                        text-secondary
                      "
                    >
                      {bug}
                    </li>
                  ))}

                </ul>
              ) : (
                <p className="text-sm text-muted">
                  Detected bugs will appear here.
                </p>
              )}

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
                  "The AI explanation of the bug and its fix will appear here."}
              </p>

            </div>

            {/* ==========================================
                FIXED CODE
            ========================================== */}

            <div
              className="
                flex
                min-h-[350px]
                flex-col
                rounded-2xl
                border border-theme
                bg-secondary
                transition-colors duration-300
              "
            >

              {/* Fixed Code Header */}

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
                    Fixed Code
                  </h2>

                  <p className="mt-1 text-xs text-muted">
                    Corrected implementation generated by AI
                  </p>

                </div>

                {/* Copy */}

                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!fixedCode}
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
                  rounded-b-2xl
                  bg-input
                  p-5
                "
              >

                {fixedCode ? (
                  <pre
                    className="
                      whitespace-pre-wrap
                      font-mono
                      text-sm
                      leading-6
                      text-primary
                    "
                  >
                    {fixedCode}
                  </pre>
                ) : (
                  <div
                    className="
                      flex
                      h-full
                      min-h-[250px]
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