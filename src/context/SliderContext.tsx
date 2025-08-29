"use client";
import React, { createContext, useContext, useState } from "react";
import { SliderOptions } from "@/types/quiz";

interface SliderContextType {
  sliderValues: Record<string, number>;
  updateSliderValue: (sliderKey: string, value: number) => void;
}

const SliderContext = createContext<SliderContextType | undefined>(undefined);

export const SliderProvider: React.FC<{
  children: React.ReactNode;
  initialSliders?: SliderOptions[];
}> = ({ children, initialSliders = [] }) => {
  // Initialize sliderValues from initialSliders if provided
  const initialValues: Record<string, number> = {};
  initialSliders.forEach((slider) => {
    initialValues[slider.left] = slider.value;
  });

  const [sliderValues, setSliderValues] = useState<Record<string, number>>(initialValues);

  const updateSliderValue = (sliderKey: string, value: number) => {
    setSliderValues((prev) => ({
      ...prev,
      [sliderKey]: value,
    }));
  };

  return <SliderContext.Provider value={{ sliderValues, updateSliderValue }}>{children}</SliderContext.Provider>;
};

export const useSliders = (): SliderContextType => {
  const context = useContext(SliderContext);
  if (context === undefined) {
    throw new Error("useSliders must be used within a SliderProvider");
  }
  return context;
};
