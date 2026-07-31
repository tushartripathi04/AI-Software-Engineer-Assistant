import { useState } from "react";
import type { ChatMessage } from "@/types/chat";
import { sendMessage } from "@/services/chat.service";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // Store current conversation
  const [conversationId, setConversationId] =
    useState<string | null>(null);

  async function send(content: string) {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const response = await sendMessage({
        message: content,
        conversation_id: conversationId ?? undefined,
      });

      // Save conversation ID returned by backend
      if (!conversationId) {
        setConversationId(response.conversation_id);
      }

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.response,
        createdAt: new Date(),
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return {
    messages,
    loading,
    send,
    conversationId,
  };
}