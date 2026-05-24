import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { IDENTITY, SECTIONS } from "@/lib/portfolio/data";
import { scrollToSection } from "@/lib/portfolio/terminalCommands";
import { useAmbientPlayer } from "./AmbientPlayer";

export function Navbar({ active }: { active: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { playing, toggle } = useAmbientPlayer();

  return (
    <motion.nav
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 h-14 border-b"
      style={{
        borderColor: "var(--color-border)",
        background: "rgba(15, 15, 15, 0.85)",
        backdropFilter: "blur(20px) saturate(160%)",
      }}
    >
      <div className="h-full flex items-center justify-between px-10 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("home")}
          className="flex-shrink-0 h-8 w-8 rounded-[7px] flex items-center justify-center font-display font-bold text-sm transition-opacity hover:opacity-80"
          style={{ background: "var(--color-accent)", color: "#ffffff" }}
          aria-label="Home"
        >
          {IDENTITY.monogram}
        </button>

        {/* Center nav — desktop only */}
        <div className="hidden md:flex items-center gap-1">
          {SECTIONS.filter((s) => s.id !== "home").map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className="px-3 py-1.5 rounded-[7px] text-sm font-medium transition-colors inline-flex items-center gap-1.5"
              style={{
                color: active === s.id ? "var(--color-text-1)" : "var(--color-text-3)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-1)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = active === s.id ? "var(--color-text-1)" : "var(--color-text-3)")}
            >
              {s.id === "ask-ai" && (
                <span className="h-1 w-1 rounded-full" style={{ background: "var(--color-accent)" }} />
              )}
              {s.label}
            </button>
          ))}
        </div>

        {/* Right: Equalizer + Hire Me */}
        <div className="flex items-center gap-3">
          {/* Equalizer button */}
          <button
            onClick={toggle}
            title={playing ? "Pause ambient music" : "Play ambient music"}
            aria-label="Toggle ambient music"
            className="h-8 w-8 rounded-[7px] flex items-center justify-center transition-all"
            style={{
              background: playing ? "var(--color-surface-2)" : "transparent",
              border: "1px solid var(--color-border)",
            }}
          >
            <div className="flex items-end gap-0.5" style={{ height: "16px" }}>
              {[5, 10, 7, 14, 6].map((h, i) => (
                <span
                  key={i}
                  className="rounded-[1px] origin-bottom"
                  style={{
                    width: "2px",
                    height: `${h}px`,
                    background: playing ? "var(--color-text-1)" : "var(--color-text-3)",
                    animation: playing
                      ? `eq-bar ${0.5 + (i % 3) * 0.2}s ease-in-out ${i * 0.08}s infinite alternate`
                      : "none",
                    transition: "background 0.3s",
                  }}
                />
              ))}
            </div>
          </button>

          {/* Hire Me button */}
          <button
            onClick={() => scrollToSection("contact")}
            className="hidden sm:block btn-secondary"
          >
            Hire Me
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex items-center justify-center h-8 w-8"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{ color: "var(--color-text-2)" }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden border-t absolute top-14 left-0 right-0"
          style={{ borderColor: "var(--color-border)", background: "rgba(15, 15, 15, 0.95)" }}
        >
          <div className="flex flex-col p-4 gap-2">
            {SECTIONS.filter((s) => s.id !== "home").map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  scrollToSection(s.id);
                  setMobileOpen(false);
                }}
                className="px-3 py-2 text-left text-sm font-medium rounded-[7px] transition-all inline-flex items-center gap-2"
                style={{
                  color: active === s.id ? "var(--color-text-1)" : "var(--color-text-3)",
                  background: active === s.id ? "var(--color-surface-2)" : "transparent",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-1)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = active === s.id ? "var(--color-text-1)" : "var(--color-text-3)")}
              >
                {s.id === "ask-ai" && (
                  <span className="h-1 w-1 rounded-full" style={{ background: "var(--color-accent)" }} />
                )}
                {s.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
