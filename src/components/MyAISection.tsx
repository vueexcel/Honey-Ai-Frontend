"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MyAiCharacterCard from "./MyAiCharacterCard";
import { useRouter } from "next/navigation";
import { getMyAICharacter } from "@/utils/api";
import { Character } from "@/types/character";

export default function MyAISection() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "premium">("all");
  const [character, setCharacters] = useState<Character[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMyAICharacter();
        console.log(data, "data");
        setCharacters(data);
      } catch (err: any) {
        console.log(err, "err");
      }
    }
    fetchData();
  }, []);
  return (
    <div className="h-full p-6 w-full mt-16 xl:mt-0">
      <div className="px-0 sm:px-6 xl:px-8">
        <h1 className="flex items-center justify-center text-[32px] font-bold mb-12">
          <span>My&nbsp;</span>
          <span className="text-[#ae52e7]">AI</span>
        </h1>
        <div className="grid [grid-template-columns:repeat(2,minmax(130px,180px))] xl:[grid-template-columns:repeat(4,minmax(220px,300px))] gap-3 sm:gap-6 justify-center">
          <div
            className="rounded-[21px] h-[300px] xl:h-[440px] gap-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] cursor-pointer flex flex-col justify-center items-center text-white font-medium"
            onClick={() => router.push("/create-character")}
          >
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
          {character?.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <MyAiCharacterCard
                id={character.id}
                firstName={character.first_name}
                lastName={character.last_name}
                age={character.age}
                description={character.description}
                blurredImageUrl={character.white_desktop_premium_model_experiment_image}
                bodyImages={character.body_images}
                isLocked={false}
                resizedImages={character.resized_images}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
