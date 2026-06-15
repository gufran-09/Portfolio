import { motion } from "framer-motion";
import { MarqueeTitle } from "./MarqueeTitle";
import { Briefcase, Code2, Terminal } from "lucide-react";
import "./Experience.css";

const EXPERIENCES = [
  {
    title: "Software engineer & tech lead",
    company: "Flyout Tours",
    type: "Remote",
    duration: "7 months",
    current: true,
    icon: Code2,
    bullets: [
      "Leading frontend architecture and development for the company's Next.js platform, owning technical decisions end-to-end.",
      "Driving performance, SEO and rendering strategy through SSR, ISR and route-level optimisation.",
      "Mentoring contributors and setting code quality, review and component-architecture standards for the team.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
  },
  {
    title: "Frontend developer",
    company: "StreetOne Trading",
    type: "Remote",
    duration: "2 months",
    current: false,
    icon: Terminal,
    bullets: [
      "Built and maintained responsive trading-platform UI components in React, focused on data-dense dashboards.",
      "Translated design specs into pixel-accurate, accessible layouts with a glassmorphism-driven dark UI.",
      "Fixed cross-browser layout and responsiveness issues across core trading views.",
    ],
    tech: ["React", "JavaScript", "CSS3", "Responsive design"],
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
      className="experience-section section-has-marquee"
    >
      <MarqueeTitle text="EXPERIENCE" direction="left" />

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
            style={{ color: "var(--color-accent-text)", marginBottom: "0.75rem" }}
          >
            02 / EXPERIENCE
          </div>
          <h2 className="exp-title">Where I've made an impact</h2>
          <p className="exp-subtitle">
            Remote roles leading and building production frontends across Next.js and React.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="exp-timeline">
          {/* Left spine */}
          <div className="exp-spine" />

          <motion.div
            className="exp-cards"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {EXPERIENCES.map((exp, i) => {
              const Icon = exp.icon || Briefcase;
              return (
                <div key={i} className="exp-row">
                  {/* Timeline icon chip */}
                  <div className="exp-dot-wrap">
                    <div className={`exp-icon-chip ${exp.current ? "current" : ""}`}>
                      <Icon size={20} strokeWidth={2} />
                    </div>
                  </div>

                  {/* Card */}
                  <motion.div className={`exp-card ${exp.current ? "exp-card-current" : "exp-card-past"}`} variants={cardVariants}>
                    {/* Card header row */}
                    <div className="exp-card-top">
                      <div className="exp-card-meta">
                        <h3 className="exp-role">{exp.title}</h3>
                        <div className="exp-company-row">
                          <span className="exp-company">{exp.company}</span>
                          <span className="exp-dot-sep">·</span>
                          <span className="exp-type">{exp.type}</span>
                          <span className="exp-dot-sep">·</span>
                          <span className="exp-duration">{exp.duration}</span>
                        </div>
                      </div>
                      <span className={`exp-badge ${exp.current ? "exp-badge-current" : "exp-badge-past"}`}>
                        {exp.current ? "CURRENT" : "PAST"}
                      </span>
                    </div>

                  {/* Divider */}
                  <div className="exp-divider" />

                  {/* Bullets */}
                  <ul className="exp-bullets">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="exp-bullet">
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="exp-tags">
                    {exp.tech.map((t) => (
                      <span key={t} className="exp-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            )
          )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
