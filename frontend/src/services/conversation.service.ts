import api from "@/lib/api";

export interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ConversationMessage {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export async function getConversations(): Promise<Conversation[]> {
  const { data } = await api.get<Conversation[]>(
    "/conversations"
  );

  return data;
}

export async function getConversationMessages(
  conversationId: string
): Promise<ConversationMessage[]> {
  const { data } =
    await api.get<ConversationMessage[]>(
      `/conversations/${conversationId}/messages`
    );

  return data;
}

export async function createConversation(
  title: string
): Promise<Conversation> {
  const { data } = await api.post<Conversation>(
    "/conversations",
    {
      title,
    }
  );

  return data;
}