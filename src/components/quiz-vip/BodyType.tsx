import React from "react";
import { styled } from "@mui/material/styles";
import { ImageOption } from "@/types/quiz";

interface BodyTypeProps {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  options: ImageOption[];
}

const OptionGrid = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "24px",
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  padding: "0 16px",
  "@media (max-width: 600px)": {
    gap: "16px",
    gridTemplateColumns: "repeat(2, 1fr)",
  },
});

const OptionWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
});

const OptionCard = styled("div")<{ selected?: boolean }>(({ selected }) => ({
  position: "relative",
  cursor: "pointer",
  border: `2px solid ${selected ? "#6a38bb" : "#2c2e35"}`,
  borderRadius: "24px",
  overflow: "hidden",
  background: "linear-gradient(180deg, #181818 0%, #101010 100%)",
  transition: "all 0.2s ease-in-out",
  width: "140px",
  height: "160px",
  margin: "0 auto",
  "&:hover": {
    transform: "scale(1.02)",
    borderColor: selected ? "#6a38bb" : "#3c3e45",
  },
}));

const ImageContainer = styled("div")({
  width: "100%",
  height: "100%",
  position: "relative",
  overflow: "hidden",
});

const OptionImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

const OptionLabel = styled("div")<{ selected?: boolean }>(({ selected }) => ({
  color: selected ? "#6a38bb" : "white",
  fontSize: "16px",
  fontWeight: 500,
  textAlign: "center",
  transition: "color 0.2s ease-in-out",
}));

const HiddenRadio = styled("input")({
  appearance: "none",
  position: "absolute",
  width: 0,
  height: 0,
  opacity: 0,
});

const BodyType = ({
  selectedOption,
  setSelectedOption,
  options,
}: BodyTypeProps) => {
  return (
    <OptionGrid className="_figure_1o2ku_1">
      {options.map((option) => (
        <OptionWrapper key={option.id}>
          <OptionCard
            selected={selectedOption === option.value}
            onClick={() => setSelectedOption(option.value)}
          >
            <HiddenRadio
              type="radio"
              id={option.id}
              name={option.name}
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => setSelectedOption(option.value)}
            />
            <ImageContainer>
              <OptionImage src={option.imageSrc} alt={option.imageAlt} />
            </ImageContainer>
          </OptionCard>
          <OptionLabel selected={selectedOption === option.value}>
            {option.label}
          </OptionLabel>
        </OptionWrapper>
      ))}
    </OptionGrid>
  );
};

export default BodyType;
