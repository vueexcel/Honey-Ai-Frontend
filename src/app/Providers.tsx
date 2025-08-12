"use client";

import ThemeProvider from "@/context/ThemeProvider";
import SidebarProvider from "@/context/SidebarProvider";
import { AuthProvider } from "@/context/AuthContextProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
