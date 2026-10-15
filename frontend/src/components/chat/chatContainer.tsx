
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import type { ChatMessage } from "@/types/chat";

interface ChatContainerProps {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  onSend: (message: string) => void;
}

export default function ChatContainer({
  messages,
  loading,
  error,
  onSend,
}: ChatContainerProps) {
  return (
    <div
      className="
        flex min-h-0 flex-1
        flex-col
        overflow-hidden
        bg-primary
        transition-colors duration-300
      "
    >
      <ChatMessages messages={messages} />

      {error && (
        <div
          role="alert"
          className="shrink-0 px-8 pb-3 text-sm text-red-500"
        >
          {error}
        </div>
      )}

      {loading && (
        <div className="shrink-0 px-8 pb-3 text-sm text-secondary">
          AI is thinking...
        </div>
      )}

      <div className="shrink-0">
        <ChatInput onSend={onSend} />
      </div>
    </div>
  );
}
