import { motion } from "framer-motion";
import { Zap, Code2, Layers, Heart } from "lucide-react";
import { SectionLabel, fadeUp } from "./SectionLabel";
import { HIGHLIGHTS, STATS } from "@/lib/portfolio/data";
import { useCountUp } from "@/lib/portfolio/useCountUp";

const ICONS = { Zap, Code2, Layers, Heart };

function StatCard({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { ref, value: n } = useCountUp(value);
  return (
    <motion.div
      {...fadeUp}
      className="rounded-xl border border-white/[0.06] bg-[#111] p-6 transition-colors hover:border-white/[0.12]"
    >
      <div className="font-display text-[2.5rem] font-bold text-white leading-none">
        <span ref={ref}>{n}</span>
        {suffix}
      </div>
      <div className="mt-2 text-[0.85rem] text-[#888]">{label}</div>
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-[120px]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 md:grid-cols-2">
          <div className="relative">
            <span
              aria-hidden
              className="absolute -top-12 -left-2 font-display text-[6rem] font-extrabold text-[#1a1a1a] leading-none select-none"
            >
              01
            </span>
            <div className="relative">
              <SectionLabel number="01" label="ABOUT ME" />
              <motion.h2
                {...fadeUp}
                className="font-display text-[2rem] font-bold text-white leading-tight"
              >
                The person behind the code.
              </motion.h2>

              <motion.div
                {...fadeUp}
                className="mt-6 space-y-4 text-[0.95rem] leading-[1.75] text-[#888]"
              >
                <p>
                  Software engineer at Flyout Tours LLC build a website that powers hounderds of user daily
                </p>
                <p>
                  I contribute to open source, solve competitive programming
                  problems, and occasionally write technical articles about
                  React internals and system design.
                </p>
                <p>
                  Outside work: coffee, mechanical keyboards, and reading about
                  distributed systems.
                </p>
              </motion.div>

              <div className="mt-10">
                <div className="mb-4 text-[0.75rem] font-semibold tracking-[0.15em] text-[#666] uppercase">
                  What I bring
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {HIGHLIGHTS.map((h) => {
                    const Icon = ICONS[h.icon as keyof typeof ICONS];
                    return (
                      <motion.div
                        key={h.title}
                        {...fadeUp}
                        className="flex gap-3 rounded-lg border border-white/[0.06] bg-[#111] p-4"
                      >
                        <div
                          className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-md border"
                          style={{
                            background: "rgba(99,102,241,0.1)",
                            borderColor: "rgba(99,102,241,0.2)",
                          }}
                        >
                          <Icon size={16} className="text-[#6366f1]" />
                        </div>
                        <div>
                          <div className="text-[0.9rem] font-semibold text-white">
                            {h.title}
                          </div>
                          <div className="mt-0.5 text-[0.8rem] text-[#666]">
                            {h.desc}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 self-start md:mt-24">
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
