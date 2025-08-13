"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import CompassIcon from "./icons/CompassIcon";
import MessageSquare from "./icons/MessageSqure";
import MyAI from "./icons/MyAI";
import Crown from "./icons/Crown";
import WandIcon from "./icons/WandIcon";

const navLinks = [
  { icon: CompassIcon, notification: false, href: "/", text: "Explore", isCenter: false },
  { icon: MessageSquare, notification: false, href: "/chat", text: "Chat", isCenter: false },
  { icon: WandIcon, notification: false, href: "/create-character", text: "Create", isCenter: true },
  { icon: MyAI, notification: true, href: "/my-ai", text: "MY AI", isCenter: false },
  { icon: Crown, notification: true, href: "/pricing", text: "Pricing", isCenter: false },
];

export default function FooterNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 bg-[var(--main)] px-6">
      <ul className="flex justify-between max-w-xl mx-auto items-center h-[68px]">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

          if (link.isCenter) {
            return (
              <li key={link.text} className="relative">
                {!isActive ? (
                  <Link
                    href={link.href}
                    aria-label={link.text}
                    className="relative top-0 flex items-center justify-center w-[52px] h-[52px] bg-gradient-to-br from-pink-500 to-purple-600 rounded-full shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                  >
                    <link.icon size={24} className="text-white" />
                  </Link>
                ) : (
                  <>
                    <Link
                      href={link.href}
                      className={`flex flex-col items-center justify-center gap-1 transition-colors duration-300 ${
                        isActive ? "text-[#ff44ba]" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <div className="relative">
                        <link.icon size={24} className="" />
                        {link.notification && (
                          <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full text-[#ff44ba] border-2 border-[#121212]"></span>
                        )}
                      </div>
                      <span className="text-base font-semibold">{link.text}</span>
                    </Link>
                    {isActive && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#ff44ba]"></span>}
                  </>
                )}
              </li>
            );
          }

          return (
            <li key={link.text} className="relative">
              <Link
                href={link.href}
                className={`flex flex-col items-center justify-center gap-1 transition-colors duration-300 ${
                  isActive ? "text-[#ff44ba]" : "text-gray-400 hover:text-white"
                }`}
              >
                <div className="relative">
                  <link.icon size={24} className="" />
                  {link.notification && (
                    <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full text-[#ff44ba] border-2 border-[#121212]"></span>
                  )}
                </div>
                <span className="text-base font-semibold">{link.text}</span>
              </Link>
              {isActive && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#ff44ba]"></span>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
