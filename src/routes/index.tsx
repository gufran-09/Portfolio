import { createFileRoute } from "@tanstack/react-router";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { ReadingProgress } from "@/components/portfolio/ReadingProgress";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { Skills } from "@/components/portfolio/Skills";
import { About } from "@/components/portfolio/About";
import { Methodology } from "@/components/portfolio/Methodology";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Education } from "@/components/portfolio/Education";
import { Achievements } from "@/components/portfolio/Achievements";
import { CodingJourney } from "@/components/portfolio/CodingJourney";
import { AskAI } from "@/components/portfolio/AskAI";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Terminal } from "@/components/portfolio/Terminal";
import { BackToTop } from "@/components/portfolio/BackToTop";
import { useActiveSection } from "@/lib/portfolio/useActiveSection";
import { IDENTITY } from "@/lib/portfolio/data";
import AnimatedBackground from "@/components/portfolio/animated-background";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAmbientPlayer } from "@/components/portfolio/AmbientPlayer";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${IDENTITY.name} | ${IDENTITY.role}` },
      {
        name: "description",
        content: `${IDENTITY.name} — ${IDENTITY.role} from ${IDENTITY.location}. ${IDENTITY.tagline}`,
      },
      { property: "og:title", content: `${IDENTITY.name} | ${IDENTITY.role}` },
      { property: "og:description", content: IDENTITY.tagline },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const active = useActiveSection();
  const player = useAmbientPlayer();
  const { scrollYProgress } = useScroll();
  const glowRef = useRef<HTMLDivElement>(null);

  // Hue shifting: Teal -> Indigo -> Amber -> Teal
  const glowColor = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    ["#0d9488", "#6366f1", "#d97706", "#0d9488"]
  );

  // Position drifting coordinates
  const glowX = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    ["80%", "20%", "80%", "50%"]
  );
  const glowY = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    ["20%", "50%", "80%", "50%"]
  );

  // Combine transitions into single radial-gradient
  const glowBg = useTransform(
    [glowColor, glowX, glowY],
    ([color, x, y]) => `radial-gradient(circle 800px at ${x} ${y}, ${color}1c, transparent 70%)`
  );

  // Sound Reactivity pulsing effect on the background glow
  useEffect(() => {
    if (!player.playing) {
      if (glowRef.current) {
        glowRef.current.style.setProperty("--glow-scale", "1");
      }
      return;
    }

    let rafId: number;
    const tick = () => {
      const amp = player.getAmplitude();
      // Scale pulses from 1 to 1.15 based on music amplitude
      const scale = 1 + amp * 0.15;
      if (glowRef.current) {
        glowRef.current.style.setProperty("--glow-scale", `${scale}`);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [player.playing, player.getAmplitude]);

  return (
    <div
      className="dark min-h-screen relative"
      style={{ color: "var(--color-text-1)" }}
    >
      <AnimatedBackground />

      {/* Fixed Ambient Glow Backdrop */}
      <motion.div
        ref={glowRef}
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 0,
          background: glowBg,
          transform: "scale(var(--glow-scale, 1))",
          transition: "transform 0.1s ease-out",
        }}
      />

      <div className="canvas-overlay-mode relative z-10">
        <CustomCursor />
        <ReadingProgress />
        <Navbar active={active} playing={player.playing} toggle={player.toggle} />
        <main>
          <Hero />
          <Skills />
          <About />
          <Methodology />
          <Projects />
          <Experience />
          <Education />
          <Achievements />
          <CodingJourney />
          <AskAI />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
        <Terminal />
      </div>
    </div>
  );
}

