import React from "react";

interface SectionWatermarkProps {
  text: string;
}

export function SectionWatermark({ text }: SectionWatermarkProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        textAlign: "center",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
        overflow: "hidden",
        lineHeight: 0.8,
      }}
    >
      <span
        style={{
          display: "inline-block",
          fontFamily: "var(--font-display), serif",
          fontWeight: 800,
          fontSize: "clamp(5rem, 13vw, 15rem)",
          letterSpacing: "-0.03em",
          color: "rgba(255, 255, 255, 0.045)",
          whiteSpace: "nowrap",
          textTransform: "uppercase",
        }}
      >
        {text}
      </span>
    </div>
  );
}
