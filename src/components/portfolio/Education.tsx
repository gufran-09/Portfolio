import { motion } from "framer-motion";
import { EDUCATION } from "@/lib/portfolio/data";
import { MarqueeTitle } from "./MarqueeTitle";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export function Education() {
  return (
    <section
      id="education"
      className="section bg-section"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingBottom: "calc(128px + 3rem)",
      }}
    >
      <MarqueeTitle text="EDUCATION" direction="right" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="section-label">06 / EDUCATION</div>
          <h2 className="h1 mb-16">Academic background.</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Degrees */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-6 flex flex-col gap-6"
          >
            {EDUCATION.map((edu, idx) => (
              <motion.div key={idx} variants={itemVariants} className="card">
                <h3 className="h3 mb-2">{edu.degree}</h3>
                <p className="body mb-6">{edu.university}</p>

                <div
                  className="flex gap-4 mb-6 text-xs font-mono"
                  style={{ color: "var(--color-text-3)" }}
                >
                  <span>{edu.date}</span>
                  <span>•</span>
                  <span>{edu.cgpa.includes('/') || edu.cgpa.includes('%') ? `Score: ${edu.cgpa}` : edu.cgpa}</span>
                </div>

                {edu.coursework && edu.coursework.length > 0 && (
                  <>
                    <div className="divider mb-6" />
                    <div>
                      <p className="small mb-3">Key Subjects</p>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.coursework.map((course) => (
                          <span key={course} className="pill">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
