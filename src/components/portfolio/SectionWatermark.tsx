import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionWatermarkProps {
  text: string;
}

export function SectionWatermark({ text }: SectionWatermarkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const localSectionRef = useRef<HTMLElement | null>(null);
  const [hasTarget, setHasTarget] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const parent =
        containerRef.current.closest("section") ||
        containerRef.current.parentElement;
      if (parent) {
        localSectionRef.current = parent as HTMLElement;
        setHasTarget(true);
      }
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: hasTarget ? localSectionRef : undefined,
    offset: ["start end", "end start"],
  });

  // Horizontal scroll: starts at 100vw (off-screen right), scrolls left past the section
  const x = useTransform(scrollYProgress, [0, 1], ["100vw", "-100%"]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: "65px",
        left: 0,
        width: "100%",
        overflow: "visible",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
        lineHeight: 1,
      }}
    >
      <motion.span
        style={{
          x,
          display: "inline-block",
          fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
          fontWeight: 400,
          fontSize: "clamp(8rem, 22vw, 22rem)",
          letterSpacing: "-0.03em",
          color: "rgba(32, 35, 43, 0.58)",
          WebkitTextStroke: "3px rgba(40, 44, 55, 0.51)",
          whiteSpace: "nowrap",
          textTransform: "uppercase",
          willChange: "transform",
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}
