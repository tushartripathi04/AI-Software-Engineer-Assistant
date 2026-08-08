import { useEffect, useState } from "react";

import {
  getConversations,
  type Conversation,
} from "@/services/conversation.service";

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadConversations() {
    setLoading(true);
    setError(null);

    try {
      const data = await getConversations();

      setConversations(data);
    } catch (err) {
      console.error(
        "Failed to load conversations:",
        err
      );

      setError("Failed to load conversations");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadConversations();
  }, []);

  return {
    conversations,
    loading,
    error,
    loadConversations,
  };
}