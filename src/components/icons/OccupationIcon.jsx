import React from "react";

export default function OccupationIcon({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.25168 5.46068V6.88068L5.55768 7.01868L4.55768 8.05868V12.0587C4.55768 12.8853 5.23068 13.5587 6.05768 13.5587H18.0577C18.8847 13.5587 19.5577 12.8853 19.5577 12.0587V8.05868L18.5577 7.01868L16.8637 6.88068V5.46068H7.25168ZM9.25168 7.46068H14.7517V8.88068H9.25168V7.46068Z"
        fill={color}
      />
    </svg>
  );
}
