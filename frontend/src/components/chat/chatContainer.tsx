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
    <>
      <ChatMessages messages={messages} />

      {loading && (
        <div className="px-8 pb-4 text-slate-400">
          AI is thinking...
        </div>
      )}

      <ChatInput onSend={send} />
    </>
  );
}