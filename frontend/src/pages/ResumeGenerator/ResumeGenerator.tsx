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

  // ==========================================
  // COPY
  // ==========================================

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

  // ==========================================
  // RESET
  // ==========================================

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

  // ==========================================
  // GENERATE
  // ==========================================

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
      const response =
        await api.post<ResumeGenerationResponse>(
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
      console.error(
        "Resume generation failed:",
        error
      );

      setError(
        error?.response?.data?.detail ||
          "Failed to generate resume content. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        flex h-full min-h-0 flex-col
        bg-primary text-primary
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
            <BriefcaseBusiness
              size={24}
              strokeWidth={1.8}
              className="text-[#d4a72c]"
            />
          </div>

          {/* Title */}

          <div>
            <h1
              className="
                text-2xl font-bold
                tracking-tight
                text-primary
              "
            >
              Resume Generator
            </h1>

            <p
              className="
                mt-1 text-sm
                text-secondary
              "
            >
              Generate resume-ready project descriptions,
              LinkedIn content, portfolio content, and ATS
              bullet points.
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
          p-6 lg:p-8
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
              LEFT — PROJECT INFORMATION
          ========================================== */}

          <div
            className="
              rounded-2xl
              border border-theme
              bg-secondary
              p-6
            "
          >

            {/* Section Header */}

            <div
              className="
                mb-6
                flex items-center gap-3
              "
            >
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
                Project Information
              </h2>
            </div>

            {/* Project Name */}

            <div className="mb-6">

              <label
                className="
                  mb-2 block
                  text-sm font-medium
                  text-secondary
                "
              >
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
                  w-full rounded-xl
                  border border-theme
                  bg-input
                  px-4 py-3
                  text-sm text-primary
                  placeholder:text-muted
                  outline-none
                  transition-all
                  focus:border-[#d4a72c]/60
                  focus:ring-1
                  focus:ring-[#d4a72c]/20
                "
              />

            </div>

            {/* Technology Stack */}

            <div className="mb-6">

              <label
                className="
                  mb-2 block
                  text-sm font-medium
                  text-secondary
                "
              >
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
                  w-full rounded-xl
                  border border-theme
                  bg-input
                  px-4 py-3
                  text-sm text-primary
                  placeholder:text-muted
                  outline-none
                  transition-all
                  focus:border-[#d4a72c]/60
                  focus:ring-1
                  focus:ring-[#d4a72c]/20
                "
              />

            </div>

            {/* Description */}

            <div className="mb-6">

              <label
                className="
                  mb-2 block
                  text-sm font-medium
                  text-secondary
                "
              >
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
                  w-full resize-none
                  rounded-xl
                  border border-theme
                  bg-input
                  px-4 py-3
                  text-sm leading-6
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
                ACTIONS
            ========================================== */}

            <div className="flex gap-3">

              {/* Generate */}

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
                  flex flex-1
                  items-center justify-center
                  gap-2
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
                    Generate Resume Content
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

            {/* Error */}

            {error && (
              <div
                className="
                  mt-4
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

          </div>

          {/* ==========================================
              RIGHT — GENERATED CONTENT
          ========================================== */}

          <div className="flex flex-col gap-5">

            {/* ==========================================
                RESUME DESCRIPTION
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-theme
                bg-secondary
              "
            >

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
                    Resume Description
                  </h2>

                  <p
                    className="
                      mt-1 text-xs
                      text-muted
                    "
                  >
                    Professional project description
                  </p>
                </div>

                <CopyButton
                  text={resumeDescription}
                  section="resume"
                  copiedSection={copiedSection}
                  onCopy={handleCopy}
                />

              </div>

              <div className="p-5">

                <p
                  className="
                    whitespace-pre-wrap
                    text-sm leading-6
                    text-secondary
                  "
                >
                  {resumeDescription ||
                    "Resume-ready project description will appear here."}
                </p>

              </div>

            </div>

            {/* ==========================================
                LINKEDIN DESCRIPTION
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-theme
                bg-secondary
              "
            >

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
                    LinkedIn Description
                  </h2>

                  <p
                    className="
                      mt-1 text-xs
                      text-muted
                    "
                  >
                    Professional LinkedIn project content
                  </p>
                </div>

                <CopyButton
                  text={linkedinDescription}
                  section="linkedin"
                  copiedSection={copiedSection}
                  onCopy={handleCopy}
                />

              </div>

              <div className="p-5">

                <p
                  className="
                    whitespace-pre-wrap
                    text-sm leading-6
                    text-secondary
                  "
                >
                  {linkedinDescription ||
                    "LinkedIn project description will appear here."}
                </p>

              </div>

            </div>

            {/* ==========================================
                PORTFOLIO DESCRIPTION
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-theme
                bg-secondary
              "
            >

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
                    Portfolio Description
                  </h2>

                  <p
                    className="
                      mt-1 text-xs
                      text-muted
                    "
                  >
                    Portfolio-ready project content
                  </p>
                </div>

                <CopyButton
                  text={portfolioDescription}
                  section="portfolio"
                  copiedSection={copiedSection}
                  onCopy={handleCopy}
                />

              </div>

              <div className="p-5">

                <p
                  className="
                    whitespace-pre-wrap
                    text-sm leading-6
                    text-secondary
                  "
                >
                  {portfolioDescription ||
                    "Portfolio project description will appear here."}
                </p>

              </div>

            </div>

            {/* ==========================================
                ATS BULLET POINTS
            ========================================== */}

            <div
              className="
                rounded-2xl
                border border-theme
                bg-secondary
              "
            >

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
                    ATS Bullet Points
                  </h2>

                  <p
                    className="
                      mt-1 text-xs
                      text-muted
                    "
                  >
                    Resume-friendly achievement bullets
                  </p>
                </div>

                <CopyButton
                  text={atsBulletPoints
                    .map((point) => `• ${point}`)
                    .join("\n")}
                  section="ats"
                  copiedSection={copiedSection}
                  onCopy={handleCopy}
                />

              </div>

              <div className="p-5">

                {atsBulletPoints.length > 0 ? (
                  <ul className="space-y-3">

                    {atsBulletPoints.map(
                      (point, index) => (
                        <li
                          key={index}
                          className="
                            flex gap-3
                            text-sm leading-6
                            text-secondary
                          "
                        >
                          <span
                            className="
                              mt-2 h-1.5 w-1.5
                              shrink-0 rounded-full
                              bg-[#d4a72c]
                            "
                          />

                          <span>{point}</span>
                        </li>
                      )
                    )}

                  </ul>
                ) : (
                  <p
                    className="
                      text-sm text-muted
                    "
                  >
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

/* ==========================================
   COPY BUTTON
========================================== */

interface CopyButtonProps {
  text: string;
  section: string;
  copiedSection: string;
  onCopy: (
    text: string,
    section: string
  ) => void;
}

function CopyButton({
  text,
  section,
  copiedSection,
  onCopy,
}: CopyButtonProps) {
  return (
    <button
      type="button"
      disabled={!text}
      onClick={() => onCopy(text, section)}
      className="
        flex items-center
        gap-2 rounded-lg
        border border-theme
        bg-input
        px-3 py-2
        text-xs
        text-secondary
        transition-all
        hover:border-[#d4a72c]/40
        hover:bg-tertiary
        hover:text-primary
        disabled:cursor-not-allowed
        disabled:opacity-40
      "
    >
      {copiedSection === section ? (
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
  );
}