import { IDENTITY, EXPERIENCE } from "./data";

export const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
  "There are 10 types of people in the world: those who understand binary and those who don't.",
  "Why do Java developers wear glasses? Because they don't C#.",
  "How many programmers does it take to change a light bulb? None — it's a hardware problem.",
  "I would tell you a UDP joke, but you might not get it.",
  "Real programmers count from 0.",
  "Debugging: removing the needles from the haystack.",
  "Programming is 10% writing code and 90% understanding why it's not working.",
  "There are two hard things in CS: cache invalidation, naming things, and off-by-one errors.",
];

export type Line = {
  text: string;
  color?: "brand" | "muted" | "error" | "success" | "command" | "default";
};

export type CommandResult = {
  lines?: Line[];
  scrollTo?: string;
  scrollDelayMs?: number;
  clear?: boolean;
  matrix?: boolean;
};

/* ── Red Pill typewriter sequence ─────────────────────────────────────── */
export const RED_PILL_SEQUENCE: Line[] = [
  { text: "$ whoami --verbose", color: "command" },
  { text: `  user:     ${IDENTITY.name}`, color: "default" },
  { text: `  role:     ${IDENTITY.role}`, color: "default" },
  { text: "  stack:    React · Next.js · TypeScript · Node.js · Spring Boot", color: "default" },
  { text: "  db:       PostgreSQL · MongoDB · Redis", color: "default" },
  { text: "  infra:    Docker · Kubernetes · AWS · GitHub Actions", color: "default" },
  { text: "", color: "default" },
  { text: "$ uptime", color: "command" },
  { text: "  up 3+ years, 0 mass outages, mass caffeine consumed", color: "success" },
  { text: "  load avg: 1.00 (projects) / 0.85 (leetcode) / 0.42 (sleep)", color: "muted" },
  { text: "", color: "default" },
  { text: "$ cat /etc/philosophy", color: "command" },
  { text: '  "Reality is just well-typed state." 🔴', color: "error" },
  { text: "", color: "default" },
  { text: '💡 Try "projects" to see what I\'ve built.', color: "brand" },
];

/* ── Blue Pill typewriter sequence ────────────────────────────────────── */
export const BLUE_PILL_SEQUENCE: Line[] = [
  { text: "$ git log --oneline -5", color: "command" },
  { text: "  a1b2c3d  fix: mass assign undefined to production db (oops)", color: "muted" },
  { text: "  e4f5g6h  feat: add dark mode (the only mode)", color: "muted" },
  { text: '  i7j8k9l  refactor: rename "utils" to "utils2" to "helpers"', color: "muted" },
  { text: "  m0n1o2p  chore: mass delete node_modules, pray, reinstall", color: "muted" },
  { text: '  q3r4s5t  docs: update README ("it works on my machine")', color: "muted" },
  { text: "", color: "default" },
  { text: "$ git revert HEAD~5..HEAD --no-commit", color: "command" },
  { text: "  Initiating rollback...", color: "default" },
  { text: "  ████████████████████░░░░ 78%", color: "success" },
  { text: "  ████████████████████████ 100%", color: "success" },
  { text: "", color: "default" },
  { text: '  ✓ No rollback needed. You\'re already running main. 🔵', color: "success" },
  { text: "", color: "default" },
  { text: '💡 Try "about" to learn more about the developer behind the code.', color: "brand" },
];

export function runCommand(raw: string): CommandResult {
  const input = raw.trim().toLowerCase();
  if (!input) return { lines: [] };

  if (input === "clear") return { clear: true };

  switch (input) {
    case "about":
      return {
        lines: [{ text: "Navigating to About section...", color: "brand" }],
        scrollTo: "about",
      };
    case "skills":
      return {
        lines: [{ text: "Navigating to Skills section...", color: "brand" }],
        scrollTo: "skills",
      };
    case "experience":
      return {
        lines: [{ text: "Navigating to Experience section...", color: "brand" }],
        scrollTo: "experience",
      };
    case "projects":
      return {
        lines: [{ text: "Navigating to Projects section...", color: "brand" }],
        scrollTo: "projects",
      };
    case "contact":
      return {
        lines: [{ text: "Navigating to Contact section...", color: "brand" }],
        scrollTo: "contact",
      };
    case "secret":
      return {
        matrix: true,
        lines: [{ text: "🐇 Entering the Matrix...", color: "success" }],
      };
    case "help":
      return {
        lines: [
          { text: "Available commands:", color: "default" },
          { text: "  - about: Learn about me" },
          { text: "  - skills: View my technical skills" },
          { text: "  - experience: See my work experience" },
          { text: "  - projects: View my projects" },
          { text: "  - contact: Get my contact details" },
          { text: "  - clear: Clear the terminal" },
          { text: "  - secret: Try to find my secret Easter eggs!" },
        ],
      };
    default:
      return {
        lines: [
          {
            text: `command not found: ${raw}. Type 'help' for commands.`,
            color: "error",
          },
        ],
      };
  }
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
