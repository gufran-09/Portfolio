import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

interface MagneticProps {
  children: React.ReactNode;
}

export function Magnetic({ children }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = el.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Cap translation displacement at 8px as requested
    const maxDisplacement = 8;
    const magneticStrength = 0.35; // displacement scaling factor

    const pullX = Math.min(
      Math.max(distanceX * magneticStrength, -maxDisplacement),
      maxDisplacement
    );
    const pullY = Math.min(
      Math.max(distanceY * magneticStrength, -maxDisplacement),
      maxDisplacement
    );

    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}
