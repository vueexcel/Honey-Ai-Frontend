"use client";

import { motion } from "framer-motion";
import { MyAICharacter } from "@/types/my-ai/character";
import Button from "./ui/Button";

export default function MyAiCharacterCard({
  id,
  blurredImageUrl,
  resizedImages,
  bodyImages,
  age,
  firstName,
  lastName,
  description,
  isLocked,
}: Partial<MyAICharacter>) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="relative bg-white/70 dark:bg-gray-800/50 rounded-[21px] overflow-hidden transition-all duration-300 cursor-pointer group shadow-md"
    >
      <div className="relative h-[440px] bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-400/10 dark:to-pink-400/10">
        {/* Image (always shown) */}
        {isLocked ? (
          <img src={blurredImageUrl} alt={firstName} className="w-full h-full object-cover" />
        ) : (
          <div></div>
          // <img src={resizedImages[0].default_url} alt={firstName} className="w-full h-full object-cover" />
        )}

        {/* Character Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 text-white">
          <div className="flex justify-start flex-col py-11 px-8 gap-4">
            <div className="flex gap-2 text-2xl">
              <h3 className="font-semibold">{firstName},</h3>
              <div className="flex items-center gap-3">
                <span>{age}</span>
              </div>
            </div>
            <p className="text-sm line-clamp-2 leading-relaxed after:absolute after:inset-0 after:bg-[linear-gradient(rgba(0,_0,_0,_0)_50%,_rgba(0,_0,_0,_0.4))]">
              {description}
            </p>
          </div>
        </div>
        <div className="absolute inset-0 z-20 flex justify-center items-center">
          <Button
            variant="gradient"
            className="w-1/2 h-12 rounded-xl flex items-center justify-center font-medium text-base gap-2 "
          >
            Unlock Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
