import { useState, useEffect, useCallback, useRef } from "react";
import { initSocket } from "@/lib/socket";
import { startChatStreaming, getCredits, getCharacterHistory } from "@/utils/api";
import { Message } from "@/types/message";

export default function useChatStreaming(characterId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesRef = useRef(messages);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    async function loadHistory() {
      if (!characterId) return;
      try {
        const characterHistory = await getCharacterHistory(characterId);
        setMessages(characterHistory?.history || []);
      } catch (err: any) {
        setError(err.message || "Failed to load history");
      }
    }
    loadHistory();
  }, [characterId]);

  useEffect(() => {
    const socket = initSocket();
    socketRef.current = socket;
    async function fetchBalance() {
      const balance = await getCredits();
      setBalance(balance.balance);
    }

    fetchBalance();
    socket.on("token", (token: string) => {
      setMessages((prev) => {
        if (!prev.length) return prev;
        const last = prev[prev.length - 1];
        if (last.sender_type !== "character") return prev;

        return [...prev.slice(0, -1), { ...last, content: last.content + token }];
      });
    });

    socket.on("balance", (newBalance: number) => {
      setBalance(newBalance);
    });
    socket.on("done", () => setIsStreaming(false));
    socket.on("error", (msg: string) => {
      setError(msg);
      setIsStreaming(false);
    });

    return () => {
      socket.off("token");
      socket.off("balance");
      socket.off("done");
      socket.off("error");
    };
  }, []);

  const sendMessage = useCallback(async (prompt: string, charId: string) => {
    if (balance <= 0) {
      alert("Credits Not Sufficient");
      return;
    }
    setMessages((prev) => [
      ...prev,
      {
        id: "temp-user-msg-" + Date.now(),
        sender_type: "user",
        message_type: "text",
        content: prompt,
        created_at: new Date().toISOString(),
      },
      {
        id: "temp-char-msg-" + Date.now(),
        sender_type: "character",
        message_type: "text",
        content: "",
        created_at: new Date().toISOString(),
      },
    ]);
    setError(null);
    setIsStreaming(true);
    await startChatStreaming(prompt, charId);
  }, []);

  return {
    messages,
    balance,
    isStreaming,
    error,
    sendMessage,
  };
}
