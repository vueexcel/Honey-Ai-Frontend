"use client";

import { Wand } from "lucide-react";
import { useState } from "react";
import Button from "./ui/Button";
import WandIcon from "./icons/WandIcon";

export default function Banner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="px-6 mt-4 mb-4 rounded-3xl bg-[linear-gradient(90deg,_#4c2e5e_50%_,_#c94598)] overflow-hidden min-h-[290px] flex flex-col lg:flex-row">
      <div className="flex-1 flex justify-center flex-col p-[34px 44px] bg-[linear-gradient(90deg,_#4c2e5e_69.74%,_#4c2e5e00)]">
        <h2 className="text-[28px] font-bold mb-2.5">Create your 💖 Dream Companion</h2>
        <div className="max-w-[400px]">
          <p className="mb-4">
            Choose a preset or customize your ideal companion to enjoy meaningful interactions and create unforgettable
            experiences. It’s all up to you!
          </p>
          <Button
            variant="gradient"
            className="w-full h-12 rounded-xl flex items-center justify-center text-base font-bold shadow-lg gap-2 "
          >
            <WandIcon size={22} />
            Create Character
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <picture>
          <img
            src="https://get-honey.ai/assets/anime-sf-BZ37nnqz.avif"
            alt="AI girl right"
            className="w-full h-full object-cover object-right"
          />
        </picture>
      </div>
    </div>
  );
}
