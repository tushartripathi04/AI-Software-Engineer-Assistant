import api from "@/lib/api";

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  response: string;
}

export async function sendMessage(
  message: string
): Promise<ChatResponse> {
  const { data } = await api.post<ChatResponse>(
    "/chat",
    {
      message,
    }
  );

  return data;
}