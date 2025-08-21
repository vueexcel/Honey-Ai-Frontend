"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import ChatListPanel from "@/components/chat/ChatListPanel";
import ChatWindow from "@/components/chat/ChatWindow";
import ProfileSidebar from "@/components/chat/ProfileSidebar";
import ResizeIcon from "../icons/ResizeIcon";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "@/context/UserContextProvider";
import { useChatStreaming } from "@/context/ChatStreamingContext";
import Spinner from "../ui/Spinner";

export default function ChatInterface() {
  const params = useParams();
  const characterId = params.characterId?.[0] as string | undefined;

  const [chatPanelWidth, setChatPanelWidth] = useState<number>(30);
  const [isProfileSidebarVisible, setIsProfileSidebar] = useState<boolean>(false);
  const isResizing = useRef(false);

  const { characters } = useUser();
  const { isLoadingHistory } = useChatStreaming();
  const activeCharacter = useMemo(() => {
    if (!characterId) return undefined;
    return characters.find((char) => char.id === characterId);
  }, [characters, characterId]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      const maxWidth = 60;
      const minWidth = 20;
      const newWidth = Math.max(minWidth, Math.min((e.clientX / window.innerWidth) * 100, maxWidth));
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

  useEffect(() => {
    const checkScreenSize = () => {
      setIsProfileSidebar(window.innerWidth >= 1280);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = "ew-resize";
  };
  const toggleProfileSideBar = () => {
    setIsProfileSidebar((prev) => !prev);
  };

  return (
    <div className="bg-[#121212] text-white flex h-[calc(100dvh-132px)] xl:h-[calc(100dvh-64px)] font-sans overflow-hidden">
      <div className={`${characterId ? "hidden xl:flex" : "flex w-full xl:w-auto"}`}>
        <ChatListPanel width={chatPanelWidth} activeCharacterId={characterId} characters={characters} />
      </div>
      {characterId && (
        <div
          className="w-0.5 bg-[var(--gray-dark)] text-[var(--main)] cursor-ew-resize relative hidden xl:block"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-[var(--gray-dark)] rounded-full bg-[#0c0c0c]">
            <ResizeIcon bgColor="#0c0c0c" />
          </div>
        </div>
      )}
      {characterId ? (
        <div className="flex flex-1 min-w-0 relative">
          {isLoadingHistory ? (
            <div className="w-full flex justify-center items-center">
              <Spinner size={6} />
            </div>
          ) : (
            <>
              <ChatWindow
                characterId={characterId}
                activeCharacter={activeCharacter}
                toggleProfileSideBar={toggleProfileSideBar}
              />
              {isProfileSidebarVisible && (
                <AnimatePresence>
                  <motion.div
                    key="profile-sidebar"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                    className="absolute top-0 right-0 xl:flex xl:relative h-full"
                  >
                    <ProfileSidebar
                      characterId={characterId}
                      activeCharacter={activeCharacter}
                      toggleProfileSideBar={toggleProfileSideBar}
                    />
                  </motion.div>
                </AnimatePresence>
              )}
            </>
          )}
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
