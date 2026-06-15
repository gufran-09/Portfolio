import { motion } from "framer-motion";
import { SectionWatermark } from "./SectionWatermark";
import "./Experience.css";

const EXPERIENCES = [
  {
    title: "Software engineer & tech lead",
    company: "Flyout Tours",
    type: "Remote",
    duration: "7 months",
    current: true,
    description: "Leading frontend architecture for the Next.js platform, driving SSR/ISR performance and mentoring contributors.",
    tech: ["Next.js", "TypeScript"],
  },
  {
    title: "Frontend developer",
    company: "StreetOne Trading",
    type: "Remote",
    duration: "2 months",
    current: false,
    description: "Built responsive trading-platform UI components in React for data-dense dashboards.",
    tech: ["React", "JavaScript"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Experience() {
  return (
    <section
      id="experience"
      className="experience-section"
    >
      <SectionWatermark text="EXPERIENCE" />

      <div className="container exp-container">
        {/* Header */}
        <motion.div
          className="exp-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="section-label"
            style={{ color: "var(--color-text-3)", marginBottom: "0.75rem" }}
          >
            02 / EXPERIENCE
          </div>
          <h2 className="exp-title">Where I've made an impact</h2>
        </motion.div>

        {/* Timeline */}
        <div className="exp-timeline">
          {/* Left spine */}
          <div className="exp-spine" />

          <motion.div
            className="exp-list"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {EXPERIENCES.map((exp, i) => {
              // Top card gets purple chip, bottom gets blue chip
              const chipColorClass = exp.current ? "purple" : "blue";

              return (
                <div key={i} className="exp-row">
                  {/* Timeline Chip */}
                  <div className="exp-dot-wrap">
                    <div className={`exp-chip ${chipColorClass}`}>
                      <div className="exp-chip-inner" />
                    </div>
                  </div>

                  {/* Card */}
                  <motion.div
                    className={`exp-card ${exp.current ? "exp-card-current" : "exp-card-past"}`}
                    variants={cardVariants}
                  >
                    {/* Card header row */}
                    <div className="exp-card-header">
                      <h3 className="exp-card-title">{exp.title}</h3>
                      <span className={`exp-badge-${exp.current ? "current" : "past"}`}>
                        {exp.current ? "CURRENT" : "PAST"}
                      </span>
                    </div>

                    <p className="exp-card-subtitle">
                      <span className="exp-company-highlight">{exp.company}</span> · {exp.type} · {exp.duration}
                    </p>

                    <p className="exp-card-desc">
                      {exp.description}
                    </p>

                    {/* Tech tag pills */}
                    <div className="exp-pills">
                      {exp.tech.map((t) => (
                        <span key={t} className="exp-pill">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

