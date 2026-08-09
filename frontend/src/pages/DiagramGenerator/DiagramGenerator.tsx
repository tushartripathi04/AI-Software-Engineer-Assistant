import { useState } from "react";
import {
  Check,
  Copy,
  GitBranch,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import api from "../../lib/axios";
interface DiagramGenerationResponse {
  diagram_type: string;
  mermaid_code: string;
  explanation: string;
  design_notes: string;
}
const diagramTypes = [
  "flowchart",
  "sequence diagram",
  "class diagram",
  "ER diagram",
  "architecture diagram",
  "state diagram",
];

export default function DiagramGenerator() {
  const [diagramType, setDiagramType] = useState("flowchart");
  const [prompt, setPrompt] = useState("");

  const [mermaidCode, setMermaidCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [designNotes, setDesignNotes] = useState("");

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleCopy = async () => {
    if (!mermaidCode) return;

    await navigator.clipboard.writeText(mermaidCode);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleReset = () => {
    setPrompt("");
    setMermaidCode("");
    setExplanation("");
    setDesignNotes("");
    setCopied(false);
    setError("");
  };
  const handleGenerate = async () => {
  if (!prompt.trim()) return;

  setLoading(true);
  setError("");

  try {
    const response = await api.post<DiagramGenerationResponse>(
      "/diagram/generate",
      {
        diagram_type: diagramType,
        prompt,
      }
    );

    setMermaidCode(response.data.mermaid_code);
    setExplanation(response.data.explanation);
    setDesignNotes(response.data.design_notes);
  } catch (error: any) {
    console.error("Diagram generation failed:", error);

    setError(
      error?.response?.data?.detail ||
        "Failed to generate diagram. Please try again."
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
            <GitBranch size={24} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Diagram Generator
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Generate Mermaid diagrams from natural-language system requirements.
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
                Diagram Requirements
              </h2>
            </div>

            {/* Diagram Type */}
            <div className="mb-6">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Diagram Type
              </label>

              <select
                value={diagramType}
                onChange={(e) => setDiagramType(e.target.value)}
                className="
                  w-full rounded-xl border border-slate-700
                  bg-slate-950 px-4 py-3
                  text-sm text-white outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-1 focus:ring-blue-500
                "
              >
                {diagramTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

            </div>

            {/* Prompt */}
            <div className="mb-6">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Describe Your System
              </label>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Create a flowchart showing user registration, login, JWT authentication, and access to the dashboard."
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
      <GitBranch size={18} />
      Generate Diagram
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

            {/* Mermaid Code */}
            <div className="flex min-h-[500px] flex-col rounded-2xl border border-slate-800 bg-slate-900/60">

              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

                <div>
                  <h2 className="font-semibold text-white">
                    Mermaid Diagram Code
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Generated Mermaid diagram definition
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!mermaidCode}
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

                {mermaidCode ? (
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-6 text-slate-300">
                    {mermaidCode}
                  </pre>
                ) : (
                  <div className="flex h-full min-h-[400px] items-center justify-center">

                    <div className="text-center">

                      <GitBranch
                        size={42}
                        className="mx-auto mb-4 text-slate-700"
                      />

                      <p className="text-sm text-slate-500">
                        Generated Mermaid code will appear here.
                      </p>

                    </div>

                  </div>
                )}

              </div>

            </div>

            {/* Explanation */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Explanation
              </h2>

              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
                {explanation ||
                  "The generated diagram will be explained here."}
              </p>

            </div>

            {/* Design Notes */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Design Notes
              </h2>

              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
                {designNotes ||
                  "Design recommendations and diagram notes will appear here."}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}