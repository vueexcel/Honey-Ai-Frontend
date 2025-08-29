import React from "react";
import { styled } from "@mui/material/styles";
import { ImageOption } from "@/types/quiz";

interface EyeColorProps {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  options: ImageOption[];
}

const OptionList = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  width: "100%",
  maxWidth: "700px",
  margin: "0 auto",
  padding: "0 16px",
});

const OptionCard = styled("div")<{ selected?: boolean }>(({ selected }) => ({
  position: "relative",
  cursor: "pointer",
  width: "100%",
  minHeight: "88px",
  height: "88px",
  border: `2px solid ${selected ? "#6a38bb" : "#2c2e35"}`,
  borderRadius: "20px",
  overflow: "hidden",
  background: "#101010",
  transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
  display: "flex",
  alignItems: "center",
  padding: "0 32px 0 0",
  boxSizing: "border-box",
  "&:hover": {
    borderColor: "#6a38bb",
  },
}));

const ImageContainer = styled("div")({
  position: "relative",
  width: "50%",
  height: "100%",
  flexShrink: 0,
  borderRadius: "20px 0 0 20px",
  overflow: "hidden",
  background: "#181818",
});

const OptionImage = styled("img")<{ selected?: boolean }>(({ selected }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  transition: "filter 0.3s cubic-bezier(.4,0,.2,1)",
}));

const OptionLabel = styled("div")<{ selected?: boolean }>(({ selected }) => ({
  color: "#fff",
  fontSize: "20px",
  fontWeight: 500,
  flex: 1,
  textAlign: "right",
  paddingRight: "24px",
  zIndex: 1,
}));

const HiddenRadio = styled("input")({
  appearance: "none",
  position: "absolute",
  width: 0,
  height: 0,
  opacity: 0,
});

const EyeColor = ({
  selectedOption,
  setSelectedOption,
  options,
}: EyeColorProps) => {
  return (
    <section className="_eyeColor_joagg_1">
      <div className="_content_joagg_10">
        <div className="_barSelect_xvxt5_1 ">
          {options.map((option) => (
            <div
              className={
                "_option_xvxt5_9" +
                (selectedOption === option.value ? " _selected_xvxt5_1" : "")
              }
              id={`quiz_option_${option.value}`}
              onClick={() => setSelectedOption(option.value)}
              key={option.id}
            >
              <picture>
                <source
                  srcSet={`${option.imageSrc} 2x, ${option.imageSrc} 1x`}
                  type="image/webp"
                />
                <img
                  src={option.imageSrc}
                  alt={option.imageAlt}
                  className="_image_xvxt5_33"
                />
              </picture>
              <p className="_label_xvxt5_64">{option.label}</p>
            </div>
          ))}
        </div>
        <div className="_controls_1h4cn_33"></div>
      </div>
    </section>
  );
};

export default EyeColor;
