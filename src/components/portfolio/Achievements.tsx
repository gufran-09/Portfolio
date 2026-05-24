import { motion } from "framer-motion";
import { useMemo } from "react";
import { Flame } from "lucide-react";
import { SectionLabel, fadeUp } from "./SectionLabel";
import { TROPHIES, IDENTITY } from "@/lib/portfolio/data";

function Heatmap() {
  const cells = useMemo(() => {
    return Array.from({ length: 12 * 7 }, () => {
      const r = Math.random();
      if (r < 0.45) return 0;
      if (r < 0.7) return 1;
      if (r < 0.9) return 2;
      return 3;
    });
  }, []);
  const opacity = [0, 0.3, 0.6, 1];
  return (
    <div className="mt-6 inline-grid grid-flow-col grid-rows-7 gap-[3px]">
      {cells.map((c, i) => (
        <div
          key={i}
          title={c === 0 ? "No activity" : `${c * 3} problems solved`}
          className="h-[10px] w-[10px] rounded-[2px]"
          style={{
            background: c === 0 ? "#1a1a1a" : `rgba(99,102,241,${opacity[c]})`,
          }}
        />
      ))}
    </div>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="py-[120px]">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel number="07" label="ACHIEVEMENTS" />
        <motion.h2
          {...fadeUp}
          className="font-display text-[2rem] font-bold text-white"
        >
          Milestones & recognition.
        </motion.h2>

        {/* Trophies */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TROPHIES.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-xl border border-white/[0.06] bg-[#111] p-5"
            >
              <div className="text-[1.6rem]">{t.emoji}</div>
              <div className="mt-3 text-[0.9rem] font-semibold text-white">
                {t.title}
              </div>
              <div className="mt-0.5 text-[0.8rem] text-[#666]">{t.sub}</div>
              <div className="mt-2 font-mono text-[0.72rem] text-[#444]">
                {t.year}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coding activity */}
        <div className="mt-16">
          <motion.h3
            {...fadeUp}
            className="font-display text-[1.25rem] font-semibold text-white"
          >
            Coding activity
          </motion.h3>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <motion.div
              {...fadeUp}
              className="rounded-xl border border-white/[0.06] bg-[#111] p-5"
            >
              <div className="mb-4 text-[0.75rem] font-semibold tracking-[0.15em] text-[#666] uppercase">
                GitHub Stats
              </div>
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${IDENTITY.githubUser}&theme=dark&hide_border=true&bg_color=111111&title_color=6366f1&icon_color=6366f1&text_color=888888`}
                alt="GitHub stats"
                className="w-full"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              {...fadeUp}
              className="rounded-xl border border-white/[0.06] bg-[#111] p-5"
            >
              <div className="mb-4 text-[0.75rem] font-semibold tracking-[0.15em] text-[#666] uppercase">
                LeetCode Progress
              </div>
              <img
                src={`https://leetcard.jacoblin.cool/${IDENTITY.githubUser}?theme=dark&font=JetBrains%20Mono&ext=heatmap`}
                alt="LeetCode stats"
                className="w-full"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              {...fadeUp}
              className="rounded-xl border border-white/[0.06] bg-[#111] p-5 lg:col-span-2"
            >
              <div className="mb-4 text-[0.75rem] font-semibold tracking-[0.15em] text-[#666] uppercase">
                GitHub Contributions
              </div>
              <img
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${IDENTITY.githubUser}&theme=github-compact&bg_color=111111&color=6366f1&line=6366f1&point=818cf8&hide_border=true`}
                alt="Contribution graph"
                className="w-full"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              {...fadeUp}
              className="rounded-xl border border-white/[0.06] p-6 lg:col-span-2"
              style={{
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.06), transparent)",
              }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="mb-2 text-[0.75rem] font-semibold tracking-[0.15em] text-[#666] uppercase">
                    Codolio
                  </div>
                  <div className="flex items-center gap-3">
                    <Flame size={32} className="text-[#f59e0b]" />
                    <div className="font-display text-[3rem] font-extrabold text-white leading-none">
                      342
                    </div>
                  </div>
                  <div className="mt-2 text-[0.85rem] text-[#888]">
                    Day coding streak on Codolio
                  </div>
                  <a
                    href={IDENTITY.codolio}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block rounded-lg border border-white/15 px-4 py-2 text-[0.8rem] text-white transition-colors hover:border-white/30"
                  >
                    View Full Profile →
                  </a>
                </div>
                <Heatmap />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
