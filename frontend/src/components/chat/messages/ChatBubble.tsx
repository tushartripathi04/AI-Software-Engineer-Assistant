import type  { ChatMessage } from "@/types/chat";

import UserMessage from "./UserMessage";
import AssistantMessage from "./AssistantMessage";

interface Props {
  message: ChatMessage;
}

export default function ChatBubble({
  message,
}: Props) {
  if (message.role === "user") {
    return <UserMessage message={message} />;
  }

  return <AssistantMessage message={message} />;
}