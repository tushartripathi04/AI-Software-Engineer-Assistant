import { Plus, MessageSquare } from "lucide-react";
import { useConversations } from "@/hooks/useConversations";

interface ChatSidebarProps {
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  onNewChat: () => void;
}

export default function ChatSidebar({
  selectedConversationId,
  onSelectConversation,
  onNewChat,
}: ChatSidebarProps) {
  const {
    conversations,
    loading,
  } = useConversations();

  return (
    <aside className="flex h-full w-80 shrink-0 flex-col overflow-hidden border-r border-slate-800 bg-slate-900">
      {/* New Chat */}
      <div className="shrink-0 border-b border-slate-800 p-5">
        <button
          type="button"
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 font-medium text-white transition hover:scale-[1.02]"
        >
          <Plus size={18} />

          <span>New Chat</span>
        </button>
      </div>

      {/* Conversation History */}
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Conversations
        </p>

        {/* Loading */}
        {loading && (
          <p className="px-3 py-3 text-sm text-slate-500">
            Loading conversations...
          </p>
        )}

        {/* Empty State */}
        {!loading && conversations.length === 0 && (
          <p className="px-3 py-3 text-sm text-slate-500">
            No conversations yet.
          </p>
        )}

        {/* Conversations */}
        {!loading && conversations.length > 0 && (
          <div className="space-y-2">
            {conversations.map((conversation) => {
              const isSelected =
                conversation.id === selectedConversationId;

              return (
                <button
                  type="button"
                  key={conversation.id}
                  onClick={() =>
                    onSelectConversation(conversation.id)
                  }
                  className={`flex w-full min-w-0 items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                    isSelected
                      ? "bg-slate-800 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <MessageSquare
                    size={16}
                    className="shrink-0"
                  />

                  <span className="min-w-0 truncate">
                    {conversation.title}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}