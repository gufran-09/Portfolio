import { motion } from "framer-motion";
import { SectionLabel, fadeUp } from "./SectionLabel";
import { EDUCATION, CERTIFICATIONS } from "@/lib/portfolio/data";

export function Education() {
  return (
    <section id="education" className="py-[120px]">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel number="06" label="EDUCATION" />
        <motion.h2
          {...fadeUp}
          className="font-display text-[2rem] font-bold text-white"
        >
          Academic background.
        </motion.h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <motion.div
            {...fadeUp}
            className="rounded-xl border border-white/[0.06] bg-[#111] p-6"
          >
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-[#1a1a1a] font-display text-[0.8rem] font-bold text-white">
                {EDUCATION.initials}
              </div>
              <div className="flex-1">
                <div className="text-[1rem] font-semibold text-white">
                  {EDUCATION.degree}
                </div>
                <div className="text-[0.85rem] text-[#6366f1]">
                  {EDUCATION.university}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 font-mono text-[0.75rem] text-[#555]">
                  <span>{EDUCATION.date}</span>
                  <span>•</span>
                  <span>{EDUCATION.location}</span>
                  <span>•</span>
                  <span>CGPA {EDUCATION.cgpa}</span>
                </div>
              </div>
            </div>
            <div className="mt-5 text-[0.75rem] font-semibold tracking-[0.15em] text-[#666] uppercase">
              Relevant coursework
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {EDUCATION.coursework.map((c) => (
                <span
                  key={c}
                  className="rounded-md border border-white/[0.06] bg-[#1a1a1a] px-2.5 py-1 text-[0.75rem] text-[#888]"
                >
                  {c}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-lg border border-white/[0.06] bg-[#111] p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-md bg-[#1a1a1a] font-display text-[0.7rem] font-bold text-white">
                    {c.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="truncate text-[0.85rem] font-semibold text-white">
                      {c.name}
                    </div>
                    <div className="text-[0.72rem] text-[#666]">
                      {c.issuer} · {c.year}
                    </div>
                  </div>
                </div>
                <a
                  href="#"
                  className="mt-3 inline-block text-[0.72rem] text-[#6366f1] hover:underline"
                >
                  Verify →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
