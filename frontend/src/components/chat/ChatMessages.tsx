import { useEffect, useRef } from "react";

import type { ChatMessage } from "@/types/chat";

import ChatBubble from "./messages/ChatBubble";

interface Props {
  messages: ChatMessage[];
}

export default function ChatMessages({
  messages,
}: Props) {
  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  return (
    <div
      className="
        min-h-0
        flex-1
        overflow-y-auto
        overflow-x-hidden
        bg-primary
        px-8 py-6
        transition-colors duration-300
      "
    >
      <div className="space-y-6">

        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
          />
        ))}

        <div ref={messagesEndRef} />

      </div>
    </div>
  );
}