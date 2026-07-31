import { useState } from "react";
import {
  Paperclip,
  Mic,
  SendHorizonal,
} from "lucide-react";

interface Props {
  onSend(message: string): void;
}

export default function ChatInput({
  onSend,
}: Props) {
  const [message, setMessage] = useState("");

  function handleSend() {
    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  }

  return (
    <div className="border-t border-slate-800 bg-slate-950 p-6">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3">

        <button className="rounded-lg p-2 transition hover:bg-slate-800">
          <Paperclip
            size={20}
            className="text-slate-400"
          />
        </button>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Ask anything about software engineering..."
          className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-500"
        />

        <button className="rounded-lg p-2 transition hover:bg-slate-800">
          <Mic
            size={20}
            className="text-slate-400"
          />
        </button>

        <button
          onClick={handleSend}
          className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 p-3 transition hover:scale-105"
        >
          <SendHorizonal
            size={20}
            className="text-white"
          />
        </button>

      </div>
    </div>
  );
}