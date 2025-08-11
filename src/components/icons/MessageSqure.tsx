import React from "react";

interface MessageSquareProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function MessageSquare({ size = 16, color = "currentColor", className = "" }: MessageSquareProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <g clipPath="url(#clip0_2860_2751)">
        <path
          d="M4.64 9.76005V4.80005H1.6C0.72 4.80005 0 5.52005 0 6.40005V11.2C0 12.08 0.72 12.8 1.6 12.8H2.4V15.2L4.8 12.8H8.8C9.68 12.8 10.4 12.08 10.4 11.2V9.74405C10.3474 9.75534 10.2938 9.76097 10.24 9.76085H4.64V9.76005ZM14.4 0.800049H7.2C6.32 0.800049 5.6 1.52005 5.6 2.40005V8.80005H11.2L13.6 11.2V8.80005H14.4C15.28 8.80005 16 8.08085 16 7.20005V2.40005C16 1.52005 15.28 0.800049 14.4 0.800049Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_2860_2751">
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
}
