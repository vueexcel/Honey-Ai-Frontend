"use client";

interface Option {
  value: string;
  name: string;
}

interface VoiceSelector {
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const SoundwaveIcon = ({ className, fill = "none" }: { className?: string; fill?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill={fill} className={className}>
    <path
      d="M2 10.5V13.5M6 6.5V17.5M10 3.5V21.5M14 8.5V15.5M18 5.5V18.5M22 10.5V13.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default function VoiceSelector({ options, selectedValue, onSelect }: VoiceSelector) {
  return (
    <div className="flex flex-wrap gap-3 w-full">
      {options.map((option) => {
        const isSelected = selectedValue === option.value;

        return (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl h-14 whitespace-nowrap transition-all duration-300
                ${
                  isSelected
                    ? "bg-[#24162c] border border-[var(--pink)] shadow-[0_0_10px_#ae52e780]"
                    : "bg-transparent border border-[#414141] text-white hover:border-gray-400"
                }`}
          >
            <SoundwaveIcon className={`w-6 h-6 ${isSelected ? "text-[var(--pink)]" : ""} `} />
            <span className="font-medium text-sm">{option.name}</span>
          </button>
        );
      })}
    </div>
  );
}
