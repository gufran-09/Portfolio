import { motion } from "framer-motion";
import { useState } from "react";
import { SectionLabel, fadeUp } from "./SectionLabel";
import { SKILLS, SKILL_BARS } from "@/lib/portfolio/data";

export function Skills() {
  const cats = Object.keys(SKILLS) as (keyof typeof SKILLS)[];
  const [active, setActive] = useState<keyof typeof SKILLS>("Frontend");
  const current = SKILLS[active];

  return (
    <section id="skills" className="py-[120px]">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel number="02" label="SKILLS" />
        <motion.h2
          {...fadeUp}
          className="font-display text-[2rem] font-bold text-white"
        >
          My technical toolkit.
        </motion.h2>

        <motion.div
          {...fadeUp}
          className="mt-10 flex flex-wrap gap-1 border-b border-white/[0.06] bg-[#111]/40"
        >
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`relative px-5 py-3 text-[0.85rem] transition-colors ${
                active === c ? "text-white" : "text-[#555] hover:text-[#888]"
              }`}
            >
              {c}
              {active === c && (
                <motion.span
                  layoutId="skill-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: "#6366f1" }}
                />
              )}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={active as string}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 flex flex-wrap gap-2"
        >
          {current.items.map((s) => (
            <span
              key={s}
              className="group inline-flex items-center gap-2 rounded-md border border-white/[0.06] bg-[#1a1a1a] px-4 py-2 text-[0.85rem] text-[#888] transition-all hover:-translate-y-0.5 hover:border-white/[0.12] hover:text-white"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: current.dot }}
              />
              {s}
            </span>
          ))}
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {SKILL_BARS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="mb-2 flex items-center justify-between text-[0.85rem]">
                <span className="text-white">{s.label}</span>
                <span className="font-mono text-[#666]">{s.value}%</span>
              </div>
              <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.value}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    delay: 0.1 + i * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="h-full"
                  style={{
                    background: "linear-gradient(90deg, #6366f1, #818cf8)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
