import { useEffect, useRef } from "react";

interface MarqueeTitleProps {
    text: string;
    direction?: "left" | "right";
    top?: string; // vertical position override, default "50%"
}

/**
 * Decorative background marquee — ghostly outlined text scrolling behind
 * section content. Pure CSS animation, scroll-velocity linked via rAF.
 *
 * Rules:
 *  - z-index: 0  (always behind content)
 *  - pointer-events: none
 *  - no glow, no fill, only -webkit-text-stroke
 *  - never used in Hero
 */
export function MarqueeTitle({
    text,
    direction = "left",
}: MarqueeTitleProps) {
    const trackRef = useRef<HTMLDivElement>(null);

    // ── Scroll-velocity → animation-duration ──────────────────────────────────
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        let lastScrollY = window.scrollY;
        let lastTime = performance.now();
        let currentDur = 25;   // seconds — idle speed
        let rafId = 0;

        const IDLE_DUR = 25;
        const FAST_DUR = 3;
        const LERP = 0.06; // smoothing factor

        const onScroll = () => {
            const now = performance.now();
            const dy = Math.abs(window.scrollY - lastScrollY);
            const dt = now - lastTime || 1;
            const speed = dy / dt; // px/ms

            // Map speed → target duration (inverse: faster scroll = shorter duration)
            const targetDur = speed < 0.3
                ? IDLE_DUR
                : speed < 1.5
                    ? 8
                    : FAST_DUR;

            // Store for rAF lerp
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

    // 10 repetitions — enough to fill 200vw at any font size
    const repeated = Array(10).fill(`${text} • `).join("");

    return (
        <div
            aria-hidden="true"
            className="marquee-wrapper"
        >
            <div
                ref={trackRef}
                style={{
                    display: "flex",
                    width: "max-content",
                    animationName: direction === "left" ? "marquee-left" : "marquee-right",
                    animationDuration: "25s",
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                }}
            >
                {/* Two identical spans — first fills view, second provides seamless loop */}
                <span className="marquee-span">{repeated}</span>
                <span className="marquee-span" aria-hidden="true">{repeated}</span>
            </div>
        </div>
    );
}
