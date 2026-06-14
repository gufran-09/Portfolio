import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  runCommand,
  scrollToSection,
  RED_PILL_SEQUENCE,
  BLUE_PILL_SEQUENCE,
  type Line,
} from "@/lib/portfolio/terminalCommands";

/* ── constants ──────────────────────────────────────────────────────── */

const WELCOME: Line[] = [
  {
    text: "Welcome to Gufran Ahmed's portfolio terminal. Type 'help' for available commands.",
    color: "default",
  },
];

const colorMap = {
  brand: "#7c3aed",
  muted: "#a1a1aa",
  error: "#f87171",
  success: "#4ade80",
  command: "#60a5fa",
  default: "#e4e4e7",
} as const;

/** Typewriter speed — ms per character */
const CHAR_DELAY = 22;
/** Pause between lines in the typewriter sequence */
const LINE_PAUSE = 320;

/* ── Terminal modes (state machine) ─────────────────────────────────── */
type TerminalMode =
  | "idle" // normal prompt
  | "matrix" // matrix rain playing
  | "choosing" // red/blue pill choice presented
  | "typewriting"; // typewriter sequence playing

/* ── MatrixRain canvas component ────────────────────────────────────── */

function MatrixRain({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setCanvasSize();

    const fontSize = 18;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(0);
    const chars =
      "アァカサタナハマヤラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨロヲゴゾドボポ1234567890";

    let animationId: number;
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#22c55e";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };
    draw();

    const timer = setTimeout(() => {
      cancelAnimationFrame(animationId);
      onDoneRef.current();
    }, 3500);

    const resizeObserver = new ResizeObserver(setCanvasSize);
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 10 }}
    />
  );
}

/* ── PillChoice inline component ────────────────────────────────────── */

function PillChoice({
  focusedPill,
  onSelect,
}: {
  focusedPill: "red" | "blue";
  onSelect: (pill: "red" | "blue") => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        margin: "12px 0 4px",
        alignItems: "center",
      }}
    >
      <button
        onClick={() => onSelect("red")}
        style={{
          background:
            focusedPill === "red"
              ? "rgba(239, 68, 68, 0.25)"
              : "rgba(239, 68, 68, 0.08)",
          border: `1px solid ${focusedPill === "red" ? "#ef4444" : "rgba(239,68,68,0.3)"}`,
          color: "#f87171",
          fontFamily: "monospace",
          fontSize: "0.85rem",
          fontWeight: 600,
          padding: "8px 18px",
          borderRadius: 8,
          cursor: "pointer",
          transition: "all 0.15s ease",
          outline: focusedPill === "red" ? "2px solid #ef4444" : "none",
          outlineOffset: 2,
          transform: focusedPill === "red" ? "scale(1.05)" : "scale(1)",
        }}
        aria-label="Red Pill"
      >
        🔴 Red Pill
      </button>
      <button
        onClick={() => onSelect("blue")}
        style={{
          background:
            focusedPill === "blue"
              ? "rgba(96, 165, 250, 0.25)"
              : "rgba(96, 165, 250, 0.08)",
          border: `1px solid ${focusedPill === "blue" ? "#60a5fa" : "rgba(96,165,250,0.3)"}`,
          color: "#60a5fa",
          fontFamily: "monospace",
          fontSize: "0.85rem",
          fontWeight: 600,
          padding: "8px 18px",
          borderRadius: 8,
          cursor: "pointer",
          transition: "all 0.15s ease",
          outline: focusedPill === "blue" ? "2px solid #60a5fa" : "none",
          outlineOffset: 2,
          transform: focusedPill === "blue" ? "scale(1.05)" : "scale(1)",
        }}
        aria-label="Blue Pill"
      >
        🔵 Blue Pill
      </button>
      <span
        style={{
          color: "#a1a1aa",
          fontSize: "0.75rem",
          marginLeft: 4,
        }}
      >
        ← / → or type "red" / "blue"
      </span>
    </div>
  );
}

/* ── Main Terminal component ────────────────────────────────────────── */

export function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  // State machine
  const [mode, setMode] = useState<TerminalMode>("idle");
  const [showMatrix, setShowMatrix] = useState(false);
  const [showChoice, setShowChoice] = useState(false);
  const [focusedPill, setFocusedPill] = useState<"red" | "blue">("red");

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typewriterCleanup = useRef<(() => void) | null>(null);

  const isNearBottom = useRef(true);

  /* ── auto-scroll (only when user is near the bottom) ──────────────── */
  useEffect(() => {
    if (bodyRef.current && isNearBottom.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines, showMatrix, showChoice]);

  const handleBodyScroll = useCallback(() => {
    const el = bodyRef.current;
    if (!el) return;
    // Consider "near bottom" if within 60px of the end
    isNearBottom.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < 60;
  }, []);

  /* ── trap wheel events inside terminal body ───────────────────────── */
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // Always stop propagation so the page doesn't scroll
      e.stopPropagation();
      // Scroll the terminal body
      el.scrollTop += e.deltaY;
      // Only prevent default if we can actually scroll
      const atTop = el.scrollTop <= 0 && e.deltaY < 0;
      const atBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight && e.deltaY > 0;
      if (!atTop && !atBottom) {
        e.preventDefault();
      }
      // Always prevent — fully contain scroll
      e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  });

  /* ── global keyboard shortcuts ────────────────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ── focus input when opened ──────────────────────────────────────── */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  /* ── cleanup typewriter on unmount ────────────────────────────────── */
  useEffect(() => {
    return () => {
      if (typewriterCleanup.current) typewriterCleanup.current();
    };
  }, []);

  /* ── typewriter effect ────────────────────────────────────────────── */
  const runTypewriter = useCallback(
    (sequence: Line[], onComplete: () => void) => {
      setMode("typewriting");
      let cancelled = false;
      const timeouts: ReturnType<typeof setTimeout>[] = [];

      const scheduleTimeout = (fn: () => void, ms: number) => {
        const id = setTimeout(() => {
          if (!cancelled) fn();
        }, ms);
        timeouts.push(id);
        return id;
      };

      let totalDelay = 0;

      sequence.forEach((line, lineIdx) => {
        const lineDelay = totalDelay;

        // For empty lines, just add them instantly
        if (line.text === "") {
          scheduleTimeout(() => {
            setLines((prev) => [...prev, { text: "", color: line.color }]);
          }, lineDelay);
          totalDelay += LINE_PAUSE / 2;
          return;
        }

        // Add an empty line first, then type char by char
        scheduleTimeout(() => {
          setLines((prev) => [...prev, { text: "", color: line.color }]);
        }, lineDelay);

        const chars = line.text.split("");
        chars.forEach((char, charIdx) => {
          scheduleTimeout(() => {
            setLines((prev) => {
              const updated = [...prev];
              const last = updated[updated.length - 1];
              updated[updated.length - 1] = {
                ...last,
                text: last.text + char,
              };
              return updated;
            });
          }, lineDelay + (charIdx + 1) * CHAR_DELAY);
        });

        totalDelay += chars.length * CHAR_DELAY + LINE_PAUSE;
      });

      // Complete
      scheduleTimeout(() => {
        onComplete();
      }, totalDelay + 200);

      // Return cleanup function
      typewriterCleanup.current = () => {
        cancelled = true;
        timeouts.forEach(clearTimeout);
      };
    },
    [],
  );

  /* ── pill selection handler ───────────────────────────────────────── */
  const handlePillSelect = useCallback(
    (pill: "red" | "blue") => {
      setShowChoice(false);
      setLines((prev) => [
        ...prev,
        {
          text: `$ select --pill ${pill}`,
          color: "command" as const,
        },
        {
          text:
            pill === "red"
              ? "You took the red pill. Let's see how deep the rabbit hole goes... 🔴"
              : "You took the blue pill. Ignorance is bliss... 🔵",
          color: pill === "red" ? ("error" as const) : ("command" as const),
        },
        { text: "", color: "default" as const },
      ]);

      const sequence =
        pill === "red" ? RED_PILL_SEQUENCE : BLUE_PILL_SEQUENCE;

      // Small pause before typewriter starts
      setTimeout(() => {
        runTypewriter(sequence, () => {
          setMode("idle");
          setTimeout(() => inputRef.current?.focus(), 50);
        });
      }, 400);
    },
    [runTypewriter],
  );

  /* ── matrix rain complete handler ─────────────────────────────────── */
  const handleMatrixDone = useCallback(() => {
    setShowMatrix(false);
    setLines((prev) => [
      ...prev,
      { text: "", color: "default" },
      {
        text: "Choose your path:",
        color: "success",
      },
    ]);
    setShowChoice(true);
    setFocusedPill("red");
    setMode("choosing");
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  /* ── submit handler ───────────────────────────────────────────────── */
  const submit = () => {
    const raw = input;
    if (!raw.trim()) return;

    // If in "choosing" mode, intercept input for pill selection
    if (mode === "choosing") {
      const normalized = raw.trim().toLowerCase();
      if (
        normalized === "red" ||
        normalized === "red pill" ||
        normalized === "1"
      ) {
        setInput("");
        handlePillSelect("red");
        return;
      }
      if (
        normalized === "blue" ||
        normalized === "blue pill" ||
        normalized === "2"
      ) {
        setInput("");
        handlePillSelect("blue");
        return;
      }
      // Invalid input during choice — show hint
      setLines((prev) => [
        ...prev,
        { text: `$ ${raw}`, color: "command" },
        {
          text: 'Please choose: type "red" or "blue" (or click a pill above)',
          color: "error",
        },
      ]);
      setInput("");
      return;
    }

    const promptLine: Line = {
      text: `$ ${raw}`,
      color: "command",
    };
    const result = runCommand(raw);

    if (result.clear) {
      setLines(WELCOME);
    } else {
      setLines((prev) => [...prev, promptLine, ...(result.lines || [])]);
    }

    // Matrix rain → then pill choice
    if (result.matrix) {
      setMode("matrix");
      setTimeout(() => setShowMatrix(true), 800);
    }

    if (result.scrollTo) {
      setTimeout(
        () => scrollToSection(result.scrollTo!),
        result.scrollDelayMs ?? 400,
      );
    }

    setHistory((h) => [raw, ...h].slice(0, 20));
    setHistoryIdx(-1);
    setInput("");
  };

  /* ── keyboard handler ─────────────────────────────────────────────── */
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Arrow keys toggle pill focus during choice mode
    if (mode === "choosing") {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        setFocusedPill((prev) => (prev === "red" ? "blue" : "red"));
        return;
      }
      if (e.key === "Enter") {
        // If input is empty, select focused pill
        if (!input.trim()) {
          e.preventDefault();
          handlePillSelect(focusedPill);
          return;
        }
        // Otherwise let submit() handle typed input
        submit();
        return;
      }
      // Allow typing (submit will intercept)
      return;
    }

    if (e.key === "Enter") submit();
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      if (next >= 0) {
        setHistoryIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = historyIdx - 1;
      if (next < 0) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(next);
        setInput(history[next]);
      }
    }
  };

  const inputDisabled = mode === "matrix" || mode === "typewriting";

  /* ── render ───────────────────────────────────────────────────────── */
  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            key="btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setOpen(true)}
            title="Open Terminal (press /)"
            className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full shadow-2xl transition-transform hover:scale-105 active:scale-95"
            style={{
              background: "#7c3aed",
              color: "#ffffff",
              boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.4)",
            }}
            aria-label="Open Terminal"
          >
            <span className="font-mono text-xl font-bold">{`>_`}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 40, y: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, x: 40, y: 40 }}
            transition={{ type: "spring", damping: 22, stiffness: 240 }}
            className="fixed bottom-6 right-6 z-50 flex w-[min(480px,90vw)] flex-col overflow-hidden rounded-xl border"
            style={{
              height: 380,
              background: "#121212",
              borderColor: "rgba(255,255,255,0.06)",
              boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.7)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ background: "#7c3aed" }}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-white text-sm font-semibold">{`>_ Terminal`}</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-white opacity-80 hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div
              ref={bodyRef}
              onScroll={handleBodyScroll}
              className="relative flex-grow min-h-0 p-4 font-mono text-[0.88rem] leading-[1.6] select-text terminal-body-scrollbar"
              style={{
                color: "#e4e4e7",
                overflowY: "scroll",
                overscrollBehavior: "contain",
                touchAction: "pan-y",
              }}
            >
              {lines.map((l, i) => (
                <div
                  key={i}
                  style={{
                    color: colorMap[l.color || "default"],
                    marginBottom: 6,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {l.text}
                </div>
              ))}

              {/* Interactive pill choice buttons */}
              {showChoice && (
                <PillChoice
                  focusedPill={focusedPill}
                  onSelect={handlePillSelect}
                />
              )}

              {/* Matrix rain canvas overlay */}
              {showMatrix && <MatrixRain onDone={handleMatrixDone} />}
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-2 border-t px-4 py-3"
              style={{
                borderColor: "rgba(255,255,255,0.06)",
                background: "#121212",
              }}
            >
              <span
                className="font-mono text-[1rem] font-bold"
                style={{ color: "#7c3aed" }}
              >
                {mode === "choosing" ? "?" : ">"}
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={
                  mode === "choosing"
                    ? 'Type "red" or "blue"...'
                    : "Type a command..."
                }
                className="flex-grow bg-transparent font-mono text-[0.88rem] outline-none border-none placeholder-zinc-600"
                style={{ color: "#ffffff" }}
                spellCheck={false}
                autoComplete="off"
                disabled={inputDisabled}
              />
            </div>

            {/* Custom Scrollbar Styles */}
            <style>{`
              .terminal-body-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              .terminal-body-scrollbar::-webkit-scrollbar-track {
                background: #121212;
              }
              .terminal-body-scrollbar::-webkit-scrollbar-thumb {
                background: #7c3aed;
                border-radius: 3px;
              }
              .terminal-body-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #6d28d9;
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
