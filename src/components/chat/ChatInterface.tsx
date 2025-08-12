"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import ChatListPanel from "@/components/chat/ChatListPanel";
import ChatWindow from "@/components/chat/ChatWindow";
import ProfileSidebar from "@/components/chat/ProfileSidebar";
import ResizeIcon from "../icons/ResizeIcon";
import { getConversationCharacter, getCharacterHistory } from "@/utils/api";
import type { Character } from "@/types/character";
import { Message } from "@/types/message";

export default function ChatInterface() {
  const params = useParams();
  const characterId = params.characterId?.[0] as string | undefined;

  const [chatPanelWidth, setChatPanelWidth] = useState<number>(440);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [error, setError] = useState("");
  const isResizing = useRef(false);
  const activeCharacter = useMemo(() => {
    if (!characterId) return undefined;
    return characters.find((char) => char.id === characterId);
  }, [characters, characterId]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getConversationCharacter();
        setCharacters(data?.characters || []);
      } catch (err: any) {
        setError(err.message);
      }
    }
    fetchData();
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      const maxWidth = window.innerWidth - 400;
      const newWidth = Math.max(400, Math.min(e.clientX, maxWidth));
      setChatPanelWidth(newWidth);
    };
    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = "default";
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = "ew-resize";
  };

  return (
    <div className="bg-[#121212] text-white flex h-[calc(100dvh-132px)]  xl:h-[calc(100dvh-64px)] font-sans overflow-hidden">
      <div className={`${characterId ? "hidden xl:flex" : "flex w-full xl:w-auto"}`}>
        <ChatListPanel width={chatPanelWidth} activeCharacterId={characterId} characters={characters} />
      </div>
      {characterId && (
        <div
          className="w-0.5 bg-[var(--gray-dark)] text-[var(--main)] cursor-ew-resize relative hidden xl:block"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-[var(--gray-dark)] rounded-full">
            <ResizeIcon />
          </div>
        </div>
      )}
      {characterId ? (
        <div className="flex flex-1 min-w-0">
          <ChatWindow characterId={characterId} chatHistory={chatHistory} activeCharacter={activeCharacter} />
          <div className="hidden xl:flex">
            <ProfileSidebar characterId={characterId} activeCharacter={activeCharacter} />
          </div>
        </div>
      ) : (
        <div className="hidden xl:flex flex-1 items-center justify-center bg-[#121212]">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Welcome to the Chat</h2>
            <p className="text-gray-400 mt-2">Select a character from the list to start a conversation.</p>
          </div>
        </div>
      )}
    </div>
  );
}
