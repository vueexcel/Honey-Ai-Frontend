import React, { useEffect } from "react";
import { ImageOption } from "@/types/quiz";
import { analytics } from "@/utils/analytics";

interface WelcomeProps {
  selectedOption?: string;
  setSelectedOption: (value: string) => void;
  options: ImageOption[];
}

function Welcome({ selectedOption, setSelectedOption, options }: WelcomeProps) {
  // Track quiz started when Welcome component mounts
  useEffect(() => {
    analytics.trackQuizStarted();
  }, []);

  return (
    <section className="_modelAge_1n2bf_1">
      <div>
        <h1 id="quiz_title_step_modelAge" className="_title_1n2bf_10">
          Create Your Dream AI Girl
        </h1>
        <h2 className="_subtitle_1n2bf_17">Personalized to fulfill your every wish</h2>
        <p className="_description_1n2bf_28">Select the age that feels right for your AI match</p>
      </div>
      <div className="_models_1n2bf_30">
        {options.map((option) => (
          <div
            key={option.id}
            className={`_model_1n2bf_1  ${selectedOption === option.value ? "border-[#6a38bb]" : "border-[#2c2e35]"}`}
            onClick={() => setSelectedOption(option.value)}
          >
            <input
              type="radio"
              id={option.id}
              name={option.name}
              className="_radioButton_1n2bf_85"
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => setSelectedOption(option.value)}
            />
            <label htmlFor={option.id}>
              <img src={option.imageSrc} alt={option.imageAlt} className="_image_1n2bf_74" />
              <div
                className={`_modelTitle_1n2bf_49 ${selectedOption === option.value ? "bg-[#6a38bb]" : "bg-[#2c2e35]"}`}
              >
                {option.label}
              </div>
            </label>
          </div>
        ))}
      </div>
      <div className="_controls_1h4cn_33 _controlsOneBtn_1h4cn_39"></div>
    </section>
  );
}

export default Welcome;
