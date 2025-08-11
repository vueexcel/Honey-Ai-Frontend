// components/icons/TargetIcon.tsx
import React from "react";

interface CompassIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function CompassIcon({
  size = 16,
  color = "currentColor",
  className = "",
}: CompassIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M8 0C3.58879 0 0 3.58879 0 8C0 12.4112 3.58879 16 8 16C12.4109 16 15.9995 12.4112 15.9995 8C15.9995 3.58879 12.4109 0 8 0ZM11.9542 4.55727L9.4206 9.26513C9.38587 9.32967 9.333 9.3828 9.2682 9.4176L4.56063 11.9509C4.50463 11.9809 4.44373 11.9955 4.38309 11.9955C4.28593 11.9955 4.18993 11.9579 4.1178 11.8857C4.00065 11.7687 3.97419 11.5885 4.05264 11.4427L6.58572 6.73527C6.62056 6.6706 6.6736 6.61747 6.73827 6.58275L11.4463 4.04942C11.5921 3.97084 11.772 3.99742 11.8893 4.11445C12.0062 4.23161 12.0329 4.41147 11.9542 4.55727Z"
        fill={color}
      />
      <path
        d="M8.00941 7.1283C7.52688 7.1283 7.13574 7.51896 7.13574 8.00156C7.13574 8.48396 7.52694 8.8753 8.00941 8.8753C8.49148 8.8753 8.88268 8.48396 8.88268 8.00156C8.88268 7.51896 8.49148 7.1283 8.00941 7.1283Z"
        fill={color}
      />
    </svg>
  );
}
