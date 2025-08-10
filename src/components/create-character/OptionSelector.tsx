"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Option {
  value: string;
  name: string;
}

interface OptionSelectorProps {
  options: Option[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  mode?: "single" | "multiple";
  maxSelection?: number;
}

export default function OptionSelector({
  options,
  selectedValues,
  onToggle,
  mode = "multiple",
  maxSelection = 3,
}: OptionSelectorProps) {
  const handleSelect = (value: string) => {
    if (
      mode == "multiple" &&
      Array.isArray(selectedValues) &&
      selectedValues.length >= maxSelection &&
      !selectedValues.includes(value)
    ) {
      return;
    }
    onToggle(value);
  };

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
      {options.map((option) => {
        const isSelected = Array.isArray(selectedValues) && selectedValues.includes(option.value);
        return (
          <li key={option.value}>
            <label
              htmlFor={option.value}
              className={`
                flex items-center gap-4 p-3 rounded-xl cursor-pointer 
                border-2 transition-all duration-200
                ${
                  isSelected
                    ? "border-pink-500 bg-[#1f1625] shadow-[0_0_15px_#ae52e7b3]"
                    : "bg-[linear-gradient(144deg,_#181818_1.24%,#101010)] border-transparent"
                }
              `}
            >
              <input
                id={option.value}
                type="checkbox"
                className="hidden"
                checked={isSelected}
                onChange={() => handleSelect(option.value)}
              />
              <div
                className="
                  w-5 h-5 flex-shrink-0 flex items-center justify-center 
                  rounded-md border-2 transition-all duration-200 bg-transparent border-[var(--gray-400)]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: isSelected ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Check className="w-3.5 h-3.5 text-[var(--pink)]" strokeWidth={3} />
                </motion.div>
              </div>
              <span className="text-white font-medium">{option.name}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
