import React from "react";
import { styled } from "@mui/material/styles";
import { BaseOption } from "@/types/quiz";
import { Box, Typography, Checkbox } from "@mui/material";

interface MultiSelectProps {
  options: BaseOption[];
  selectedOptions: string[];
  setSelectedOptions: (values: string[]) => void;
  handleNext: () => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
  handleNext,
}) => {
  const handleOptionClick = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  return (
    <section className="_likeToTry_66ig3_1">
      <div className="_content_66ig3_10">
        <div className="_barSelect_xvxt5_1">
          {options.map((option) => (
            <div
              className={`_option_xvxt5_9 _simpleBarSelectOption_xvxt5_37 ${
                selectedOptions.includes(option.value)
                  ? "_selected_xvxt5_45"
                  : ""
              } _option_66ig3_27`}
              id={`quiz_option_${option.value}`}
              key={option.id}
              onClick={() => handleOptionClick(option.value)}
            >
              <p className="_label_xvxt5_64">{option.label}</p>
            </div>
          ))}
        </div>
        <div className="_controls_1h4cn_33">
          <button
            onClick={handleNext}
            id="quiz_next_button"
            className="_button_11ngv_1"
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
};

export default MultiSelect;
