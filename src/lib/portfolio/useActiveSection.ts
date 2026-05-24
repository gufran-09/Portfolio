import { useEffect, useState } from "react";
import { SECTIONS, IDENTITY } from "@/lib/portfolio/data";

export function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(id);
          }),
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const label = SECTIONS.find((s) => s.id === active)?.label ?? "Home";
    document.title =
      active === "home"
        ? `${IDENTITY.name} | ${IDENTITY.role}`
        : `${label} | ${IDENTITY.name}`;
  }, [active]);

  return active;
}
