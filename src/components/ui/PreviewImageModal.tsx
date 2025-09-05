"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

type PreviewImageModalProps = {
  src: string | null;
  alt?: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function PreviewImageModal({ src, alt = "Preview image", isOpen, onClose }: PreviewImageModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && src && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Modal Content */}
          <motion.div
            className="relative max-h-[90vh] max-w-5xl flex items-center justify-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition z-10 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img src={src} alt={alt} className="max-h-[85vh] w-auto rounded-lg shadow-lg object-contain" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
