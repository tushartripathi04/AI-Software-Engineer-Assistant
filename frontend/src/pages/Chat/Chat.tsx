import { useState } from "react";

import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatContainer from "@/components/chat/ChatContainer";

export default function Chat() {
  const [
    selectedConversationId,
    setSelectedConversationId,
  ] = useState<string | null>(null);

  function handleSelectConversation(
    id: string
  ) {
    setSelectedConversationId(id);
  }

  function handleNewChat() {
    setSelectedConversationId(null);
  }

  return (
    <div className="flex h-full min-h-0 flex-1 overflow-hidden">

      {/* Conversation sidebar */}
      <div className="h-full shrink-0">
        <ChatSidebar
          selectedConversationId={
            selectedConversationId
          }
          onSelectConversation={
            handleSelectConversation
          }
          onNewChat={handleNewChat}
        />
      </div>

      {/* Main chat */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">

        <ChatHeader />

        <ChatContainer
          conversationId={
            selectedConversationId
          }
        />

      </div>

    </div>
  );
}