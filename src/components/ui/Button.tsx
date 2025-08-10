"use client";

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const base =
  "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

const variants = {
  default: "bg-purple-600 text-white hover:bg-purple-700",
  ghost: "bg-transparent hover:bg-[#181818] text-gray-700 dark:text-gray-200",
  pink: "bg-[linear-gradient(91deg,_#ff44ba_0%,_#8840b5_100%)]",
  gradient: "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700",
};

const sizes = {
  default: "px-4 text-sm",
  icon: "p-0",
};

function cn(...classes: (string | undefined | false)[]) {
  return twMerge(classes.filter(Boolean).join(" "));
}

const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => (
  <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
));
Button.displayName = "Button";

export default Button;
