"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import UserIcon from "./icons/UserIcon";

type DropdownItem = {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  danger?: boolean;
};

interface DropdownMenuProps {
  avatar?: string;
  title?: string;
  items: DropdownItem[];
}

export default function DropdownMenu({
  avatar,
  title,
  items,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={modalRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl h-[50px] p-2 bg-[var(--gray-500)] transition-colors text-white"
      >
        {avatar ? (
          <img
            src={avatar}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full "
          />
        ) : (
          <div className="w-9 h-9 p-1 rounded-full bg-linear-[91deg,_#ff44ba_0%,_#8840b5_100%] flex items-center justify-center overflow-hidden">
            <UserIcon size={40} className="" />
          </div>
        )}
        {title && (
          <span className="font-semibold hidden sm:block">{title}</span>
        )}
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-[#181818cc] rounded-lg shadow-lg z-10 backdrop:blur-xs">
          <ul className="p-2">
            {items.map((item, idx) => (
              <li
                key={idx}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 p-2 hover:bg-[#ffffff12] rounded-md cursor-pointer ${
                  item.danger ? "text-red-500" : ""
                }`}
              >
                {item.icon && item.icon}
                <span className="font-semibold">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
