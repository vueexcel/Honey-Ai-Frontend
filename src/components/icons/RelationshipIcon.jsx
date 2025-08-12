import React from "react";

export default function RelationshipIcon({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6 6.75C5.40666 6.75 4.82664 6.57405 4.33329 6.25043..." fill={color} />
    </svg>
  );
}
