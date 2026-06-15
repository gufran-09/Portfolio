import { motion, useScroll, useTransform } from "framer-motion";
import { MarqueeTitle } from "./MarqueeTitle";
import { useEffect, useRef, useState } from "react";
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
  const gridRef = useRef<HTMLDivElement>(null);
  const [pathD, setPathD] = useState("");

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start 85%", "start 35%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const updatePath = () => {
    const grid = gridRef.current;
    if (!grid) return;
    const gridRect = grid.getBoundingClientRect();
    const iconBoxes = grid.querySelectorAll(".phase-icon-box");
    if (iconBoxes.length === 0) return;

    const points = Array.from(iconBoxes).map((box) => {
      const rect = box.getBoundingClientRect();
      return {
        x: rect.left - gridRect.left + rect.width / 2,
        y: rect.top - gridRect.top + rect.height / 2,
      };
    });

    if (points.length < 2) return;

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x} ${points[i].y}`;
    }
    setPathD(d);
  };

  useEffect(() => {
    updatePath();
    const timer = setTimeout(updatePath, 200);
    window.addEventListener("resize", updatePath);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePath);
    };
  }, []);

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
            An end-to-end SDLC and DevOps loop, refined across a years of shipping
            production systems at scale.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          ref={gridRef}
          className="methodology-grid relative"
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

          {/* SVG Connecting Timeline */}
          {pathD && (
            <svg className="methodology-line-svg" aria-hidden="true">
              <defs>
                <linearGradient id="methodology-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7c6ef5" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
              <motion.path
                d={pathD}
                fill="none"
                stroke="url(#methodology-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pathLength }}
              />
            </svg>
          )}
        </motion.div>
      </div>
    </section>
  );
}

