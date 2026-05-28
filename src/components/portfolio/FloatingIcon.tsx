import { motion } from "framer-motion";

interface FloatingIconProps {
  label: string;
  bg: string;
  borderColor: string;
  color: string;
  size?: number;
  fontSize?: string;
  fontWeight?: number;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  floatY?: number[];
  floatDuration?: number;
  floatDelay?: number;
  entranceDelay?: number;
}

export function FloatingIcon({
  label,
  bg,
  borderColor,
  color,
  size = 40,
  fontSize = "18px",
  fontWeight = 700,
  top,
  right,
  bottom,
  left,
  floatY = [0, -10, 0],
  floatDuration = 3,
  floatDelay = 0,
  entranceDelay = 0,
}: FloatingIconProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: entranceDelay,
      }}
      style={{
        position: "absolute",
        top,
        right,
        bottom,
        left,
        width: size,
        height: size,
        borderRadius: 12,
        background: bg,
        border: `1px solid ${borderColor}`,
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize,
        fontWeight,
        fontFamily: "'Inter', sans-serif",
        color,
        zIndex: 3,
        pointerEvents: "none" as const,
      }}
    >
      <motion.div
        animate={{ y: floatY }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
