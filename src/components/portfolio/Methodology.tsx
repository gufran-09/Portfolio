import { motion } from "framer-motion";
import { MarqueeTitle } from "./MarqueeTitle";
import "./Methodology.css";

const phases = [
  {
    num: "PHASE 01",
    title: "Plan & analyze",
    desc: "Gather requirements, map constraints, and define success metrics with stakeholders.",
    iconBg: "#2d2060",
    iconColor: "#7c6ef5",
  },
  {
    num: "PHASE 02",
    title: "Design",
    desc: "Architect system boundaries, API contracts, data models and failure modes.",
    iconBg: "#0f3d2e",
    iconColor: "#22c55e",
  },
  {
    num: "PHASE 03",
    title: "Develop",
    desc: "Type safe code, code review and unit tests, with trunk-based development.",
    iconBg: "#3d1a0f",
    iconColor: "#f97316",
  },
  {
    num: "PHASE 04",
    title: "Test & integrate",
    desc: "Automated integration, regression and security testing inside a CI pipeline.",
    iconBg: "#3d0f1a",
    iconColor: "#ec4899",
  },
  {
    num: "PHASE 05",
    title: "Deploy",
    desc: "Containerized, infrastructure as code releases with progressive rollouts.",
    iconBg: "#0f2a3d",
    iconColor: "#38bdf8",
  },
  {
    num: "PHASE 06",
    title: "Monitor & iterate",
    desc: "Dashboards, alerting and on-call feedback close the loop into the next plan.",
    iconBg: "#2a3d0f",
    iconColor: "#a3e635",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Methodology() {
  return (
    <section id="methodology" className="methodology-section section-has-marquee">
      <MarqueeTitle text="HOW I WORK" direction="left" />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          className="methodology-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label" style={{ color: "var(--color-accent-text)", marginBottom: "0.75rem" }}>
            03 / METHODOLOGY
          </div>
          <h2 className="methodology-title">How I engineer software</h2>
          <p className="methodology-subtitle">
            An end-to-end SDLC and DevOps loop, refined across a decade of shipping
            production systems at scale.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="methodology-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {phases.map((phase) => (
            <motion.div
              key={phase.num}
              className="phase-card"
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Colored square icon */}
              <div
                className="phase-icon-box"
                style={{ background: phase.iconBg }}
              >
                <div
                  className="phase-icon-dot"
                  style={{ background: phase.iconColor }}
                />
              </div>

              {/* Phase label */}
              <div className="phase-label">{phase.num}</div>

              {/* Title */}
              <h3 className="phase-title">{phase.title}</h3>

              {/* Description */}
              <p className="phase-desc">{phase.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
