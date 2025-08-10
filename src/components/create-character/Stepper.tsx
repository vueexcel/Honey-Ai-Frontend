"use client";

import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface StepperProps {
  totalSteps: number;
  currentStep: number;
  onBack: () => void;
  title: string;
  subtitle: string;
}

export default function Stepper({ totalSteps, currentStep, onBack, title, subtitle }: StepperProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full pb-6">
      <div className="flex items-center space-x-3 mb-3">
        {currentStep > 0 && (
          <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10 transition" aria-label="Go back">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        )}
        <div>
          <h2 className="text-white font-bold text-3xl">{title}</h2>
          <p className="text-xl text-[var(--gray-300)]">{subtitle}</p>
        </div>
      </div>

      <div
        className="mb-2 w-full h-2 bg-white/10 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Step ${currentStep} of ${totalSteps}`}
      >
        <motion.div
          className="h-full bg-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
