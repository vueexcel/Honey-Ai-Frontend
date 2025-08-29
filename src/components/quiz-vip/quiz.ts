import { ReactNode } from "react";

export interface BaseOption {
  id: string;
  name: string;
  value: string;
  label: string;
}

export interface ImageOption extends BaseOption {
  imageSrc: string;
  imageAlt: string;
}

export interface SliderOptions {
  left: string;
  leftIcon: string;
  rightIcon: string;
  min: number;
  max: number;
  right: string;
  value: number;
}

export interface BaseQuestion {
  question: string;
  type: string;
}

export interface ImageOptionsQuestion extends BaseQuestion {
  type: "image-options";
  description: string;
  options: ImageOption[];
}

export interface TextOptionsQuestion extends BaseQuestion {
  type: "text-options";
  description: string;
  options: BaseOption[];
}

export interface NumberInputQuestion extends BaseQuestion {
  type: "number-input";
  description: string;
  placeholder: string;
  min: number;
  max: number;
}

export interface MutlipleChoiceQuestion extends BaseQuestion {
  type: "multiple-choice";
  options: BaseOption[];
  description: string;
}

export interface SliderQuestion extends BaseQuestion {
  type: "slider-group";
  sliders: SliderOptions[];
}

export type QuizQuestion =
  | ImageOptionsQuestion
  | TextOptionsQuestion
  | NumberInputQuestion
  | MutlipleChoiceQuestion
  | SliderQuestion;

export type SelectedOption = {
  [key: string]: any;
};
