import type { ChatMessage } from "@/types/chat";

interface Props {
  message: ChatMessage;
}

export default function UserMessage({
  message,
}: Props) {
  return (
    <div className="flex justify-end">
      <div className="max-w-xl rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-4 text-white shadow-xl">
        <p className="whitespace-pre-wrap leading-7">
          {message.content}
        </p>
      </div>
    </div>
  );
}