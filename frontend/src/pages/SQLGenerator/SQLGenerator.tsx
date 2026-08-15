import { useState } from "react";
import {
  Check,
  Copy,
  Database,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import api from "../../lib/axios";

interface SQLGenerationResponse {
  database: string;
  sql_query: string;
  explanation: string;
  query_type: string;
  optimization_tips: string;
}

const databases = [
  "PostgreSQL",
  "MySQL",
  "SQLite",
  "SQL Server",
  "Oracle",
];

export default function SQLGenerator() {
  const [database, setDatabase] = useState("PostgreSQL");
  const [prompt, setPrompt] = useState("");

  const [sqlQuery, setSqlQuery] = useState("");
  const [explanation, setExplanation] = useState("");
  const [queryType, setQueryType] = useState("");
  const [optimizationTips, setOptimizationTips] = useState("");

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // COPY SQL
  // ==========================================

  const handleCopy = async () => {
    if (!sqlQuery) return;

    await navigator.clipboard.writeText(sqlQuery);

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
    setSqlQuery("");
    setExplanation("");
    setQueryType("");
    setOptimizationTips("");
    setCopied(false);
    setError("");
  };

  // ==========================================
  // GENERATE SQL
  // ==========================================

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await api.post<SQLGenerationResponse>(
        "/sql/generate",
        {
          database,
          prompt,
        }
      );

      setSqlQuery(response.data.sql_query);
      setExplanation(response.data.explanation);
      setQueryType(response.data.query_type);
      setOptimizationTips(response.data.optimization_tips);
    } catch (error: any) {
      console.error("SQL generation failed:", error);

      setError(
        error?.response?.data?.detail ||
          "Failed to generate SQL. Please try again."
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
            <Database
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
              SQL Generator
            </h1>

            <p
              className="
                mt-1 text-sm
                text-secondary
              "
            >
              Generate optimized SQL queries from natural language using AI.
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
                SQL Requirements
              </h2>

            </div>

            {/* ==========================================
                DATABASE
            ========================================== */}

            <div className="mb-6">

              <label
                className="
                  mb-2 block
                  text-sm font-medium
                  text-primary
                "
              >
                Database
              </label>

              <select
                value={database}
                onChange={(e) => setDatabase(e.target.value)}
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
                {databases.map((item) => (
                  <option key={item} value={item}>
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
                  mb-2 block
                  text-sm font-medium
                  text-primary
                "
              >
                Describe Your Query
              </label>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Find all employees whose salary is greater than 50000 and sort them by salary in descending order."
                rows={18}
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
                disabled={!prompt.trim() || loading}
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
                    <Sparkles size={18} />
                    Generate SQL
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
                GENERATED SQL
            ========================================== */}

            <div
              className="
                flex min-h-[380px]
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
                    Generated SQL
                  </h2>

                  <p
                    className="
                      mt-1 text-xs
                      text-muted
                    "
                  >
                    AI-generated SQL query
                  </p>

                </div>

                {/* Copy */}

                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!sqlQuery}
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

              {/* SQL Output */}

              <div
                className="
                  min-h-0
                  flex-1
                  overflow-auto
                  bg-input
                  p-5
                "
              >

                {sqlQuery ? (
                  <pre
                    className="
                      whitespace-pre-wrap
                      font-mono
                      text-sm
                      leading-6
                      text-primary
                    "
                  >
                    {sqlQuery}
                  </pre>
                ) : (
                  <div
                    className="
                      flex h-full
                      min-h-[280px]
                      items-center
                      justify-center
                    "
                  >

                    <div className="text-center">

                      <Database
                        size={42}
                        strokeWidth={1.5}
                        className="
                          mx-auto mb-4
                          text-muted
                        "
                      />

                      <p className="text-sm text-muted">
                        Generated SQL will appear here.
                      </p>

                    </div>

                  </div>
                )}

              </div>

            </div>

            {/* ==========================================
                QUERY TYPE
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
                Query Type
              </h2>

              <p
                className="
                  font-mono
                  text-sm
                  text-[#d4a72c]
                "
              >
                {queryType || "Query type will appear here."}
              </p>
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
                  mb-3 font-semibold
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
                  "SQL query explanation will appear here."}
              </p>
            </div>

            {/* ==========================================
                OPTIMIZATION TIPS
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
                Optimization Tips
              </h2>

              <p
                className="
                  whitespace-pre-wrap
                  text-sm
                  leading-6
                  text-secondary
                "
              >
                {optimizationTips ||
                  "SQL optimization recommendations will appear here."}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}