import { Eye } from "lucide-react";

interface RotatingBadgeProps {
  visible: boolean;
  x: number;
  y: number;
  color: string;
}

export function RotatingBadge({ visible, x, y, color }: RotatingBadgeProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 90,
        height: 90,
        borderRadius: "50%",
        background: color,
        transform: "translate(-50%, -50%)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s",
        pointerEvents: "none",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
      {/* Rotating text ring */}
      <svg
        width="90"
        height="90"
        style={{ position: "absolute", animation: "spin 6s linear infinite" }}
      >
        <defs>
          <path
            id="circle-path"
            d="M 45,45 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0"
          />
        </defs>
        <text
          fill="white"
          fontSize="9.5"
          fontFamily="Inter"
          fontWeight="600"
          letterSpacing="0.15em"
        >
          <textPath href="#circle-path">OPEN · EXPLORE · DISCOVER ·</textPath>
        </text>
      </svg>
      {/* Center icon */}
      <Eye size={18} color="white" />
    </div>
  );
}
