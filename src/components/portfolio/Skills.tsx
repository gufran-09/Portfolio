import { motion } from "framer-motion";
import { useState } from "react";
import { SKILLS, SKILL_BARS } from "@/lib/portfolio/data";
import { MarqueeTitle } from "./MarqueeTitle";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export function Skills() {
  const [activeTab, setActiveTab] = useState("Frontend");
  const tabs = Object.keys(SKILLS);

  return (
    <section id="skills" className="section surface-section" style={{ position: "relative", overflow: "hidden", paddingBottom: "calc(128px + 3rem)" }}>
      <MarqueeTitle text="SKILLS" direction="right" top="55%" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="section-label">02 / SKILLS</div>
          <h2 className="h1 mb-3">My technical toolkit.</h2>
          <p className="body mb-16">Technologies I work with daily and love deeply.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left — Tabs + Pills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Tab buttons */}
            <div className="flex gap-1 mb-8 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-3.5 py-1.5 rounded-[7px] text-xs font-medium transition-all"
                  style={{
                    color: activeTab === tab ? "var(--color-text-1)" : "var(--color-text-3)",
                    background: activeTab === tab ? "var(--color-surface-2)" : "transparent",
                    border: activeTab === tab ? "1px solid var(--color-border)" : "1px solid transparent",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Skill pills */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {SKILLS[activeTab as keyof typeof SKILLS].items.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="pill"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Proficiency bars */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-5"
          >
            {SKILL_BARS.map(({ label, value }, i) => (
              <motion.div key={label} variants={itemVariants}>
                <div className="flex items-center justify-between mb-2">
                  <span className="h3">{label}</span>
                  <span className="mono">{value}%</span>
                </div>
                <div
                  className="h-0.5 rounded-full overflow-hidden"
                  style={{ background: "var(--color-surface-2)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "var(--color-accent)" }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${value}%` }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
