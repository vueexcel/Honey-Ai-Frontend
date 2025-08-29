import React from "react";
import { ImageOption } from "@/types/quiz";

interface PreferredScenariosProps {
  options: ImageOption[];
  selectedOptions?: string[]; // make optional
  setSelectedOptions: (values: string[]) => void;
  handleNext: () => void;
}

function PreferredScenarios({
  options,
  selectedOptions = [], // ✅ default empty array
  setSelectedOptions,
  handleNext,
}: PreferredScenariosProps) {
  const handleOptionClick = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((v) => v !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  return (
    <section className="_scenarios_s72ve_1">
      <div className="_content_s72ve_10">
        <div className="_barSelect_xvxt5_1 _imagesContainer_s72ve_27">
          {options.map((option) => (
            <div
              className={`_option_xvxt5_9 _option_s72ve_27 ${
                selectedOptions.includes(option.value) ? "_selected_xvxt5_45" : ""
              }`}
              id={`quiz_option_${option.value}`}
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
            >
              <picture>
                <source srcSet={`${option.imageSrc} 2x, ${option.imageSrc} 1x`} type="image/webp" />
                <img src={option.imageSrc} alt={option.imageAlt} className="_image_xvxt5_33 _image_s72ve_27" />
              </picture>
              <p className="_label_xvxt5_64">{option.label}</p>
            </div>
          ))}
        </div>
        <div className="_controls_1h4cn_33">
          <button onClick={handleNext} id="quiz_next_button" className="_button_11ngv_1">
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}

export default PreferredScenarios;
