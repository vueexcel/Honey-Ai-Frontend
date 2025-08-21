"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Camera, SendHorizonal, Phone, User, MoreVertical, X, ArrowLeft, ChevronUp } from "lucide-react";
import PremiumButton from "../ui/PremiumBtn";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Character } from "@/types/character";
import { useChatStreaming } from "@/context/ChatStreamingContext";
import clsx from "clsx";
import Dropdown from "../ui/Dropdown";
import ImageColorIcon from "../icons/ImageColorIcon";
import VideoColorIcon from "../icons/VideoColorIcon";
import UserIcon from "../icons/UserIcon";

interface ChatWindowProps {
  characterId: string;
  activeCharacter: Character;
  toggleProfileSideBar: () => void;
}

export default function ChatWindow({ characterId, activeCharacter, toggleProfileSideBar }: ChatWindowProps) {
  const [prompt, setPrompt] = useState("");
  const { messages, isStreaming, error, sendMessage } = useChatStreaming();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [activeDate, setActiveDate] = useState("");
  const isDisabled = !prompt.trim() || isStreaming;
  const options = [
    {
      value: "Send me a Photo",
      label: "Send me a Photo ...",
      icon: ImageColorIcon,
      submenu: [
        { value: "Lying on the grass", label: "🌿 Lying on the grass" },
        { value: "Drinking coffee in the morning", label: "🧋 Drinking coffee in the morning" },
        { value: "Standing in the rain", label: "🌧️ Standing in the rain" },
      ],
    },
    {
      value: "Send me a Video",
      label: "Send me a Video",
      icon: VideoColorIcon,
      submenu: [
        { value: "Smiles and waves good morning", label: "👋 Smiles and waves good morning" },
        { value: "Looks at you and softly smiles", label: "😊 Looks at you and softly smiles" },
        { value: "Bite an apple", label: "🍎 Bite an apple" },
      ],
    },
  ];

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveDate(visibleEntry.target.getAttribute("data-date") || "");
        }
      },
      {
        root: document.querySelector("#chatScrollContainer"),
        threshold: 0.1,
      }
    );

    document.querySelectorAll("[data-date]").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [messages]);

  const handleSendMessage = () => {
    if (prompt.trim()) {
      const lower = prompt.toLowerCase();
      const isPhoto = lower.startsWith("send me a photo");
      const isVideo = lower.startsWith("send me a video");
      sendMessage(prompt, characterId, isPhoto);
      setPrompt("");
    }
  };

  function formatChatDate(isoString: string) {
    if (isoString === "") return "";
    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    return `${day} ${month}`;
  }

  return (
    <main className="flex-1 flex flex-col min-w-0 bg-linear-[0deg,_#2a133866,_#0e0e0e66]">
      <header className="flex items-center p-3 xl:py-4 xl:px-8 bg-[var(--purple)]">
        <Link href={`/chat`} className="text-[#cf97f1] xl:hidden">
          <ArrowLeft size={18} className="mr-2" />
        </Link>
        <div className="flex justify-between w-full">
          <div className="flex gap-1 sm:gap-3 items-center">
            <div className="relative h-12 w-12 sm:h-16 sm:w-16 rounded-xl overflow-hidden">
              <img
                src={activeCharacter?.resized_images[0].desktop_image}
                alt={activeCharacter?.first_name}
                className="rounded-xl"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-base sm:text-2xl">{activeCharacter?.first_name}</h2>
              <div className="flex items-center text-[rgb(178,_178,_178)] text-xs sm:text-base">
                <div className="w-[13px] h-[13px] mx-1 sm:mx-3 bg-[var(--green)] rounded-full"></div>
                Online
              </div>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <button className="hover:scale-110 cursor-pointer py-3 relative">
              <Phone size={24} fill="var(--green)" color="" />
              <div className="absolute rounded-full h-2.5 w-2.5 top-0 -right-1 bg-[var(--pink)]"></div>
            </button>
            <button className="py-3" onClick={toggleProfileSideBar}>
              <UserIcon size={20} strokeWidth={3} strokeColor="#bf75ec" className="text-transparent cursor-pointer" />
            </button>
            <button className="py-3">
              <MoreVertical size={24} color="var(--accent)" strokeWidth={3} />
            </button>
          </div>
        </div>
      </header>
      <div className="flex relative bg-[url(https://get-honey.ai/assets/timer-bg-ANSYoOus.svg)] bg-[#381344] bg-center h-18 py-1.5 px-4 items-center justify-between text-sm">
        <div className="hidden sm:flex flex-col text-base">
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
          <div className="flex items-center justify-center rounded-xl text-base px-4 py-2 bg-[rgba(24,_24,_24,_0.8)] backdrop:sm">
            <span className="text-center">{formatChatDate(activeDate)}</span>
          </div>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-y-auto space-y-6" id="chatScrollContainer">
        {messages && (
          <div className="flex gap-6 flex-col">
            {messages.map((msg) => (
              <div key={msg?.id} data-date={msg?.created_at}>
                {msg?.sender_type == "character" ? (
                  <div className="flex gap-1.5 flex-col w-full">
                    {msg?.message_type == "text" ? (
                      <p className="bg-[var(--accent)] text-white rounded-tl-sm rounded-b-2xl rounded-tr-2xl p-3 max-w-md min-w-0 overflow-hidden break-words break-all">
                        {msg?.content}
                      </p>
                    ) : (
                      <>
                        {!msg?.media_url ? (
                          <div className="relative w-[340px] max-w-full aspect-[4/5] rounded-xl overflow-hidden bg-neutral-900 shadow-xl">
                            {/* shimmer */}
                            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.12)_20%,rgba(255,255,255,0.06)_40%)] bg-[length:200%_100%] [animation:shimmer_2s_infinite_linear] opacity-40" />

                            {/* vignette + blur tint */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/35 to-black/60 backdrop-blur-sm" />

                            {/* pulsing glow behind icon */}
                            <div className="absolute inset-0 overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                            </div>
                            <div className="absolute inset-0 grid place-items-center">
                              <svg
                                className="animate-spin h-6 w-6 text-[var(--accent)] mb-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        ) : msg?.message_type === "image" ? (
                          <img
                            src={msg?.media_url}
                            className="rounded-xl max-w-[340px] w-full aspect-[4/5] object-cover opacity-0 transition-opacity duration-500"
                            onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                          />
                        ) : msg?.message_type === "video" ? (
                          <video
                            controls
                            className="rounded-xl max-w-[340px] w-full aspect-[4/5] object-cover opacity-0 transition-opacity duration-500"
                            onLoadedData={(e) => (e.currentTarget.style.opacity = "1")}
                          >
                            <source src={msg?.media_url} type="video/mp4" />
                          </video>
                        ) : null}
                      </>
                    )}
                    <span className="text-[13px] text-[var(--gray)]">{formatTime(msg?.created_at)}</span>
                  </div>
                ) : (
                  <div className="flex gap-1.5 flex-col items-end ">
                    <p className="text-white max-w-md overflow-hidden flex-wrap break-after-all bg-[var(--gray-dark)] rounded-br-sm rounded-t-2xl rounded-bl-2xl p-3">
                      {msg?.content}
                    </p>
                    <span className="text-[13px] text-[var(--gray)]">{formatTime(msg?.created_at)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex w-full p-2 sm:p-4 gap-2 sm:gap-3 bg-transparent justify-center items-center ">
        <div className="flex-1 bg-[var(--main)] border border-[var(--gray-dark)] flex items-end sm:items-center justify-end p-3 rounded-2xl">
          <textarea
            placeholder="Type a message"
            className="flex-1 hide-scrollbar w-full bg-transparent px-1 sm:px-3 py-2 resize-none focus:outline-none text-base min-w-0 min-h-[3.5rem] sm:min-h-[2.5rem]"
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
          <Dropdown
            options={options}
            onChange={(val) => setPrompt(val)}
            placement="top"
            renderButton={({ open, toggle }) => (
              <button
                onClick={toggle}
                className="text-sm sm:text-base flex items-center gap-1.5 bg-[rgb(31,_22,_37)] text-[rgb(207,_151,_241)] p-3 rounded-md font-semibold h-9 cursor-pointer"
              >
                <Camera size={20} /> Ask {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            )}
            renderOption={({ option, selected }) => (
              <div className="flex gap-2">
                {option.icon && <option.icon size={20} className="text-[#ff44ba]" />}
                <span className={clsx(selected && "underline")}>{option.label}</span>
              </div>
            )}
          />
        </div>
        <button
          onClick={handleSendMessage}
          disabled={isDisabled}
          className={`w-12 h-12 sm:w-16 sm:h-16 text-[var(--gray-400)] flex justify-center items-center rounded-xl cursor-pointer ${
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
