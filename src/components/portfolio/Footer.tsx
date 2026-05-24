import { motion } from "framer-motion";
import { IDENTITY } from "@/lib/portfolio/data";

export function Footer() {
  return (
    <footer className="border-t py-12" style={{ borderColor: "var(--color-border)" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="small">
              © 2025 {IDENTITY.name}. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={IDENTITY.github}
              target="_blank"
              rel="noreferrer"
              className="small transition-colors"
              style={{ color: "var(--color-text-3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-1)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-3)")}
            >
              GitHub
            </a>
            <a
              href={IDENTITY.linkedin}
              target="_blank"
              rel="noreferrer"
              className="small transition-colors"
              style={{ color: "var(--color-text-3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-1)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-3)")}
            >
              LinkedIn
            </a>
            <a
              href={IDENTITY.twitter}
              target="_blank"
              rel="noreferrer"
              className="small transition-colors"
              style={{ color: "var(--color-text-3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-1)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-3)")}
            >
              Twitter
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
