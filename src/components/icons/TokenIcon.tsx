"use client";

import React from "react";
import clsx from "clsx";

type IconProps = {
  size?: number | string;
  className?: string;
};

const TokenIcon: React.FC<IconProps> = ({ size = 23, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21 23"
      width={size}
      height={size}
      fill="none"
      className={clsx("inline-block", className)}
    >
      <path
        d="M9.4395 6.61039L9.43945 6.61045L6.61045 9.43945L6.61039 9.4395C6.32919 9.72079 6.17121 10.1023 6.17121 10.5C6.17121 10.8977 6.32919 11.2792 6.61039 11.5605L6.61045 11.5606L9.43945 14.3896L9.4395 14.3896C9.72079 14.6708 10.1023 14.8288 10.5 14.8288C10.8977 14.8288 11.2792 14.6708 11.5605 14.3896L11.5606 14.3896L14.3896 11.5606L14.3896 11.5605C14.6708 11.2792 14.8288 10.8977 14.8288 10.5C14.8288 10.1023 14.6708 9.72079 14.3896 9.4395L14.3896 9.43945L11.5606 6.61045L11.5605 6.61039C11.2792 6.32919 10.8977 6.17121 10.5 6.17121C10.1023 6.17121 9.72079 6.32919 9.4395 6.61039ZM10.5 1C15.7469 1 20 5.25314 20 10.5C20 15.7469 15.7469 20 10.5 20C5.25314 20 1 15.7469 1 10.5C1 5.25314 5.25314 1 10.5 1Z"
        fill="#FFB930"
        stroke="#FF7B02"
      />
    </svg>
  );
};

export default TokenIcon;
