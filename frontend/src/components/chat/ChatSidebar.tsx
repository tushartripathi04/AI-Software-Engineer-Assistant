import {
  Plus,
  MessageSquare,
  MessageCircle,
} from "lucide-react";

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
    <aside
      className="
        flex h-full w-80 shrink-0
        flex-col
        overflow-hidden
        border-r border-theme
        bg-secondary
        transition-colors duration-300
      "
    >

      {/* NEW CHAT */}
      <div
        className="
          shrink-0
          border-b border-theme
          p-5
        "
      >
        <button
          type="button"
          onClick={onNewChat}
          className="
            group
            flex w-full
            items-center justify-center
            gap-2.5
            rounded-lg
            border border-theme
            bg-tertiary
            px-4 py-3
            text-sm font-medium
            text-primary
            transition-all duration-200
            hover:border-[#d4a72c]/50
            hover:bg-[var(--bg-primary)]
          "
        >
          <Plus
            size={17}
            strokeWidth={2}
            className="
              text-[#d4a72c]
              transition-transform duration-200
              group-hover:rotate-90
            "
          />

          <span>
            New Conversation
          </span>
        </button>
      </div>

      {/* CONVERSATIONS */}
      <div
        className="
          min-h-0 flex-1
          overflow-y-auto
          overflow-x-hidden
          px-4 py-5
        "
      >

        {/* Section Header */}
        <div className="mb-4 flex items-center justify-between px-2">

          <div className="flex items-center gap-2">

            <MessageCircle
              size={14}
              strokeWidth={1.8}
              className="text-muted"
            />

            <p
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-muted
              "
            >
              Conversations
            </p>

          </div>

          {conversations.length > 0 && (
            <span
              className="
                rounded-md
                border border-theme
                bg-tertiary
                px-1.5 py-0.5
                text-[10px]
                font-medium
                text-muted
              "
            >
              {conversations.length}
            </span>
          )}

        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-2">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  h-11
                  animate-pulse
                  rounded-lg
                  bg-tertiary
                "
              />
            ))}

          </div>
        )}

        {/* Empty */}
        {!loading &&
          conversations.length === 0 && (
            <div
              className="
                mx-1
                rounded-lg
                border border-dashed
                border-theme
                bg-tertiary
                px-4 py-6
                text-center
              "
            >
              <MessageSquare
                size={20}
                strokeWidth={1.5}
                className="
                  mx-auto mb-3
                  text-muted
                "
              />

              <p className="text-sm text-secondary">
                No conversations yet
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-relaxed
                  text-muted
                "
              >
                Start a conversation to begin
                working with your engineering
                assistant.
              </p>
            </div>
          )}

        {/* Conversations */}
        {!loading &&
          conversations.length > 0 && (
            <div className="space-y-1">

              {conversations.map((conversation) => {

                const isSelected =
                  conversation.id ===
                  selectedConversationId;

                return (
                  <button
                    type="button"
                    key={conversation.id}
                    onClick={() =>
                      onSelectConversation(
                        conversation.id
                      )
                    }
                    className={`
                      group
                      relative
                      flex w-full
                      min-w-0
                      items-center gap-3
                      rounded-lg
                      px-3 py-3
                      text-left
                      transition-all duration-150

                      ${
                        isSelected
                          ? `
                            border
                            border-[#d4a72c]/30
                            bg-tertiary
                            text-primary
                          `
                          : `
                            border border-transparent
                            text-secondary
                            hover:border-theme
                            hover:bg-tertiary
                            hover:text-primary
                          `
                      }
                    `}
                  >

                    {/* Active Indicator */}
                    {isSelected && (
                      <span
                        className="
                          absolute
                          left-0
                          top-1/2
                          h-5
                          w-0.5
                          -translate-y-1/2
                          rounded-full
                          bg-[#d4a72c]
                        "
                      />
                    )}

                    {/* Icon */}
                    <MessageSquare
                      size={16}
                      strokeWidth={1.8}
                      className={`
                        shrink-0
                        transition-colors

                        ${
                          isSelected
                            ? "text-[#d4a72c]"
                            : "text-muted group-hover:text-primary"
                        }
                      `}
                    />

                    {/* Title */}
                    <span
                      className="
                        min-w-0
                        flex-1
                        truncate
                        text-sm
                      "
                    >
                      {conversation.title}
                    </span>

                  </button>
                );
              })}

            </div>
          )}

      </div>

      {/* FOOTER */}
      <div
        className="
          shrink-0
          border-t border-theme
          px-4 py-3
        "
      >
        <div
          className="
            flex items-center
            justify-between
            px-2
          "
        >
          <span className="text-[10px] text-muted">
            Engineering Chat
          </span>
        </div>
      </div>

    </aside>
  );
}