import { useState, useEffect, useCallback, useRef } from "react";
import { initSocket, getSocket } from "@/lib/socket";
import { startChatStreaming, getCharacterHistory, startPhotoGeneration } from "@/utils/api";
import { Message } from "@/types/message";
import { useAuth } from "@/context/AuthContextProvider";
import { useUser } from "@/context/UserContextProvider";

export default function useChatStreaming(characterId?: string) {
  const { isLoggedIn } = useAuth();
  const { balance, characters, updateCharacterLastMessage } = useUser();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const messagesRef = useRef(messages);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    async function loadHistory() {
      if (!characterId) return;
      setIsLoadingHistory(true);
      try {
        const characterHistory = await getCharacterHistory(characterId);
        setMessages(characterHistory?.history || []);
      } catch (err: any) {
        setError(err.message || "Failed to load history");
      } finally {
        setIsLoadingHistory(false);
      }
    }
    loadHistory();
  }, [characterId, isLoggedIn]);

  useEffect(() => {
    let socket;
    try {
      socket = getSocket();
    } catch {
      socket = initSocket();
    }
    socketRef.current = socket;

    socket.on("token", (token: string) => {
      setMessages((prev) => {
        if (!prev.length) return prev;
        const last = prev[prev.length - 1];
        if (last.sender_type !== "character") return prev;
        return [...prev.slice(0, -1), { ...last, content: last.content + token }];
      });
    });

    socket.on("imageGenerated", (imgObj: any) => {
      setMessages((prev) => {
        if (!prev.length) return prev;
        const last = prev[prev.length - 1];
        if (last.sender_type !== "character") return prev;
        return [...prev.slice(0, -1), { ...last, media_url: imgObj?.imageUrl }];
      });
    });

    socket.on("imageGenerationError", (data) => {
      setMessages((prev) => {
        if (!prev.length) return prev;
        const last = prev[prev.length - 1];
        if (last.sender_type !== "character") return prev;
        return [
          ...prev.slice(0, -1),
          { ...last, message_type: "text", content: "I can't do this. Let's change the topic" },
        ];
      });
    });

    socket.on("done", () => setIsStreaming(false));
    socket.on("error", (msg: string) => {
      setError(msg);
      setIsStreaming(false);
    });

    return () => {
      socket.off("token");
      socket.off("done");
      socket.off("error");
      socket.off("imageGenerated");
    };
  }, [isLoggedIn]);

  const sendMessage = useCallback(
    async (prompt: string, charId: string, isImage: boolean) => {
      function createTempMessage(
        sender: "user" | "character",
        messageType: "text" | "image",
        content: string
      ): Message {
        return {
          id: `temp-${sender}-msg-${Date.now()}`,
          sender_type: sender,
          message_type: messageType,
          content,
          created_at: new Date().toISOString(),
          media_url: null,
        };
      }

      if (!isLoggedIn) {
        alert("Login To Start Conversation");
        return false;
      }
      if (balance <= 0) {
        alert("Credits Not Sufficient");
        return false;
      }

      const userMsg = createTempMessage("user", "text", prompt);
      const charPlaceholder = createTempMessage("character", isImage ? "image" : "text", "");
      setMessages((prev) => [...prev, userMsg, charPlaceholder]);

      updateCharacterLastMessage(charId, userMsg);
      setError(null);
      setIsStreaming(true);
      if (isImage) {
        // try {
        //   const nsfwCheck = await checkNsfw(prompt, charId);
        //   if (!nsfwCheck.valid) {
        //     setMessages((prev) => [
        //       ...prev.slice(0, -1),
        //       {
        //         ...charPlaceholder,
        //         message_type: "text",
        //         content: "I can't do this. Let's change the topic",
        //       },
        //     ]);
        //     setIsStreaming(false);
        //     return false;
        //   }
        // } catch (err) {
        //   console.error("NSFW check failed:", err);
        //   setMessages((prev) => [
        //     ...prev.slice(0, -1),
        //     { ...charPlaceholder, message_type: "text", content: "Something went wrong while checking your request." },
        //   ]);
        //   setIsStreaming(false);
        //   return false;
        // }
        const curCharacter = characters.find((char) => char.id === charId);
        const characterRef = curCharacter?.resized_images[0]?.default_url;
        const isAnime = curCharacter?.is_anime as boolean;
        await startPhotoGeneration(prompt, charId, characterRef, isAnime);
      } else {
        await startChatStreaming(prompt, charId);
      }
      return true;
    },
    [isLoggedIn, balance, characters]
  );

  return {
    messages,
    balance,
    isStreaming,
    error,
    sendMessage,
    isLoadingHistory,
  };
}
