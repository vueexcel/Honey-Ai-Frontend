import { useState, useEffect, useCallback, useRef } from "react";
import { initSocket, getSocket } from "@/lib/socket";
import { startChatStreaming, getCharacterHistory, startPhotoGeneration, generateTTS, generateVideo } from "@/utils/api";
import { Message } from "@/types/message";
import { useAuth } from "@/context/AuthContextProvider";
import { useUser } from "@/context/UserContextProvider";

export default function useChatStreaming(characterId?: string) {
  const { isLoggedIn } = useAuth();
  const { balance, setBalance, characters, updateCharacterLastMessage } = useUser();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const messagesRef = useRef(messages);
  const socketRef = useRef<any>(null);
  const [imageProgress, setImageProgress] = useState<number | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

    socket.on("message_saved", ({ messageId }) => {
      setMessages((prev) => {
        if (!prev.length) return prev;
        const last = prev[prev.length - 1];
        if (last.sender_type !== "character") return prev;
        return [...prev.slice(0, -1), { ...last, id: messageId }];
      });
    });

    socket.on("imageGenerated", (imgObj: any) => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      setImageProgress(100);
      setTimeout(() => setImageProgress(null), 1000);
      setMessages((prev) => {
        if (!prev.length) return prev;
        const last = prev[prev.length - 1];
        if (last.sender_type !== "character") return prev;
        return [...prev.slice(0, -1), { ...last, media_url: imgObj?.imageUrl }];
      });
    });

    socket.on("videoGenerated", (videoObj: any) => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      setImageProgress(100);
      setTimeout(() => setImageProgress(null), 1000);
      setMessages((prev) => {
        if (!prev.length) return prev;
        const last = prev[prev.length - 1];
        if (last.sender_type !== "character") return prev;
        return [...prev.slice(0, -1), { ...last, media_url: videoObj?.videoUrl }];
      });
    });

    socket.on("imageGenerationError", (data) => {
      setImageProgress(null);
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

    socket.on("videoGenerationError", (data) => {
      setImageProgress(null);
      alert("error in generating video");
      setMessages((prev) => {
        if (!prev.length) return prev;
        const last = prev[prev.length - 1];
        if (last.sender_type !== "character") return prev;
        return [...prev.slice(0, -1)];
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
      socket.off("imageGenerationError");
    };
  }, [isLoggedIn]);

  const sendMessage = useCallback(
    async (prompt: string, charId: string, isImage: boolean) => {
      function createTempMessage(
        sender: "user" | "character",
        messageType: "text" | "image",
        charId: string,
        content: string
      ): Message {
        return {
          id: `temp-${sender}-msg-${Date.now()}`,
          sender_type: sender,
          message_type: messageType,
          character_id: charId,
          content,
          created_at: new Date().toISOString(),
          media_url: null,
          audio_url: null,
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

      const userMsg = createTempMessage("user", "text", charId, prompt);
      const charPlaceholder = createTempMessage("character", isImage ? "image" : "text", charId, "");
      setMessages((prev) => [...prev, userMsg, charPlaceholder]);

      updateCharacterLastMessage(charId, userMsg);
      setError(null);
      setIsStreaming(true);
      if (isImage) {
        const curCharacter = characters.find((char) => char.id === charId);
        const characterRef = curCharacter?.resized_images[0]?.default_url;
        const isAnime = curCharacter?.is_anime as boolean;
        setImageProgress(0);
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = setInterval(() => {
          setImageProgress((prev) => {
            if (prev === null) return 0;
            if (prev >= 95) return prev;
            return prev + 1;
          });
        }, 250);
        await startPhotoGeneration(prompt, charId, characterRef, isAnime);
      } else {
        await startChatStreaming(prompt, charId);
      }
      return true;
    },
    [isLoggedIn, balance, characters]
  );

  const requestAudio = useCallback(
    async (messageId: string) => {
      try {
        const { success, audioUrl } = await generateTTS(messageId);
        if (!success) return;
        setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, audio_url: audioUrl } : msg)));
      } catch (err: any) {
        setError("Failed to generate audio");
      }
    },
    [setBalance]
  );

  const requestVideo = useCallback(
    async (imageUrl: string, charId: string) => {
      function createTempMessage(sender: "user" | "character", content: string): Message {
        return {
          id: `temp-${sender}-msg-${Date.now()}`,
          sender_type: sender,
          message_type: "video",
          character_id: charId,
          content,
          created_at: new Date().toISOString(),
          media_url: null,
          audio_url: null,
        };
      }
      try {
        if (!isLoggedIn) {
          alert("Login To Start Conversation");
          return false;
        }
        if (balance <= 0) {
          alert("Credits Not Sufficient");
          return false;
        }
        const charPlaceholder = createTempMessage("character", "");
        setMessages((prev) => [...prev, charPlaceholder]);
        setError(null);
        setIsStreaming(true);
        await generateVideo(imageUrl, charId);
        setImageProgress(0);
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = setInterval(() => {
          setImageProgress((prev) => {
            if (prev === null) return 0;
            if (prev >= 95) return prev;
            return prev + 1;
          });
        }, 500);
        return true;
      } catch (err: any) {
        setError("Failed to generate audio");
        return false;
      }
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
    imageProgress,
    requestAudio,
    requestVideo,
  };
}
