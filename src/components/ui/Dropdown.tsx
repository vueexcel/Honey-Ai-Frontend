"use client";

import clsx from "clsx";
import { ArrowLeft, Info, X } from "lucide-react"; // Imported the 'Info' icon
import React from "react";

export type DropdownOption = {
  value: string;
  label: string;
  disabled?: boolean;
  submenu?: DropdownOption[];
};

export type DropdownProps = {
  options: DropdownOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, option: DropdownOption) => void;
  renderButton: (props: { open: boolean; selectedOption?: DropdownOption; toggle: () => void }) => React.ReactNode;
  renderOption?: (props: {
    option: DropdownOption;
    selected: boolean;
    focused: boolean;
    hasSubmenu: boolean;
  }) => React.ReactNode;
  disabled?: boolean;
  align?: "left" | "right";
  fullWidth?: boolean;
  className?: string;
  menuClassName?: string;
  placement?: "bottom" | "top";
};

export default function Dropdown({
  options,
  value,
  defaultValue,
  onChange,
  renderButton,
  renderOption,
  disabled,
  align = "left",
  fullWidth,
  className,
  menuClassName,
  placement,
}: DropdownProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
  const selectedValue = isControlled ? value : internalValue;
  const selectedOption = options.find((o) => o.value === selectedValue);

  const [open, setOpen] = React.useState(false);

  // Stack for nested menus
  const [menuStack, setMenuStack] = React.useState<{ options: DropdownOption[]; parent?: DropdownOption }[]>([
    { options: options },
  ]);

  const currentMenu = menuStack[menuStack.length - 1];

  const buttonRef = React.useRef<HTMLDivElement | null>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  // Close on outside click
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(t) && buttonRef.current && !buttonRef.current.contains(t)) {
        setOpen(false);
        setMenuStack([{ options: options }]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, options]);

  function commitChange(opt: DropdownOption) {
    if (opt.disabled) return;

    // Build path
    const path = [...menuStack.map((m) => m.parent?.value).filter(Boolean), opt.value];

    if (!isControlled) setInternalValue(opt.value);

    // Emit both string + array
    onChange?.(path.join(" "), { ...opt, path });

    // Only close when it's a leaf
    if (!opt.submenu) {
      setOpen(false);
      setMenuStack([{ options }]);
    }
  }

  function enterSubmenu(opt: DropdownOption) {
    if (!opt.submenu) return;
    setMenuStack((stack) => [...stack, { options: opt.submenu!, parent: opt }]);
  }

  function goBack() {
    setMenuStack((stack) => (stack.length > 1 ? stack.slice(0, -1) : stack));
  }

  return (
    <div className={clsx("relative", fullWidth && "w-full", className)}>
      <div ref={buttonRef}>
        {renderButton({
          open,
          selectedOption,
          toggle: () => setOpen((o) => !o),
        })}
      </div>

      {/* Menu */}
      <div
        ref={menuRef}
        style={{ display: open ? "block" : "none" }}
        className={clsx(
          "absolute z-50 min-w-80 rounded-xl bg-[#0c0c0ccc] outline-none",
          align === "left" ? "right-0" : "left-0",
          placement === "top" ? "bottom-full mb-6 origin-bottom" : "mt-1 origin-top",
          "transition-all duration-150",
          fullWidth && "w-full",
          menuClassName
        )}
      >
        <ul className="max-h-64 overflow-auto p-2 space-y-1 backdrop-blur-xs rounded-xl">
          {/* Back button if inside submenu */}
          {menuStack.length > 1 && (
            <li>
              <div
                onClick={goBack}
                className="flex w-full items-center justify-between gap-2 px-3 py-2 rounded-md text-white"
              >
                <ArrowLeft className="text-white cursor-pointer" size={20} onClick={goBack} />
                <div className="flex gap-2">
                  {currentMenu.parent?.icon && <currentMenu.parent.icon className="w-5 h-5 text-[#ff44ba]" />}
                  <span>{currentMenu.parent?.label}</span>
                </div>
                <X onClick={() => setOpen(false)} size={20} className="cursor-pointer" />
              </div>
              <div className="my-1 border-t border-[#1f1625]" />
            </li>
          )}
          {currentMenu.options.map((opt) => {
            const isSelected = selectedValue === opt.value;
            const hasSubmenu = !!opt.submenu?.length;
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  disabled={opt.disabled}
                  onClick={() => {
                    commitChange(opt);
                    if (hasSubmenu) enterSubmenu(opt);
                  }}
                  className={clsx(
                    "flex w-full items-center justify-between px-3 py-2 rounded-md text-left text-white hover:bg-[#ae52e726] cursor-pointer",
                    isSelected && "font-medium",
                    opt.disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {renderOption
                    ? renderOption({
                        option: opt,
                        selected: isSelected,
                        focused: false,
                        hasSubmenu,
                      })
                    : opt.label}
                  {hasSubmenu && <span className="ml-2">›</span>}
                </button>
                {menuStack.length === 1 && <div className="my-2 border-t border-[#1f1625]" />}
              </li>
            );
          })}
          {menuStack.length === 1 && (
            <li className="flex items-center gap-3 px-4 py-2 text-neutral-400 text-sm cursor-default text-[16px]">
              <Info size={20} className="flex-shrink-0 mt-0.5" />
              <span>Start your prompt with these words to ask for images</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
