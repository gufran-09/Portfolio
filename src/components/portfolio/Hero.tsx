import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Github, Linkedin, Twitter, Mail, ChevronDown } from "lucide-react";
import { IDENTITY, TYPEWRITER_STRINGS, HERO_STATS } from "@/lib/portfolio/data";
import { scrollToSection } from "@/lib/portfolio/terminalCommands";
import { useEffect, useState } from "react";

export function Hero() {
  const [showScroll, setShowScroll] = useState(true);
  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen overflow-hidden pt-[60px]"
      style={{ alignItems: "center" }}
    >
      {/* Radial glow behind avatar — item 9 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 700px 500px at 75% 50%, rgba(99,102,241,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-6 md:grid-cols-2 md:gap-10">
        {/* ── Left column ── */}
        <div>
          {/* Availability pill — item 10: pulse ring on green dot */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
            style={{
              background: "rgba(16,185,129,0.08)",
              borderColor: "rgba(16,185,129,0.2)",
            }}
          >
            {/* Pulse ring wrapper */}
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-[#10b981]"
                style={{ animation: "ping-ring 1.4s ease-out infinite" }}
              />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#10b981]" />
            </span>
            <span className="text-[0.78rem] text-[#10b981]">Available for work</span>
          </motion.div>

          {/* Name — item 3: full "Ahmed" gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 font-display font-extrabold text-white leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)" }}
          >
            {IDENTITY.firstName}{" "}
            <span
              className="inline-block"
              style={{
                background: "linear-gradient(180deg, #ffffff 0%, #6366f1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {IDENTITY.lastName}
            </span>
          </motion.h1>

          {/* Typewriter — item 4: 1.6rem, #aaa, weight 500 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-5 font-display"
            style={{ fontSize: "1.6rem", color: "#aaa", fontWeight: 500 }}
          >
            <TypeAnimation
              sequence={TYPEWRITER_STRINGS as (string | number)[]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor={false}
            />
            <span className="ml-0.5 inline-block w-[2px] h-6 bg-[#6366f1] animate-pulse align-middle" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 max-w-lg text-[0.95rem] leading-[1.75] text-[#666]"
          >
            I craft scalable web applications and elegant user experiences.
            Passionate about clean code, great design, and shipping fast.
          </motion.p>

          {/* Buttons — item 5 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            {/* Filled white */}
            <button
              onClick={() => scrollToSection("projects")}
              className="group inline-flex items-center gap-2 rounded-lg px-7 py-3 text-[0.9rem] font-semibold transition-all hover:opacity-90"
              style={{ background: "#fff", color: "#000" }}
            >
              View My Work
              <ArrowDown
                size={16}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </button>
            {/* Transparent border only */}
            <a
              href="#"
              data-cursor="PDF"
              className="inline-flex items-center gap-2 rounded-lg px-7 py-3 text-[0.9rem] font-semibold text-white transition-colors hover:border-white/40"
              style={{ border: "1px solid rgba(255,255,255,0.2)", background: "transparent" }}
            >
              Download Resume
            </a>
          </motion.div>

          {/* Social icons — item 6: #555, hover white */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 flex items-center gap-4"
          >
            {[
              { Icon: Github, href: IDENTITY.github, cursor: "GITHUB" },
              { Icon: Linkedin, href: IDENTITY.linkedin, cursor: "LINKEDIN" },
              { Icon: Twitter, href: IDENTITY.twitter, cursor: "TWITTER" },
              { Icon: Mail, href: `mailto:${IDENTITY.email}`, cursor: "MAIL" },
            ].map(({ Icon, href, cursor }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                data-cursor={cursor}
                className="transition-colors"
                style={{ color: "#555" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
                aria-label={cursor}
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── Right column: avatar card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mx-auto h-[280px] w-[280px] md:mx-0 md:ml-auto"
        >
          {/* Card — item 2: radial glow inside */}
          <div
            className="grid h-full w-full place-items-center rounded-[20px] border border-white/[0.08]"
            style={{
              background:
                "radial-gradient(circle at center, rgba(99,102,241,0.08), transparent 70%), #111",
              animation: "border-glow 3s ease-in-out infinite",
            }}
          >
            {/* item 2: GA text color rgba(255,255,255,0.18) */}
            <span
              className="font-display text-[4rem] font-extrabold"
              style={{ color: "rgba(255,255,255,0.18)" }}
            >
              {IDENTITY.monogram}
            </span>
          </div>

          {/* Stat pills — item 1: 50+ Projects already fixed in data.ts */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute -top-3 -right-3 flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#111] px-3 py-1.5 text-[0.75rem] text-white"
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: HERO_STATS[0].dot }} />
            {HERO_STATS[0].value} {HERO_STATS[0].label}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="absolute -bottom-3 -left-3 flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#111] px-3 py-1.5 text-[0.75rem] text-white"
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: HERO_STATS[1].dot }} />
            {HERO_STATS[1].value} {HERO_STATS[1].label}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute -bottom-3 -right-3 flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#111] px-3 py-1.5 text-[0.75rem] text-white"
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: HERO_STATS[2].dot }} />
            {HERO_STATS[2].value} {HERO_STATS[2].label}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator — item 11: gap + bouncing chevron */}
      {showScroll && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
          style={{ gap: "10px" }}
        >
          <span className="text-[0.7rem] tracking-[0.15em] text-[#444] uppercase">
            scroll
          </span>
          <ChevronDown
            size={16}
            className="text-[#444]"
            style={{ animation: "chevron-bounce 1.5s ease-in-out infinite" }}
          />
        </motion.div>
      )}
    </section>
  );
}
