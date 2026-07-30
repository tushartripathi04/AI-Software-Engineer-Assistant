import { Bot } from "lucide-react";
import type { ChatMessage } from "@/types/chat";

interface Props {
  message: ChatMessage;
}

export default function AssistantMessage({
  message,
}: Props) {
  return (
    <div className="flex gap-4">

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-violet-600">
        <Bot className="h-5 w-5 text-white" />
      </div>

      <div className="w-full max-w-5xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
        <p className="whitespace-pre-wrap leading-7 text-slate-200">
          {message.content}
        </p>
      </div>

    </div>
  );
}