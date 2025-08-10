"use client";

import { Gem } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";
import Button from "./Button"; // Adjust the path as needed

// Animate the custom Button with motion
const MotionButton = motion(Button);

interface PremiumButtonProps {
  className?: string;
}

const PremiumButton = ({ className }: PremiumButtonProps) => {
  return (
    <MotionButton
      className={clsx(
        className,
        "rounded-md text-lg text-white transition-all h-10 flex items-center"
      )}
      variant="pink"
      animate={{
        boxShadow: [
          "0 0 0px 0px rgba(225, 68, 186, 0.8)",
          "0 0 10px 0px rgba(225, 68, 186, 0.8)",
          "0 0 20px 0px rgba(225, 68, 186, 0.8)",
        ],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <Gem className="mr-2 h-5 w-5" />
      <span>Premium</span>
      <span className="ml-2 rounded-md bg-[#ff00a8] px-2 py-0.5 text-sm font-extrabold">
        70% OFF
      </span>
    </MotionButton>
  );
};

export default PremiumButton;
