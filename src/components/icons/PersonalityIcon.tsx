import React from "react";

export default function PersonalityIcon({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4.50156 11.4L0.601562 7.5L4.50156 3.6L8.40156 7.5L4.50156 11.4ZM12.3016 15.3L8.40156 11.4L12.3016 7.5L16.2016 11.4L12.3016 15.3ZM20.1016 19.2L16.2016 15.3L20.1016 11.4L21.3016 12.6C21.8016 13.1 22.1016 13.7 22.1016 14.4C22.1016 15.1 21.8016 15.7 21.3016 16.2L20.1016 19.2Z"
        fill={color}
      />
    </svg>
  );
}
