import { Bot } from "lucide-react";

import type { ChatMessage } from "@/types/chat";

import MarkdownRenderer from "../markdown/MarkdownRenderer";

interface Props {
  message: ChatMessage;
}

export default function AssistantMessage({
  message,
}: Props) {
  return (
    <div className="flex gap-4 px-2">

      {/* Assistant Icon */}
      <div
        className="
          flex h-10 w-10 shrink-0
          items-center justify-center
          rounded-xl
          border border-[#d4a72c]/40
          bg-tertiary
        "
      >
        <Bot
          className="h-5 w-5 text-[#d4a72c]"
          strokeWidth={1.8}
        />
      </div>

      {/* Response */}
      <div
        className="
          min-w-0
          w-full
          max-w-5xl
          rounded-2xl
          border border-theme
          bg-input
          px-6 py-5
          transition-colors duration-300
        "
      >

        {/* Header */}
        <div
          className="
            mb-4
            flex items-center gap-2
            border-b border-theme
            pb-3
          "
        >
          <span className="text-sm font-medium text-primary">
            Engineering Assistant
          </span>

          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

          <span className="text-xs text-muted">
            Response
          </span>
        </div>

        {/* Markdown */}
        <div
          className="
            max-w-none
            text-[15px]
            leading-7
            text-secondary
          "
        >
          <MarkdownRenderer
            content={message.content}
          />
        </div>

      </div>
    </div>
  );
}