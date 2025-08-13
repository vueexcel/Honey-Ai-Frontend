"use client";

import { useState } from "react";
import BrandLogo from "./icons/BrandLogo";
import { useAuth } from "@/context/AuthContextProvider";
import CompassIcon from "./icons/CompassIcon";
import MessageSquare from "./icons/MessageSqure";
import MyAI from "./icons/MyAI";
import Crown from "./icons/Crown";
import { Menu, X, Clock, Sun, Moon, Settings, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeProvider";
import { useSidebar } from "../context/SidebarProvider";
import Button from "./ui/Button";
import PremiumBtn from "./ui/PremiumBtn";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import SignInModal from "./SignInModal";
import DropdownMenu from "./DropdownMenu";

import useChatStreaming from "@/hooks/useChatStreaming";
import WandIcon from "./icons/WandIcon";
import BrandLogoText from "./icons/BrandLogoText";

const sidebarItems = [
  { icon: CompassIcon, notification: false, href: "/", text: "Explore" },
  { icon: MessageSquare, notification: false, href: "/chat", text: "Chat" },
  { icon: MyAI, notification: true, href: "/my-ai", text: "MY AI" },
  { icon: Crown, notification: true, href: "/pricing", text: "Pricing", iconColor: "text-[rgb(255,_185,_48)]" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { toggleSidebar, isSidebarOpen } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { isLoggedIn, logout, user } = useAuth();
  const { balance } = useChatStreaming();

  const items = [
    {
      label: "Subscription",
      icon: <Crown className="w-5 h-5 text-yellow-500" />,
      onClick: () => console.log("Go to Subscription"),
    },
    {
      label: "Dark mode",
      icon: <Moon className="w-5 h-5" />,
      onClick: () => console.log("Go to Subscription"),
    },
    {
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      onClick: () => console.log("Open Settings"),
    },
    {
      label: "Log out",
      icon: <LogOut className="w-5 h-5" />,
      danger: true,
      onClick: () => logout(),
    },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0c0c0ce6] backdrop-blur  dark:border-gray-800 shadow-sm">
      <div className="px-4.5">
        <div className="flex items-center justify-between h-16 relative">
          <div className="hidden xl:flex items-center">
            <div className="flex items-center space-x-2 gap-12">
              <Button className="mx-2" variant="ghost" size="icon" aria-label="Open menu" onClick={toggleSidebar}>
                {isSidebarOpen ? <X size={48} strokeWidth={1} /> : <Menu size={48} strokeWidth={1} />}
              </Button>
              <div className="flex items-center space-x-2">
                <BrandLogo className="block" />
                <BrandLogoText />
              </div>
            </div>
          </div>

          <div className="flex items-center flex-1 min-w-0 xl:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Open menu"
            >
              {mobileMenuOpen ? (
                <X size={36} strokeWidth={1} color="white" />
              ) : (
                <Menu size={36} strokeWidth={1} color="white" />
              )}
            </Button>
            <div className="flex items-center ml-3">
              <BrandLogo />
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 xl:space-x-4 flex-1 justify-end">
            <div className="hidden xl:block">
              <PremiumBtn />
            </div>
            <div className="hidden xl:flex items-center space-x-2 text-gray-700 dark:text-white text-sm">
              <Clock size={16} />
              <span>Offer expires in 09:46</span>
            </div>

            {isLoggedIn ? (
              <div className="text-white bg-[var(--gray-500)] px-2 py-2 rounded-xl">
                <span>Credits: </span>
                <span>{balance}</span>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="border border-transparent text-sm font-semibold px-6 py-3 bg-[#181818] hover:bg-[#24162c] hover:shadow-sm hover:border-[#ae52e7] "
              >
                {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
              </Button>
            )}
            {!isLoggedIn ? (
              <Button
                variant="ghost"
                className="text-gray-900 dark:text-white border border-transparent text-sm font-semibold px-6 py-3 bg-[#181818] hover:bg-[#24162c] hover:shadow-sm hover:border-[#ae52e7] hover:text-[#ae52e7]"
                onClick={() => setOpen(true)}
              >
                Login
              </Button>
            ) : (
              <DropdownMenu title={user.user_metadata.email?.split("@")[0]} items={items} />
            )}
          </div>
        </div>
        <SignInModal isOpen={open} onClose={() => setOpen(false)} />
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className={clsx(
              "fixed  w-full  inset-0 z-50 bg-linear-[0deg,_#000c_-23.86%,_#281633cc_95.44%] flex",
              pathname == "/" ? "top-[130px] h-[calc(100dvh-130px)]" : "top-[64px] h-[calc(100dvh-64px)]"
            )}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="w-dvw h-full bg-linear-[0deg,_#000c_-23.86%,_#281633cc_95.44% shadow-xl flex flex-col relative"
              style={{ backdropFilter: "blur(25px)" }}
            >
              <div className="mt-4 mb-4 px-6 relative">
                <Button
                  variant="gradient"
                  className="w-full max-w-[223px] h-10 rounded-xl flex items-center justify-center text-xs font-bold shadow-lg gap-2"
                  onClick={() => router.push("/create-character")}
                >
                  <WandIcon size={22} />
                  Create Character
                </Button>
                {pathname == "/create-character" && (
                  <div className="absolute top-0 left-0 w-2 h-full rounded-tr-[12px] rounded-br-[12px] bg-pink-500 animate-pulse" />
                )}
              </div>
              {/* Sidebar Items */}
              <div className="flex flex-col gap-4 flex-1 w-full">
                {sidebarItems.map((item, idx) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

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
                              isActive && "text-[#ff44ba]",
                              item?.iconColor && `${item.iconColor}`
                            )}
                          />
                        </div>

                        <AnimatePresence>
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
                        </AnimatePresence>
                      </div>

                      {isActive && (
                        <div className="absolute top-0 left-0 w-2 h-full rounded-tr-[12px] rounded-br-[12px] bg-pink-500 animate-pulse" />
                      )}
                    </div>
                  );
                })}
                <div className="ml-6 mr-3 max-w-[250px]">
                  <img src="https://get-honey.ai/assets/timebomb-banner-Nf-LARff.webp" alt="" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center px-3 py-6 relative">
                <a className="relative h-11 rounded-xl flex justify-center items-center" href="/contact">
                  <span className="shrink-0 flex justify-center items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M7.99967 1.33331C4.32367 1.33331 1.33301 4.32398 1.33301 7.99998V10.762C1.33301 11.4446 1.93101 12 2.66634 12H3.33301C3.50982 12 3.67939 11.9297 3.80441 11.8047C3.92944 11.6797 3.99967 11.5101 3.99967 11.3333V7.90465C3.99967 7.72784 3.92944 7.55827 3.80441 7.43324C3.67939 7.30822 3.50982 7.23798 3.33301 7.23798H2.72767C3.09834 4.65798 5.31834 2.66665 7.99967 2.66665C10.681 2.66665 12.901 4.65798 13.2717 7.23798H12.6663C12.4895 7.23798 12.32 7.30822 12.1949 7.43324C12.0699 7.55827 11.9997 7.72784 11.9997 7.90465V12C11.9997 12.7353 11.4017 13.3333 10.6663 13.3333H9.33301V12.6666H6.66634V14.6666H10.6663C12.137 14.6666 13.333 13.4706 13.333 12C14.0683 12 14.6663 11.4446 14.6663 10.762V7.99998C14.6663 4.32398 11.6757 1.33331 7.99967 1.33331Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span className="font-semibold whitespace-nowrap">Contact Us</span>
                  </span>
                </a>
                <div className="flex gap-2.5 text-[10px] flex-nowrap text-white">
                  <a href="">Terms of Service</a>✦<a href="">Privacy Policy</a>
                </div>
                <span className="absolute top-0 left-0 w-full h-[1px] bg-linear-[90deg,_#06060600,_#494848_54.5%,_#06060600]"></span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
