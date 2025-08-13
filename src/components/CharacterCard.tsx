"use client";
import Crown from "./icons/Crown";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useChatStreaming } from "@/context/ChatStreamingContext";

interface CharacterCardProps {
  id: string;
  name: string;
  age: number;
  description: string;
  isPremium?: boolean;
  imageUrl?: string;
  videoUrl?: string;
  isOnline?: boolean;
}

export default function CharacterCard({
  id,
  name,
  age,
  description,
  isPremium = false,
  imageUrl,
  videoUrl,
  isOnline = true,
}: CharacterCardProps) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { sendMessage } = useChatStreaming();

  const handleMouseEnter = () => {
    if (videoRef.current) videoRef.current.play();
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleNavigation = async () => {
    const success = await sendMessage("How are you?", id);
    if (success) {
      router.push(`/chat/${id}`);
    }
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleNavigation()}
      className="relative bg-white/70 dark:bg-gray-800/50 rounded-[21px] overflow-hidden transition-all duration-300 cursor-pointer group shadow-md"
    >
      <div className="relative max-h-[440px] bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-400/10 dark:to-pink-400/10">
        {imageUrl && <img src={imageUrl} alt={name} className="w-full h-full object-cover" />}

        {videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            muted
            playsInline
            loop
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 text-white">
          <div className="flex justify-start flex-col px-3 py-4 xl:py-11 xl:px-8 gap:2 xl:gap-4">
            {isPremium && (
              <div className="w-fit h-8 px-[10px] flex items-center gap-[7px] text-sm font-bold rounded-[12px] backdrop-blur-sm text-white bg-white/10">
                <Crown size={12} fill="#ffb930" />
                <span>Premium</span>
              </div>
            )}
            <div className="flex gap-2 text-base xl:text-2xl ">
              <h3 className="font-semibold">{name},</h3>
              <div className="flex items-center gap-3">
                <span>{age}</span>
                {isOnline && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
              </div>
            </div>
            <p className="text-sm line-clamp-2 leading-relaxed after:absolute after:inset-0 after:bg-[linear-gradient(rgba(0,_0,_0,_0)_50%,_rgba(0,_0,_0,_0.4))]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
