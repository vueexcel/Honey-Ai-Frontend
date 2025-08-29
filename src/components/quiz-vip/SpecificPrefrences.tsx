import { ImageOption } from "@/types/quiz";
import React, { useEffect } from "react";

interface SpecificPrefrencesProps {
  selectedOption: string[];
  setSelectedOption: (value: string[]) => void;
  options: ImageOption[];
  mutiSelect?: boolean;
  onNext?: () => void;
}

const SpecificPrefrences = ({
  selectedOption,
  setSelectedOption,
  options,
  mutiSelect,
  onNext,
}: SpecificPrefrencesProps) => {
  const [currentSelected, setCurrentSelected] = React.useState<string[]>([]);

  useEffect(() => {
    // Initialize currentSelected with selectedOption if not empty
    setCurrentSelected(selectedOption?.length > 0 ? selectedOption : []);
  }, [selectedOption]);

  const handleSelect = (option: string) => {
    if (mutiSelect) {
      // Handle multi-select logic here
      const newSelected = currentSelected.includes(option)
        ? currentSelected.filter((o) => o !== option)
        : [...currentSelected, option];
      setCurrentSelected(newSelected);
    } else {
      setCurrentSelected([option]);
    }
  };

  const handleNext = () => {
    setSelectedOption(currentSelected);
    onNext?.();
  };

  return (
    <section className="_preferences_1dkzh_1">
      <div className="_content_1dkzh_10">
        <div className="_imageSelect_115lu_1 _bigImageSelect_115lu_68 _imagesContainer_1dkzh_30">
          {options.map((option) => (
            <div
              className={
                "_option_115lu_17  _option_1dkzh_27" +
                (currentSelected.includes(option.value)
                  ? " _selected_115lu_35"
                  : "")
              }
              id={`quiz_option_${option.value}`}
              key={option.id}
              onClick={handleSelect.bind(null, option.value)}
            >
              <picture>
                <source
                  srcSet={`${option.imageSrc} 2x, ${option.imageSrc} 1x`}
                  type="image/webp"
                />
                <img
                  src={option.imageSrc}
                  alt={option.imageAlt}
                  className="_image_115lu_1 _bigImage_115lu_51 _image_1dkzh_30"
                />
              </picture>
              <p className="_label_115lu_61">{option.label}</p>
            </div>
          ))}
        </div>
        <div className="_controls_1h4cn_33">
          <button
            id="quiz_next_button"
            className="_button_11ngv_1"
            disabled={!currentSelected.length}
            onClick={handleNext}
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpecificPrefrences;
