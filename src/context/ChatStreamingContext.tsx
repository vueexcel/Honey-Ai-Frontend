"use client";
import React, { createContext, useContext } from "react";
import useChatStreamingHook from "@/hooks/useChatStreaming";
import { Message } from "@/types/message";

interface ChatStreamingContextValue {
  messages: Message[];
  balance: number | null;
  isStreaming: boolean;
  error: string | null;
  sendMessage: (prompt: string, characterId: string, isImage: boolean) => Promise<void>;
  isLoadingHistory: boolean;
  imageProgress: number;
}

const ChatStreamingContext = createContext<ChatStreamingContextValue | null>(null);

export function ChatStreamingProvider({ children, characterId }: { children: React.ReactNode; characterId?: string }) {
  const chatStreaming = useChatStreamingHook(characterId);
  return <ChatStreamingContext.Provider value={chatStreaming}>{children}</ChatStreamingContext.Provider>;
}

export function useChatStreaming() {
  const ctx = useContext(ChatStreamingContext);
  if (!ctx) throw new Error("useChatStreaming must be used inside ChatStreamingProvider");
  return ctx;
}
