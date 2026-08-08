import { useEffect } from "react";

import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

import { useChat } from "@/hooks/useChat";

interface ChatContainerProps {
  conversationId: string | null;
  onConversationCreated?: (
    conversationId: string
  ) => void;
}

export default function ChatContainer({
  conversationId,
  onConversationCreated,
}: ChatContainerProps) {
  const {
    messages,
    loading,
    error,
    send,
    loadConversation,
    newChat,
  } = useChat();

  useEffect(() => {
    if (!conversationId) {
      newChat();
      return;
    }

    loadConversation(conversationId);
  }, [conversationId]);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">

      {/* Messages */}
      <ChatMessages
        messages={messages}
      />

      {/* Error */}
      {error && (
        <div className="px-6 pb-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* AI loading */}
      {loading && (
        <div className="px-6 pb-3 text-sm text-slate-400">
          AI is thinking...
        </div>
      )}

      {/* Input */}
      <div className="shrink-0">
        <ChatInput
          onSend={send}
        />
      </div>

    </div>
  );
}