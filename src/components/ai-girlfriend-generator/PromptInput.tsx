import { useState, useEffect } from "react";
import DiceIcon from "../icons/DiceIcon";

type PromptInputProps = {
  selectedValues: string[];
  onAdd: (value: string) => void;
  onClear: () => void; 
};

export default function PromptInput({ selectedValues, onAdd, onClear }: PromptInputProps) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (selectedValues.length > 0) {
      setInputValue(selectedValues.join(" "));
    }
  }, [selectedValues]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      onClear();
      onAdd(inputValue.trim());
      setInputValue(inputValue.trim());
    }
  };

  return (
    <div className="w-full flex flex-col">
      <label
        htmlFor="description"
        className="flex justify-between text-white mb-4 text-xl xl:text-2xl font-bold w-full"
      >
        <span>Describe your image</span>
        <DiceIcon size={30} />
      </label>

      <textarea
        name="description"
        placeholder="Type and press Enter..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full flex-1 p-3 bg-[var(--gray-dark)] rounded-xl text-white font-normal placeholder:text-[var(--gray)] placeholder:font-normal outline-0 resize-none"
      />
    </div>
  );
}
