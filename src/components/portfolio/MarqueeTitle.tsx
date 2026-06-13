import { useEffect, useRef } from "react";

interface MarqueeTitleProps {
  text: string;
  direction?: "left" | "right";
}

/**
 * Decorative background marquee — ghostly outlined text at the BOTTOM of each
 * section, acting as a visual end-cap / transition strip.
 *
 * Positioning: anchored to bottom: 0, pushed 35% below fold so only the top
 * ~65% of the letters are visible. Clipped by section overflow: hidden.
 *
 * Rules:
 *  - z-index: 0  (always behind content)
 *  - pointer-events: none
 *  - no glow, no fill — only -webkit-text-stroke
 *  - never used in Hero
 */
export function MarqueeTitle({ text, direction = "left" }: MarqueeTitleProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // ── Scroll-velocity → animation-duration ──────────────────────────────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let currentDur = 25;
    let rafId = 0;

    const IDLE_DUR = 25;
    const FAST_DUR = 3;
    const LERP = 0.06;

    const onScroll = () => {
      const now = performance.now();
      const dy = Math.abs(window.scrollY - lastScrollY);
      const dt = now - lastTime || 1;
      const speed = dy / dt;
      const targetDur = speed < 0.3 ? IDLE_DUR : speed < 1.5 ? 8 : FAST_DUR;
      (track as any)._targetDur = targetDur;
      lastScrollY = window.scrollY;
      lastTime = now;
    };

    const tick = () => {
      const target = (track as any)._targetDur ?? IDLE_DUR;
      currentDur = currentDur + (target - currentDur) * LERP;
      track.style.animationDuration = `${currentDur.toFixed(2)}s`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const repeated = Array(10).fill(`${text} • `).join("");

  return (
    <div
      aria-hidden="true"
      style={{
        /* Anchor to section bottom, push 35% below fold */
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        transform: "translateY(35%)",
        overflow: "hidden",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
        lineHeight: 1,
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          width: "max-content",
          animationName:
            direction === "left" ? "marquee-left" : "marquee-right",
          animationDuration: "25s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        <span className="marquee-span">{repeated}</span>
        <span className="marquee-span" aria-hidden="true">
          {repeated}
        </span>
      </div>
    </div>
  );
}
