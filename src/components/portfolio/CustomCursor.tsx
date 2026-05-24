import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(true);
  const state = useRef({
    mx: 0,
    my: 0,
    rx: 0,
    ry: 0,
    hover: false,
    click: false,
    label: null as string | null,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      setEnabled(false);
      document.documentElement.style.cursor = "auto";
      return;
    }

    const onMove = (e: MouseEvent) => {
      state.current.mx = e.clientX;
      state.current.my = e.clientY;
      const target = e.target as HTMLElement;
      const labelled = target.closest("[data-cursor]") as HTMLElement | null;
      const interactive = target.closest(
        "a, button, [role=button], input, textarea, select, [data-cursor]",
      );
      state.current.hover = !!interactive;
      state.current.label = labelled?.dataset.cursor || null;
    };
    const onDown = () => {
      state.current.click = true;
    };
    const onUp = () => {
      state.current.click = false;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    let raf = 0;
    const tick = () => {
      const s = state.current;
      s.rx += (s.mx - s.rx) * 0.18;
      s.ry += (s.my - s.ry) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${s.mx}px, ${s.my}px, 0) translate(-50%, -50%)`;
        const size = s.click ? 3 : s.hover ? 4 : 6;
        dotRef.current.style.width = `${size}px`;
        dotRef.current.style.height = `${size}px`;
        dotRef.current.style.background = s.hover ? "#6366f1" : "#fff";
      }
      if (ringRef.current) {
        const size = s.label ? 72 : s.click ? 26 : s.hover ? 52 : 34;
        ringRef.current.style.transform = `translate3d(${s.rx}px, ${s.ry}px, 0) translate(-50%, -50%)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.borderColor =
          s.hover || s.label ? "rgba(99,102,241,0.7)" : "rgba(255,255,255,0.5)";
      }
      if (labelRef.current) {
        labelRef.current.textContent = s.label || "";
        labelRef.current.style.opacity = s.label ? "1" : "0";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full transition-[width,height,background] duration-150"
        style={{
          width: 6,
          height: 6,
          background: "#fff",
          mixBlendMode: "difference",
        }}
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border flex items-center justify-center transition-[width,height,border-color] duration-200"
        style={{
          width: 34,
          height: 34,
          borderWidth: 1.5,
          borderColor: "rgba(255,255,255,0.5)",
        }}
        aria-hidden
      >
        <span
          ref={labelRef}
          className="font-mono text-[0.6rem] tracking-wider opacity-0 transition-opacity"
          style={{ color: "var(--color-text-1)" }}
        />
      </div>
    </>
  );
}
