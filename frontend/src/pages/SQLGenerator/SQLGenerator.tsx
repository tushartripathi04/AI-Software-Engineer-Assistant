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
  const handleCopy = async () => {
    if (!sqlQuery) return;

    await navigator.clipboard.writeText(sqlQuery);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleReset = () => {
    setPrompt("");
    setSqlQuery("");
    setExplanation("");
    setQueryType("");
    setOptimizationTips("");
    setCopied(false);
    setError("");
  };
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
    <div className="flex h-full min-h-0 flex-col bg-slate-950">

      {/* Header */}
      <div className="shrink-0 border-b border-slate-800 px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 p-3">
            <Database size={24} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              SQL Generator
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Generate optimized SQL queries from natural language using AI.
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
                SQL Requirements
              </h2>
            </div>

            {/* Database */}
            <div className="mb-6">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Database
              </label>

              <select
                value={database}
                onChange={(e) => setDatabase(e.target.value)}
                className="
                  w-full rounded-xl border border-slate-700
                  bg-slate-950 px-4 py-3
                  text-sm text-white outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-1 focus:ring-blue-500
                "
              >
                {databases.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

            </div>

            {/* Prompt */}
            <div className="mb-6">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Describe Your Query
              </label>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Find all employees whose salary is greater than 50000 and sort them by salary in descending order."
                rows={18}
                className="
                  w-full resize-none rounded-xl border border-slate-700
                  bg-slate-950 px-4 py-3
                  text-sm leading-6 text-white
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
  disabled={!prompt.trim() || loading}
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
      <Sparkles size={18} />
      Generate SQL
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

            {/* Generated SQL */}
            <div className="flex min-h-[380px] flex-col rounded-2xl border border-slate-800 bg-slate-900/60">

              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

                <div>
                  <h2 className="font-semibold text-white">
                    Generated SQL
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    AI-generated SQL query
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!sqlQuery}
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

                {sqlQuery ? (
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-6 text-slate-300">
                    {sqlQuery}
                  </pre>
                ) : (
                  <div className="flex h-full min-h-[280px] items-center justify-center">

                    <div className="text-center">

                      <Database
                        size={42}
                        className="mx-auto mb-4 text-slate-700"
                      />

                      <p className="text-sm text-slate-500">
                        Generated SQL will appear here.
                      </p>

                    </div>

                  </div>
                )}

              </div>

            </div>

            {/* Query Type */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Query Type
              </h2>

              <p className="font-mono text-sm text-blue-400">
                {queryType || "Query type will appear here."}
              </p>

            </div>

            {/* Explanation */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Explanation
              </h2>

              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
                {explanation || "SQL query explanation will appear here."}
              </p>

            </div>

            {/* Optimization Tips */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Optimization Tips
              </h2>

              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
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