import { motion } from "framer-motion";
import { SectionLabel, fadeUp } from "./SectionLabel";
import { EXPERIENCE } from "@/lib/portfolio/data";

export function Experience() {
  return (
    <section id="experience" className="py-[120px]">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel number="05" label="EXPERIENCE" />
        <motion.h2
          {...fadeUp}
          className="font-display text-[2rem] font-bold text-white"
        >
          Where I've worked.
        </motion.h2>

        <div className="relative mt-14">
          {/* center line */}
          <div
            aria-hidden
            className="absolute left-4 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)",
            }}
          />

          <div className="space-y-12">
            {EXPERIENCE.map((e, i) => {
              const isRight = i % 2 === 1;
              return (
                <div key={e.company} className="relative">
                  {/* dot */}
                  <div
                    aria-hidden
                    className="absolute left-4 top-6 -translate-x-1/2 h-2 w-2 rounded-full md:left-1/2"
                    style={{
                      background: "#6366f1",
                      boxShadow: "0 0 0 4px rgba(99,102,241,0.15)",
                    }}
                  />
                  <motion.div
                    initial={{ opacity: 0, x: isRight ? 24 : -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isRight ? "md:ml-auto md:pl-12" : "md:pr-12"
                    }`}
                  >
                    <div className="rounded-xl border border-white/[0.06] bg-[#111] p-6">
                      <div className="flex flex-wrap items-start gap-3">
                        <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-md bg-[#1a1a1a] font-display text-[0.7rem] font-bold text-white">
                          {e.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[0.95rem] font-semibold text-white">
                            {e.company}
                          </div>
                          <div className="text-[0.85rem] text-[#6366f1]">
                            {e.role}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-[0.75rem] text-[#555]">
                            {e.date}
                          </div>
                          <span className="mt-1 inline-block rounded-full border border-white/[0.06] px-2 py-0.5 text-[0.65rem] text-[#666]">
                            {e.location}
                          </span>
                        </div>
                      </div>
                      <ul className="mt-4 space-y-1.5">
                        {e.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex gap-2 text-[0.85rem] leading-[1.6] text-[#777]"
                          >
                            <span className="text-[#6366f1]">→</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {e.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-white/[0.06] bg-[#1a1a1a] px-2 py-0.5 text-[0.7rem] text-[#666]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
