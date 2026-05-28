import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, User, Code2, GraduationCap, Trophy, Mail } from "lucide-react";
import { scrollToSection } from "@/lib/portfolio/terminalCommands";
import { useAmbientPlayer } from "./AmbientPlayer";

const PRIMARY_LINKS = [
  { id: "experience", label: "Experience" },
  { id: "ask-ai", label: "Gufran AI", hasAiDot: true },
];

const DROPDOWN_ITEMS = [
  { id: "about", label: "About", Icon: User },
  { id: "projects", label: "Projects", Icon: Code2 },
  { id: "education", label: "Education", Icon: GraduationCap },
  { divider: true } as const,
  { id: "achievements", label: "Achievements", Icon: Trophy },
  { id: "contact", label: "Contact", Icon: Mail },
];

const BAR_HEIGHTS_STATIC = [5, 10, 7, 14, 6];

export function Navbar({ active }: { active: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [eqTooltip, setEqTooltip] = useState(false);
  const { playing, toggle } = useAmbientPlayer();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
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
    (item) => "id" in item && isLinkActive(item.id as string)
  );

  return (
    <motion.nav
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: 56,
        borderBottom: "1px solid var(--color-border)",
        background: "rgba(10,10,10,0.8)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="h-full flex items-center justify-between px-10 max-w-7xl mx-auto w-full">
        {/* ── LEFT: Logo ── */}
        <button
          onClick={() => scrollToSection("home")}
          aria-label="Home"
          style={{
            width: 30,
            height: 30,
            background: "#6366f1",
            color: "#ffffff",
            borderRadius: 7,
            border: "none",
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: 13,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            transition: "opacity 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          GA
        </button>

        {/* ── CENTER: Pill Navigation ── */}
        <div className="hidden md:flex items-center" style={{ position: "relative" }}>
          <div
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 100,
              padding: 4,
              display: "inline-flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            {PRIMARY_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={{
                  padding: "7px 18px",
                  borderRadius: 100,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  color: isLinkActive(link.id) ? "#f0f0f0" : "var(--color-text-3)",
                  background: isLinkActive(link.id) ? "var(--color-surface-2)" : "transparent",
                  border: isLinkActive(link.id)
                    ? "1px solid var(--color-border)"
                    : "1px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0,
                }}
                onMouseEnter={(e) => {
                  if (!isLinkActive(link.id)) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.color = "#f0f0f0";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLinkActive(link.id)) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--color-text-3)";
                  }
                }}
              >
                {link.hasAiDot && (
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#6366f1",
                      marginRight: 6,
                      flexShrink: 0,
                    }}
                  />
                )}
                {link.label}
              </button>
            ))}

            {/* View More with Dropdown */}
            <div ref={dropdownRef} style={{ position: "relative" }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  padding: "7px 18px",
                  borderRadius: 100,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  color:
                    dropdownOpen || isDropdownItemActive
                      ? "#f0f0f0"
                      : "var(--color-text-3)",
                  background:
                    dropdownOpen || isDropdownItemActive
                      ? "var(--color-surface-2)"
                      : "transparent",
                  border:
                    dropdownOpen || isDropdownItemActive
                      ? "1px solid var(--color-border)"
                      : "1px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
                onMouseEnter={(e) => {
                  if (!dropdownOpen && !isDropdownItemActive) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.color = "#f0f0f0";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!dropdownOpen && !isDropdownItemActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--color-text-3)";
                  }
                }}
              >
                View More
                <ChevronDown
                  size={14}
                  style={{
                    transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
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
                      top: "calc(100% + 8px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 12,
                      padding: 6,
                      minWidth: 180,
                      boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                      zIndex: 100,
                    }}
                  >
                    {DROPDOWN_ITEMS.map((item, idx) => {
                      if ("divider" in item) {
                        return (
                          <div
                            key={`divider-${idx}`}
                            style={{
                              height: 1,
                              background: "var(--color-border)",
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
                              ? "var(--color-text-1)"
                              : "var(--color-text-2)",
                            background: isLinkActive(id)
                              ? "var(--color-surface-2)"
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
                              "var(--color-surface-2)";
                            e.currentTarget.style.color = "var(--color-text-1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = isLinkActive(id)
                              ? "var(--color-surface-2)"
                              : "transparent";
                            e.currentTarget.style.color = isLinkActive(id)
                              ? "var(--color-text-1)"
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
        </div>

        {/* ── RIGHT: Equalizer + Hire Me ── */}
        <div className="flex items-center" style={{ gap: 12 }}>
          {/* Volume Equalizer */}
          <div style={{ position: "relative" }}>
            <button
              onClick={toggle}
              aria-label={playing ? "Pause ambient music" : "Play ambient music"}
              onMouseEnter={() => setEqTooltip(true)}
              onMouseLeave={() => setEqTooltip(false)}
              style={{
                width: 36,
                height: 36,
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                cursor: "pointer",
                transition: "border-color 0.15s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.borderColor = "var(--color-border-hover)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.borderColor = "var(--color-border)")
              }
            >
              <div
                className={playing ? "is-playing" : ""}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 2,
                  height: 20,
                }}
              >
                {BAR_HEIGHTS_STATIC.map((h, i) => (
                  <span
                    key={i}
                    className={`eq-bar-${i}`}
                    style={{
                      width: 2.5,
                      borderRadius: 2,
                      height: h,
                      background: playing ? "#f0f0f0" : "var(--color-text-3)",
                      transition: "background 0.3s",
                      animation: playing
                        ? `eq${i + 1} ${[0.5, 0.7, 0.4, 0.6, 0.8][i]}s ease-in-out infinite`
                        : "none",
                    }}
                  />
                ))}
              </div>
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
          <button
            onClick={() => scrollToSection("contact")}
            className="hidden sm:block"
            style={{
              background: "#f0f0f0",
              color: "#0a0a0a",
              borderRadius: 8,
              padding: "8px 20px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              border: "none",
              cursor: "pointer",
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#d4d4d4")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#f0f0f0")}
          >
            Hire Me
          </button>

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
                const link = item as { id: string; label: string; hasAiDot?: boolean };
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
