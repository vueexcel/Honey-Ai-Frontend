"use client";

import { useState } from "react";
import Button from "./ui/Button";
import WandIcon from "./icons/WandIcon";

export default function Banner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="py-6 px-0 lg:px-6 lg:py-0 mt-4 mb-4 rounded-3xl bg-[#4c2e5e] xl:bg-linear-[90deg,_#4c2e5e_50%_,_#c94598] overflow-hidden min-h-[290px] flex flex-col xl:flex-row">
      <div className="flex-1 flex justify-center items-center xl:items-start flex-col p-[34px 44px] bg-[linear-gradient(90deg,_#4c2e5e_69.74%,_#4c2e5e00)] px-5 md:px-0 z-10">
        <h2 className="text-[28px] font-bold mb-2.5">Create your 💖 Dream Companion</h2>  
        <div className="max-w-[400px]">
          <p className="mb-4">
            Choose a preset or customize your ideal companion to enjoy meaningful interactions and create unforgettable
            experiences. It’s all up to you!
          </p>
          <Button
            variant="gradient"
            className="w-full h-12 rounded-xl flex items-center justify-center text-base font-bold gap-2 shadow-[0_0_20px_#ffdaf166,_0_4px_8px_#0003] "
          >
            <WandIcon size={22} />
            Create Character
          </Button>
        </div>
      </div>
      <div className="-my-20 md:my-0 flex-1">
        <picture>
          <img
            src="https://get-honey.ai/assets/anime-sf-BZ37nnqz.avif"
            alt="AI girl right"
            className="h-96 w-full md:h-full object-cover object-top"
          />
        </picture>
      </div>
    </div>
  );
}
