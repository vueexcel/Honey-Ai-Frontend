import { motion } from "framer-motion";
interface Option {
  image: string;
  value: string;
  name: string;
  subTitle?: string;
}

interface ImageSelectorProps {
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function ImageSelector({ options, selectedValue, onSelect }: ImageSelectorProps) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {options.map((option) => {
        const isSelected = selectedValue === option.value;
        return (
          <li key={option.value} className="flex flex-col items-center gap-3">
            <motion.button
              onClick={() => onSelect(option.value)}
              className={`
                relative w-full aspect-square transform-gpu overflow-hidden
                rounded-2xl border-4 transition-colors duration-300
                ${isSelected ? "border-pink-500" : "border-transparent"}
              `}
            >
              <img src={option.image} alt={option.name} className="object-cover h-full object-top hover:scale-110" />
            </motion.button>
            <div className="text-center">
              <span className="text-lg font-semibold text-white">{option.name}</span>
              {option.subTitle && <p className="text-sm text-gray-400">{option.subTitle}</p>}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
