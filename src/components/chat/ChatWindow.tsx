"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Camera, SendHorizonal, Phone, User, MoreVertical, X, ArrowLeft } from "lucide-react";
import PremiumButton from "../ui/PremiumBtn";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Character } from "@/types/character";
import { useChatStreaming } from "@/context/ChatStreamingContext";

interface ChatWindowProps {
  characterId: string;
  chatHistory: any;
  activeCharacter: Character;
}

export default function ChatWindow({ characterId, chatHistory, activeCharacter }: ChatWindowProps) {
  const params = useParams();
  const [prompt, setPrompt] = useState("");
  const { messages, balance, isStreaming, error, sendMessage } = useChatStreaming();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const isDisabled = !prompt.trim() || isStreaming;

  function formatTime(isoString: string) {
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutesStr} ${ampm}`;
  }
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (prompt.trim()) {
      sendMessage(prompt, characterId);
      setPrompt("");
    }
  };

  return (
    <main className="flex-1 flex flex-col min-w-0 bg-linear-[0deg,_#2a133866,_#0e0e0e66]">
      <header className="flex items-center p-3 xl:py-4 xl:px-8 bg-[var(--purple)]">
        <Link href={`/chat`} className="text-[#cf97f1] xl:hidden">
          <ArrowLeft size={18} className="mr-2" />
        </Link>
        <div className="flex justify-between w-full">
          <div className="flex gap-3 items-center">
            <div className="relative h-16 w-16 rounded-xl overflow-hidden">
              <img
                src={activeCharacter?.resized_images[0].desktop_image}
                alt={activeCharacter?.first_name}
                className="rounded-xl"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-2xl">{activeCharacter?.first_name}</h2>
              <div className="flex items-center text-[rgb(178,_178,_178)]">
                <div className="w-[13px] h-[13px] mx-3 bg-[var(--green)] rounded-full"></div>
                Online
              </div>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <button className="hover:scale-110 cursor-pointer py-3 relative">
              <Phone size={24} fill="var(--green)" color="" />
              <div className="absolute rounded-full h-2.5 w-2.5 top-0 -right-1 bg-[var(--pink)]"></div>
            </button>
            <button className="py-3">
              <User size={24} color="var(--accent) " />
            </button>
            <button className="py-3">
              <MoreVertical size={24} color="var(--accent)" strokeWidth={3} />
            </button>
          </div>
        </div>
      </header>
      <div className="flex relative bg-[url(https://get-honey.ai/assets/timer-bg-ANSYoOus.svg)] bg-[#381344] bg-center h-18 py-1.5 px-4 items-center justify-between text-sm">
        <div className="flex flex-col text-base">
          <p className="font-bold mb-1.5">Hurry Up!</p>
          <p className="text-[#ae52e7] font-semibold">Limited-Time Offer:</p>
        </div>

        <div className="flex items-center gap-2">
          <PremiumButton />
        </div>
        <div className="flex gap-1">
          <div className="bg-black/30 px-2 py-1 rounded-md text-center">
            <div className="font-bold text-lg">05</div>
            <div className="text-xs">Min</div>
          </div>
          <div className="bg-black/30 px-2 py-1 rounded-md text-center">
            <div className="font-bold text-lg">45</div>
            <div className="text-xs">Sec</div>
          </div>
          <button className="text-white ml-1">
            <X size={20} />
          </button>
        </div>

        <div className="text-[var(--gray)] absolute w-full justify-center -bottom-12 left-0 flex items-center">
          <div className="flex items-center justify-center rounded-xl text-base px-4 py-2 bg-[rgba(24,_24,_24,_0.8)] z-20 backdrop:sm">
            <span className=" text-center">August 4</span>
          </div>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {messages && (
          <div className="flex gap-6 flex-col">
            {messages.map((msg) => (
              <div key={msg?.id}>
                {msg?.sender_type == "character" ? (
                  <div className="flex gap-1.5 flex-col">
                    <p className="bg-[var(--accent)] text-white rounded-tl-sm rounded-b-2xl rounded-tr-2xl p-3 max-w-md overflow-hidden">
                      {msg?.content}
                    </p>
                    <span className="text-[13px] text-[var(--gray)]">{formatTime(msg?.created_at)}</span>
                  </div>
                ) : (
                  <div className="flex gap-1.5 flex-col">
                    <p className="text-white p-1 max-w-md overflow-hidden">{msg?.content}</p>
                    <span className="text-[13px] text-[var(--gray)]">{formatTime(msg?.created_at)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex w-full p-4 gap-3 bg-transparent">
        <div className="flex-1 bg-[var(--main)] border border-[var(--gray-dark)] flex items-center p-3 rounded-2xl">
          <textarea
            placeholder="Type a message"
            className="flex-1 bg-transparent px-3 py-2 resize-none focus:outline-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            rows={1}
          />
          <button className="text-base flex items-center gap-1.5 bg-[rgb(31,_22,_37)] text-[rgb(207,_151,_241)] p-3 rounded-md font-semibold h-9">
            <Camera size={20} /> Ask <ChevronDown size={20} />
          </button>
        </div>
        <button
          onClick={handleSendMessage}
          disabled={isDisabled}
          className={`
    w-[62px] h-[62px] text-[var(--gray-400)] flex justify-center items-center rounded-xl
    cursor-pointer
    ${
      isDisabled
        ? "bg-[var(--gray-dark)] cursor-not-allowed"
        : "bg-linear-[91deg,_#ff44ba_0%,_#8840b5_100%] hover:bg-linear-[91deg,_#ff66c6_0%,_#c974fe_100%]"
    }
  `}
        >
          <SendHorizonal size={24} fill={isDisabled ? "#414141" : "white"} color="" className="hover:scale-120" />
        </button>
      </div>
    </main>
  );
}
