"use client";

import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { getCredits, getConversationCharacter } from "@/utils/api";
import { initSocket, getSocket } from "@/lib/socket";
import { useAuth } from "./AuthContextProvider";
import { Character } from "@/types/character";

type UserContextType = {
  balance: number;
  setBalance: (balance: number) => void;
  characters: Character[];
  refreshCharacters: () => Promise<void>;
  refreshBalance: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [characters, setCharacters] = useState<Character[]>([]);
  const socketRef = useRef<any>(null);

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

  useEffect(() => {
    if (!isLoggedIn) return;

    refreshBalance();
    refreshCharacters();

    // socket setup
    let socket;
    try {
      socket = getSocket();
    } catch {
      socket = initSocket();
    }
    socketRef.current = socket;

    socket.on("balance", (newBalance: number) => {
      setBalance(newBalance);
    });

    return () => {
      socket.off("balance");
    };
  }, [isLoggedIn, refreshBalance, refreshCharacters]);

  return (
    <UserContext.Provider
      value={{
        balance,
        setBalance,
        characters,
        refreshCharacters,
        refreshBalance,
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
