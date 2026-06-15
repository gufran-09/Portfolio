import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  User,
  Code2,
  GraduationCap,
  Trophy,
  Mail,
  BarChart2,
} from "lucide-react";
import { scrollToSection } from "@/lib/portfolio/terminalCommands";
import { Magnetic } from "../ui/Magnetic";

const PRIMARY_LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "ask-ai", label: "Gufran AI", hasAiDot: true },
];

const DROPDOWN_ITEMS = [
  { id: "education", label: "Education", Icon: GraduationCap },
  { divider: true } as const,
  { id: "achievements", label: "Achievements", Icon: Trophy },
  { id: "contact", label: "Contact", Icon: Mail },
];

const BAR_HEIGHTS_STATIC = [5, 10, 7, 14, 6];

interface NavbarProps {
  active: string;
  playing: boolean;
  toggle: () => void;
}

export function Navbar({ active, playing, toggle }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [eqTooltip, setEqTooltip] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [dropdownOpen]);

  const isLinkActive = (id: string) => active === id;
  const isDropdownItemActive = DROPDOWN_ITEMS.some(
    (item) => "id" in item && isLinkActive(item.id as string),
  );

  return (
    <motion.nav
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: 64,
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        background: "rgba(8, 8, 10, 0.75)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="h-full flex items-center justify-between px-10 max-w-7xl mx-auto w-full">
        {/* ── LEFT: Logo ── */}
        <button
          onClick={() => scrollToSection("home")}
          aria-label="Home"
          style={{
            width: 32,
            height: 32,
            background: "rgba(139, 92, 246, 0.1)",
            border: "1px solid rgba(139, 92, 246, 0.35)",
            boxShadow: "0 0 12px rgba(139, 92, 246, 0.15)",
            color: "#e9d5ff",
            borderRadius: 8,
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(139, 92, 246, 0.18)";
            e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)";
            e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.35)";
          }}
        >
          GA
        </button>

        {/* ── CENTER: Navigation Links ── */}
        <div
          className="hidden md:flex items-center gap-8"
          style={{ position: "relative" }}
        >
          {PRIMARY_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              style={{
                position: "relative",
                padding: "8px 4px",
                fontFamily: "'Inter', sans-serif",
                fontWeight: isLinkActive(link.id) ? 600 : 500,
                fontSize: 14,
                color: isLinkActive(link.id)
                  ? "#ffffff"
                  : "var(--color-text-3)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "inline-flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => {
                if (!isLinkActive(link.id)) {
                  e.currentTarget.style.color = "#ffffff";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLinkActive(link.id)) {
                  e.currentTarget.style.color = "var(--color-text-3)";
                }
              }}
            >
              {link.hasAiDot && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 10px #10b981, 0 0 20px rgba(16, 185, 129, 0.4)",
                    marginRight: 8,
                    flexShrink: 0,
                  }}
                />
              )}
              {link.label}

              {/* Active Dot indicator below the link */}
              {isLinkActive(link.id) && (
                <motion.span
                  layoutId="nav-active-dot"
                  style={{
                    position: "absolute",
                    bottom: -8,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "rgba(163, 163, 253, 0.8)",
                    boxShadow: "0 0 8px rgba(163, 163, 253, 0.8), 0 0 16px rgba(163, 163, 253, 0.4)",
                  }}
                />
              )}
            </button>
          ))}

          {/* View More with Dropdown */}
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                position: "relative",
                padding: "8px 4px",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                color: dropdownOpen || isDropdownItemActive
                  ? "#ffffff"
                  : "var(--color-text-3)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
              onMouseEnter={(e) => {
                if (!dropdownOpen && !isDropdownItemActive) {
                  e.currentTarget.style.color = "#ffffff";
                }
              }}
              onMouseLeave={(e) => {
                if (!dropdownOpen && !isDropdownItemActive) {
                  e.currentTarget.style.color = "var(--color-text-3)";
                }
              }}
            >
              More
              <ChevronDown
                size={14}
                style={{
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                  opacity: 0.7,
                }}
              />

              {/* Active Dot indicator below More if dropdown item active */}
              {isDropdownItemActive && (
                <motion.span
                  layoutId="nav-active-dot"
                  style={{
                    position: "absolute",
                    bottom: -8,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "rgba(163, 163, 253, 0.8)",
                    boxShadow: "0 0 8px rgba(163, 163, 253, 0.8)",
                  }}
                />
              )}
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 12px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(15, 15, 20, 0.95)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: 12,
                    padding: 6,
                    minWidth: 180,
                    boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                    zIndex: 100,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {DROPDOWN_ITEMS.map((item, idx) => {
                    if ("divider" in item) {
                      return (
                        <div
                          key={`divider-${idx}`}
                          style={{
                            height: 1,
                            background: "rgba(255, 255, 255, 0.08)",
                            margin: "4px 8px",
                          }}
                        />
                      );
                    }
                    const { id, label, Icon } = item as {
                      id: string;
                      label: string;
                      Icon: typeof User;
                    };
                    return (
                      <button
                        key={id}
                        onClick={() => {
                          scrollToSection(id);
                          setDropdownOpen(false);
                        }}
                        style={{
                          width: "100%",
                          padding: "9px 14px",
                          borderRadius: 8,
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 500,
                          fontSize: 13,
                          color: isLinkActive(id)
                            ? "#ffffff"
                            : "var(--color-text-2)",
                          background: isLinkActive(id)
                            ? "rgba(255, 255, 255, 0.05)"
                            : "transparent",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                          textAlign: "left",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(255, 255, 255, 0.08)";
                          e.currentTarget.style.color = "#ffffff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = isLinkActive(id)
                            ? "rgba(255, 255, 255, 0.05)"
                            : "transparent";
                          e.currentTarget.style.color = isLinkActive(id)
                            ? "#ffffff"
                            : "var(--color-text-2)";
                        }}
                      >
                        <Icon size={14} style={{ opacity: 0.7 }} />
                        {label}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── RIGHT: Equalizer + Hire Me ── */}
        <div className="flex items-center" style={{ gap: 20 }}>
          {/* Volume Equalizer */}
          <div style={{ position: "relative" }}>
            <button
              onClick={toggle}
              aria-label={
                playing ? "Pause ambient music" : "Play ambient music"
              }
              onMouseEnter={() => setEqTooltip(true)}
              onMouseLeave={() => setEqTooltip(false)}
              style={{
                background: "transparent",
                border: "none",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "color 0.15s ease",
                color: "var(--color-text-2)",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--color-text-2)")}
            >
              {playing ? (
                <div
                  className="is-playing"
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 2,
                    height: 14,
                  }}
                >
                  {[1, 2, 3].map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: 2.5,
                        borderRadius: 2,
                        height: [6, 12, 16][i],
                        background: "#f0f0f0",
                        animation: `eq${i + 1} ${[0.5, 0.7, 0.4][i]}s ease-in-out infinite alternate`,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: 0.8 }}
                >
                  <line x1="18" y1="20" x2="18" y2="4"></line>
                  <line x1="12" y1="20" x2="12" y2="9"></line>
                  <line x1="6" y1="20" x2="6" y2="15"></line>
                </svg>
              )}
            </button>
            {/* Tooltip */}
            <AnimatePresence>
              {eqTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 2 }}
                  transition={{ duration: 0.12 }}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--color-surface-2)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 6,
                    padding: "5px 10px",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: 11,
                    color: "var(--color-text-2)",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    zIndex: 60,
                  }}
                >
                  {playing ? "Pause ambient music" : "Play ambient music"}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hire Me button */}
          <Magnetic>
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden sm:block"
              style={{
                background: "linear-gradient(135deg, #a5b4fc 0%, #60a5fa 100%)",
                color: "#0a0a0c",
                borderRadius: 10,
                padding: "9px 22px",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 0 16px rgba(129, 140, 248, 0.35)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 24px rgba(129, 140, 248, 0.55)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 16px rgba(129, 140, 248, 0.35)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Hire me
            </button>
          </Magnetic>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              color: "var(--color-text-2)",
              background: "none",
              border: "none",
              width: 36,
              height: 36,
              cursor: "pointer",
            }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
            style={{
              borderTop: "1px solid var(--color-border)",
              position: "absolute",
              top: 56,
              left: 0,
              right: 0,
              background: "rgba(10, 10, 10, 0.95)",
              backdropFilter: "blur(20px)",
              maxHeight: "calc(100vh - 56px)",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: 16,
                gap: 4,
              }}
            >
              {[
                ...PRIMARY_LINKS,
                ...DROPDOWN_ITEMS.filter((item) => !("divider" in item)),
              ].map((item) => {
                if ("divider" in item) return null;
                const link = item as {
                  id: string;
                  label: string;
                  hasAiDot?: boolean;
                };
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      scrollToSection(link.id);
                      setMobileOpen(false);
                    }}
                    style={{
                      padding: "10px 14px",
                      textAlign: "left",
                      fontSize: 14,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      borderRadius: 8,
                      background: isLinkActive(link.id)
                        ? "var(--color-surface-2)"
                        : "transparent",
                      color: isLinkActive(link.id)
                        ? "var(--color-text-1)"
                        : "var(--color-text-3)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-text-1)";
                      e.currentTarget.style.background = "var(--color-surface)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = isLinkActive(link.id)
                        ? "var(--color-text-1)"
                        : "var(--color-text-3)";
                      e.currentTarget.style.background = isLinkActive(link.id)
                        ? "var(--color-surface-2)"
                        : "transparent";
                    }}
                  >
                    {link.hasAiDot && (
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "#6366f1",
                          flexShrink: 0,
                        }}
                      />
                    )}
                    {link.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
