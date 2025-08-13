"use client";

import Crown from "./icons/Crown";
import FemaleIcon from "./icons/FemaleIcon";
import AnimeIcon from "./icons/AnimeIcon";
import { motion } from "framer-motion";

interface CharacterFilterProps {
  activeFilter: "realistic" | "anime" | "premium";
  onFilterChange: (filter: "realistic" | "anime" | "premium") => void;
}

export default function CharacterFilter({ activeFilter, onFilterChange }: CharacterFilterProps) {
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
    {
      id: "premium" as const,
      label: "Premium Models",
      icon: Crown,
      description: "Premium characters",
      iconColor: "text-[rgb(255,_185,_48)]",
    },
  ];

  return (
    <div className="flex items-center space-x-2">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = activeFilter === filter.id;

        return (
          <motion.button
            key={filter.id}
            whileHover={{ scale: 1.0 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange(filter.id)}
            className={`flex items-center space-x-3 px-4 h-12 rounded-lg font-semibold text-base transition-all duration-200 text-white border-2 cursor-pointer ${
              isActive
                ? "bg-[#24162c] shadow-sm shadow-purple-500/25  border-[#ae52e7]"
                : "bg-transparent hover:bg-[#181818] border-[#181818]"
            }`}
          >
            <Icon size={22} className={filter.iconColor} />
            <span>{filter.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
