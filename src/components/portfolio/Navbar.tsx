import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { IDENTITY, SECTIONS } from "@/lib/portfolio/data";
import { scrollToSection } from "@/lib/portfolio/terminalCommands";
import { useAmbientPlayer } from "./AmbientPlayer";

export function Navbar({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const { playing, toggle } = useAmbientPlayer();

  const linkClasses = (id: string) =>
    `relative text-[0.85rem] transition-colors ${active === id ? "text-white" : "text-[#666] hover:text-white"
    }`;

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 h-[60px] border-b border-white/[0.06]"
      style={{
        background: "rgba(10,10,10,0.75)",
        backdropFilter: "blur(20px) saturate(180%)",
      }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("home")}
          className="group flex items-center gap-3"
          aria-label="Home"
        >
          <span
            className="grid h-8 w-8 place-items-center rounded-lg font-display font-bold text-white transition-transform group-hover:scale-105"
            style={{ background: "#6366f1" }}
          >
            {IDENTITY.monogram}
          </span>
        </button>

        {/* Center nav (desktop) */}
        <div className="hidden items-center gap-7 md:flex">
          {SECTIONS.filter((s) => s.id !== "home").map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className={linkClasses(s.id)}
            >
              {s.label}
              {active === s.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                  style={{ background: "#6366f1" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Equalizer — 5 thin white animated bars */}
          <button
            onClick={toggle}
            title={playing ? "Pause ambient music" : "Play ambient music"}
            aria-label="Toggle ambient music"
            className="grid h-9 w-9 place-items-center rounded-md border border-white/10 transition-colors hover:border-white/25"
          >
            <div className="flex items-end gap-[3px]" style={{ height: "18px" }}>
              {[6, 14, 10, 16, 8].map((h, i) => (
                <span
                  key={i}
                  className="rounded-[1px] origin-bottom"
                  style={{
                    width: "2px",
                    height: `${h}px`,
                    background: playing ? "#fff" : "rgba(255,255,255,0.35)",
                    animation: playing
                      ? `eq-bar ${0.5 + (i % 3) * 0.2}s ease-in-out ${i * 0.08}s infinite alternate`
                      : "none",
                    transition: "background 0.3s",
                  }}
                />
              ))}
            </div>
          </button>

          {/* Hire me */}
          <button
            onClick={() => scrollToSection("contact")}
            className="hidden rounded-md border border-white/15 px-4 py-2 text-[0.8rem] font-medium text-white transition-colors hover:bg-white hover:text-black sm:block"
          >
            Hire Me
          </button>

          <button
            className="md:hidden text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/[0.06] bg-[#0a0a0a]"
        >
          <div className="flex flex-col p-4">
            {SECTIONS.filter((s) => s.id !== "home").map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  scrollToSection(s.id);
                  setOpen(false);
                }}
                className="py-3 text-left text-sm text-[#888] hover:text-white"
              >
                {s.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
