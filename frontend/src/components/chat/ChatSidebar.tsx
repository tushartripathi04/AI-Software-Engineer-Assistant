import { Plus, MessageSquare } from "lucide-react";

const conversations = {
  Today: [
    "Backend API",
    "React Dashboard",
    "Resume Builder",
  ],
  Yesterday: [
    "SQL Generator",
    "FastAPI Authentication",
  ],
  "Previous 7 Days": [
    "Interview Questions",
    "Portfolio Website",
    "AI Software Engineer",
  ],
};

export default function ChatSidebar() {
  return (
    <aside className="w-80 border-r border-slate-800 bg-slate-900 flex flex-col">

      {/* New Chat */}

      <div className="p-5 border-b border-slate-800">

        <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 font-medium text-white transition hover:scale-[1.02]">

          <Plus size={18} />

          New Chat

        </button>

      </div>

      {/* History */}

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-7">

        {Object.entries(conversations).map(([group, chats]) => (

          <div key={group}>

            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">

              {group}

            </p>

            <div className="space-y-2">

              {chats.map((chat) => (

                <button
                  key={chat}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >

                  <MessageSquare size={16} />

                  <span className="truncate">

                    {chat}

                  </span>

                </button>

              ))}

            </div>

          </div>

        ))}

      </div>

    </aside>
  );
}