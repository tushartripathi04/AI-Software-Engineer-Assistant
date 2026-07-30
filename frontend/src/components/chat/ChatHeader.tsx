export default function ChatHeader() {
  return (
    <div className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">
      <div>
        <h2 className="text-xl font-semibold text-white">
          AI Software Engineer
        </h2>

        <p className="text-sm text-slate-400">
          Chat Assistant
        </p>
      </div>

      <div className="rounded-lg bg-blue-600/20 px-3 py-2 text-sm text-blue-400">
        GPT-4
      </div>
    </div>
  );
}