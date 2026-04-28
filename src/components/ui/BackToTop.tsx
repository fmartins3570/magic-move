import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useScrolled } from "@/hooks/useScrollReveal";

export default function BackToTop() {
  const visible = useScrolled(400);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-20 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-raised text-text-muted shadow-lg transition-colors hover:border-primary hover:text-white"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.23, 0.86, 0.39, 0.96] }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
