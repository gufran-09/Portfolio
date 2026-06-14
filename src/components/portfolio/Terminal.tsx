import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X } from "lucide-react";
import {
  runCommand,
  scrollToSection,
  type Line,
} from "@/lib/portfolio/terminalCommands";

const WELCOME: Line[] = [
  { text: "Welcome to Gufran Ahmed's portfolio terminal. Type 'help' for available commands.", color: "default" },
];

const colorMap = {
  brand: "#7c3aed",
  muted: "#a1a1aa",
  error: "#f87171",
  success: "#4ade80",
  command: "#60a5fa", // Cyan/blue for '$ command'
  default: "#e4e4e7",
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
    <div
      className="font-mono text-[0.75rem] leading-tight"
      style={{ color: "#4ade80" }}
    >
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
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
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
      text: `$ ${raw}`,
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
      setTimeout(
        () => scrollToSection(result.scrollTo!),
        result.scrollDelayMs ?? 400,
      );
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
              className="flex-grow min-h-0 overflow-y-auto p-4 font-mono text-[0.88rem] leading-[1.6] select-text terminal-body-scrollbar"
              style={{ color: "#e4e4e7" }}
            >
              {lines.map((l, i) => (
                <div key={i} style={{ color: colorMap[l.color || "default"], marginBottom: 6, whiteSpace: "pre-wrap" }}>
                  {l.text}
                </div>
              ))}
              {matrix && <MatrixRain onDone={() => {}} />}
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-2 border-t px-4 py-3"
              style={{ borderColor: "rgba(255,255,255,0.06)", background: "#121212" }}
            >
              <span
                className="font-mono text-[1rem] font-bold"
                style={{ color: "#7c3aed" }}
              >
                {`>`}
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a command..."
                className="flex-grow bg-transparent font-mono text-[0.88rem] outline-none border-none placeholder-zinc-600"
                style={{ color: "#ffffff" }}
                spellCheck={false}
                autoComplete="off"
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
