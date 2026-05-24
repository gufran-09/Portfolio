import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { SectionLabel, fadeUp } from "./SectionLabel";
import { PROJECTS, PROJECT_FILTERS } from "@/lib/portfolio/data";

const GRADIENTS = [
  "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
  "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
  "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
  "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)",
  "linear-gradient(135deg, #1f2937 0%, #312e81 100%)",
  "linear-gradient(135deg, #0c0a1e 0%, #1e1b4b 100%)",
];

export function Projects() {
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.tags.includes(filter));

  return (
    <section id="projects" className="py-[120px]">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel number="04" label="PROJECTS" />
        <motion.h2
          {...fadeUp}
          className="font-display text-[2rem] font-bold text-white"
        >
          Things I've built.
        </motion.h2>
        <motion.p {...fadeUp} className="mt-2 text-[0.95rem] text-[#666]">
          A selection of projects I'm proud of.
        </motion.p>

        <motion.div {...fadeUp} className="mt-8 flex flex-wrap gap-2">
          {PROJECT_FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="rounded-full border px-4 py-1.5 text-[0.8rem] transition-all"
                style={
                  active
                    ? {
                        background: "rgba(99,102,241,0.15)",
                        borderColor: "rgba(99,102,241,0.3)",
                        color: "#6366f1",
                      }
                    : {
                        background: "transparent",
                        borderColor: "rgba(255,255,255,0.06)",
                        color: "#555",
                      }
                }
              >
                {f}
              </button>
            );
          })}
        </motion.div>

        <motion.div
          layout
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.name}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
                data-cursor="VIEW"
                className="group overflow-hidden rounded-xl border border-white/[0.06] bg-[#111] transition-all hover:-translate-y-1 hover:border-white/[0.12]"
              >
                <div
                  className="relative grid h-[200px] place-items-center overflow-hidden"
                  style={{ background: GRADIENTS[i % GRADIENTS.length] }}
                >
                  <span className="font-display text-[3rem] font-extrabold uppercase tracking-tight text-white/[0.08]">
                    {p.name}
                  </span>
                  {p.featured && (
                    <span
                      className="absolute top-3 right-3 rounded-full border px-2.5 py-0.5 text-[0.65rem] font-semibold"
                      style={{
                        background: "rgba(99,102,241,0.1)",
                        borderColor: "rgba(99,102,241,0.2)",
                        color: "#6366f1",
                      }}
                    >
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-[1rem] font-semibold text-white">
                    {p.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[0.82rem] leading-[1.6] text-[#666]">
                    {p.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-[#1a1a1a] px-2 py-0.5 text-[0.7rem] text-[#666]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-5 border-t border-white/[0.04] px-5 py-3">
                  <a
                    href={p.github}
                    data-cursor="GITHUB"
                    className="inline-flex items-center gap-1.5 text-[0.78rem] text-[#555] transition-colors hover:text-white"
                  >
                    <Github size={14} /> View Code
                  </a>
                  <a
                    href={p.demo}
                    className="inline-flex items-center gap-1.5 text-[0.78rem] text-[#555] transition-colors hover:text-white"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-10 flex justify-center">
          <a
            href={`https://github.com/gufran-09`}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/10 px-6 py-3 text-[0.85rem] text-white transition-colors hover:border-white/25"
          >
            View All Projects →
          </a>
        </div>
      </div>
    </section>
  );
}
