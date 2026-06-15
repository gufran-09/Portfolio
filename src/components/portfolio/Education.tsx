import { motion } from "framer-motion";
import { EDUCATION } from "@/lib/portfolio/data";
import { MarqueeTitle } from "./MarqueeTitle";
import "./Education.css";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export function Education() {
  const reversedEdu = [...EDUCATION].reverse();

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
          className="edu-header"
        >
          <div className="section-label">06 / EDUCATION</div>
          <h2 className="edu-title">Academic background</h2>
          <p className="edu-subtitle">
            From foundation to specialization, the path that shaped my engineering mindset.
          </p>
        </motion.div>

        <div className="edu-timeline-container max-w-3xl mx-auto">
          {/* Vertical spine line */}
          <div className="edu-spine" />

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="edu-list"
          >
            {reversedEdu.map((edu, idx) => {
              const isCurrent = edu.degree.toLowerCase().includes("b.tech");

              // Colors for the timeline chips: Schooling = teal, Intermediate = blue, B.Tech = purple
              let chipColorClass = "teal";
              if (idx === 1) chipColorClass = "blue";
              if (idx === 2) chipColorClass = "purple";

              // Custom wording for titles/details to match the mockup exactly
              let displayTitle = edu.degree;
              let displaySubtitle = edu.university;
              let displayGrade = `Score: ${edu.cgpa}`;

              if (edu.degree.toLowerCase().includes("secondary school")) {
                displayTitle = "Schooling";
                displayGrade = `SSC [Score: ${edu.cgpa}]`;
              } else if (edu.degree.toLowerCase().includes("intermediate")) {
                displayTitle = "Intermediate";
                displayGrade = `MPC [Score: ${edu.cgpa}]`;
              } else if (isCurrent) {
                displayGrade = `CGPA: ${edu.cgpa}`;
              }

              return (
                <div key={idx} className="edu-row">
                  {/* Timeline Chip */}
                  <div className="edu-chip-wrap">
                    <div className={`edu-chip ${chipColorClass}`}>
                      <div className="edu-chip-inner" />
                    </div>
                  </div>

                  {/* Card */}
                  <motion.div
                    variants={itemVariants}
                    className={`edu-card ${isCurrent ? "edu-card-current" : "edu-card-past"}`}
                  >
                    {isCurrent ? (
                      // B.Tech Current Layout
                      <>
                        <div className="edu-card-header">
                          <h3 className="edu-card-title">{displayTitle}</h3>
                          <span className="edu-badge-current">CURRENT</span>
                        </div>
                        <p className="edu-card-subtitle-current">
                          <span className="edu-college-highlight">{edu.university}</span> · {edu.date}
                        </p>
                        <p className="edu-card-grade mb-4">{displayGrade}</p>

                        {edu.coursework && edu.coursework.length > 0 && (
                          <>
                            <div className="edu-divider" />
                            <div>
                              <p className="edu-coursework-title">Key Subjects</p>
                              <div className="edu-pills">
                                {edu.coursework.map((course) => (
                                  <span key={course} className="edu-pill">
                                    {course}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      // Schooling & Intermediate Layout
                      <>
                        <div className="edu-card-header">
                          <h3 className="edu-card-title">{displayTitle}</h3>
                          <span className="edu-card-date">{edu.date}</span>
                        </div>
                        <p className="edu-card-subtitle">{displaySubtitle}</p>
                        <p className="edu-card-grade">{displayGrade}</p>
                      </>
                    )}
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

