"use client";

import FooterNav from "./FooterNav";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0c0c0c] flex">
      <div className="flex-1 flex flex-col">
        <Header />
        <main className={`pt-16 transition-all duration-300 ml-0 xl:ml-23.5 h-full`}>{children}</main>
        <div className="block xl:hidden">
          <FooterNav />
        </div>
      </div>
    </div>
  );
}
