import { useState } from "react";

import type { ChatMessage } from "@/types/chat";

import { sendMessage } from "@/services/chat.service";
import {
  getConversationMessages,
} from "@/services/conversation.service";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const [conversationId, setConversationId] =
    useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  /**
   * Load an existing conversation
   */
  async function loadConversation(
    id: string
  ) {
    setLoading(true);
    setError(null);

    try {
      const data =
        await getConversationMessages(id);

      const loadedMessages: ChatMessage[] =
        data.map((message) => ({
          id: message.id,
          role: message.role,
          content: message.content,
          createdAt: new Date(
            message.created_at
          ),
        }));

      setConversationId(id);
      setMessages(loadedMessages);
    } catch (err) {
      console.error(
        "Failed to load conversation:",
        err
      );

      setError(
        "Failed to load conversation."
      );
    } finally {
      setLoading(false);
    }
  }

  /**
   * Start a new chat
   */
  function newChat() {
    setConversationId(null);
    setMessages([]);
    setError(null);
  }

  /**
   * Send message to AI
   */
  async function send(content: string) {
    const trimmedContent = content.trim();

    if (!trimmedContent || loading) {
      return;
    }

    setError(null);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedContent,
      createdAt: new Date(),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    try {
      const response = await sendMessage({
        message: trimmedContent,
        conversation_id:
          conversationId ?? undefined,
      });

      /*
       * Very important:
       * Save the conversation ID returned by
       * the backend.
       */
      if (
        !conversationId &&
        response.conversation_id
      ) {
        setConversationId(
          response.conversation_id
        );
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
    } catch (err) {
      console.error(
        "Chat request failed:",
        err
      );

      setError(
        "Unable to get a response from the AI. Please try again."
      );

      /*
       * Remove optimistic user message
       * when request fails.
       */
      setMessages((prev) =>
        prev.filter(
          (message) =>
            message.id !== userMessage.id
        )
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    messages,
    loading,
    error,
    send,
    conversationId,
    loadConversation,
    newChat,
  };
}