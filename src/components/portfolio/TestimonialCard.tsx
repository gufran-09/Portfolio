import { motion } from "framer-motion";

export function TestimonialCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
      style={{
        marginTop: 48,
        background: "rgba(22,22,22,0.9)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--color-border)",
        borderRadius: 16,
        padding: "18px 20px",
        maxWidth: 320,
      }}
    >
      {/* Quote mark */}
      <div
        style={{
          fontSize: 28,
          color: "#6366f1",
          lineHeight: 1,
          marginBottom: 8,
          fontFamily: "serif",
        }}
      >
        ❝
      </div>

      {/* Quote text */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          fontWeight: 400,
          color: "#a0a0a0",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        We trusted you with our whole digital presence, and you delivered far beyond expectations. The platform you built now powers hundreds of real bookings. Proud to call you part of the Flyout Tours family.
      </p>

      {/* Person */}
      <div
        style={{
          marginTop: 14,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#15ff00ff",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          FT
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              color: "#f0f0f0",
            }}
          >
            Flyout Tour LLC
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 11,
              color: "#666",
            }}
          >
            Product Manager
          </div>
        </div>
      </div>
    </motion.div>
  );
}
