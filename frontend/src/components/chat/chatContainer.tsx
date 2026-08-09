import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { useChat } from "@/hooks/useChat";

export default function ChatContainer() {
  const {
    messages,
    loading,
    send,
  } = useChat();

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      {/* Scrollable messages */}
      <ChatMessages messages={messages} />

      {/* AI loading state */}
      {loading && (
        <div className="shrink-0 px-8 pb-3 text-sm text-slate-400">
          AI is thinking...
        </div>
      )}

      {/* Fixed input */}
      <div className="shrink-0">
        <ChatInput onSend={send} />
      </div>
    </div>
  );
}