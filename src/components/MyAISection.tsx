"use client";

import { useState } from "react";
import { Plus, Settings, Edit, Trash2, Crown, Heart, MessageCircle, Camera } from "lucide-react";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import { CirclePlus } from "lucide-react";
import { MyAICharacter } from "@/types/my-ai/character.ts";
import MyAiCharacterCard from "./MyAiCharacterCard";

const myCharacters: MyAICharacter[] = [
  {
    id: "59b65a5c-b1a3-4668-b2a6-cf4fc0654a98",
    blurredImageUrl:
      "https://storage.googleapis.com/get_honey_prod/CreateCharacter_PreGenerated_Blurred_Images/Anime/SFW/angel_white.webp",
    resizedImages: [null],
    bodyImages: [null],
    age: 21,
    firstName: "Lian",
    lastName: "Zhang",
    description:
      "🌌 Precision is my art, solitude my canvas. 🎯 Seeking an ally for life's covert missions. 🌿 Let's craft an extraordinary story together! 🌠",
    isLocked: true,
  },
];

export default function MyAISection() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "premium">("all");

  return (
    <div className="h-full p-6">
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="flex items-center justify-center text-[32px] font-bold mb-12">
          <span>My&nbsp;</span>
          <span className="text-[#ae52e7]">AI</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:[grid-template-columns:repeat(4,minmax(220px,300px))] gap-6 justify-center">
          <div className="rounded-[21px] h-[440px] gap-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] cursor-pointer flex flex-col justify-center items-center text-white font-medium">
            <div className="text-[var(--accent)]">
            <svg width="56" height="57" viewBox="0 0 56 57" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="0.5" width="56" height="56" rx="28" fill="white"></rect>
              <path
                d="M37.3327 29.8307H29.3327V37.8307H26.666V29.8307H18.666V27.1641H26.666V19.1641H29.3327V27.1641H37.3327V29.8307Z"
                fill="currentColor"
              ></path>
            </svg>
            </div>
            <span>Create New AI</span>
          </div>
          {myCharacters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <MyAiCharacterCard
                firstName={character.firstName}
                lastName={character.lastName}
                age={character.age}
                description={character.description}
                blurredImageUrl={character.blurredImageUrl}
                bodyImages={character.bodyImages}
                isLocked={character.isLocked}
                resizedImages={character.resizedImages}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
