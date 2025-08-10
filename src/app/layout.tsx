import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "../context/ThemeProvider";
import SidebarProvider from "../context/SidebarProvider";
import { AuthProvider } from "@/context/AuthContextProvider";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "get-honey.ai - Your Dream AI Companion Awaits",
  description:
    "Create your ideal companion, shape her look, personality, and bring her to life in one click. 100% powered by Artificial intelligence",
  keywords:
    "AI companion, artificial intelligence, virtual companion, AI girlfriend, AI character",
  authors: [{ name: "get-honey.ai" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} antialiased bg-gray-900 text-white font-[var(--font-manrope)]`}
      >
        <AuthProvider>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
