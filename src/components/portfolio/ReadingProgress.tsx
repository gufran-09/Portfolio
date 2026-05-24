import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-0 right-0 top-0 z-[100] h-[2px] bg-transparent">
      <div
        className="h-full transition-[width] duration-75"
        style={{
          width: `${p}%`,
          background: "linear-gradient(90deg, #6366f1, #818cf8)",
        }}
      />
    </div>
  );
}
