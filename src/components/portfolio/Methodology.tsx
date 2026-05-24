import { motion } from "framer-motion";
import { Search, Layers, Code2, Rocket } from "lucide-react";
import { SectionLabel, fadeUp } from "./SectionLabel";
import { METHODOLOGY } from "@/lib/portfolio/data";

const ICONS = { Search, Layers, Code2, Rocket };

export function Methodology() {
  return (
    <section id="methodology" className="py-[120px]">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel number="03" label="HOW I WORK" />
        <motion.h2
          {...fadeUp}
          className="font-display text-[2rem] font-bold text-white"
        >
          My development methodology.
        </motion.h2>

        <div className="relative mt-14">
          {/* connecting line */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-12 hidden h-px md:block"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)",
            }}
          />
          <div className="grid gap-6 md:grid-cols-4">
            {METHODOLOGY.map((m, i) => {
              const Icon = ICONS[m.icon as keyof typeof ICONS];
              return (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative rounded-xl border border-white/[0.06] bg-[#111] p-6"
                >
                  <span
                    aria-hidden
                    className="absolute top-4 right-5 font-display text-[3rem] font-extrabold text-[#1a1a1a] leading-none select-none"
                  >
                    0{i + 1}
                  </span>
                  <div
                    className="grid h-9 w-9 place-items-center rounded-md border"
                    style={{
                      background: "rgba(99,102,241,0.1)",
                      borderColor: "rgba(99,102,241,0.2)",
                    }}
                  >
                    <Icon size={16} className="text-[#6366f1]" />
                  </div>
                  <h3 className="mt-5 text-[1rem] font-semibold text-white">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-[0.85rem] leading-[1.7] text-[#666]">
                    {m.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
