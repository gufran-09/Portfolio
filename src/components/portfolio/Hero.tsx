import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { scrollToSection } from "@/lib/portfolio/terminalCommands";
import { useEffect, useState } from "react";
import { DeveloperCharacter } from "./DeveloperCharacter";
import { FloatingIcon } from "./FloatingIcon";
import { TestimonialCard } from "./TestimonialCard";
import { Magnetic } from "@/components/ui/Magnetic";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
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
  const { scrollY } = useScroll();

  // Scroll transforms for avatar (scale down, rotate slightly, fade out)
  const avatarScale = useTransform(scrollY, [0, 500], [1, 0.78]);
  const avatarRotate = useTransform(scrollY, [0, 500], [0, -8]);
  const avatarOpacity = useTransform(scrollY, [0, 500], [1, 0.45]);

  // Scroll transforms for floating icons (dispersing outward)
  const iconReactX = useTransform(scrollY, [0, 500], [0, -90]);
  const iconReactY = useTransform(scrollY, [0, 500], [0, -70]);

  const iconNodeX = useTransform(scrollY, [0, 500], [0, 90]);
  const iconNodeY = useTransform(scrollY, [0, 500], [0, -70]);

  const iconTSX = useTransform(scrollY, [0, 500], [0, 110]);
  const iconTSY = useTransform(scrollY, [0, 500], [0, 20]);

  const iconPyX = useTransform(scrollY, [0, 500], [0, 90]);
  const iconPyY = useTransform(scrollY, [0, 500], [0, 90]);

  const iconDockerX = useTransform(scrollY, [0, 500], [0, -110]);
  const iconDockerY = useTransform(scrollY, [0, 500], [0, 0]);

  const iconAWSX = useTransform(scrollY, [0, 500], [0, -90]);
  const iconAWSY = useTransform(scrollY, [0, 500], [0, 70]);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "#0a0a0a",
        paddingTop: 56,
      }}
    >
      {/* Radial gradient glow behind character */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 700px 600px at 75% 60%, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />

      <div
        className="container relative w-full"
        style={{
          display: "grid",
          gridTemplateColumns: "55% 45%",
          alignItems: "center",
          minHeight: "calc(100vh - 56px)",
        }}
      >
        {/* ── Left Column ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center md:items-start md:text-left w-full"
          style={{ gap: 0 }}
        >
          {/* Row 1 — Greeting */}
          <motion.div variants={itemVariants}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: "1.1rem",
                color: "#a0a0a0",
              }}
            >
              Hey, I am{" "}
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "#6366f1",
              }}
            >
              Gufran
            </span>
          </motion.div>

          {/* Row 2 — Main title */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              color: "#f0f0f0",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              margin: "12px 0 0",
            }}
          >
            Full Stack
            <br />
            Engineer
          </motion.h1>

          {/* Row 3 — Bio */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 15,
              color: "#a0a0a0",
              lineHeight: 1.7,
              maxWidth: 440,
              marginTop: 16,
            }}
          >
            Building scalable web apps and elegant user experiences. Clean code,
            great design, fast shipping.
          </motion.p>

          {/* Row 4 — Divider */}
          <motion.div
            variants={itemVariants}
            style={{
              width: 200,
              height: 1,
              background: "var(--color-border)",
              marginTop: 20,
              marginBottom: 20,
            }}
            className="mx-auto md:mx-0"
          />

          {/* Row 5 — CTA buttons */}
          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
            className="justify-center md:justify-start w-full"
          >
            {/* Hire Me pill button */}
            <Magnetic>
              <button
                onClick={() => scrollToSection("contact")}
                style={{
                  background: "#f0f0f0",
                  color: "#0a0a0a",
                  borderRadius: 100,
                  padding: "12px 28px",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#d4d4d4")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#f0f0f0")
                }
              >
                Hire Me
              </button>
            </Magnetic>

            {/* Resume download button */}
            <Magnetic>
              <a
                href="/assets/Resume.pdf"
                download="Gufran_Ahmed_Resume.pdf"
                style={{
                  padding: "12px 28px",
                  borderRadius: 100,
                  border: "1px solid var(--color-border)",
                  background: "transparent",
                  color: "#f0f0f0",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--color-surface)";
                  e.currentTarget.style.borderColor = "var(--color-border-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                }}
              >
                Resume
              </a>
            </Magnetic>
          </motion.div>
          {/* Row 6 — Testimonial card */}
          <TestimonialCard />
        </motion.div>

        {/* ── Right Column — Centered Avatar ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="hero-right-col absolute inset-0 flex items-center justify-center"
          style={{
            height: "100%",
            position: "relative",
          }}
        >
          {/* Concentric orbit rings centered exactly behind avatar */}
          <div
            aria-hidden
            className="pointer-events-none absolute hidden md:block"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 0,
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              style={{ position: "relative" }}
            >
              {/* Ring 1 */}
              <div
                style={{
                  position: "absolute",
                  width: 280,
                  height: 280,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.04)",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
              {/* Ring 2 */}
              <div
                style={{
                  position: "absolute",
                  width: 420,
                  height: 420,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.04)",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </motion.div>
          </div>

          {/* Character */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              maxWidth: 480, // Increased size from 320 to 480
              marginBottom: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <motion.div
              style={{
                scale: avatarScale,
                rotate: avatarRotate,
                opacity: avatarOpacity,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <DeveloperCharacter />
            </motion.div>
          </div>

          {/* Floating Tech Icons - Spaced Outward to Prevent Overlap */}
          <FloatingIcon
            label="⚛"
            bg="rgba(97,218,251,0.15)"
            borderColor="rgba(97,218,251,0.3)"
            color="#61DAFB"
            size={44}
            fontSize="20px"
            top="12%"
            left="-15%"
            floatY={[0, -10, 0]}
            floatDuration={3}
            entranceDelay={0.7}
            x={iconReactX}
            y={iconReactY}
          />
          <FloatingIcon
            label="N"
            bg="rgba(104,160,99,0.15)"
            borderColor="rgba(104,160,99,0.3)"
            color="#68A063"
            size={40}
            fontSize="16px"
            top="8%"
            right="-12%"
            floatY={[0, -8, 0]}
            floatDuration={3.5}
            floatDelay={0.5}
            entranceDelay={0.8}
            x={iconNodeX}
            y={iconNodeY}
          />
          <FloatingIcon
            label="TS"
            bg="rgba(49,120,198,0.15)"
            borderColor="rgba(49,120,198,0.3)"
            color="#3178C6"
            size={40}
            fontSize="12px"
            fontWeight={700}
            top="40%"
            right="-18%"
            floatY={[0, -12, 0]}
            floatDuration={2.8}
            floatDelay={1}
            entranceDelay={0.9}
            x={iconTSX}
            y={iconTSY}
          />
          <FloatingIcon
            label="Py"
            bg="rgba(255,212,59,0.12)"
            borderColor="rgba(255,212,59,0.25)"
            color="#FFD43B"
            size={40}
            fontSize="13px"
            fontWeight={700}
            bottom="15%"
            right="-10%"
            floatY={[0, -6, 0]}
            floatDuration={4}
            floatDelay={0.3}
            entranceDelay={1.0}
            x={iconPyX}
            y={iconPyY}
          />
          <FloatingIcon
            label="🐳"
            bg="rgba(13,183,237,0.12)"
            borderColor="rgba(13,183,237,0.25)"
            color="#0DB7ED"
            size={40}
            fontSize="18px"
            top="50%"
            left="-20%"
            floatY={[0, -9, 0]}
            floatDuration={3.2}
            floatDelay={0.8}
            entranceDelay={1.1}
            x={iconDockerX}
            y={iconDockerY}
          />
          <FloatingIcon
            label="AW"
            bg="rgba(255,153,0,0.12)"
            borderColor="rgba(255,153,0,0.25)"
            color="#FF9900"
            size={40}
            fontSize="11px"
            fontWeight={700}
            bottom="22%"
            left="-12%"
            floatY={[0, -7, 0]}
            floatDuration={3.8}
            floatDelay={1.2}
            entranceDelay={1.2}
            x={iconAWSX}
            y={iconAWSY}
          />
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showScroll ? 1 : 0 }}
        transition={{ delay: 1.2, duration: 0.3 }}
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none"
        style={{ bottom: 28 }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 10,
            color: "#3f3f46",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
        <ChevronDown
          size={14}
          style={{
            color: "#3f3f46",
            animation: "chevron-bounce 1.8s ease-in-out infinite",
          }}
        />
      </motion.div>

      {/* ── Mobile Layout (shows character above text) ── */}
      <style>{`
        @media (max-width: 767px) {
          #home .container {
            grid-template-columns: 1fr !important;
            padding-top: 32px;
          }
          .hero-right-col {
            position: relative !important;
            display: flex !important;
            order: -1;
            min-height: 280px !important;
            justify-content: center !important;
            align-items: center !important;
          }
          .hero-right-col > div:first-child {
            width: 55% !important;
          }
        }
      `}</style>
    </section>
  );
}
