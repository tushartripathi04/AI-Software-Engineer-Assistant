
import { useEffect, useState } from "react";
import {
  getConversations,
  type Conversation,
} from "@/services/conversation.service";

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadConversations() {
    setLoading(true);
    setError(null);

    try {
      const data = await getConversations();
      setConversations(data);
    } catch (err) {
      console.error("Failed to load conversations:", err);
      setError("Failed to load conversations");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    getConversations()
      .then((data) => {
        if (!cancelled) {
          setConversations(data);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          console.error("Failed to load conversations:", err);
          setError("Failed to load conversations");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    conversations,
    loading,
    error,
    loadConversations,
  };
}
