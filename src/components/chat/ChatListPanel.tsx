"use client";

import Link from "next/link";
import { Search, Plus, X } from "lucide-react";
import PremiumButton from "../ui/PremiumBtn";
import type { Character } from "@/types/character";
import { useChatStreaming } from "@/context/ChatStreamingContext";

interface ChatListPanelProps {
  width: number;
  activeCharacterId?: string;
  characters?: Character[];
}

export default function ChatListPanel({
  width,
  activeCharacterId,
  characters,
}: ChatListPanelProps) {
  const { messages } = useChatStreaming();
  const lastMessage =
    messages.length > 0 ? messages[messages.length - 1] : null;
  return (
    <aside
      className="bg-[var(--secondary)] flex flex-col shrink-0 w-full xl:w-auto"
      style={{
        width: width && window.innerWidth >= 1280 ? `${width}vw` : undefined,
      }}
    >
      <div className="p-4 flex gap-3 flex-col bg-linear-[144deg,_rgb(24,_24,_24)_1.24%,_rgb(16,_16,_16)]">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold m-0">Chat</h1>
          <button className="flex items-center gap-3 font-semibold text-base bg-[rgb(49,_49,_49)] p-3 h-11 rounded-lg hover:bg-linear-[91deg,rgb(255,_102,_198),rgb(201,_116,_254)] cursor-pointer">
            Add chat <Plus size={16} />
          </button>
        </div>
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search for a profile..."
            className="w-full bg-[var(--main)] rounded-xl h-12 text-[var(--gray)] pl-12 pr-4 py-2 focus:outline-none"
          />
        </div>
      </div>

      <div className="py-1.5 px-4 bg-[url(https://get-honey.ai/assets/timer-bg-ANSYoOus.svg)] bg-center h-[72px] gap-2 rounded-lg flex items-center justify-between">
        <div className="hidden md:block">
          <p className="text-base mb-1.5 font-bold">SPECIAL OFFER</p>
          <p className="text-base text-[#ae52e7]">Get it now</p>
        </div>
        <PremiumButton />
        <button className="text-white/70 hover:text-white">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto max-w-dvw">
        <ul className="space-y-1 py-2 pl-3 pr-1">
          {characters?.map((user) => (
            <li key={user.id}>
              <Link
                href={`/chat/${user.id}`}
                className={`w-full text-left py-3.5 px-4 flex items-center gap-3 transition-colors ${
                  user.id === activeCharacterId
                    ? "bg-[var(--gray-500)] border-l-2 border-purple-500"
                    : "hover:bg-[#2C2C2C]"
                }`}
              >
                <div className="relative h-[54px] w-[54px] rounded-xl overflow-hidden shrink-0">
                  <img
                    src={user?.resized_images[0].desktop_image}
                    alt={user.first_name}
                    className="rounded-xl"
                  />
                  {user.id === activeCharacterId && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#2C2C2C]"></div>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-bold">{user.first_name}</p>
                  <p className="text-[var(--gray)] flex items-center gap-1">
                    <span className="truncate overflow-hidden whitespace-nowrap min-w-0 flex-1">
                      {(user.id === activeCharacterId
                        ? lastMessage?.content
                        : user?.last_message?.content) || ""}
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
