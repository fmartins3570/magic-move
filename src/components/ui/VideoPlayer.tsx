import { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  isOpen: boolean;
  onClose: () => void;
  poster?: string;
}

export default function VideoPlayer({
  src,
  isOpen,
  onClose,
  poster,
}: VideoPlayerProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/90"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full",
              "bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20",
            )}
            aria-label="Close video"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Video */}
          <motion.div
            className="relative z-10 w-full max-w-5xl px-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 0.86, 0.39, 0.96] }}
          >
            <video
              src={src}
              poster={poster}
              controls
              autoPlay
              className="w-full rounded-lg shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
