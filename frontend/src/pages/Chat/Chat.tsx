
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatContainer from "@/components/chat/chatContainer";
import { useChat } from "@/hooks/useChat";
import { useConversations } from "@/hooks/useConversations";

export default function Chat() {
  const {
    messages,
    loading,
    error,
    send,
    conversationId,
    loadConversation,
    newChat,
  } = useChat();

  const { loadConversations } = useConversations();

  async function handleSend(message: string) {
    await send(message);
    await loadConversations();
  }

  return (
    <div className="flex h-full min-h-0 w-full overflow-hidden">
      <ChatSidebar
        selectedConversationId={conversationId}
        onSelectConversation={loadConversation}
        onNewChat={newChat}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <div className="shrink-0">
          <ChatHeader />
        </div>

        <ChatContainer
          messages={messages}
          loading={loading}
          error={error}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}
