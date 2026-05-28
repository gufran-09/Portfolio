import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ExternalLink, MousePointerClick } from "lucide-react";
import { LEVEL_BADGE_STYLES, type SkillItem } from "./skillsData";

type SkillDetailPanelProps = {
  skill: SkillItem | null;
  onProjectClick: (projectName: string) => void;
};

export function SkillDetailPanel({ skill, onProjectClick }: SkillDetailPanelProps) {
  return (
    <div
      className="relative overflow-hidden rounded-[16px] border bg-[var(--color-surface)]"
      style={{ minHeight: "400px", top: "80px" }}
    >
      <AnimatePresence mode="wait">
        {skill ? (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 px-6 pt-6">
              <span
                className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[12px]"
                style={{ background: skill.iconBg, color: skill.iconColor }}
              >
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "22px", fontWeight: 700, lineHeight: 1 }}>
                  {skill.icon}
                </span>
              </span>

              <div className="min-w-0">
                <h3
                  className="truncate"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "var(--color-text-1)" }}
                >
                  {skill.name}
                </h3>
                <span
                  className="mt-2 inline-flex items-center rounded-[4px] px-2.5 py-0.5"
                  style={{
                    background: LEVEL_BADGE_STYLES[skill.level].background,
                    color: LEVEL_BADGE_STYLES[skill.level].color,
                    fontFamily: "var(--font-sans)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                  }}
                >
                  {skill.level}
                </span>
              </div>
            </div>

            <div className="my-5 border-t" style={{ borderColor: "var(--color-border)", marginLeft: "24px", marginRight: "24px" }} />

            <div className="px-6">
              <div className="grid grid-cols-3 overflow-hidden rounded-[12px]" style={{ background: "var(--color-border)" }}>
                {[
                  { value: `${skill.years}`, label: "Years Used" },
                  { value: skill.projects, label: "Projects" },
                  { value: skill.level, label: "Level" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[var(--color-surface)] px-3 py-4 text-center">
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, color: "var(--color-text-1)" }}>
                      {stat.value}
                    </div>
                    <div style={{ marginTop: "4px", fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 400, color: "var(--color-text-3)" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 pt-5">
              <div className="mb-3" style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", color: "var(--color-text-3)" }}>
                WHAT I BUILD WITH IT
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.useCases.map((useCase) => (
                  <span
                    key={useCase}
                    className="rounded-[6px] border px-3 py-1.5"
                    style={{
                      background: "var(--color-surface-2)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text-2)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "12px",
                      fontWeight: 400,
                    }}
                  >
                    {useCase}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-6 pt-4">
              <div className="mb-3" style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", color: "var(--color-text-3)" }}>
                USED IN PROJECTS
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.usedIn.map((projectName) => (
                  <button
                    key={projectName}
                    type="button"
                    onClick={() => onProjectClick(projectName)}
                    className="inline-flex items-center gap-1.5 rounded-[6px] border px-3 py-1.5 transition-colors"
                    style={{
                      background: "var(--color-surface-2)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text-2)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "12px", 
                      fontWeight: 500,
                    }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.color = "var(--color-text-1)";
                      event.currentTarget.style.borderColor = "var(--color-border-hover)";
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.color = "var(--color-text-2)";
                      event.currentTarget.style.borderColor = "var(--color-border)";
                    }}
                  >
                    <span>{projectName}</span>
                    <ExternalLink size={10} />
                  </button>
                ))}
              </div>
            </div>

            <div className="px-6 py-5">
              <a
                href={skill.docs}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors"
                style={{ color: "var(--color-text-3)", fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 400 }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = "var(--color-text-1)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = "var(--color-text-3)";
                }}
              >
                <BookOpen size={14} />
                Official Docs ↗
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-[400px] items-center justify-center p-6"
          >
            <div
              className="max-w-[300px] rounded-[12px] border border-dashed px-10 py-10 text-center"
              style={{ borderColor: "var(--color-border)" }}
            >
              <MousePointerClick size={32} style={{ color: "var(--color-text-4)", margin: "0 auto" }} />
              <p style={{ marginTop: "12px", fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 400, color: "var(--color-text-3)" }}>
                Click any skill to explore
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
