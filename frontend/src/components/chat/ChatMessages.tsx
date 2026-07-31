import type { ChatMessage } from "@/types/chat";
import ChatBubble from "./messages/ChatBubble";

interface Props {
  messages: ChatMessage[];
}

export default function ChatMessages({
  messages,
}: Props) {
  return (
    <div className="flex-1 overflow-y-auto space-y-6 p-8">
      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          message={message}
        />
      ))}
    </div>
  );
}