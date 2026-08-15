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
    <div
      className="
        border-t border-theme
        bg-primary
        p-6
        transition-colors duration-300
      "
    >
      <div
        className="
          flex items-center gap-3
          rounded-2xl
          border border-theme
          bg-input
          px-4 py-3
          transition-colors duration-300
        "
      >

        {/* Attachment */}
        <button
          type="button"
          className="
            rounded-lg
            p-2
            transition
            hover:bg-tertiary
          "
        >
          <Paperclip
            size={20}
            className="text-secondary"
          />
        </button>

        {/* Input */}
        <input
          type="text"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Ask anything about software engineering..."
          className="
            flex-1
            bg-transparent
            text-primary
            outline-none
            placeholder:text-muted
          "
        />

        {/* Microphone */}
        <button
          type="button"
          className="
            rounded-lg
            p-2
            transition
            hover:bg-tertiary
          "
        >
          <Mic
            size={20}
            className="text-secondary"
          />
        </button>

        {/* Send */}
        <button
          type="button"
          onClick={handleSend}
          className="
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-violet-600
            p-3
            transition
            hover:scale-105
          "
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