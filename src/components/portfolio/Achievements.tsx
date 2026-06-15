import { motion } from "framer-motion";
import { Trophy, PenTool, Award, Flame, Medal } from "lucide-react";
import { TROPHIES } from "@/lib/portfolio/data";
import "./Achievements.css";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const iconMap: Record<string, any> = {
  Trophy,
  PenTool,
  Award,
  Flame,
  Medal,
};

export function Achievements() {
  return (
    <section id="achievements" className="section surface-section" style={{ padding: "var(--space-32) 0" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="section-label">07 / ACHIEVEMENTS</div>
          <h2 className="h1 mb-16">Milestones & recognition.</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          {TROPHIES.map((trophy, i) => {
            const Icon = iconMap[trophy.icon] || Trophy;
            const isFeatured = trophy.featured;
            const isStat = trophy.isStat;
            const accentClass = trophy.accent || "teal";

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.06 }}
                className={`ach-card ${accentClass} ${isFeatured ? "featured" : ""}`}
              >
                {/* Background faded icon for featured card */}
                {isFeatured && (
                  <Icon className="ach-featured-bg-icon" size={160} />
                )}

                {/* Top Row: Icon Chip & Badge */}
                <div className="ach-card-top-row">
                  <div className="ach-icon-chip">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  {isFeatured && (
                    <span className="ach-featured-badge">FEATURED</span>
                  )}
                </div>

                {/* Card Content */}
                <div className="ach-content">
                  {isStat ? (
                    // Stat Card (300+ problems solved)
                    <div className="ach-stat-box">
                      <h3 className="ach-card-title">{trophy.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="ach-stat-value">300+</span>
                        <span className="ach-stat-label" style={{ color: "var(--color-text-3)" }}>
                          {trophy.sub}
                        </span>
                      </div>
                    </div>
                  ) : (
                    // Regular & Featured Card Layout
                    <>
                      <h3 className="ach-card-title">{trophy.title}</h3>
                      <p className="ach-card-sub">{trophy.sub}</p>
                    </>
                  )}
                  <span className="ach-card-year">{trophy.year}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

