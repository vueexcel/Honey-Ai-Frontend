import { getSocket } from "@/lib/socket";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import { authService } from "@/services/authServices";
function getAuthToken() {
  return typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
}

export async function apiFetch(endpoint: string, options?: RequestInit) {
  if (!BASE_URL) {
    throw new Error("BASE_URL is not defined in environment variables");
  }
  const token = getAuthToken();
  const url = `${BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options?.headers || {}),
      },
      ...options,
    });
    if (res.status === 403) {
      authService.logout();
      throw new Error("Session expired, logging out...");
    }
    if (res.status === 401) {
      try {
        await refreshAccessToken();
        return apiFetch(endpoint, options);
      } catch (refreshError) {
        authService.logout();
        throw new Error("Session expired, please login again.");
      }
    }

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API request failed: ${res.status} ${res.statusText} - ${errorText}`);
    }
    return await res.json();
  } catch (error: any) {
    console.log(error, "error");
    throw new Error(`Network or parsing error: ${error.message}`);
  }
}

async function refreshAccessToken() {
  const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null;
  if (!refreshToken) throw new Error("No refresh token available");

  const response = await fetch(`${BASE_URL}auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await response.json();
  localStorage.setItem("authToken", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
  return data.access_token;
}

export async function signIn(email: string, password: string) {
  return apiFetch("auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function getCharacters() {
  return apiFetch("character");
}

export async function getCredits() {
  return apiFetch("credits/balance");
}

export async function getConversationCharacter() {
  return apiFetch("character/conversation");
}

export async function getCharacterHistory(character_id: string) {
  return apiFetch(`character/history?character_id=${encodeURIComponent(character_id)}`);
}

export async function startChatStreaming(message: string, character_id: string) {
  const socket = getSocket();
  console.log(socket, "socket");
  return apiFetch("chat/text", {
    method: "POST",
    body: JSON.stringify({ message, socketId: socket.id, character_id }),
  });
}
