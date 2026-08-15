import { useState } from "react";
import {
  Check,
  Copy,
  RotateCcw,
  ServerCog,
  Sparkles,
} from "lucide-react";

import api from "../../lib/axios";

interface APIGenerationResponse {
  framework: string;
  models: string;
  schemas: string;
  repository: string;
  service: string;
  routes: string;
  explanation: string;
}

const frameworks = [
  "FastAPI",
  "Express.js",
  "Django",
  "Spring Boot",
  "NestJS",
];

export default function APIGenerator() {
  const [framework, setFramework] = useState("FastAPI");
  const [prompt, setPrompt] = useState("");

  const [models, setModels] = useState("");
  const [schemas, setSchemas] = useState("");
  const [repository, setRepository] = useState("");
  const [service, setService] = useState("");
  const [routes, setRoutes] = useState("");
  const [explanation, setExplanation] = useState("");

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // GENERATE API
  // ==========================================

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await api.post<APIGenerationResponse>(
        "/api/generate",
        {
          framework,
          prompt,
        }
      );

      setModels(response.data.models);
      setSchemas(response.data.schemas);
      setRepository(response.data.repository);
      setService(response.data.service);
      setRoutes(response.data.routes);
      setExplanation(response.data.explanation);
    } catch (error: any) {
      console.error("API generation failed:", error);

      setError(
        error?.response?.data?.detail ||
          "Failed to generate API. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // GENERATED API TEXT
  // ==========================================

  const generatedAPI = `
MODELS
${models}

SCHEMAS
${schemas}

REPOSITORY
${repository}

SERVICE
${service}

ROUTES
${routes}

EXPLANATION
${explanation}
  `.trim();

  // ==========================================
  // COPY
  // ==========================================

  const handleCopy = async () => {
    if (!generatedAPI) return;

    await navigator.clipboard.writeText(generatedAPI);

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
    setModels("");
    setSchemas("");
    setRepository("");
    setService("");
    setRoutes("");
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
            <ServerCog
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
              API Generator
            </h1>

            <p
              className="
                mt-1 text-sm
                text-secondary
              "
            >
              Generate structured backend APIs from natural-language
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
                API Requirements
              </h2>

            </div>

            {/* ==========================================
                FRAMEWORK
            ========================================== */}

            <div className="mb-6">

              <label
                className="
                  mb-2 block
                  text-sm font-medium
                  text-primary
                "
              >
                Backend Framework
              </label>

              <select
                value={framework}
                onChange={(e) => setFramework(e.target.value)}
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
                {frameworks.map((item) => (
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
                Describe Your API
              </label>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Create a user authentication API with registration, login, JWT authentication, and profile management."
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
                    <ServerCog size={18} />
                    Generate API
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
                GENERATED API HEADER
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
                    Generated API
                  </h2>

                  <p
                    className="
                      mt-1 text-xs
                      text-muted
                    "
                  >
                    AI-generated backend architecture
                  </p>

                </div>

                {/* Copy */}

                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!generatedAPI}
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
                MODELS
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
                Models
              </h2>

              <pre
                className="
                  whitespace-pre-wrap
                  font-mono
                  text-sm
                  leading-6
                  text-secondary
                "
              >
                {models || "Generated models will appear here."}
              </pre>
            </div>

            {/* ==========================================
                SCHEMAS
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
                Schemas
              </h2>

              <pre
                className="
                  whitespace-pre-wrap
                  font-mono
                  text-sm
                  leading-6
                  text-secondary
                "
              >
                {schemas || "Generated schemas will appear here."}
              </pre>
            </div>

            {/* ==========================================
                REPOSITORY
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
                Repository
              </h2>

              <pre
                className="
                  whitespace-pre-wrap
                  font-mono
                  text-sm
                  leading-6
                  text-secondary
                "
              >
                {repository || "Repository layer will appear here."}
              </pre>
            </div>

            {/* ==========================================
                SERVICE
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
                Service
              </h2>

              <pre
                className="
                  whitespace-pre-wrap
                  font-mono
                  text-sm
                  leading-6
                  text-secondary
                "
              >
                {service || "Service layer will appear here."}
              </pre>
            </div>

            {/* ==========================================
                ROUTES
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
                Routes
              </h2>

              <pre
                className="
                  whitespace-pre-wrap
                  font-mono
                  text-sm
                  leading-6
                  text-secondary
                "
              >
                {routes || "API routes will appear here."}
              </pre>
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
                  "The generated API architecture will be explained here."}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}