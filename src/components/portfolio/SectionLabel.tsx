import { motion } from "framer-motion";

export function SectionLabel({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mb-3 flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.15em]"
    >
      <span className="text-[#6366f1]">{number}</span>
      <span className="h-px w-8 bg-white/10" />
      <span className="text-[#6366f1]">{label}</span>
    </motion.div>
  );
}

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

export const stagger = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: "-80px" },
  transition: { staggerChildren: 0.08 },
};
