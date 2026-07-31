import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatContainer from "@/components/chat/ChatContainer";

export default function Chat() {
  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">

      <ChatSidebar />

      <div className="flex flex-1 flex-col">

        <ChatHeader />

        <ChatContainer />

      </div>

    </div>
  );
}