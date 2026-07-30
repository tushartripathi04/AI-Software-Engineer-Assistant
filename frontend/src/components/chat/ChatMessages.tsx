import  type { ChatMessage } from "@/types/chat";
import ChatBubble from "./messages/ChatBubble";

const messages: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "Generate JWT authentication using FastAPI.",
    createdAt: new Date(),
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Sure! Below is a production-ready implementation using FastAPI and JWT.",
    createdAt: new Date(),
  },
];

export default function ChatMessages() {
  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-6">
      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          message={message}
        />
      ))}
    </div>
  );
}