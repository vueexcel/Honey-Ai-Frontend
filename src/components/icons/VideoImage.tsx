import React from "react";

export default function VideoImage({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.344 9.6765C7.72484 9.35984 8.109 9.35984 8.499 9.6765L11.073 11.74C11.465 12.0575 11.465 12.5534 11.073 12.87L8.499 14.9335C8.109 15.25 7.72484 15.25 7.344 14.9335L4.77 12.87C4.378 12.5534 4.378 12.0575 4.77 11.74L7.344 9.6765Z"
        fill={color}
      />
    </svg>
  );
}
