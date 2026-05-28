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

function StatCard({ target, label, format }: { target: number; label: string; format: (n: number) => string }) {
  const { value, ref } = useCountUp(target);
  return (
    <div ref={ref} className="card" style={{ padding: "20px" }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--color-text-1)", lineHeight: 1.2 }}>
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
      setTimeout(() => { setIdx((i) => (i + 1) % DEFAULT_LINES.length); setVisible(true); }, 300);
    }, 4000);
    return () => clearInterval(id);
  }, [override]);

  const text = override ?? DEFAULT_LINES[idx];

  return (
    <div style={{
      position: "absolute", bottom: "16px", right: "16px",
      background: "var(--color-surface-2)", border: "1px solid var(--color-border)",
      borderRadius: "12px 12px 0 12px", padding: "12px 16px", maxWidth: "220px",
      zIndex: 20, opacity: visible ? 1 : 0, transition: "opacity 0.3s ease",
    }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--color-text-2)", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {text}
        <span style={{ color: "var(--color-accent)", animation: "cursor-blink 1s step-end infinite" }}>|</span>
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
        <g key={i} style={{ transformOrigin: `${s.x}px ${s.y}px`, animation: `sparkle-burst 0.5s ease-out ${s.delay}s both` }}>
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

// ─── Layered animated developer illustration ─────────────────────────────────
function DevIllustration() {
  const [isHovered, setIsHovered] = useState(false);
  const [lampOn, setLampOn] = useState(() => {
    try { return sessionStorage.getItem("lamp-found") === "1"; } catch { return false; }
  });
  const [showSparkles, setShowSparkles] = useState(false);
  const [blinking, setBlinking] = useState(false);
  const [typingFrame, setTypingFrame] = useState(0); // 0=neutral, 1=left raised, 2=right raised
  const [screenOpacity, setScreenOpacity] = useState(1.0);

  // ── Blink every 4-6s ──
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      const delay = 4000 + Math.random() * 2000;
      timeout = setTimeout(() => {
        setBlinking(true);
        setTimeout(() => { setBlinking(false); scheduleBlink(); }, 150);
      }, delay);
    };
    scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  // ── Typing animation (only when not hovered) ──
  useEffect(() => {
    if (isHovered) { setTypingFrame(0); return; }
    let timeout: ReturnType<typeof setTimeout>;
    const scheduleType = () => {
      const delay = 80 + Math.random() * 40;
      timeout = setTimeout(() => {
        setTypingFrame((f) => (f === 0 ? (Math.random() > 0.5 ? 1 : 2) : 0));
        scheduleType();
      }, delay);
    };
    scheduleType();
    return () => clearTimeout(timeout);
  }, [isHovered]);

  // ── Screen flicker ──
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const scheduleFlicker = () => {
      const delay = 2000 + Math.random() * 3000;
      timeout = setTimeout(() => {
        setScreenOpacity(0.85);
        setTimeout(() => { setScreenOpacity(1.0); scheduleFlicker(); }, 80);
      }, delay);
    };
    scheduleFlicker();
    return () => clearTimeout(timeout);
  }, []);

  const handleLampClick = useCallback(() => {
    if (lampOn) return;
    setLampOn(true);
    setShowSparkles(true);
    try { sessionStorage.setItem("lamp-found", "1"); } catch { /* noop */ }
    setTimeout(() => setShowSparkles(false), 800);
  }, [lampOn]);

  // Hand positions: typingFrame 1 = left slightly raised, 2 = right slightly raised
  const leftHandY = typingFrame === 1 ? 205 : 208;
  const rightHandY = typingFrame === 2 ? 205 : 208;
  const leftFingerY = typingFrame === 1 ? 201 : 204;
  const rightFingerY = typingFrame === 2 ? 201 : 204;

  // Head tilt: hover = slight toward viewer
  const headRotate = isHovered ? "rotate(2deg)" : "none";

  return (
    <div
      style={{ position: "relative", width: "100%", height: "380px", borderRadius: "20px", overflow: "hidden" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Layer 1: Background ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(160deg, var(--color-bg) 0%, var(--color-surface) 100%)",
        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      {/* ── Darkness overlay (lamp off) ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
        background: "rgba(0,0,0,0.3)",
        opacity: lampOn ? 0 : 1,
        transition: "opacity 0.4s ease",
      }} />

      {/* ── Floating tech badges ── */}
      {[
        { label: "React ⚛", top: "24px", left: "20px", delay: 0.3, bg: "rgba(97,218,251,0.08)", border: "rgba(97,218,251,0.2)", color: "#61DAFB", animDelay: "0s" },
        { label: "TypeScript", top: "24px", right: "20px", delay: 0.45, bg: "rgba(49,120,198,0.1)", border: "rgba(49,120,198,0.25)", color: "#3178C6", animDelay: "0.8s" },
        { label: "Node.js", top: "80px", right: "16px", delay: 0.6, bg: "rgba(104,160,99,0.1)", border: "rgba(104,160,99,0.25)", color: "#68A063", animDelay: "1.6s" },
      ].map(({ label, delay, bg, border, color, animDelay, ...pos }) => (
        <motion.div key={label}
          initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay, duration: 0.4 }}
          style={{
            position: "absolute", ...pos, zIndex: 10,
            background: bg, border: `1px solid ${border}`, borderRadius: "20px",
            padding: "4px 10px", fontFamily: "var(--font-sans)", fontSize: "11px",
            fontWeight: 500, color,
            animation: `badge-float 3s ease-in-out ${animDelay} infinite`,
          }}
        >{label}</motion.div>
      ))}

      {/* ── Main SVG: all layers ── */}
      <svg viewBox="0 0 400 340" width="100%" height="100%"
        style={{ position: "absolute", inset: 0, zIndex: 6 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="sg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(99,102,241,0.22)" />
            <stop offset="60%" stopColor="rgba(99,102,241,0.07)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="fg" cx="50%" cy="80%" r="50%">
            <stop offset="0%" stopColor="rgba(99,102,241,0.14)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="ll" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="rgba(255,220,100,0.12)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* ── LAYER 1: Desk scene ── */}
        {/* Desk lamp arm */}
        <line x1="80" y1="220" x2="95" y2="175" stroke="#2a2a2a" strokeWidth="3" strokeLinecap="round" />
        <line x1="95" y1="175" x2="120" y2="165" stroke="#2a2a2a" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="120" cy="163" rx="14" ry="7" fill="#222" />
        <rect x="72" y="218" width="16" height="4" rx="2" fill="#222" />
        {/* Clickable lamp head */}
        <ellipse cx="120" cy="163" rx="14" ry="7" fill={lampOn ? "#2a2a2a" : "#1e1e1e"}
          style={{ cursor: "pointer" }} onClick={handleLampClick} />
        {/* Lamp bulb glow when on */}
        {lampOn && <circle cx="120" cy="163" r="4" fill="rgba(255,220,100,0.8)" />}
        {/* Light cone (only when lamp on) */}
        {lampOn && <polygon points="108,170 132,170 148,215 92,215" fill="url(#ll)" />}

        {/* Desk surface */}
        <rect x="20" y="218" width="360" height="10" rx="3" fill="#1c1410" />
        <rect x="20" y="228" width="360" height="6" fill="#150f0b" />
        <rect x="30" y="234" width="8" height="60" rx="2" fill="#150f0b" />
        <rect x="362" y="234" width="8" height="60" rx="2" fill="#150f0b" />

        {/* Succulent */}
        <rect x="42" y="200" width="22" height="18" rx="3" fill="#2a1f1a" />
        <rect x="40" y="198" width="26" height="5" rx="2" fill="#332520" />
        <ellipse cx="53" cy="200" rx="11" ry="3" fill="#1a1208" />
        <ellipse cx="53" cy="192" rx="5" ry="8" fill="#1a3a1a" transform="rotate(-15 53 192)" />
        <ellipse cx="53" cy="192" rx="5" ry="8" fill="#1e4020" transform="rotate(15 53 192)" />
        <ellipse cx="53" cy="190" rx="4" ry="7" fill="#1a3a1a" />
        <ellipse cx="46" cy="196" rx="4" ry="6" fill="#163016" transform="rotate(-30 46 196)" />
        <ellipse cx="60" cy="196" rx="4" ry="6" fill="#163016" transform="rotate(30 60 196)" />

        {/* ── LAYER 2: Laptop ── */}
        <rect x="140" y="205" width="140" height="14" rx="3" fill="#1a1a1a" />
        <rect x="148" y="140" width="124" height="68" rx="4" fill="var(--color-surface)" />
        <rect x="152" y="144" width="116" height="60" rx="2" fill="#0a0a0f" />
        {/* Screen — layer 6: flicker via opacity */}
        <g style={{ opacity: screenOpacity, transition: "opacity 0.08s" }}>
          <rect x="154" y="146" width="112" height="56" rx="2" fill="url(#sg)" />
          <rect x="162" y="153" width="58" height="2" rx="1" fill="rgba(99,102,241,0.55)" />
          <rect x="162" y="159" width="88" height="2" rx="1" fill="rgba(99,102,241,0.35)" />
          <rect x="162" y="165" width="44" height="2" rx="1" fill="rgba(34,197,94,0.45)" />
          <rect x="162" y="171" width="72" height="2" rx="1" fill="rgba(99,102,241,0.4)" />
          <rect x="162" y="177" width="52" height="2" rx="1" fill="rgba(34,197,94,0.35)" />
          <rect x="162" y="183" width="78" height="2" rx="1" fill="rgba(99,102,241,0.3)" />
          <rect x="162" y="189" width="38" height="2" rx="1" fill="rgba(34,197,94,0.4)" />
        </g>
        {/* Keyboard */}
        <rect x="148" y="206" width="124" height="3" rx="1" fill="#0f0f0f" />
        <rect x="144" y="209" width="132" height="10" rx="2" fill="#161616" />
        <rect x="152" y="211" width="118" height="2" rx="1" fill="rgba(255,255,255,0.04)" />
        <rect x="152" y="215" width="118" height="2" rx="1" fill="rgba(255,255,255,0.04)" />
        <rect x="188" y="211" width="44" height="7" rx="2" fill="rgba(255,255,255,0.03)" />

        {/* Screen glow on face */}
        <ellipse cx="210" cy="172" rx="72" ry="52" fill="url(#fg)" />

        {/* ── LAYER 2: Body (static) ── */}
        <path d="M175 218 L175 165 Q175 155 185 152 L195 148 L210 145 L225 148 L235 152 Q245 155 245 165 L245 218 Z" fill="var(--color-surface-2)" />
        <rect x="195" y="190" width="30" height="20" rx="3" fill="#141417" />
        <line x1="210" y1="190" x2="210" y2="210" stroke="var(--color-surface)" strokeWidth="1" />
        <rect x="218" y="162" width="12" height="12" rx="3" fill="rgba(99,102,241,0.65)" />
        <text x="224" y="171" textAnchor="middle" fontSize="7" fill="white" fontFamily="sans-serif" fontWeight="bold">G</text>
        <path d="M185 152 Q175 145 178 135 Q182 125 210 122 Q238 125 242 135 Q245 145 235 152" fill="none" stroke="#222" strokeWidth="1.5" />

        {/* ── LAYER 5: Typing hands (animated) ── */}
        {/* Left arm */}
        <path d="M175 175 Q165 185 155 207 L175 207 L180 185 Z" fill="var(--color-surface-2)" />
        {/* Right arm */}
        <path d="M245 175 Q255 185 265 207 L245 207 L240 185 Z" fill="var(--color-surface-2)" />
        {/* Left hand — y shifts when typing */}
        <ellipse cx="158" cy={leftHandY} rx="12" ry="5" fill="#c8956c" style={{ transition: "cy 0.05s" }} />
        <rect x="148" y={leftFingerY} width="5" height="7" rx="2.5" fill="#c8956c" />
        <rect x="154" y={leftFingerY - 1} width="5" height="8" rx="2.5" fill="#c8956c" />
        <rect x="160" y={leftFingerY - 1} width="5" height="8" rx="2.5" fill="#c8956c" />
        <rect x="166" y={leftFingerY} width="5" height="7" rx="2.5" fill="#c8956c" />
        {/* Right hand */}
        <ellipse cx="262" cy={rightHandY} rx="12" ry="5" fill="#c8956c" style={{ transition: "cy 0.05s" }} />
        <rect x="249" y={rightFingerY} width="5" height="7" rx="2.5" fill="#c8956c" />
        <rect x="255" y={rightFingerY - 1} width="5" height="8" rx="2.5" fill="#c8956c" />
        <rect x="261" y={rightFingerY - 1} width="5" height="8" rx="2.5" fill="#c8956c" />
        <rect x="267" y={rightFingerY} width="5" height="7" rx="2.5" fill="#c8956c" />

        {/* ── LAYER 3+4: Head + eyes (animated) ── */}
        <g style={{ transformOrigin: "210px 160px", transform: headRotate, animation: isHovered ? "none" : "head-sway 5s ease-in-out infinite", transition: "transform 0.3s ease" }}>
          {/* Neck */}
          <rect x="204" y="135" width="12" height="16" rx="4" fill="#c8956c" />
          {/* Head */}
          <ellipse cx="210" cy="118" rx="26" ry="28" fill="#c8956c" />
          {/* Ears */}
          <ellipse cx="184" cy="118" rx="5" ry="7" fill="#c8956c" />
          <ellipse cx="184" cy="118" rx="3" ry="5" fill="#b8855c" />
          <ellipse cx="236" cy="118" rx="5" ry="7" fill="#c8956c" />
          <ellipse cx="236" cy="118" rx="3" ry="5" fill="#b8855c" />
          {/* Hair */}
          <ellipse cx="210" cy="96" rx="26" ry="14" fill="#1a1008" />
          <ellipse cx="186" cy="104" rx="8" ry="12" fill="#1a1008" />
          <ellipse cx="234" cy="104" rx="8" ry="12" fill="#1a1008" />
          <path d="M200 90 Q205 82 210 88" stroke="#241508" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M210 88 Q215 80 220 87" stroke="#241508" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M205 86 Q208 78 213 85" stroke="#1a1008" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M186 100 Q192 92 200 96" stroke="#1a1008" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Eyebrows */}
          <path d="M194 110 Q200 107 206 109" stroke="#1a1008" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M214 109 Q220 107 226 110" stroke="#1a1008" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* LAYER 4: Eyes with blink */}
          <g style={{ transformOrigin: "200px 116px", transform: blinking ? "scaleY(0.05)" : "scaleY(1)", transition: "transform 0.08s" }}>
            <ellipse cx="200" cy="116" rx="5" ry="4" fill="#1a0f08" />
            <circle cx="202" cy="114" r="1.5" fill="rgba(255,255,255,0.65)" />
          </g>
          <g style={{ transformOrigin: "220px 116px", transform: blinking ? "scaleY(0.05)" : "scaleY(1)", transition: "transform 0.08s" }}>
            <ellipse cx="220" cy="116" rx="5" ry="4" fill="#1a0f08" />
            <circle cx="222" cy="114" r="1.5" fill="rgba(255,255,255,0.65)" />
          </g>
          {/* Nose + smile */}
          <path d="M208 120 Q210 124 212 120" stroke="#b8855c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M204 128 Q210 132 216 128" stroke="#a07050" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Screen glow tint */}
          <ellipse cx="210" cy="118" rx="20" ry="22" fill="rgba(99,102,241,0.07)" />
        </g>

        {/* ── Coffee mug (easter egg) ── */}
        <g style={{ opacity: lampOn ? 1 : 0, transition: "opacity 0.3s ease 0.3s" }}>
          <rect x="300" y="196" width="28" height="24" rx="4" fill="#1a1a1a" />
          <ellipse cx="314" cy="196" rx="14" ry="4" fill="#222" />
          <path d="M328 202 Q338 202 338 210 Q338 218 328 218" stroke="#1a1a1a" strokeWidth="4" fill="none" strokeLinecap="round" />
          <ellipse cx="314" cy="197" rx="12" ry="3" fill="#2a1a0a" />
          {/* Steam — layer 7 */}
          <path d="M308 194 Q305 188 308 182 Q311 176 308 170" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="60" style={{ animation: "steam-rise 2.5s ease-in-out infinite" }} />
          <path d="M314 193 Q311 186 314 179 Q317 172 314 165" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="60" style={{ animation: "steam-rise 2.5s ease-in-out infinite", animationDelay: "0.6s" }} />
          {/* Sparkles */}
          <Sparkles active={showSparkles} />
        </g>
      </svg>

      {/* Speech bubble */}
      <SpeechBubble override={lampOn ? (showSparkles ? "> You found my coffee. You're hired." : "Thanks for finding my coffee! ☕") : "Psst... find my coffee? 💡"} />
    </div>
  );
}

// ─── Main About section ──────────────────────────────────────────────────────
export function About() {
  return (
    <section id="about" className="section bg-section" style={{ position: "relative", overflow: "hidden", paddingBottom: "calc(128px + 3rem)" }}>
      <MarqueeTitle text="ABOUT ME" direction="left" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <div className="section-label">01 / ABOUT</div>
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
              I'm a full-stack engineer with a passion for building scalable, user-centric applications. With 3+ years of experience, I've worked across the entire stack—from React frontends to Node.js backends—and I'm obsessed with clean code and great design.
            </motion.p>
            <motion.p variants={itemVariants} className="body">
              My approach is methodical: I start by deeply understanding the problem, design the architecture carefully, and then execute with precision. I believe that great software is built by teams that communicate clearly and iterate fast.
            </motion.p>
            <motion.p variants={itemVariants} className="body">
              Outside of code, I'm an open-source contributor, a LeetCode enthusiast (100+ problems solved), and someone who genuinely enjoys mentoring junior developers. I'm always learning, always shipping, and always looking for the next interesting challenge.
            </motion.p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 gap-6 pt-4"
            >
              {[
                { Icon: Zap, title: "Fast Delivery", desc: "Ship quality features without delay." },
                { Icon: Code2, title: "Clean Code", desc: "Readable, tested, maintainable." },
                { Icon: Layers, title: "Full Stack", desc: "Frontend, backend, infra fluently." },
                { Icon: Heart, title: "User-First", desc: "Design decisions rooted in empathy." },
              ].map(({ Icon, title, desc }, i) => (
                <motion.div key={i} variants={itemVariants} className="space-y-2">
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
              <p className="small italic" style={{ color: "var(--color-text-3)" }}>
                "Clean code is not written by following a set of rules. Clean code is written by a programmer who cares."
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
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-border-hover)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-border)"; }}
            >
              <DevIllustration />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <StatCard target={50} label="Projects Built" format={(n) => `${n}+`} />
              <StatCard target={3} label="Years Experience" format={(n) => `${n}+`} />
              <StatCard target={1000} label="LeetCode Solved" format={(n) => n >= 100 ? "100+" : `${n}`} />
              <StatCard target={15} label="Happy Clients" format={(n) => `${n}+`} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
