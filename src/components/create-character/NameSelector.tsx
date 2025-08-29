"use client";

import { useState, useEffect } from "react";
import { ArrowRightIcon, Box } from "lucide-react";
import Button from "../ui/Button";
import { generateAnimeCharacterName } from "@/utils/animeNameGenerator";
import { motion } from "framer-motion";

interface NameSelectorProps {
  handleNext: (value: string) => void;
}

const ProgressBar = ({ label, progress }: { label: string; progress: number }) => (
  <div className="w-full">
    <div className="flex justify-between items-center mb-3 text-gray-400 text-sm">
      <span className="text-[var(--gray)]">{label}</span>
      <span className="text-[var(--accent)] font-medium">{progress}%</span>
    </div>
    <div className="w-full rounded-full h-2">
      <div
        className="h-2 rounded-full transition-all duration-700 ease-out"
        style={{ width: `${progress}%`, backgroundImage: "var(--gradient-main-hover)" }}
      ></div>
    </div>
  </div>
);

export default function NameSelector({ handleNext }: NameSelectorProps) {
  const [name, setName] = useState("");
  const [rolling, setRolling] = useState(false);

  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [progress3, setProgress3] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setProgress1(100), 500);
    const timer2 = setTimeout(() => setProgress2(100), 1200);
    const timer3 = setTimeout(() => setProgress3(100), 1900);

    setName(generateAnimeCharacterName());
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleRoll = () => {
    setRolling(true);
    setName(generateAnimeCharacterName());
    setTimeout(() => setRolling(false), 600);
  };

  return (
    <div className="w-full flex flex-col items-center mt-16">
      <div className="w-full flex items-center gap-3 mb-6">
        <div className="relative w-full border-2 border-transparent rounded-xl focus-within:border-[var(--accent)]">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name"
            className="w-full bg-[#1e1e1e] text-white border-none rounded-xl px-4 py-3 focus:outline-none focus:ring-0"
          />
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleRoll}
          className="flex-shrink-0 bg-gradient-to-br from-purple-600 to-pink-500 text-white p-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          <motion.div
            animate={rolling ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Box size={24} />
          </motion.div>
        </motion.button>
      </div>

      {/* Next Button - positioned below input for alignment */}
      <div className="w-full flex justify-end mb-12">
        <Button
          variant="gradient"
          className="h-11.5 max-w-[160px] w-full mt-4 rounded-xl flex items-center justify-center shadow-lg"
          onClick={() => handleNext(name)}
        >
          <span className="mr-3">Next</span>
          <ArrowRightIcon size={18} />
        </Button>
      </div>

      {/* Progress Bars Section */}
      <div className="w-full space-y-3">
        <ProgressBar label="Understanding your preferences" progress={progress1} />
        <ProgressBar label="Creating AI Companion to your preferences" progress={progress2} />
        <ProgressBar label="Putting the finishing touches" progress={progress3} />
      </div>
    </div>
  );
}
