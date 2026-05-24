import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 h-10 w-10 rounded-lg flex items-center justify-center z-40 transition-all hover:border-[var(--color-border-hover)]"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-2)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-1)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-2)")}
          aria-label="Back to top"
        >
          <ChevronUp size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
