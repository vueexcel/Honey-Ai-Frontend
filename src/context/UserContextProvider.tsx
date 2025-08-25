"use client";

import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { getCredits, getConversationCharacter, startBulkImageGeneration } from "@/utils/api";
import { initSocket, getSocket } from "@/lib/socket";
import { useAuth } from "./AuthContextProvider";
import { Character } from "@/types/character";

type UserContextType = {
  balance: number;
  setBalance: (balance: number) => void;
  characters: Character[];
  refreshCharacters: () => Promise<void>;
  refreshBalance: () => Promise<void>;
  updateCharacterLastMessage: (charId: string, message: any) => void;
  bulkImageGenerator: (prompt: string, characterId: string, count: number, curCharacter: Character) => Promise<void>;
  isBulkImageGenerating: boolean;
  curBulkRequestId: string;
  setImagesGenerated: any;
  bulkImagesToGenerate: number;
  imagesGenerated: any;
  setIsBulkImageGenerating: (s: boolean) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();

  const [balance, setBalance] = useState<number>(0);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isBulkImageGenerating, setIsBulkImageGenerating] = useState<boolean>(false);
  const [curBulkRequestId, setCurBulkRequestId] = useState<string>("");
  const [imagesGenerated, setImagesGenerated] = useState<any[]>([]);
  const [bulkImagesToGenerate, setBulkImagesToGenerate] = useState<number>(0);

  const socketRef = useRef<any>(null);
  const curBulkRequestIdRef = useRef<string>(curBulkRequestId);
  const bulkImagesToGenerateRef = useRef<number>(bulkImagesToGenerate);

  // Keep refs in sync
  useEffect(() => {
    curBulkRequestIdRef.current = curBulkRequestId;
  }, [curBulkRequestId]);

  useEffect(() => {
    bulkImagesToGenerateRef.current = bulkImagesToGenerate;
  }, [bulkImagesToGenerate]);

  const refreshBalance = useCallback(async () => {
    try {
      const data = await getCredits();
      setBalance(data.balance);
    } catch (err) {
      console.error("Failed to fetch credits", err);
    }
  }, []);

  const refreshCharacters = useCallback(async () => {
    try {
      const data = await getConversationCharacter();
      setCharacters(data?.characters || []);
    } catch (err: any) {
      console.error("Failed to fetch conversation characters", err);
    }
  }, []);

  const updateCharacterLastMessage = useCallback((charId: string, message: any) => {
    setCharacters((prevChars) => {
      let updated = prevChars.map((c) => (c.id === charId ? { ...c, last_message: message } : c));

      updated.sort((a, b) => {
        const aTime = a.last_message ? new Date(a.last_message.created_at).getTime() : 0;
        const bTime = b.last_message ? new Date(b.last_message.created_at).getTime() : 0;
        return bTime - aTime;
      });

      return updated;
    });
  }, []);

  const bulkImageGenerator = useCallback(
    async (prompt: string, charId: string, count: number, curCharacter: Character) => {
      const characterRef = curCharacter?.resized_images[0]?.default_url;
      const isAnime = curCharacter?.is_anime as boolean;
      const { bulkRequestId } = await startBulkImageGeneration(prompt, charId, characterRef, isAnime, count);

      setBulkImagesToGenerate(count);
      setCurBulkRequestId(bulkRequestId);
      setIsBulkImageGenerating(true);
      setImagesGenerated([]);
    },
    []
  );

  useEffect(() => {
    if (!isLoggedIn) return;

    // Initialize singleton socket
    let socket;
    try {
      socket = getSocket() || initSocket();
    } catch {
      socket = initSocket();
    }
    socketRef.current = socket;

    const handleBulkImages = ({ bulkRequestId, imageUrls }: any) => {
      if (curBulkRequestIdRef.current === bulkRequestId) {
        setImagesGenerated((prev) => {
          const updated = [...prev, ...imageUrls];
          if (updated.length >= bulkImagesToGenerateRef.current) {
            setIsBulkImageGenerating(false);
          }
          return updated;
        });
      }
    };

    const handleBalance = (newBalance: number) => {
      setBalance(newBalance);
    };

    socket.on("bulkImagesGenerated", handleBulkImages);
    socket.on("balance", handleBalance);

    return () => {
      socket.off("bulkImagesGenerated", handleBulkImages);
      socket.off("balance", handleBalance);
    };
  }, [isLoggedIn]);

  // Initial data fetch
  useEffect(() => {
    if (!isLoggedIn) return;
    refreshBalance();
    refreshCharacters();
  }, [isLoggedIn, refreshBalance, refreshCharacters]);

  return (
    <UserContext.Provider
      value={{
        balance,
        isBulkImageGenerating,
        characters,
        curBulkRequestId,
        bulkImagesToGenerate,
        setBalance,
        refreshCharacters,
        refreshBalance,
        updateCharacterLastMessage,
        bulkImageGenerator,
        setImagesGenerated,
        setIsBulkImageGenerating,
        imagesGenerated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserContextProvider");
  return ctx;
}
