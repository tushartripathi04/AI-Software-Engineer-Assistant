import type { ChatMessage } from "@/types/chat";

interface Props {
  message: ChatMessage;
}

export default function UserMessage({
  message,
}: Props) {
  return (
    <div className="flex justify-end px-2">

      <div
        className="
          max-w-2xl
          rounded-2xl
          border
          border-[#d4a72c]/40
          bg-tertiary
          px-5
          py-3.5
          text-primary
          shadow-[0_4px_20px_rgba(0,0,0,0.08)]
          transition-colors duration-300
        "
      >
        <p
          className="
            whitespace-pre-wrap
            text-[15px]
            leading-7
            text-primary
          "
        >
          {message.content}
        </p>
      </div>

    </div>
  );
}