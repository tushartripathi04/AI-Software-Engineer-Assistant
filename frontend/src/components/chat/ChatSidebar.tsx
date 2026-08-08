import { Plus, MessageSquare } from "lucide-react";
import {
  useConversations,
} from "@/hooks/useConversations";

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
    <aside className="flex h-full w-72 flex-col border-r border-slate-800 bg-slate-900">

      {/* New Chat */}
      <div className="border-b border-slate-800 p-5">
        <button
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 font-medium text-white transition hover:scale-[1.02]"
        >
          <Plus size={18} />

          New Chat
        </button>
      </div>

      {/* Conversation History */}
      <div className="flex-1 overflow-y-auto px-4 py-5">

        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Conversations
        </p>

        {loading && (
          <p className="px-3 py-3 text-sm text-slate-500">
            Loading conversations...
          </p>
        )}

        {!loading && conversations.length === 0 && (
          <p className="px-3 py-3 text-sm text-slate-500">
            No conversations yet.
          </p>
        )}

        <div className="space-y-2">
          {conversations.map((conversation) => {
            const isSelected =
              conversation.id === selectedConversationId;

            return (
              <button
                key={conversation.id}
                onClick={() =>
                  onSelectConversation(conversation.id)
                }
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                  isSelected
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <MessageSquare size={16} />

                <span className="truncate">
                  {conversation.title}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </aside>
  );
}