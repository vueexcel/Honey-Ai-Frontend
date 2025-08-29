import React from "react";
import { styled } from "@mui/material/styles";
import { ImageOption } from "@/types/quiz";

interface HairColorProps {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  options: ImageOption[];
}

const HairColor = ({
  selectedOption,
  setSelectedOption,
  options,
}: HairColorProps) => {
  return (
    <section className="_hairColor_1hfr5_1">
      <div className="_content_1hfr5_10">
        <div className="_imageSelect_115lu_1 _imagesContainer_1hfr5_17">
          {options.map((option) => (
            <div
              key={option.id}
              className={`_option_115lu_17  _option_1hfr5_34 ${
                selectedOption === option.value ? "_selected_115lu_35" : ""
              }`}
              onClick={() => setSelectedOption(option.value)}
              id={`quiz_option_${option.value}`}
            >
              <picture>
                <source
                  srcSet={`${option.imageSrc} 2x, ${option.imageSrc} 1x`}
                  type="image/webp"
                />
                <img
                  src={option.imageSrc}
                  alt={option.imageAlt}
                  className="_image_115lu_1 _image_1hfr5_17"
                />
              </picture>
              <p className="_label_115lu_61">{option.label}</p>
            </div>
          ))}
        </div>
        <div className="_controls_1h4cn_33"></div>
      </div>
    </section>
  );
};

export default HairColor;
