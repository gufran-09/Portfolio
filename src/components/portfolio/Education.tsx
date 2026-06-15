import { motion } from "framer-motion";
import { EDUCATION, CERTIFICATIONS } from "@/lib/portfolio/data";
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left — Degrees */}
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

          {/* Right — Certifications */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-0"
          >
            <h3 className="h3 mb-6">Certifications</h3>

            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-start gap-4 py-4 border-b"
                style={{
                  borderColor:
                    i === CERTIFICATIONS.length - 1
                      ? "transparent"
                      : "var(--color-border)",
                }}
              >
                {/* Icon */}
                <div
                  className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 font-display font-bold text-xs"
                  style={{
                    background: "var(--color-surface-2)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-2)",
                  }}
                >
                  {cert.initials}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="h3 mb-1">{cert.name}</h4>
                  <p className="small mb-1">{cert.issuer}</p>
                  <p className="mono">{cert.year}</p>
                </div>

                {/* Verify link */}
                <a
                  href="#"
                  className="text-xs font-medium flex-shrink-0 transition-colors"
                  style={{ color: "var(--color-text-3)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-text-1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-text-3)")
                  }
                >
                  Verify →
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
