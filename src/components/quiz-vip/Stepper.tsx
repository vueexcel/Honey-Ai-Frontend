import * as React from "react";
import { LinearProgress, StepIconProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const StepperContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  width: "100%",
  gap: "12px",
});

const StepIconWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const CustomLinearProgress = styled(LinearProgress)({
  flex: 1,
  height: 8,
  borderRadius: 4,
  backgroundColor: "#23242A",
  "& .MuiLinearProgress-bar": {
    backgroundColor: "#6A38BB",
    borderRadius: 4,
  },
});

function HexStepIcon(props: { active: boolean; completed: boolean }) {
  const { active, completed } = props;

  return (
    <div>
      <svg
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.9058 11.6485L22.4866 9.18998V6.35156C22.4866 6.10036 22.3526 5.86818 22.135 5.74261L19.6766 4.32342L18.2574 1.86501C18.1318 1.64746 17.8997 1.51345 17.6485 1.51345H14.81L12.3515 0.094166C12.134 -0.0313652 11.866 -0.0314121 11.6484 0.094166L9.18999 1.5134H6.35157C6.10037 1.5134 5.8682 1.64742 5.74262 1.86501L4.32348 4.32342L1.86503 5.74261C1.64743 5.86818 1.51342 6.10031 1.51342 6.35156V9.18998C0.959172 10.1501 0.648429 10.6884 0.0941835 11.6485C-0.0313945 11.866 -0.0313945 12.134 0.0941835 12.3515C0.64841 13.3116 0.959143 13.8499 1.51337 14.81V17.6484C1.51337 17.8996 1.64739 18.1318 1.86498 18.2574L4.32343 19.6766L5.74262 22.135C5.8682 22.3526 6.10032 22.4866 6.35157 22.4866H9.19004L11.6485 23.9058C11.7572 23.9686 11.8786 24 12 24C12.1215 24 12.2428 23.9686 12.3516 23.9058L14.81 22.4866H17.6484C17.8996 22.4866 18.1318 22.3526 18.2574 22.135L19.6765 19.6766L22.1349 18.2574C22.3525 18.1319 22.4865 17.8997 22.4865 17.6485V14.8101L23.9058 12.3516C24.0314 12.134 24.0314 11.866 23.9058 11.6485Z"
          fill={completed || active ? "#6A38BB" : "#2C2E35"}
        />
        {(active || completed) && (
          <>
            <path
              d="M16.6641 10.1198L11.5615 15.6363C11.3445 15.8709 11.0561 16 10.7493 16C10.4425 16 10.1541 15.8709 9.93709 15.6363L7.33647 12.8248C7.1195 12.5903 7 12.2785 7 11.9468C7 11.615 7.1195 11.3032 7.33647 11.0686C7.55335 10.8341 7.84176 10.7049 8.14865 10.7049C8.45545 10.7049 8.74395 10.8341 8.96083 11.0687L10.7492 13.002L15.0396 8.36366C15.2566 8.1291 15.545 8 15.8518 8C16.1586 8 16.447 8.1291 16.664 8.36366C17.112 8.84799 17.112 9.6357 16.6641 10.1198Z"
              fill="white"
            />
            <path
              d="M16.6641 10.1198L11.5615 15.6363C11.3445 15.8709 11.0561 16 10.7493 16C10.4425 16 10.1541 15.8709 9.93709 15.6363L7.33647 12.8248C7.1195 12.5903 7 12.2785 7 11.9468C7 11.615 7.1195 11.3032 7.33647 11.0686C7.55335 10.8341 7.84176 10.7049 8.14865 10.7049C8.45545 10.7049 8.74395 10.8341 8.96083 11.0687L10.7492 13.002L15.0396 8.36366C15.2566 8.1291 15.545 8 15.8518 8C16.1586 8 16.447 8.1291 16.664 8.36366C17.112 8.84799 17.112 9.6357 16.6641 10.1198Z"
              fill="white"
            />
          </>
        )}
      </svg>
    </div>
  );
}

interface SteppersProps {
  currentStep: number;
  totalSteps: number;
}

export default function Steppers({ currentStep, totalSteps }: SteppersProps) {
  const getProgressValue = (stepIndex: number) => {
    if (stepIndex === 0) {
      if (currentStep === 1) return 25;
      if (currentStep === 2) return 50;
      if (currentStep === 3) return 75;
      if (currentStep >= 4) return 100;
    } else if (stepIndex === 1) {
      if (currentStep === 5) return 25;
      if (currentStep === 6) return 50;
      if (currentStep === 7) return 75;
      if (currentStep >= 8) return 100;
    } else if (stepIndex === 2) {
      if (currentStep === 9) return 25;
      if (currentStep === 10) return 50;
      if (currentStep === 11) return 75;
      if (currentStep >= 12) return 100;
    }
    return 0;
  };

  return (
    <StepperContainer className="_stepper_1480q_1">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <StepIconWrapper className="_step_1480q_1">
            <HexStepIcon
              active={index === Math.floor((currentStep - 1) / 4)}
              completed={index < Math.floor((currentStep - 1) / 4)}
            />
          </StepIconWrapper>
          {index < totalSteps - 1 && (
            <CustomLinearProgress
              variant="determinate"
              value={getProgressValue(index)}
            />
          )}
        </React.Fragment>
      ))}
    </StepperContainer>
  );
}
