import { motion, type Variants } from "framer-motion";
import { Zap, Code2, Layers, Heart } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { MarqueeTitle } from "./MarqueeTitle";

// ─── Animation variants ──────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

// ─── Count-up hook ───────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setValue(Math.round((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
  return { value, ref };
}

function StatCard({
  target,
  label,
  format,
}: {
  target: number;
  label: string;
  format: (n: number) => string;
}) {
  const { value, ref } = useCountUp(target);
  return (
    <div ref={ref} className="card" style={{ padding: "20px" }}>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2rem",
          fontWeight: 700,
          color: "var(--color-text-1)",
          lineHeight: 1.2,
        }}
      >
        {format(value)}
      </div>
      <p className="small mt-1">{label}</p>
    </div>
  );
}

// ─── Speech bubble ───────────────────────────────────────────────────────────
const DEFAULT_LINES = [
  "> currently_building();",
  "> open_to_work = true;",
  "> coffee.refill() ☕",
  "> git commit -m 'ship it'",
];

function SpeechBubble({ override }: { override?: string }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (override) return; // don't cycle when overridden
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % DEFAULT_LINES.length);
        setVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(id);
  }, [override]);

  const text = override ?? DEFAULT_LINES[idx];

  return (
    <div
      style={{
        position: "absolute",
        bottom: "16px",
        right: "16px",
        background: "var(--color-surface-2)",
        border: "1px solid var(--color-border)",
        borderRadius: "12px 12px 0 12px",
        padding: "12px 16px",
        maxWidth: "220px",
        zIndex: 20,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--color-text-2)",
          display: "block",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {text}
        <span
          style={{
            color: "var(--color-accent)",
            animation: "cursor-blink 1s step-end infinite",
          }}
        >
          |
        </span>
      </span>
    </div>
  );
}

// ─── Sparkle burst near coffee mug ──────────────────────────────────────────
function Sparkles({ active }: { active: boolean }) {
  if (!active) return null;
  // 3 stars at different angles around the mug area (SVG coords ~314,200)
  const stars = [
    { x: 295, y: 185, delay: 0 },
    { x: 330, y: 178, delay: 0.1 },
    { x: 315, y: 170, delay: 0.2 },
  ];
  return (
    <>
      {stars.map((s, i) => (
        <g
          key={i}
          style={{
            transformOrigin: `${s.x}px ${s.y}px`,
            animation: `sparkle-burst 0.5s ease-out ${s.delay}s both`,
          }}
        >
          <polygon
            points={`${s.x},${s.y - 5} ${s.x + 1.5},${s.y - 1.5} ${s.x + 5},${s.y} ${s.x + 1.5},${s.y + 1.5} ${s.x},${s.y + 5} ${s.x - 1.5},${s.y + 1.5} ${s.x - 5},${s.y} ${s.x - 1.5},${s.y - 1.5}`}
            fill="#f59e0b"
            opacity="0.9"
          />
        </g>
      ))}
    </>
  );
}

function DevIllustration() {
  const [isHovered, setIsHovered] = useState(false);
  const [lampOn, setLampOn] = useState(() => {
    try {
      return sessionStorage.getItem("lamp-found") === "1";
    } catch {
      return false;
    }
  });
  const [showSparkles, setShowSparkles] = useState(false);

  const handleLampClick = useCallback(() => {
    if (lampOn) return;
    setLampOn(true);
    setShowSparkles(true);
    try {
      sessionStorage.setItem("lamp-found", "1");
    } catch {
      /* noop */
    }
    setTimeout(() => setShowSparkles(false), 800);
  }, [lampOn]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "380px",
        borderRadius: "20px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(160deg, var(--color-bg) 0%, var(--color-surface) 100%)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.8,
        }}
      />

      {/* Floating tech badges */}
      {[
        {
          label: "React ⚛",
          top: "24px",
          left: "20px",
          delay: 0.3,
          bg: "rgba(97,218,251,0.08)",
          border: "rgba(97,218,251,0.2)",
          color: "#61DAFB",
          animDelay: "0s",
        },
        {
          label: "TypeScript",
          top: "24px",
          right: "20px",
          delay: 0.45,
          bg: "rgba(49,120,198,0.1)",
          border: "rgba(49,120,198,0.25)",
          color: "#3178C6",
          animDelay: "0.8s",
        },
        {
          label: "Node.js",
          top: "80px",
          right: "16px",
          delay: 0.6,
          bg: "rgba(104,160,99,0.1)",
          border: "rgba(104,160,99,0.25)",
          color: "#68A063",
          animDelay: "1.6s",
        },
      ].map(({ label, delay, bg, border, color, animDelay, ...pos }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay, duration: 0.4 }}
          style={{
            position: "absolute",
            ...pos,
            zIndex: 10,
            background: bg,
            border: `1px solid ${border}`,
            borderRadius: "20px",
            padding: "4px 10px",
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            fontWeight: 500,
            color,
            animation: `badge-float 3s ease-in-out ${animDelay} infinite`,
          }}
        >
          {label}
        </motion.div>
      ))}

      {/* Coding Avatar image */}
      <img
        src="/assets/avatar-coding.png"
        alt="3D Coding Avatar"
        style={{
          width: "85%",
          height: "85%",
          objectFit: "contain",
          zIndex: 2,
          filter: "drop-shadow(0 20px 25px rgba(0,0,0,0.5))",
          animation: isHovered ? "character-float 3s ease-in-out infinite" : "character-float 5s ease-in-out infinite",
        }}
      />

      {/* Interactive Lamp Toggle Overlay */}
      <div
        onClick={handleLampClick}
        style={{
          position: "absolute",
          top: "16px",
          right: "80px",
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: lampOn ? "rgba(255, 235, 59, 0.2)" : "rgba(255, 255, 255, 0.05)",
          border: lampOn ? "1px solid rgba(255, 235, 59, 0.4)" : "1px solid rgba(255, 255, 255, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 15,
          color: lampOn ? "#fbc02d" : "#e0e0e0",
          fontSize: "14px",
          transition: "all 0.25s ease",
        }}
        title="Toggle coffee lamp"
      >
        💡
      </div>

      {/* Sparkles */}
      <Sparkles active={showSparkles} />

      {/* Speech bubble */}
      <SpeechBubble
        override={
          lampOn
            ? showSparkles
              ? "> You found my coffee. You're hired."
              : "Thanks for finding my coffee! ☕"
            : "Psst... find my coffee? 💡"
        }
      />
    </div>
  );
}



// ─── Main About section ──────────────────────────────────────────────────────
export function About() {
  return (
    <section
      id="about"
      className="section bg-section"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingBottom: "calc(128px + 3rem)",
      }}
    >
      <MarqueeTitle text="ABOUT ME" direction="left" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <div className="section-label">02 / ABOUT</div>
          <h2 className="h1 mb-16">The person behind the code.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* ── LEFT COLUMN — unchanged ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-6"
          >
            <motion.p variants={itemVariants} className="body">
              I'm a full-stack engineer with a passion for building scalable,
              user-centric applications. With 3+ years of experience, I've
              worked across the entire stack—from React frontends to Node.js
              backends—and I'm obsessed with clean code and great design.
            </motion.p>
            <motion.p variants={itemVariants} className="body">
              My approach is methodical: I start by deeply understanding the
              problem, design the architecture carefully, and then execute with
              precision. I believe that great software is built by teams that
              communicate clearly and iterate fast.
            </motion.p>
            <motion.p variants={itemVariants} className="body">
              Outside of code, I'm an open-source contributor, a LeetCode
              enthusiast (100+ problems solved), and someone who genuinely
              enjoys mentoring junior developers. I'm always learning, always
              shipping, and always looking for the next interesting challenge.
            </motion.p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 gap-6 pt-4"
            >
              {[
                {
                  Icon: Zap,
                  title: "Fast Delivery",
                  desc: "Ship quality features without delay.",
                },
                {
                  Icon: Code2,
                  title: "Clean Code",
                  desc: "Readable, tested, maintainable.",
                },
                {
                  Icon: Layers,
                  title: "Full Stack",
                  desc: "Frontend, backend, infra fluently.",
                },
                {
                  Icon: Heart,
                  title: "User-First",
                  desc: "Design decisions rooted in empathy.",
                },
              ].map(({ Icon, title, desc }, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="space-y-2"
                >
                  <Icon size={16} style={{ color: "var(--color-accent)" }} />
                  <h3 className="h3">{title}</h3>
                  <p className="small">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="border-l-2 pl-6 py-4"
              style={{ borderColor: "var(--color-border)" }}
            >
              <p
                className="small italic"
                style={{ color: "var(--color-text-3)" }}
              >
                "Clean code is not written by following a set of rules. Clean
                code is written by a programmer who cares."
              </p>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN — animated illustration + stats ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <div
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "20px",
                overflow: "hidden",
                transition: "border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "var(--color-border-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "var(--color-border)";
              }}
            >
              <DevIllustration />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                target={50}
                label="Projects Built"
                format={(n) => `${n}+`}
              />
              <StatCard
                target={3}
                label="Years Experience"
                format={(n) => `${n}+`}
              />
              <StatCard
                target={1000}
                label="LeetCode Solved"
                format={(n) => (n >= 100 ? "100+" : `${n}`)}
              />
              <StatCard
                target={15}
                label="Happy Clients"
                format={(n) => `${n}+`}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
