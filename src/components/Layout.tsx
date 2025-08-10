"use client";

import Header from "./Header";
import Sidebar from "./Sidebar";
import { useSidebar } from "../context/SidebarProvider";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0c0c0c] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className={`pt-16 transition-all duration-300 ml-0 lg:ml-23.5`}>{children}</main>
      </div>
    </div>
  );
}
