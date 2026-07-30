import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";

export default function Chat() {
  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">

      <ChatSidebar />

      <div className="flex flex-1 flex-col">

        <ChatHeader />

        <ChatMessages />

        <ChatInput />

      </div>

    </div>
  );
}