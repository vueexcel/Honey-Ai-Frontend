import React from "react";
import { styled } from "@mui/material/styles";
import { ImageOption } from "@/types/quiz";

interface EthnicityProps {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  options: ImageOption[];
}

const Ethnicity = ({
  selectedOption,
  setSelectedOption,
  options,
}: EthnicityProps) => {
  return (
    <section className="_ethicPreferences_1kxq5_1">
      <div className="_content_1kxq5_10">
        <div className="_barSelect_xvxt5_1 ">
          {options.map((option) => (
            <div
              className={`_option_xvxt5_9 ${
                selectedOption === option.value ? "_selected_xvxt5_1" : ""
                }`}
              onClick={() => setSelectedOption(option.value)}
              key={option.value}
              role="button"
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
                  className="_image_xvxt5_33 _imageFilter_xvxt5_33 _image_1kxq5_27"
                />
              </picture>
              <p className="_label_xvxt5_64">{option.label}</p>
            </div>
          ))}
          <div className="_controls_1h4cn_33"></div>
        </div>
      </div>
    </section>
  );
};

export default Ethnicity;
