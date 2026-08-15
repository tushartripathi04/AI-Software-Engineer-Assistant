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

  // ==========================================
  // COPY MERMAID CODE
  // ==========================================

  const handleCopy = async () => {
    if (!mermaidCode) return;

    await navigator.clipboard.writeText(mermaidCode);

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
    setMermaidCode("");
    setExplanation("");
    setDesignNotes("");
    setCopied(false);
    setError("");
  };

  // ==========================================
  // GENERATE DIAGRAM
  // ==========================================

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
            <GitBranch
              size={24}
              strokeWidth={1.8}
              className="text-[#d4a72c]"
            />
          </div>

          {/* Heading */}

          <div>
            <h1
              className="
                text-2xl font-bold
                tracking-tight
                text-primary
              "
            >
              Diagram Generator
            </h1>

            <p
              className="
                mt-1 text-sm
                text-secondary
              "
            >
              Generate Mermaid diagrams from natural-language system
              requirements.
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
                Diagram Requirements
              </h2>

            </div>

            {/* ==========================================
                DIAGRAM TYPE
            ========================================== */}

            <div className="mb-6">

              <label
                className="
                  mb-2 block
                  text-sm font-medium
                  text-primary
                "
              >
                Diagram Type
              </label>

              <select
                value={diagramType}
                onChange={(e) => setDiagramType(e.target.value)}
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
                {diagramTypes.map((item) => (
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
                Describe Your System
              </label>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Create a flowchart showing user registration, login, JWT authentication, and access to the dashboard."
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
                BUTTONS
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
                    <GitBranch size={18} />
                    Generate Diagram
                  </>
                )}
              </button>

              {/* Reset */}

              <button
                type="button"
                onClick={handleReset}
                className="
                  flex items-center
                  justify-center gap-2
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
                MERMAID CODE
            ========================================== */}

            <div
              className="
                flex min-h-[500px]
                flex-col
                rounded-2xl
                border border-theme
                bg-secondary
              "
            >

              {/* Header */}

              <div
                className="
                  flex items-center
                  justify-between
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
                    Mermaid Diagram Code
                  </h2>

                  <p
                    className="
                      mt-1 text-xs
                      text-muted
                    "
                  >
                    Generated Mermaid diagram definition
                  </p>

                </div>

                {/* Copy */}

                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!mermaidCode}
                  className="
                    flex items-center
                    gap-2
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

              {/* Mermaid Output */}

              <div
                className="
                  min-h-0
                  flex-1
                  overflow-auto
                  bg-input
                  p-5
                "
              >

                {mermaidCode ? (
                  <pre
                    className="
                      whitespace-pre-wrap
                      font-mono
                      text-sm
                      leading-6
                      text-primary
                    "
                  >
                    {mermaidCode}
                  </pre>
                ) : (
                  <div
                    className="
                      flex h-full
                      min-h-[400px]
                      items-center
                      justify-center
                    "
                  >

                    <div className="text-center">

                      <GitBranch
                        size={42}
                        strokeWidth={1.5}
                        className="
                          mx-auto mb-4
                          text-muted
                        "
                      />

                      <p
                        className="
                          text-sm
                          text-muted
                        "
                      >
                        Generated Mermaid code will appear here.
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
                  "The generated diagram will be explained here."}
              </p>

            </div>

            {/* ==========================================
                DESIGN NOTES
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
                Design Notes
              </h2>

              <p
                className="
                  whitespace-pre-wrap
                  text-sm
                  leading-6
                  text-secondary
                "
              >
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