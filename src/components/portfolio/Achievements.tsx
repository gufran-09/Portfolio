import { motion } from "framer-motion";
import { Trophy, PenTool, Award, Flame, Medal } from "lucide-react";
import { TROPHIES } from "@/lib/portfolio/data";

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
    <section id="achievements" className="section surface-section">
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
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.06 }}
                className="card"
              >
                <Icon size={20} style={{ color: "var(--color-accent)" }} />
                <h3 className="h3 mt-4 mb-2">{trophy.title}</h3>
                <p className="small mb-3">{trophy.sub}</p>
                <p className="mono">{trophy.year}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
