import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/portfolio/data";
import { MarqueeTitle } from "./MarqueeTitle";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export function Experience() {
  return (
    <section
      id="experience"
      className="section bg-section"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingBottom: "calc(128px + 3rem)",
      }}
    >
      <MarqueeTitle text="EXPERIENCE" direction="left" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="section-label">05 / EXPERIENCE</div>
          <h2 className="h1 mb-16">Where I've worked.</h2>
        </motion.div>

        <div className="space-y-4">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.45,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="card p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Left column */}
                <div className="md:col-span-1">
                  <h3 className="h3 mb-1">{exp.company}</h3>
                  <p
                    className="small mb-3"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {exp.role}
                  </p>
                  <p className="mono mb-3">{exp.date}</p>
                  <span
                    className="inline-block px-2 py-1 rounded-[4px] text-xs font-medium"
                    style={{
                      background: "var(--color-surface-2)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-3)",
                    }}
                  >
                    {exp.location}
                  </span>
                </div>

                {/* Divider */}
                <div
                  className="hidden md:block"
                  style={{ borderRight: "1px solid var(--color-border)" }}
                />

                {/* Right column */}
                <div className="md:col-span-2">
                  <ul className="space-y-2 mb-4">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="body flex gap-3">
                        <span style={{ color: "var(--color-border-hover)" }}>
                          —
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <span key={t} className="pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
