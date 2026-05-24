import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X } from "lucide-react";
import {
  runCommand,
  scrollToSection,
  type Line,
} from "@/lib/portfolio/terminalCommands";

const WELCOME: Line[] = [
  { text: "Welcome to Gufran's portfolio terminal v1.0", color: "brand" },
  { text: "Type 'help' to see available commands.", color: "muted" },
];

const colorMap = {
  brand: "#6366f1",
  muted: "#666666",
  error: "#f87171",
  success: "#4ade80",
  command: "#f0f0f0",
  default: "#a0a0a0",
} as const;

function MatrixRain({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    const chars = "01ｱｲｳｴｵｶｷｸｹｺABCDEF";
    const id = setInterval(() => {
      setLines((prev) => {
        const line = Array.from(
          { length: 36 },
          () => chars[Math.floor(Math.random() * chars.length)],
        ).join("");
        const next = [...prev, line];
        return next.slice(-8);
      });
    }, 90);
    const t = setTimeout(() => {
      clearInterval(id);
      onDone();
    }, 2000);
    return () => {
      clearInterval(id);
      clearTimeout(t);
    };
  }, [onDone]);
  return (
    <div className="font-mono text-[0.75rem] leading-tight" style={{ color: "#4ade80" }}>
      {lines.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </div>
  );
}

export function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [matrix, setMatrix] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({
      top: bodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines, matrix]);

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

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const submit = () => {
    const raw = input;
    if (!raw.trim()) return;
    const promptLine: Line = {
      text: `alex@portfolio:~$ ${raw}`,
      color: "command",
    };
    const result = runCommand(raw);

    if (result.clear) {
      setLines(WELCOME);
    } else {
      setLines((prev) => [...prev, promptLine, ...(result.lines || [])]);
    }

    if (result.matrix) {
      setMatrix(true);
      setTimeout(() => setMatrix(false), 2100);
    }

    if (result.scrollTo) {
      setTimeout(() => scrollToSection(result.scrollTo!), 400);
    }

    setHistory((h) => [raw, ...h].slice(0, 20));
    setHistoryIdx(-1);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
            className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-[10px] border transition-colors"
            style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-surface-2)";
              e.currentTarget.style.borderColor = "var(--color-border-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-surface)";
              e.currentTarget.style.borderColor = "var(--color-border)";
            }}
            aria-label="Open Terminal"
          >
            <TerminalIcon size={18} style={{ color: "#6366f1" }} />
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
            className="fixed bottom-6 right-6 z-50 flex w-[min(360px,90vw)] flex-col overflow-hidden rounded-xl border"
            style={{
              height: 280,
              background: "rgba(15,15,15,0.97)",
              borderColor: "#2a2a2a",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-2 border-b px-3.5 py-2.5"
              style={{ background: "#1e1e1e", borderColor: "#2a2a2a" }}
            >
              <button
                onClick={() => setOpen(false)}
                className="h-2 w-2 rounded-full bg-[#ef4444]"
                aria-label="Close terminal"
              />
              <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
              <span className="h-2 w-2 rounded-full bg-[#10b981]" />
              <span className="flex-1 text-center font-mono text-[0.72rem]" style={{ color: "#666666" }}>
                gufran@portfolio ~ terminal
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X size={12} style={{ color: "#666666" }} />
              </button>
            </div>

            {/* Body */}
            <div
              ref={bodyRef}
              className="flex-1 overflow-y-auto p-3.5 font-mono text-[0.78rem] leading-[1.7]"
            >
              {lines.map((l, i) => (
                <div key={i} style={{ color: colorMap[l.color || "default"] }}>
                  {l.text}
                </div>
              ))}
              {matrix && <MatrixRain onDone={() => {}} />}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 border-t px-3.5 py-2.5" style={{ borderColor: "#2a2a2a" }}>
              <span className="font-mono text-[0.78rem]" style={{ color: "#6366f1" }}>
                gufran@portfolio:~$
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                className="flex-1 bg-transparent font-mono text-[0.78rem] outline-none"
                style={{ color: "#f0f0f0" }}
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
