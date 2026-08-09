import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatContainer from "@/components/chat/chatContainer";

export default function Chat() {
  return (
    <div className="flex h-full min-h-0 w-full overflow-hidden">
      <ChatSidebar />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <div className="shrink-0">
          <ChatHeader />
        </div>

        <ChatContainer />
      </div>
    </div>
  );
}