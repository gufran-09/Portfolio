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
        lines: [{ text: "🤫 Entering the Matrix...", color: "success" }],
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
