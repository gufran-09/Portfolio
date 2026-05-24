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
    <section id="achievements" className="section bg-section">
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

        {/* Achievement cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
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

        {/* Coding Activity Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="border-t pt-24"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="section-label mb-8">CODING ACTIVITY</div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* GitHub */}
            <motion.div className="lg:col-span-2 card p-0 overflow-hidden">
              <div className="p-8 pb-4">
                <h3 className="h3 mb-6">GitHub Contributions</h3>
              </div>
              <div className="px-8 pb-8">
                <img
                  src="https://github-readme-stats.vercel.app/api?username=gufran-09&theme=dark&hide_border=true&bg_color=161616&title_color=6366f1&icon_color=6366f1&text_color=a0a0a0&border_radius=12"
                  alt="GitHub Stats"
                  className="w-full rounded-lg"
                />
              </div>
            </motion.div>

            {/* LeetCode */}
            <motion.div className="card p-0 overflow-hidden">
              <div className="p-8 pb-4">
                <h3 className="h3 mb-6">LeetCode Progress</h3>
              </div>
              <div className="px-8 pb-8">
                <img
                  src="https://leetcard.jacoblin.cool/gufran_21?theme=dark&font=JetBrains+Mono&ext=heatmap&border=0&radius=12"
                  alt="LeetCode"
                  className="w-full rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
