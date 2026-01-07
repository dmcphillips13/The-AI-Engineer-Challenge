/**
 * API client utilities for communicating with the backend
 * Uses Next.js API routes which proxy to the FastAPI backend
 * This approach works in both local development and Vercel deployment
 */

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  reply: string;
}

/**
 * Sends a chat message via Next.js API route (which proxies to backend)
 * @param message - The user's message to send
 * @returns The AI coach's reply
 * @throws Error if the API request fails
 */
export async function sendChatMessage(message: string): Promise<string> {
  try {
    // Use Next.js API route which handles proxying to the backend
    // This works in both development and production
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message } as ChatRequest),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || errorData.detail || `API request failed with status ${response.status}`
      );
    }

    const data: ChatResponse = await response.json();
    return data.reply;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while sending the message');
  }
}

/**
 * Checks if the backend API is available via Next.js API route
 * @returns true if the API is reachable, false otherwise
 */
export async function checkApiStatus(): Promise<boolean> {
  try {
    const response = await fetch('/api/health');
    return response.ok;
  } catch {
    return false;
  }
}
