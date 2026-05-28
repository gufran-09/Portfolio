import { motion } from "framer-motion";
import { LEVEL_BADGE_STYLES, type SkillItem } from "./skillsData";

type SkillCardProps = {
  skill: SkillItem;
  selected: boolean;
  index: number;
  onSelect: (skill: SkillItem) => void;
  onNavigate: (nextIndex: number) => void;
  buttonRef: (node: HTMLButtonElement | null) => void;
};

export function SkillCard({ skill, selected, index, onSelect, onNavigate, buttonRef }: SkillCardProps) {
  const levelStyles = LEVEL_BADGE_STYLES[skill.level];

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={() => onSelect(skill)}
      onMouseEnter={() => onSelect(skill)}
      onFocus={() => onSelect(skill)}
      onKeyDown={(event) => {
        const step = window.innerWidth >= 768 ? 2 : 1;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          onNavigate(index + step);
        }
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          onNavigate(index - step);
        }
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(skill);
        }
      }}
      aria-pressed={selected}
      className="group relative flex items-center gap-3 overflow-hidden rounded-[10px] border px-4 py-3 text-left transition-all"
      style={{
        background: selected ? "rgba(99,102,241,0.04)" : "var(--color-surface-2)",
        borderColor: selected ? "rgba(99,102,241,0.4)" : "var(--color-border)",
      }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-0.5"
        style={{ background: selected ? "var(--color-accent)" : "transparent" }}
      />

      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] transition-all"
        style={{
          background: skill.iconBg,
          color: skill.iconColor,
          boxShadow: selected ? "inset 0 0 0 1px rgba(255,255,255,0.04)" : "none",
        }}
      >
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 700, lineHeight: 1 }}>
          {skill.icon}
        </span>
      </span>

      <span className="min-w-0 flex-1">
        <span
          className="block truncate"
          style={{
            color: "var(--color-text-1)",
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          {skill.name}
        </span>
        <span
          className="mt-1 inline-flex items-center rounded-[4px] px-2 py-0.5"
          style={{
            background: levelStyles.background,
            color: levelStyles.color,
            fontFamily: "var(--font-sans)",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.04em",
          }}
        >
          {skill.level}
        </span>
      </span>

      <span
        className="shrink-0"
        style={{
          color: "var(--color-text-3)",
          fontFamily: "var(--font-sans)",
          fontSize: "11px",
          fontWeight: 500,
        }}
      >
        {skill.years}
      </span>
    </motion.button>
  );
}
