import { useState } from "react";
import {
  BriefcaseBusiness,
  Check,
  Copy,
  Lightbulb,
  MessageCircleQuestion,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import api from "../../lib/axios";

interface InterviewGenerationResponse {
  company: string;
  category: string;
  difficulty: string;
  questions: string[];
  expected_answers: string[];
  interview_tips: string[];
}

const categories = [
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "Data Structures & Algorithms",
  "Database / SQL",
  "System Design",
  "DevOps",
  "Software Engineering",
  "Behavioral",
];

const difficulties = [
  "Easy",
  "Medium",
  "Hard",
];

export default function InterviewAssistant() {
  const [company, setCompany] = useState("");

  const [category, setCategory] = useState(
    "Frontend Development"
  );

  const [difficulty, setDifficulty] = useState("Medium");

  const [questions, setQuestions] = useState<string[]>([]);
  const [expectedAnswers, setExpectedAnswers] =
    useState<string[]>([]);
  const [interviewTips, setInterviewTips] =
    useState<string[]>([]);

  const [copiedSection, setCopiedSection] =
    useState("");

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
    setCompany("");
    setCategory("Frontend Development");
    setDifficulty("Medium");

    setQuestions([]);
    setExpectedAnswers([]);
    setInterviewTips([]);

    setCopiedSection("");
    setError("");
  };

  // ==========================================
  // GENERATE
  // ==========================================

  const handleGenerate = async () => {
    if (!company.trim()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response =
        await api.post<InterviewGenerationResponse>(
          "/interview/generate",
          {
            company: company.trim(),
            category,
            difficulty,
          }
        );

      const data = response.data;

      setQuestions(data.questions);
      setExpectedAnswers(data.expected_answers);
      setInterviewTips(data.interview_tips);
    } catch (error: any) {
      console.error(
        "Interview generation failed:",
        error
      );

      setError(
        error?.response?.data?.detail ||
          "Failed to generate interview questions. Please try again."
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
              Interview Assistant
            </h1>

            <p
              className="
                mt-1 text-sm
                text-secondary
              "
            >
              Generate company-specific interview questions,
              expected answers, and preparation tips using AI.
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
              LEFT — CONFIGURATION
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
                Interview Configuration
              </h2>
            </div>

            {/* Company */}

            <div className="mb-6">

              <label
                className="
                  mb-2 block
                  text-sm font-medium
                  text-secondary
                "
              >
                Company
              </label>

              <input
                type="text"
                value={company}
                onChange={(e) =>
                  setCompany(e.target.value)
                }
                placeholder="Example: Google, Microsoft, Amazon"
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

            {/* Category */}

            <div className="mb-6">

              <label
                className="
                  mb-2 block
                  text-sm font-medium
                  text-secondary
                "
              >
                Interview Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="
                  w-full rounded-xl
                  border border-theme
                  bg-input
                  px-4 py-3
                  text-sm text-primary
                  outline-none
                  transition-all
                  focus:border-[#d4a72c]/60
                  focus:ring-1
                  focus:ring-[#d4a72c]/20
                "
              >
                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

            </div>

            {/* Difficulty */}

            <div className="mb-6">

              <label
                className="
                  mb-2 block
                  text-sm font-medium
                  text-secondary
                "
              >
                Difficulty
              </label>

              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value)
                }
                className="
                  w-full rounded-xl
                  border border-theme
                  bg-input
                  px-4 py-3
                  text-sm text-primary
                  outline-none
                  transition-all
                  focus:border-[#d4a72c]/60
                  focus:ring-1
                  focus:ring-[#d4a72c]/20
                "
              >
                {difficulties.map((item) => (
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
                ACTIONS
            ========================================== */}

            <div className="flex gap-3">

              {/* Generate */}

              <button
                type="button"
                onClick={handleGenerate}
                disabled={!company.trim() || loading}
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
                    <MessageCircleQuestion size={18} />
                    Generate Interview
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
                  text-sm text-red-500
                "
              >
                {error}
              </div>
            )}

          </div>

          {/* ==========================================
              RIGHT — GENERATED RESULTS
          ========================================== */}

          <div className="flex flex-col gap-5">

            {/* ==========================================
                INTERVIEW QUESTIONS
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
                    Interview Questions
                  </h2>

                  <p
                    className="
                      mt-1 text-xs
                      text-muted
                    "
                  >
                    AI-generated interview questions
                  </p>
                </div>

                <CopyButton
                  disabled={questions.length === 0}
                  text={questions
                    .map(
                      (question, index) =>
                        `${index + 1}. ${question}`
                    )
                    .join("\n\n")}
                  section="questions"
                  copiedSection={copiedSection}
                  onCopy={handleCopy}
                />

              </div>

              <div className="p-5">

                {questions.length > 0 ? (
                  <div className="space-y-4">

                    {questions.map(
                      (question, index) => (
                        <div
                          key={index}
                          className="
                            rounded-xl
                            border border-theme
                            bg-input
                            p-4
                          "
                        >

                          <div
                            className="
                              mb-2
                              flex items-center gap-2
                            "
                          >

                            <span
                              className="
                                flex h-7 w-7
                                items-center
                                justify-center
                                rounded-lg
                                border border-[#d4a72c]/20
                                bg-[#1b1810]
                                text-xs font-semibold
                                text-[#d4a72c]
                              "
                            >
                              {index + 1}
                            </span>

                            <span
                              className="
                                text-xs font-medium
                                text-muted
                              "
                            >
                              Question {index + 1}
                            </span>

                          </div>

                          <p
                            className="
                              text-sm
                              leading-6
                              text-secondary
                            "
                          >
                            {question}
                          </p>

                        </div>
                      )
                    )}

                  </div>
                ) : (
                  <div className="py-10 text-center">

                    <MessageCircleQuestion
                      size={40}
                      strokeWidth={1.6}
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
                      Interview questions will appear here.
                    </p>

                  </div>
                )}

              </div>

            </div>

            {/* ==========================================
                EXPECTED ANSWERS
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
                    Expected Answers
                  </h2>

                  <p
                    className="
                      mt-1 text-xs
                      text-muted
                    "
                  >
                    Suggested answer direction for each question
                  </p>
                </div>

                <CopyButton
                  disabled={
                    expectedAnswers.length === 0
                  }
                  text={expectedAnswers
                    .map(
                      (answer, index) =>
                        `Question ${index + 1}:\n${answer}`
                    )
                    .join("\n\n")}
                  section="answers"
                  copiedSection={copiedSection}
                  onCopy={handleCopy}
                />

              </div>

              <div className="p-5">

                {expectedAnswers.length > 0 ? (
                  <div className="space-y-4">

                    {expectedAnswers.map(
                      (answer, index) => (
                        <div
                          key={index}
                          className="
                            rounded-xl
                            border border-theme
                            bg-input
                            p-4
                          "
                        >

                          <p
                            className="
                              mb-2
                              text-xs font-medium
                              text-[#d4a72c]
                            "
                          >
                            Answer {index + 1}
                          </p>

                          <p
                            className="
                              whitespace-pre-wrap
                              text-sm leading-6
                              text-secondary
                            "
                          >
                            {answer}
                          </p>

                        </div>
                      )
                    )}

                  </div>
                ) : (
                  <p
                    className="
                      py-8 text-center
                      text-sm text-muted
                    "
                  >
                    Expected answers will appear here.
                  </p>
                )}

              </div>

            </div>

            {/* ==========================================
                INTERVIEW TIPS
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
                    Interview Tips
                  </h2>

                  <p
                    className="
                      mt-1 text-xs
                      text-muted
                    "
                  >
                    AI-generated preparation recommendations
                  </p>
                </div>

                <CopyButton
                  disabled={interviewTips.length === 0}
                  text={interviewTips
                    .map(
                      (tip, index) =>
                        `${index + 1}. ${tip}`
                    )
                    .join("\n")}
                  section="tips"
                  copiedSection={copiedSection}
                  onCopy={handleCopy}
                />

              </div>

              <div className="p-5">

                {interviewTips.length > 0 ? (
                  <ul className="space-y-3">

                    {interviewTips.map(
                      (tip, index) => (
                        <li
                          key={index}
                          className="
                            flex gap-3
                            rounded-xl
                            border border-theme
                            bg-input
                            p-4
                          "
                        >

                          <Lightbulb
                            size={18}
                            strokeWidth={1.8}
                            className="
                              mt-0.5
                              shrink-0
                              text-[#d4a72c]
                            "
                          />

                          <span
                            className="
                              text-sm
                              leading-6
                              text-secondary
                            "
                          >
                            {tip}
                          </span>

                        </li>
                      )
                    )}

                  </ul>
                ) : (
                  <p
                    className="
                      py-8 text-center
                      text-sm text-muted
                    "
                  >
                    Interview preparation tips will appear here.
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
  disabled: boolean;
}

function CopyButton({
  text,
  section,
  copiedSection,
  onCopy,
  disabled,
}: CopyButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
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