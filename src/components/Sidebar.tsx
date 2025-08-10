"use client";

import {
  Image,
  Crown,
  CompassIcon,
  MessagesSquare,
  Venus,
  Wand,
  CrownIcon,
} from "lucide-react";
import Button from "./ui/Button";
import { useSidebar } from "../context/SidebarProvider";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

const sidebarItems = [
  { icon: CompassIcon, notification: false, href: "/", text: "Explore" },
  { icon: MessagesSquare, notification: false, href: "/chat", text: "Chat" },
  { icon: Image, notification: false, href: "/gallery", text: "Gallery" },
  { icon: Venus, notification: true, href: "/my-ai", text: "MY AI" },
  { icon: CrownIcon, notification: true, href: "/pricing", text: "Pricing" },
];

export default function Sidebar() {
  const { isSidebarOpen, openSidebar, closeSidebar } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <motion.aside
      onMouseEnter={() => openSidebar()}
      onMouseLeave={() => closeSidebar()}
      animate={{ width: isSidebarOpen ? 250 : 94 }}
      transition={{ duration: 0.05, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-[calc(100vh-64px)] bg-[linear-gradient(0deg,_#000c_-23.86%,_#281633cc_95.44%)] flex-col py-6 z-40 shadow-xl mt-16 overflow-hidden transition-all hidden lg:flex"
    >
      <div className="mt-4 mb-4 px-6 relative">
        {isSidebarOpen ? (
          <Button
            variant="gradient"
            className="w-full h-10 rounded-xl flex items-center justify-center text-xs font-bold shadow-lg gap-2"
            onClick={() => router.push("/create-character")}
          >
            <Wand size={22} />
            Create Character
          </Button>
        ) : (
          <Button
            variant="gradient"
            className="w-11.5 h-11.5 rounded-xl flex items-center justify-center shadow-lg"
          >
            <Wand size={22} />
          </Button>
        )}

        {pathname == "/create-character" && (
          <div className="absolute top-0 left-0 w-2 h-full rounded-tr-[12px] rounded-br-[12px] bg-pink-500 animate-pulse" />
        )}
      </div>
      {/* Sidebar Items */}
      <div className="flex flex-col gap-4 flex-1 w-full">
        {sidebarItems.map((item, idx) => {
          const isActive = pathname === item.href;

          return (
            <div
              key={idx}
              className="relative flex items-center gap-3 w-full cursor-pointer group px-2"
              onClick={() => router.push(item.href)}
            >
              <div className="flex items-center w-full px-4">
                {/* Icon - fixed width */}
                <div className="h-11.5 w-11.5 flex items-center justify-center group-hover:text-[#ff44ba] shrink-0">
                  <item.icon
                    size={22}
                    className={clsx(
                      "transition-colors",
                      isActive && "text-[#ff44ba]"
                    )}
                  />
                </div>

                {/* Label - only shown when sidebar is open */}
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={clsx(
                        isActive ? "text-[#ff44ba]" : "text-white",
                        "ml-3 text-base font-semibold whitespace-nowrap group-hover:text-[#ff44ba]"
                      )}
                    >
                      {item.text}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Active indicator bar */}
              {isActive && (
                <div className="absolute top-0 left-0 w-2 h-full rounded-tr-[12px] rounded-br-[12px] bg-pink-500 animate-pulse" />
              )}
            </div>
          );
        })}
        <div className="ml-6 mr-3">
          <img
            src="https://get-honey.ai/assets/timebomb-banner-Nf-LARff.webp"
            alt=""
          />
        </div>
      </div>

      {/* Get Premium Button */}
      <div className="mt-8 mb-2 px-6">
        {isSidebarOpen ? (
          <div className="flex flex-col items-center justify-center gap-2 relative pt-3">
            <a
              className="relative h-11 rounded-xl flex justify-center items-center"
              href="/contact"
            >
              <span className="shrink-0 flex justify-center gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M7.99967 1.33331C4.32367 1.33331 1.33301 4.32398 1.33301 7.99998V10.762C1.33301 11.4446 1.93101 12 2.66634 12H3.33301C3.50982 12 3.67939 11.9297 3.80441 11.8047C3.92944 11.6797 3.99967 11.5101 3.99967 11.3333V7.90465C3.99967 7.72784 3.92944 7.55827 3.80441 7.43324C3.67939 7.30822 3.50982 7.23798 3.33301 7.23798H2.72767C3.09834 4.65798 5.31834 2.66665 7.99967 2.66665C10.681 2.66665 12.901 4.65798 13.2717 7.23798H12.6663C12.4895 7.23798 12.32 7.30822 12.1949 7.43324C12.0699 7.55827 11.9997 7.72784 11.9997 7.90465V12C11.9997 12.7353 11.4017 13.3333 10.6663 13.3333H9.33301V12.6666H6.66634V14.6666H10.6663C12.137 14.6666 13.333 13.4706 13.333 12C14.0683 12 14.6663 11.4446 14.6663 10.762V7.99998C14.6663 4.32398 11.6757 1.33331 7.99967 1.33331Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span className="font-semibold whitespace-nowrap">
                  Contact Us
                </span>
              </span>
            </a>
            <div className="flex gap-2.5 text-[10px] flex-nowrap text-white">
              <a href="">Terms of Service</a>✦<a href="">Privacy Policy</a>
            </div>
            <span className="absolute top-0 left-0 w-full h-[1px] bg-linear-[90deg,_#06060600,_#494848_54.5%,_#06060600]"></span>
          </div>
        ) : (
          <a
            className="relative h-11 rounded-xl flex justify-center items-center pt-3"
            href="/contact"
          >
            <span className="shrink-0 flex ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.99967 1.33331C4.32367 1.33331 1.33301 4.32398 1.33301 7.99998V10.762C1.33301 11.4446 1.93101 12 2.66634 12H3.33301C3.50982 12 3.67939 11.9297 3.80441 11.8047C3.92944 11.6797 3.99967 11.5101 3.99967 11.3333V7.90465C3.99967 7.72784 3.92944 7.55827 3.80441 7.43324C3.67939 7.30822 3.50982 7.23798 3.33301 7.23798H2.72767C3.09834 4.65798 5.31834 2.66665 7.99967 2.66665C10.681 2.66665 12.901 4.65798 13.2717 7.23798H12.6663C12.4895 7.23798 12.32 7.30822 12.1949 7.43324C12.0699 7.55827 11.9997 7.72784 11.9997 7.90465V12C11.9997 12.7353 11.4017 13.3333 10.6663 13.3333H9.33301V12.6666H6.66634V14.6666H10.6663C12.137 14.6666 13.333 13.4706 13.333 12C14.0683 12 14.6663 11.4446 14.6663 10.762V7.99998C14.6663 4.32398 11.6757 1.33331 7.99967 1.33331Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            <span className="absolute top-0 left-0 w-full h-[1px] bg-linear-[90deg,_#06060600,_#494848_54.5%,_#06060600]"></span>
          </a>
        )}
      </div>
    </motion.aside>
  );
}
