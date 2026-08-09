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
  const [expectedAnswers, setExpectedAnswers] = useState<string[]>([]);
  const [interviewTips, setInterviewTips] = useState<string[]>([]);

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
    setCompany("");
    setCategory("Frontend Development");
    setDifficulty("Medium");

    setQuestions([]);
    setExpectedAnswers([]);
    setInterviewTips([]);

    setCopiedSection("");
    setError("");
  };
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
              Interview Assistant
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Generate company-specific interview questions,
              expected answers, and preparation tips using AI.
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
                Interview Configuration
              </h2>

            </div>

            {/* Company */}
            <div className="mb-6">

              <label className="mb-2 block text-sm font-medium text-slate-300">
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

            {/* Category */}
            <div className="mb-6">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Interview Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="
                  w-full rounded-xl border border-slate-700
                  bg-slate-950 px-4 py-3
                  text-sm text-white
                  outline-none transition
                  focus:border-blue-500
                  focus:ring-1 focus:ring-blue-500
                "
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

            </div>

            {/* Difficulty */}
            <div className="mb-6">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Difficulty
              </label>

              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value)
                }
                className="
                  w-full rounded-xl border border-slate-700
                  bg-slate-950 px-4 py-3
                  text-sm text-white
                  outline-none transition
                  focus:border-blue-500
                  focus:ring-1 focus:ring-blue-500
                "
              >
                {difficulties.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

            </div>

            {/* Buttons */}
            <div className="flex gap-3">

              <button
  type="button"
  onClick={handleGenerate}
  disabled={!company.trim() || loading}
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
      <MessageCircleQuestion size={18} />
      Generate Interview
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

            {/* Questions */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60">

              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

                <div>
                  <h2 className="font-semibold text-white">
                    Interview Questions
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    AI-generated interview questions
                  </p>
                </div>

                <button
                  type="button"
                  disabled={questions.length === 0}
                  onClick={() =>
                    handleCopy(
                      questions
                        .map(
                          (question, index) =>
                            `${index + 1}. ${question}`
                        )
                        .join("\n\n"),
                      "questions"
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
                  {copiedSection === "questions" ? (
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

                {questions.length > 0 ? (
                  <div className="space-y-4">

                    {questions.map(
                      (question, index) => (
                        <div
                          key={index}
                          className="rounded-xl bg-slate-950 p-4"
                        >
                          <div className="mb-2 flex items-center gap-2">

                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-xs font-semibold text-blue-400">
                              {index + 1}
                            </span>

                            <span className="text-xs font-medium text-slate-500">
                              Question {index + 1}
                            </span>

                          </div>

                          <p className="text-sm leading-6 text-slate-300">
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
                      className="mx-auto mb-4 text-slate-700"
                    />

                    <p className="text-sm text-slate-500">
                      Interview questions will appear here.
                    </p>

                  </div>
                )}

              </div>

            </div>

            {/* Expected Answers */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60">

              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

                <div>
                  <h2 className="font-semibold text-white">
                    Expected Answers
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Suggested answer direction for each question
                  </p>
                </div>

                <button
                  type="button"
                  disabled={expectedAnswers.length === 0}
                  onClick={() =>
                    handleCopy(
                      expectedAnswers
                        .map(
                          (answer, index) =>
                            `Question ${index + 1}:\n${answer}`
                        )
                        .join("\n\n"),
                      "answers"
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
                  {copiedSection === "answers" ? (
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

                {expectedAnswers.length > 0 ? (
                  <div className="space-y-4">

                    {expectedAnswers.map(
                      (answer, index) => (
                        <div
                          key={index}
                          className="rounded-xl bg-slate-950 p-4"
                        >
                          <p className="mb-2 text-xs font-medium text-blue-400">
                            Answer {index + 1}
                          </p>

                          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
                            {answer}
                          </p>

                        </div>
                      )
                    )}

                  </div>
                ) : (
                  <p className="py-8 text-center text-sm text-slate-500">
                    Expected answers will appear here.
                  </p>
                )}

              </div>

            </div>

            {/* Interview Tips */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60">

              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

                <div>
                  <h2 className="font-semibold text-white">
                    Interview Tips
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    AI-generated preparation recommendations
                  </p>
                </div>

                <button
                  type="button"
                  disabled={interviewTips.length === 0}
                  onClick={() =>
                    handleCopy(
                      interviewTips
                        .map(
                          (tip, index) =>
                            `${index + 1}. ${tip}`
                        )
                        .join("\n"),
                      "tips"
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
                  {copiedSection === "tips" ? (
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

                {interviewTips.length > 0 ? (
                  <ul className="space-y-3">

                    {interviewTips.map(
                      (tip, index) => (
                        <li
                          key={index}
                          className="flex gap-3 rounded-xl bg-slate-950 p-4"
                        >
                          <Lightbulb
                            size={18}
                            className="mt-0.5 shrink-0 text-amber-400"
                          />

                          <span className="text-sm leading-6 text-slate-400">
                            {tip}
                          </span>

                        </li>
                      )
                    )}

                  </ul>
                ) : (
                  <p className="py-8 text-center text-sm text-slate-500">
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