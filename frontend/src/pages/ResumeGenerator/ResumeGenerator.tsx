import { useState } from "react";
import {
  BriefcaseBusiness,
  Check,
  Copy,
  FileText,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import api from "../../lib/axios";
interface ResumeGenerationResponse {
  project_name: string;
  resume_description: string;
  linkedin_description: string;
  portfolio_description: string;
  ats_bullet_points: string[];
}

export default function ResumeGenerator() {
  const [projectName, setProjectName] = useState("");
  const [techStack, setTechStack] = useState("");
  const [description, setDescription] = useState("");

  const [resumeDescription, setResumeDescription] = useState("");
  const [linkedinDescription, setLinkedinDescription] = useState("");
  const [portfolioDescription, setPortfolioDescription] = useState("");
  const [atsBulletPoints, setAtsBulletPoints] = useState<string[]>([]);

  const [copiedSection, setCopiedSection] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleCopy = async (
    text: string,
    section: string
  ) => {
    if (!text) return;

    await navigator.clipboard.writeText(text);

    setCopiedSection(section);

    setTimeout(() => {
      setCopiedSection("");
    }, 2000);
  };

  const handleReset = () => {
    setProjectName("");
    setTechStack("");
    setDescription("");

    setResumeDescription("");
    setLinkedinDescription("");
    setPortfolioDescription("");
    setAtsBulletPoints([]);

    setCopiedSection("");
    setError("");
  };
  const handleGenerate = async () => {
  if (
    !projectName.trim() ||
    !techStack.trim() ||
    !description.trim()
  ) {
    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await api.post<ResumeGenerationResponse>(
      "/resume/generate",
      {
        project_name: projectName,
        tech_stack: techStack,
        description,
      }
    );

    const data = response.data;

    setResumeDescription(data.resume_description);
    setLinkedinDescription(data.linkedin_description);
    setPortfolioDescription(data.portfolio_description);
    setAtsBulletPoints(data.ats_bullet_points);
  } catch (error: any) {
    console.error("Resume generation failed:", error);

    setError(
      error?.response?.data?.detail ||
        "Failed to generate resume content. Please try again."
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
            <BriefcaseBusiness
              size={24}
              className="text-white"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Resume Generator
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Generate resume-ready project descriptions,
              LinkedIn content, portfolio content, and ATS bullet points.
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

              <Sparkles
                size={20}
                className="text-blue-400"
              />

              <h2 className="text-lg font-semibold text-white">
                Project Information
              </h2>

            </div>

            {/* Project Name */}
            <div className="mb-6">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Project Name
              </label>

              <input
                type="text"
                value={projectName}
                onChange={(e) =>
                  setProjectName(e.target.value)
                }
                placeholder="Example: AI Software Engineer Assistant"
                className="
                  w-full rounded-xl border border-slate-700
                  bg-slate-950 px-4 py-3
                  text-sm text-white
                  placeholder:text-slate-600
                  outline-none transition
                  focus:border-blue-500
                  focus:ring-1 focus:ring-blue-500
                "
              />

            </div>

            {/* Tech Stack */}
            <div className="mb-6">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Technology Stack
              </label>

              <input
                type="text"
                value={techStack}
                onChange={(e) =>
                  setTechStack(e.target.value)
                }
                placeholder="Example: React, TypeScript, FastAPI, PostgreSQL, Groq"
                className="
                  w-full rounded-xl border border-slate-700
                  bg-slate-950 px-4 py-3
                  text-sm text-white
                  placeholder:text-slate-600
                  outline-none transition
                  focus:border-blue-500
                  focus:ring-1 focus:ring-blue-500
                "
              />

            </div>

            {/* Description */}
            <div className="mb-6">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Project Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Describe your project, its purpose, major features, and the problem it solves..."
                rows={17}
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
  disabled={
    !projectName.trim() ||
    !techStack.trim() ||
    !description.trim() ||
    loading
  }
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
      Generate Resume Content
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
          <div className="flex flex-col gap-5">

            {/* Resume Description */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60">

              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

                <div>
                  <h2 className="font-semibold text-white">
                    Resume Description
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Professional project description
                  </p>
                </div>

                <button
                  type="button"
                  disabled={!resumeDescription}
                  onClick={() =>
                    handleCopy(
                      resumeDescription,
                      "resume"
                    )
                  }
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
                  {copiedSection === "resume" ? (
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

              <div className="p-5">

                <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
                  {resumeDescription ||
                    "Resume-ready project description will appear here."}
                </p>

              </div>

            </div>

            {/* LinkedIn Description */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60">

              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

                <div>
                  <h2 className="font-semibold text-white">
                    LinkedIn Description
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Professional LinkedIn project content
                  </p>
                </div>

                <button
                  type="button"
                  disabled={!linkedinDescription}
                  onClick={() =>
                    handleCopy(
                      linkedinDescription,
                      "linkedin"
                    )
                  }
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
                  {copiedSection === "linkedin" ? (
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

              <div className="p-5">

                <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
                  {linkedinDescription ||
                    "LinkedIn project description will appear here."}
                </p>

              </div>

            </div>

            {/* Portfolio Description */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60">

              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

                <div>
                  <h2 className="font-semibold text-white">
                    Portfolio Description
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Portfolio-ready project content
                  </p>
                </div>

                <button
                  type="button"
                  disabled={!portfolioDescription}
                  onClick={() =>
                    handleCopy(
                      portfolioDescription,
                      "portfolio"
                    )
                  }
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
                  {copiedSection === "portfolio" ? (
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

              <div className="p-5">

                <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
                  {portfolioDescription ||
                    "Portfolio project description will appear here."}
                </p>

              </div>

            </div>

            {/* ATS Bullet Points */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60">

              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

                <div>
                  <h2 className="font-semibold text-white">
                    ATS Bullet Points
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Resume-friendly achievement bullets
                  </p>
                </div>

                <button
                  type="button"
                  disabled={atsBulletPoints.length === 0}
                  onClick={() =>
                    handleCopy(
                      atsBulletPoints
                        .map(
                          (point) => `• ${point}`
                        )
                        .join("\n"),
                      "ats"
                    )
                  }
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
                  {copiedSection === "ats" ? (
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

              <div className="p-5">

                {atsBulletPoints.length > 0 ? (
                  <ul className="space-y-3">

                    {atsBulletPoints.map(
                      (point, index) => (
                        <li
                          key={index}
                          className="
                            flex gap-3 text-sm
                            leading-6 text-slate-400
                          "
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />

                          <span>{point}</span>
                        </li>
                      )
                    )}

                  </ul>
                ) : (
                  <p className="text-sm text-slate-500">
                    ATS-optimized bullet points will appear here.
                  </p>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}