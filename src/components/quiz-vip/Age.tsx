import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  Button,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Picker from "react-mobile-picker";

interface AgeProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

// Custom styled components
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#1A1A1A",
    borderRadius: "8px",
    color: "white",
    height: "56px",
    "& fieldset": {
      borderColor: "#2C2E35",
    },
    "&:hover fieldset": {
      borderColor: "#3C3E45",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6A38BB",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#FFFFFF70",
    "&.Mui-focused": {
      color: "#6A38BB",
    },
  },
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    // "-webkit-appearance": "none",
    margin: 0,
  },
  "& input[type=number]": {
    // "-moz-appearance": "textfield",
  },
}));

const Age = ({ value, onChange, onNext }: AgeProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const ages = Array.from({ length: 82 }, (_, i) => (i + 18).toString());
  const [selectedAge, setSelectedAge] = useState(ages[0]);

  return (
    <div className="_age_y697r_1">
      {!isMobile ? (
        <StyledTextField
          fullWidth
          id="quiz_age_input"
          label="Your age"
          type="number"
          variant="outlined"
          className="_ageField_y697r_31 css-1q57718"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          // display up down buttons too

          inputProps={{
            min: 18,
            max: 99,
            placeholder: "Enter",
          }}
        />
      ) : (
        <Picker
          className="_container_9to8h_1"
          // id="quiz_age_wheel_picker"
          value={{ age: ages[0] }}
          onChange={(value: { age: string }) => {
            setSelectedAge(value.age);
          }}
          wheelMode="normal"
        >
          <Picker.Column name="age">
            {ages.map((age) => {
              return (
                <Picker.Item
                  className={`_item_9to8h_24  ${
                    selectedAge === age ? "_activeItem_9to8h_48" : ""
                  }`}
                  key={age}
                  value={age}
                >
                  {age}
                </Picker.Item>
              );
            })}
          </Picker.Column>
        </Picker>
      )}
      <div className="_controls_1h4cn_33">
        <button
          onClick={onNext}
          id="quiz_next_button"
          className="_button_11ngv_1"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Age;
