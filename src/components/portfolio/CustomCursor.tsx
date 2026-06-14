import { useCallback, useEffect, useLayoutEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

// Gsap Ticker Function
function useTicker(callback: () => void, paused: boolean) {
  useEffect(() => {
    if (!paused && callback) {
      gsap.ticker.add(callback);
    }
    return () => {
      gsap.ticker.remove(callback);
    };
  }, [callback, paused]);
}

const EMPTY = {} as {
  x: (val: number) => void;
  y: (val: number) => void;
  r: (val: number) => void;
  width: (val: number) => void;
  height: (val: number) => void;
  sx: (val: number) => void;
  sy: (val: number) => void;
  opacity: (val: number) => void;
};

function useInstance<T>(value: () => T): T {
  const ref = useRef<T | null>(null);
  if (ref.current === null) {
    ref.current = value();
  }
  return ref.current;
}

// Function for Mouse Move Scale Change (stretch factor)
function getScale(diffX: number, diffY: number) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  return Math.min(distance / 735, 0.35);
}

// Function For Mouse Movement Angle in Degrees
function getAngle(diffX: number, diffY: number) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

function getHoverElement(el: HTMLElement): HTMLElement | null {
  return el.closest(
    "a, button, [role=button], input, textarea, select, [data-cursor], .cursor-can-hover"
  ) as HTMLElement | null;
}

const CURSOR_DIAMETER = 34;

export function CustomCursor() {
  const [enabled, setEnabled] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [cursorMoved, setCursorMoved] = useState(false);

  // Mouse coordinate states for the inner dot
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Refs for elements
  const jellyRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // Instance variables for velocity and smooth position
  const pos = useInstance(() => ({ x: 0, y: 0 }));
  const vel = useInstance(() => ({ x: 0, y: 0 }));
  const set = useInstance(() => ({ ...EMPTY }));

  // Detect coarse pointers (touch screens)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      setEnabled(false);
      document.documentElement.style.cursor = "auto";
    }
  }, []);

  // Add custom cursor class to enable cursor styles
  useEffect(() => {
    document.documentElement.classList.add("custom-cursor-enabled");
    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, []);

  // Detect reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Set GSAP quick setter Values on Layout Mount
  useLayoutEffect(() => {
    if (!enabled || !jellyRef.current) return;
    set.x = gsap.quickSetter(jellyRef.current, "x", "px");
    set.y = gsap.quickSetter(jellyRef.current, "y", "px");
    set.r = gsap.quickSetter(jellyRef.current, "rotate", "deg");
    set.sx = gsap.quickSetter(jellyRef.current, "scaleX");
    set.sy = gsap.quickSetter(jellyRef.current, "scaleY");
    set.width = gsap.quickSetter(jellyRef.current, "width", "px");
    set.height = gsap.quickSetter(jellyRef.current, "height", "px");
    set.opacity = gsap.quickSetter([jellyRef.current, dotRef.current], "opacity");
  }, [enabled]);

  // Main animation ticker loop
  const loop = useCallback(() => {
    if (prefersReducedMotion) return;
    if (!set.width || !set.sx || !set.sy || !set.r) return;

    const rotation = getAngle(vel.x, vel.y);
    const scale = getScale(vel.x, vel.y);

    if (!isHovering) {
      set.x(pos.x);
      set.y(pos.y);
      set.width(CURSOR_DIAMETER + scale * 150);
      set.height(CURSOR_DIAMETER);
      set.r(rotation);
      set.sx(1 + scale);
      set.sy(1 - scale * 1.5);
    } else {
      set.r(0);
      set.sx(1);
      set.sy(1);
    }

    if (isHidden) {
      set.opacity(0);
    } else {
      set.opacity(1);
    }
  }, [isHovering, isHidden, prefersReducedMotion]);

  // Track mouse movements
  useLayoutEffect(() => {
    if (!enabled) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!jellyRef.current) return;
      if (!cursorMoved) {
        setCursorMoved(true);
      }

      const x = e.clientX;
      const y = e.clientY;
      setMousePos({ x, y });

      const el = e.target as HTMLElement;
      const hoverElem = getHoverElement(el);

      if (hoverElem) {
        const rect = hoverElem.getBoundingClientRect();
        setIsHovering(true);

        // Snap and stretch outer ring around target element
        gsap.to(jellyRef.current, {
          rotate: 0,
          duration: 0,
        });
        gsap.to(jellyRef.current, {
          width: rect.width + 16,
          height: rect.height + 12,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          borderRadius: 8,
          borderColor: "var(--color-accent)",
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
      } else {
        setIsHovering(false);
        gsap.to(jellyRef.current, {
          borderRadius: 50,
          borderColor: "var(--color-text-3)",
          width: CURSOR_DIAMETER,
          height: CURSOR_DIAMETER,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      // Check for hidden flags
      const shouldHide = !!el.closest('[data-no-custom-cursor="true"]');
      setIsHidden(shouldHide);

      if (shouldHide) {
        document.body.style.cursor = "auto";
      }

      // Smooth follow position with velocity calculation
      gsap.to(pos, {
        x: x,
        y: y,
        duration: 0.8,
        ease: "power3.out",
        onUpdate: () => {
          vel.x = (x - pos.x) * 0.8;
          vel.y = (y - pos.y) * 0.8;
        },
      });

      loop();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [enabled, cursorMoved, loop]);

  useTicker(loop, !cursorMoved || !enabled);

  if (!enabled) return null;

  return (
    <>
      {/* Outer Elastic Jelly Ring */}
      <div
        ref={jellyRef}
        className={cn(
          "fixed left-0 top-0 border-[1.5px] border-white/50 rounded-full pointer-events-none will-change-transform custom-cursor-ring",
          "translate-x-[-50%] translate-y-[-50%]"
        )}
        style={{
          width: CURSOR_DIAMETER,
          height: CURSOR_DIAMETER,
          zIndex: 9999,
          mixBlendMode: "difference",
          transition: "border-color 0.2s, border-radius 0.2s",
        }}
      />
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="w-1.5 h-1.5 bg-white rounded-full fixed translate-x-[-50%] translate-y-[-50%] pointer-events-none"
        style={{
          top: mousePos.y,
          left: mousePos.x,
          zIndex: 10000,
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
