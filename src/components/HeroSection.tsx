"use client";

import { Wand } from "lucide-react";
import Button from "./ui/Button";

export default function HeroSection() {
  return (
    <section className="relative h-72 flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-purple-50/20 to-gray-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 my-4 mx-3 lg:mx-0 lg:my-0 rounded-xl lg:rounded-none">
      <div className="absolute inset-y-0 left-0 lg:w-1/2 w-full overflow-hidden">
        <picture>
          <img
            src="https://get-honey.ai/assets/anime-sf-left-BYRDcr9K.avif"
            alt="AI girl left"
            className="w-full h-full object-cover object-center"
          />
        </picture>
      </div>
      <div className="absolute inset-y-0 right-0 hidden lg:block w-1/2 overflow-hidden">
        <picture>
          <img
            src="https://get-honey.ai/assets/anime-sf-right-a2O5WSbd.avif"
            alt="AI girl right"
            className="w-full h-full object-cover object-right"
          />
        </picture>
      </div>

      {/* Center Content */}
      <div className="hidden lg:flex relative z-10 flex-col p-6 justify-center h-fit max-w-96 bg-[#4c2e5e66] backdrop-blur-md rounded-2xl gap-3 text-white text-center">
        <span className="text-2xl font-extrabold leading-snug">
          Your Dream <br /> Companion awaits
        </span>
        <p className="text-sm text-gray-100">
          Create your ideal companion, shape her look, personality, and bring
          her to life in one click. 100% powered by Artificial Intelligence.
        </p>
        <Button
          variant="gradient"
          className="w-full h-12 rounded-xl flex items-center justify-center text-base font-bold shadow-lg gap-2 "
        >
          <Wand size={22} />
          Create Character
        </Button>
      </div>
      <div className="lg:hidden relative z-10 flex flex-col p-6 h-fit rounded-2xl gap-3 text-white text-center self-end">
        <span className="text-2xl font-bold leading-snug text-left">
          Your Dream <br /> Companion awaits
        </span>
        <Button
          variant="gradient"
          className="w-sm h-12 rounded-xl flex items-center justify-center text-base font-bold shadow-lg gap-2 "
        >
          <Wand size={22} />
          Create Character
        </Button>
      </div>
      <div className="block lg:hidden absolute bottom-0 h-[175px] left-0 w-full bg-linear-[0deg,_#4c2e5e_48.25%,_#4c2e5e00]"></div>
    </section>
  );
}
