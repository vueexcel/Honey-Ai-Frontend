import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";
import ThemeProvider from "@/context/ThemeProvider";
import SidebarProvider from "@/context/SidebarProvider";
import { AuthProvider } from "@/context/AuthContextProvider";
import { Sidebar } from "@/components";

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
}: {
  children: React.ReactNode;
}) {
  console.log("remounting layout");
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body
        className={`${manrope.variable} ${inter.variable} antialiased bg-gray-900 text-white font-[var(--font-manrope)]`}
      >
        <AuthProvider>
          <ThemeProvider>
            <SidebarProvider>
              <Sidebar />
              <div className="flex-1 flex flex-col">{children}</div>
            </SidebarProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
