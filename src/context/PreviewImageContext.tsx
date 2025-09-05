"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import PreviewImageModal from "../components/ui/PreviewImageModal";

type PreviewImageContextType = {
  openPreview: (src: string, alt?: string) => void;
  closePreview: () => void;
};

const PreviewImageContext = createContext<PreviewImageContextType | null>(null);

export function PreviewImageProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const [alt, setAlt] = useState<string>("Preview image");

  const openPreview = (newSrc: string, newAlt?: string) => {
    setSrc(newSrc);
    setAlt(newAlt ?? "Preview image");
    setIsOpen(true);
  };

  const closePreview = () => {
    console.log("close preview");
    setIsOpen(false);
    setTimeout(() => {
      setSrc(null);
    }, 200);
  };

  return (
    <PreviewImageContext.Provider value={{ openPreview, closePreview }}>
      {children}
      <PreviewImageModal src={src} alt={alt} isOpen={isOpen} onClose={closePreview} />
    </PreviewImageContext.Provider>
  );
}

export function usePreviewImage() {
  const ctx = useContext(PreviewImageContext);
  if (!ctx) {
    throw new Error("usePreviewImage must be used within PreviewImageProvider");
  }
  return ctx;
}
