import { Bot, Circle } from "lucide-react";

export default function ChatHeader() {
  return (
    <div
      className="
        flex h-20 shrink-0
        items-center justify-between
        border-b border-theme
        bg-secondary
        px-6
        transition-colors duration-300
      "
    >
      {/* Left */}
      <div className="flex items-center gap-3">

        {/* Assistant Icon */}
        <div
          className="
            flex h-11 w-11
            items-center justify-center
            rounded-xl
            border border-theme
            bg-tertiary
          "
        >
          <Bot
            size={20}
            className="text-[#d4a72c]"
          />
        </div>

        {/* Title */}
        <div>
          <div className="flex items-center gap-2">

            <h2 className="text-base font-semibold text-primary">
              Engineering Assistant
            </h2>

            <Circle
              size={7}
              fill="currentColor"
              className="text-emerald-400"
            />

          </div>

          <p className="text-xs text-muted">
            AI-powered software engineering workspace
          </p>
        </div>

      </div>

      {/* AI Engine */}
      <div
        className="
          flex items-center gap-2
          rounded-lg
          border border-theme
          bg-tertiary
          px-3 py-2
        "
      >
        <Circle
          size={7}
          fill="currentColor"
          className="text-[#d4a72c]"
        />

        <span className="text-sm text-secondary">
          Groq Engine
        </span>

        <span className="text-muted">
          ▾
        </span>
      </div>
    </div>
  );
}