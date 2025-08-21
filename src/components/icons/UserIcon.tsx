"use client";

import React from "react";
import clsx from "clsx";

interface UserIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string; // Fill color
  strokeColor?: string; // Stroke color
  className?: string;
  strokeWidth?: number; // Optional stroke width
}

export default function UserIcon({
  size = 40,
  color = "currentColor",
  strokeColor = "none",
  strokeWidth = 1,
  className,
  ...props
}: UserIconProps) {
  const height = (size * 43) / 40;

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 40 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(className)}
      {...props}
    >
      <path
        d="M28.5002 26.8438C31.2918 26.8439 33.9757 27.9218 35.992 29.8525C38.0083 31.7833 39.2015 34.4179 39.3227 37.2069L39.3335 37.6771V39.8438C39.3338 40.937 38.921 41.99 38.1776 42.7916C37.4342 43.5932 36.4153 44.0843 35.3252 44.1663L35.0002 44.1771H4.66683C3.57358 44.1774 2.5206 43.7645 1.71898 43.0212C0.917349 42.2778 0.426323 41.2589 0.34433 40.1688L0.333496 39.8438V37.6771C0.333657 34.8854 1.4115 32.2016 3.34226 30.1852C5.27302 28.1689 7.90762 26.9757 10.6967 26.8546L11.1668 26.8438H28.5002ZM19.8335 0.84375C22.7067 0.84375 25.4622 1.98512 27.4938 4.01676C29.5255 6.0484 30.6668 8.8039 30.6668 11.6771C30.6668 14.5503 29.5255 17.3058 27.4938 19.3374C25.4622 21.3691 22.7067 22.5104 19.8335 22.5104C16.9603 22.5104 14.2048 21.3691 12.1732 19.3374C10.1415 17.3058 9.00016 14.5503 9.00016 11.6771C9.00016 8.8039 10.1415 6.0484 12.1732 4.01676C14.2048 1.98512 16.9603 0.84375 19.8335 0.84375Z"
        fill={color}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
