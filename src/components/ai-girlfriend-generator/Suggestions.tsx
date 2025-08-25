"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const TABS = ["Outfit", "Action", "Pose", "Accessories", "Scene"];

type SuggestionsProps = {
  selectedValues: string[];
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
};

const suggestionItems: Record<string, { name: string; image: string; value: string }[]> = {
  Outfit: [
    {
      name: "Skirt",
      image: "https://get-honey.ai/assets/skirt-CLW9ZL1h.avif",
      value: "in a stylish long skirt with a gentle flow",
    },
    { name: "Leather", image: "https://get-honey.ai/assets/leather-DFrP_8Zb.avif", value: "in a sleek leather dress" },
    {
      name: "Satin Robe",
      image: "https://get-honey.ai/assets/satinrobe-Bcdl-Kf3.avif",
      value: "draped in smooth satin robe",
    },
    { name: "Jeans", image: "https://get-honey.ai/assets/jeans-BDgxTLC6.avif", value: "in classic, well-fitted jeans" },
    { name: "Jumpsuit", image: "https://get-honey.ai/assets/jumpsuit-DC8eMdzI.avif", value: "in a fitted jumpsuit" },
    {
      name: "Sundress",
      image: "https://get-honey.ai/assets/sundress-DXo--K7X.avif",
      value: "in a light floral sundress",
    },
  ],
  Action: [
    {
      name: "Working out",
      image: "https://get-honey.ai/assets/workingout-GSzgBjhO.avif",
      value: "captured mid-workout, active stance",
    },
    {
      name: "Dining",
      image: "https://get-honey.ai/assets/dining-CyEiq517.avif",
      value: "enjoying a relaxed dining experience at a table",
    },
    {
      name: "Tanning",
      image: "https://get-honey.ai/assets/tanning-3quoUImc.avif",
      value: "relaxing and tanning under the warm sunlight",
    },
    {
      name: "Walking",
      image: "https://get-honey.ai/assets/walking-UNKS_qLM.avif",
      value: "walking casually with a natural stride",
    },
  ],
  Pose: [
    {
      name: "Standing",
      image: "https://get-honey.ai/assets/standing-AMbXHJij.avif",
      value: "standing confidently with a steady posture",
    },
    {
      name: "Sitting",
      image: "https://get-honey.ai/assets/sitting-C998LGUn.avif",
      value: "sitting comfortably in a relaxed position",
    },
    {
      name: "Stretching",
      image: "https://get-honey.ai/assets/stretching-B4BWcURA.avif",
      value: "stretching gracefully, showing flexibility",
    },
  ],
  Accessories: [
    {
      name: "Necklace",
      image: "https://get-honey.ai/assets/necklace-DqjW02py.avif",
      value: "with a delicate necklace",
    },
    {
      name: "Earrings",
      image: "https://get-honey.ai/assets/earrings-3fqTQuuO.avif",
      value: "wearing elegant earrings",
    },
    { name: "Glasses", image: "https://get-honey.ai/assets/glasses-BnAEOcmT.avif", value: "with stylish glasses" },
    { name: "Choker", image: "https://get-honey.ai/assets/choker-CijbGqL1.avif", value: "wearing a chic choker" },
    { name: "Hat", image: "https://get-honey.ai/assets/hat-Db2hnjjn.avif", value: "with a fashionable hat" },
    {
      name: "Sunglasses",
      image: "https://get-honey.ai/assets/sunglasses-CXjZOIqC.avif",
      value: "wearing classic sunglasses",
    },
  ],
  Scene: [
    {
      name: "Garden",
      image: "https://get-honey.ai/assets/garden-xPkP0qiv.avif",
      value: "set in a lush garden with vibrant flowers",
    },
    {
      name: "Beach",
      image: "https://get-honey.ai/assets/beach-COl_B9Cz.avif",
      value: "on a tranquil beach with soft sand and blue skies",
    },
    {
      name: "Gym",
      image: "https://get-honey.ai/assets/gym-Q-vuq73C.avif",
      value: "in a modern gym, surrounded by equipment",
    },
    {
      name: "Bar",
      image: "https://get-honey.ai/assets/bar-D3p_lpZN.avif",
      value: "at a stylish bar with ambient lighting",
    },
    {
      name: "Kitchen",
      image: "https://get-honey.ai/assets/kitchen-C-Uuiwjg.avif",
      value: "in a well-designed kitchen with sleek decor",
    },
    {
      name: "Restaurant",
      image: "https://get-honey.ai/assets/restaurant-y3Lkl7-G.avif",
      value: "in an elegant restaurant with intimate lighting",
    },
    {
      name: "Balcony",
      image: "https://get-honey.ai/assets/balcony-Co7wfY3_.avif",
      value: "on a scenic balcony with a beautiful view",
    },
    {
      name: "Street",
      image: "https://get-honey.ai/assets/street-DVipKccH.avif",
      value: "on a lively city street with bustling energy",
    },
  ],
};

export default function Suggestions({ selectedValues, onAdd, onRemove }: SuggestionsProps) {
  const [activeTab, setActiveTab] = useState("Outfit");

  return (
    <div className="w-full">
      <div className="flex flex-col xl:flex-row mb-6 gap-4 xl:gap-36 w-full">
        <h1 className="text-xl xl:text-2xl font-bold text-white">Suggestions</h1>
        <div className="flex w-full gap-4 overflow-scroll hide-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-white transition-colors border-b-2 cursor-pointer ${
                activeTab === tab ? "border-[var(--accent)] font-semibold opacity-100" : "border-transparent opacity-80"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-6 flex-wrap justify-center xl:justify-start">
        {suggestionItems[activeTab]?.map(({ name, image, value }) => {
          const isSelected = selectedValues.includes(value);
          return (
            <motion.div
              key={name}
              className="text-center cursor-pointer group"
              onClick={() => (isSelected ? onRemove(value) : onAdd(value))}
            >
              <div className="relative">
                <Image src={image} alt={name} width={120} height={120} className="rounded-xl object-cover" />
                <div className="absolute inset-0 group-hover:border-[3px] group-hover:border-[#ffffff99] rounded-xl z-10"></div>
                {isSelected && <div className="absolute inset-0 border-[3px] border-[var(--accent)] rounded-xl"></div>}
              </div>
              <p className="mt-2 text-white text-sm">{name}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
