import { getSocket } from "@/lib/socket";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
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
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API request failed: ${res.status} ${res.statusText} - ${errorText}`);
    }
    return await res.json();
  } catch (error: any) {  
    console.log(error, 'error')
    throw new Error(`Network or parsing error: ${error.message}`);
  }
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

export async function startChatStreaming(message: string) {
  const socket = getSocket();
  console.log(socket, "socket");
  return apiFetch("chat/text", {
    method: "POST",
    body: JSON.stringify({ message, socketId: socket.id }),
  });
}
