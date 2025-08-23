"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Button from "../ui/Button";
import { Character } from "@/types/character";
import AnimeIcon from "../icons/AnimeIcon";
import FemaleIcon from "../icons/FemaleIcon";
import { useSearchParams } from "next/navigation";
type CharacterSelectorProps = {
  onClick: () => void;
  characters: Character[];
  handleCharacterSelect: (character: Character) => void;
};

type FilterType = "realistic" | "anime" | "premium";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const CharacterSelector = ({ characters, onClick, handleCharacterSelect }: CharacterSelectorProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("anime");
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [curCharacter, setCurCharacter] = useState<Character | null>(null);

  const searchParams = useSearchParams();
  useEffect(() => {
    const charId = searchParams.get("character");
    if (charId && characters.length > 0) {
      const found = characters.find((c) => c.id === charId);
      if (found) {
        setCurCharacter(found);
        !found.is_anime && setActiveFilter("realistic");
      }
    }
  }, [searchParams, characters]);

  const filters = [
    {
      id: "realistic" as const,
      label: "Realistic",
      icon: FemaleIcon,
      description: "Realistic characters",
      iconColor: "",
    },
    {
      id: "anime" as const,
      label: "Anime",
      icon: AnimeIcon,
      description: "Anime-style characters",
      iconColor: "",
    },
  ];

  const filteredCharacters = characters.filter((character) => {
    switch (activeFilter) {
      case "premium":
        return character.is_premium;
      case "anime":
        return character.is_anime;
      case "realistic":
        return !character.is_anime;
      default:
        return true;
    }
  });

  const handleSelect = () => {
    if (curCharacter) {
      handleCharacterSelect(curCharacter);
      onClick();
    }
  };

  return (
    <div className="w-full max-w-7xl rounded-2xl flex flex-col">
      <div className="max-h-[calc(100dvh-268px)] xl:max-h-[calc(100dvh-204px)] overflow-y-scroll pr-2">
        <header className="flex items-center mb-6">
          <ArrowLeft className="text-2xl cursor-pointer text-[#9e9e9e]" onClick={onClick} />
          <h1 className="text-xl xl:text-2xl font-medium mx-auto pr-6">Choose Character</h1>
        </header>
        <div className="flex gap-4 mb-6">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.id;

            return (
              <motion.button
                key={filter.id}
                whileHover={{ scale: 1.0 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-3 px-4 h-12 rounded-xl font-semiboldtext-sm sm:text-base transition-all duration-200 text-white border-2 cursor-pointer ${
                  isActive
                    ? "bg-[#24162c] shadow-sm shadow-purple-500/25  border-[#ae52e7]"
                    : "bg-transparent hover:bg-[#181818] border-[#181818]"
                }`}
              >
                <Icon size={22} className={filter.iconColor} />
                <span className="whitespace-nowrap">{filter.label}</span>
              </motion.button>
            );
          })}
        </div>

        <main className="flex-grow overflow-y-auto">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 p-2"
            variants={gridContainerVariants}
            initial="hidden"
            animate="show"
          >
            {filteredCharacters.map((char) => {
              const isSelected = curCharacter?.id === char.id;

              return (
                <motion.div
                  key={char.id}
                  onClick={() => setCurCharacter(char)}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer ${
                    isSelected ? "ring-2 ring-[var(--accent)]" : ""
                  }`}
                  onMouseEnter={() => videoRefs.current[char.id]?.play()}
                  onMouseLeave={() => {
                    const video = videoRefs.current[char.id];
                    if (video) {
                      video.pause();
                      video.currentTime = 0;
                    }
                  }}
                >
                  <img
                    src={char.resized_images[0].default_url}
                    alt={char.first_name}
                    className="w-full h-full object-cover aspect-[3/4]"
                  />
                  {char.video_desktop && (
                    <video
                      ref={(el) => (videoRefs.current[char.id] = el)}
                      src={char.video_desktop}
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                    <span className="text-white text-sm font-semibold px-4 py-1 rounded-full">{char.first_name}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </main>
      </div>
      <footer className="flex justify-center w-full mt-6">
        <Button
          onClick={handleSelect}
          disabled={!curCharacter}
          variant="gradient"
          className="min-w-[280px] xl:min-w-sm min-h-12"
        >
          Select
        </Button>
      </footer>
    </div>
  );
};

export default CharacterSelector;
