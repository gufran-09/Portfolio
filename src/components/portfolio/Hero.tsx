import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Github, Linkedin, Twitter, Mail, ChevronDown } from "lucide-react";
import { IDENTITY, TYPEWRITER_STRINGS, HERO_STATS } from "@/lib/portfolio/data";
import { scrollToSection } from "@/lib/portfolio/terminalCommands";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export function Hero() {
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-14 overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 500px 400px at 80% 50%, rgba(99,102,241,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container relative grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Availability badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2"
            style={{
              background: "var(--color-success-dim)",
              border: "1px solid var(--color-success-border)",
              borderRadius: "999px",
              padding: "6px 10px",
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)]"
                style={{ animation: "pulse-ring 2s ease-out infinite" }}
              />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
            </span>
            <span style={{ color: "var(--color-success)", fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500 }}>
              Available for work
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={itemVariants} className="display">
            Gufran{" "}
            <span
              style={{
                background: "linear-gradient(180deg, var(--color-text-1) 0%, var(--color-accent) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ahmed
            </span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div variants={itemVariants} className="h-8">
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.375rem", color: "var(--color-text-2)" }}>
              <TypeAnimation
                sequence={TYPEWRITER_STRINGS as (string | number)[]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={false}
              />
              <span
                className="ml-1 inline-block w-0.5 h-7 animate-pulse"
                style={{ background: "var(--color-accent)" }}
              />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="body max-w-md"
          >
            I craft scalable web applications and elegant user experiences. Passionate about clean code, great design, and shipping fast.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex gap-3 pt-2">
            <button
              onClick={() => scrollToSection("projects")}
              className="btn-primary inline-flex items-center gap-2"
            >
              View My Work
              <ArrowDown size={14} />
            </button>
            <a href="#" data-cursor="PDF" className="btn-secondary">
              Download Resume
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants} className="flex gap-4 pt-4">
            {[
              { Icon: Github, href: IDENTITY.github, label: "GitHub" },
              { Icon: Linkedin, href: IDENTITY.linkedin, label: "LinkedIn" },
              { Icon: Twitter, href: IDENTITY.twitter, label: "Twitter" },
              { Icon: Mail, href: `mailto:${IDENTITY.email}`, label: "Email" },
            ].map(({ Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors"
                style={{ color: "var(--color-text-3)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-1)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-3)")}
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right column — Avatar card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="relative mx-auto md:mx-0 md:ml-auto"
          style={{ width: "260px", aspectRatio: "1" }}
        >
          {/* Avatar card */}
          <div
            className="h-full w-full rounded-[20px] border flex items-center justify-center relative overflow-hidden"
            style={{
              borderColor: "var(--color-border)",
              background: "var(--color-surface)",
            }}
          >
            {/* Inner glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 30% 70%, rgba(99,102,241,0.08) 0%, transparent 60%)",
              }}
            />
            <span
              className="font-display font-bold text-6xl relative z-10"
              style={{ color: "var(--color-text-4)" }}
            >
              {IDENTITY.monogram}
            </span>
          </div>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute -top-3 -right-3 card p-3"
            style={{ padding: "6px 12px" }}
          >
            <div className="flex items-center gap-2">
              <span
                className="h-1 w-1 rounded-full"
                style={{ background: "var(--color-accent)" }}
              />
              <span className="small">{HERO_STATS[0].value} {HERO_STATS[0].label}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="absolute -bottom-3 -left-3 card p-3"
            style={{ padding: "6px 12px" }}
          >
            <div className="flex items-center gap-2">
              <span
                className="h-1 w-1 rounded-full"
                style={{ background: "var(--color-success)" }}
              />
              <span className="small">{HERO_STATS[1].value} {HERO_STATS[1].label}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute -bottom-3 -right-3 card p-3"
            style={{ padding: "6px 12px" }}
          >
            <div className="flex items-center gap-2">
              <span
                className="h-1 w-1 rounded-full"
                style={{ background: "#f59e0b" }}
              />
              <span className="small">{HERO_STATS[2].value} {HERO_STATS[2].label}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {showScroll && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 pointer-events-none"
        >
          <span className="label" style={{ color: "var(--color-text-3)" }}>
            SCROLL
          </span>
          <ChevronDown
            size={14}
            style={{
              color: "var(--color-text-3)",
              animation: "chevron-bounce 1.8s ease-in-out infinite",
            }}
          />
        </motion.div>
      )}
    </section>
  );
}
