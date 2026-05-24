import { motion } from "framer-motion";
import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { PROJECTS, PROJECT_FILTERS } from "@/lib/portfolio/data";
import { MarqueeTitle } from "./MarqueeTitle";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export function Projects() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter));

  return (
    <section id="projects" className="section surface-section" style={{ position: "relative", overflow: "hidden", paddingBottom: "calc(128px + 3rem)" }}>
      <MarqueeTitle text="PROJECTS" direction="right" top="50%" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="section-label">04 / PROJECTS</div>
          <h2 className="h1 mb-12">Things I've built.</h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="flex gap-1 mb-12 flex-wrap"
        >
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3.5 py-1.5 rounded-[7px] text-xs font-medium transition-all"
              style={{
                color: filter === f ? "var(--color-text-1)" : "var(--color-text-3)",
                background: filter === f ? "var(--color-surface-2)" : "transparent",
                border: filter === f ? "1px solid var(--color-border)" : "1px solid transparent",
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.name}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="card overflow-hidden hover:border-[var(--color-border-hover)] transition-all hover:-translate-y-1"
            >
              {/* Image area */}
              <div
                className="h-44 rounded-lg mb-5 flex items-center justify-center relative overflow-hidden"
                style={{ background: "var(--color-surface-2)" }}
              >
                <span
                  className="text-6xl font-bold opacity-5 absolute"
                  style={{ color: "var(--color-text-1)" }}
                >
                  {project.name.slice(0, 2)}
                </span>
                {project.featured && (
                  <span
                    className="absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded-[5px]"
                    style={{
                      background: "var(--color-accent-dim)",
                      color: "var(--color-accent)",
                      border: "1px solid var(--color-accent-border)",
                    }}
                  >
                    Featured
                  </span>
                )}
              </div>

              {/* Content */}
              <h3 className="h3 mb-2">{project.name}</h3>
              <p className="small mb-4 line-clamp-2">{project.desc}</p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="pill">
                    {t}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div
                className="flex items-center justify-between pt-4 border-t"
                style={{ borderColor: "var(--color-border)" }}
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                  style={{ color: "var(--color-text-3)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-3)")}
                >
                  <Github size={14} />
                  Source
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                  style={{ color: "var(--color-text-3)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-3)")}
                >
                  <ExternalLink size={14} />
                  Demo
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
