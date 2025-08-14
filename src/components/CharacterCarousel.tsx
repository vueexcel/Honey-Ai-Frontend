"use client";

import { useState, useEffect } from "react";
import { getCharacters } from "@/utils/api";
import { motion } from "framer-motion";
import CharacterCard from "./CharacterCard";
import CharacterFilter from "./CharacterFilter";
import Banner from "./Banner";
import type { Character } from "@/types/character";
type FilterType = "realistic" | "anime" | "premium";

export default function CharacterCarousel() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>("anime");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCharacters();
        setCharacters(data);
      } catch (err: any) {
        setError(err.message);
      }
    }
    fetchData();
  }, []);
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

  return (
    <section className="px-3 py-0 xl:px-6 xl:py-4 bg-white dark:bg-[#0c0c0c] transition-colors duration-300">
      <div className="max-w-4xl xl:max-w-full mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0 hidden xl:block"
          >
            <span className="text-[#ae52e7]">Explore </span>
            <span>AI Characters</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <CharacterFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-6"
        >
          {filteredCharacters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <CharacterCard
                id={character.id}
                name={character.first_name}
                age={character.age}
                description={character.description}
                imageUrl={character.resized_images[0].default_url}
                videoUrl={character.video_desktop}
                isPremium={character.is_premium}
                isOnline={true}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 shadow-md"
          >
            Load More Characters
          </motion.button>
        </motion.div> */}
        <Banner />
      </div>
    </section>
  );
}
