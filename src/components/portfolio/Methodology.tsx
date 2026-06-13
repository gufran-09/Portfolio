import { motion } from "framer-motion";
import { Search, Layers, Code2, Rocket } from "lucide-react";
import { MarqueeTitle } from "./MarqueeTitle";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const steps = [
  {
    num: "01",
    Icon: Search,
    title: "Discover",
    desc: "Deep understanding before a single line of code.",
  },
  {
    num: "02",
    Icon: Layers,
    title: "Design",
    desc: "Architecture, API contracts, component hierarchy first.",
  },
  {
    num: "03",
    Icon: Code2,
    title: "Build",
    desc: "Typed, tested, documented. CI/CD from commit one.",
  },
  {
    num: "04",
    Icon: Rocket,
    title: "Ship",
    desc: "Deploy early, measure everything, iterate fast.",
  },
];

export function Methodology() {
  return (
    <section
      id="methodology"
      className="section bg-section"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingBottom: "calc(128px + 3rem)",
      }}
    >
      <MarqueeTitle text="HOW I WORK" direction="left" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="section-label">03 / HOW I WORK</div>
          <h2 className="h1">My development process.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.45,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="py-12 px-10"
              style={{
                borderRight:
                  i < steps.length - 1
                    ? "1px solid var(--color-border)"
                    : "none",
              }}
            >
              <div className="h1 mb-6" style={{ color: "var(--color-text-4)" }}>
                {step.num}
              </div>
              <step.Icon
                size={20}
                style={{ color: "var(--color-accent)", marginBottom: "24px" }}
              />
              <h3 className="h3 mb-3">{step.title}</h3>
              <p className="body">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
