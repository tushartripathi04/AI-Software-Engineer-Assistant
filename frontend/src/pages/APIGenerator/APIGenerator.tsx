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

  const handleCopy = async () => {
    if (!generatedAPI) return;

    await navigator.clipboard.writeText(generatedAPI);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

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
    <div className="flex h-full min-h-0 flex-col bg-slate-950">

      {/* Header */}
      <div className="shrink-0 border-b border-slate-800 px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 p-3">
            <ServerCog size={24} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              API Generator
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Generate structured backend APIs from natural-language requirements.
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
                API Requirements
              </h2>
            </div>

            {/* Framework */}
            <div className="mb-6">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Backend Framework
              </label>

              <select
                value={framework}
                onChange={(e) => setFramework(e.target.value)}
                className="
                  w-full rounded-xl border border-slate-700
                  bg-slate-950 px-4 py-3
                  text-sm text-white outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-1 focus:ring-blue-500
                "
              >
                {frameworks.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

            </div>

            {/* Prompt */}
            <div className="mb-6">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Describe Your API
              </label>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Create a user authentication API with registration, login, JWT authentication, and profile management."
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
      <ServerCog size={18} />
      Generate API
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

            {/* Generated API Header */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="font-semibold text-white">
                    Generated API
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    AI-generated backend architecture
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!generatedAPI}
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

            </div>

            {/* Models */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Models
              </h2>

              <pre className="whitespace-pre-wrap font-mono text-sm leading-6 text-slate-400">
                {models || "Generated models will appear here."}
              </pre>

            </div>

            {/* Schemas */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Schemas
              </h2>

              <pre className="whitespace-pre-wrap font-mono text-sm leading-6 text-slate-400">
                {schemas || "Generated schemas will appear here."}
              </pre>

            </div>

            {/* Repository */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Repository
              </h2>

              <pre className="whitespace-pre-wrap font-mono text-sm leading-6 text-slate-400">
                {repository || "Repository layer will appear here."}
              </pre>

            </div>

            {/* Service */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Service
              </h2>

              <pre className="whitespace-pre-wrap font-mono text-sm leading-6 text-slate-400">
                {service || "Service layer will appear here."}
              </pre>

            </div>

            {/* Routes */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Routes
              </h2>

              <pre className="whitespace-pre-wrap font-mono text-sm leading-6 text-slate-400">
                {routes || "API routes will appear here."}
              </pre>

            </div>

            {/* Explanation */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">

              <h2 className="mb-3 font-semibold text-white">
                Explanation
              </h2>

              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
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