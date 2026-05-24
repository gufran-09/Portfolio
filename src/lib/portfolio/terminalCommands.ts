import { IDENTITY, SKILLS, EXPERIENCE } from "./data";

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
  clear?: boolean;
  matrix?: boolean;
};

export function runCommand(raw: string): CommandResult {
  const input = raw.trim().toLowerCase();
  if (!input) return { lines: [] };

  if (input === "clear") return { clear: true };

  if (input.startsWith("goto ")) {
    const target = input.slice(5).trim();
    const map: Record<string, string> = {
      home: "home",
      about: "about",
      skills: "skills",
      projects: "projects",
      experience: "experience",
      education: "education",
      achievements: "achievements",
      methodology: "methodology",
      contact: "contact",
    };
    if (map[target]) {
      return {
        lines: [{ text: `✓ Navigating to ${target}...`, color: "success" }],
        scrollTo: map[target],
      };
    }
    return { lines: [{ text: `Unknown section: ${target}`, color: "error" }] };
  }

  switch (input) {
    case "whoami":
      return {
        lines: [
          { text: `${IDENTITY.name} — ${IDENTITY.role}`, color: "brand" },
          { text: `${IDENTITY.location} | 3+ years exp` },
          { text: `React · Node.js · Java · TypeScript`, color: "muted" },
        ],
      };
    case "skills": {
      const out: Line[] = [];
      for (const [cat, v] of Object.entries(SKILLS)) {
        out.push({ text: cat, color: "brand" });
        out.push({ text: "  " + v.items.join(", "), color: "muted" });
      }
      return { lines: out };
    }
    case "experience": {
      const top = EXPERIENCE[0];
      return {
        lines: [
          { text: `Current: ${top.role}`, color: "brand" },
          { text: `${top.company} · ${top.date}`, color: "muted" },
        ],
      };
    }
    case "social":
      return {
        lines: [
          { text: `GitHub:   ${IDENTITY.github}` },
          { text: `LinkedIn: ${IDENTITY.linkedin}` },
          { text: `Email:    ${IDENTITY.email}` },
        ],
      };
    case "status":
      return {
        lines: [
          {
            text: "✓ Available for work — Response time: 24hr",
            color: "success",
          },
        ],
      };
    case "streak":
      return {
        lines: [
          { text: "🔥 342 day coding streak on Codolio", color: "brand" },
          { text: "📊 1000+ problems solved on LeetCode" },
        ],
      };
    case "joke":
      return {
        lines: [{ text: JOKES[Math.floor(Math.random() * JOKES.length)] }],
      };
    case "coffee":
      return {
        lines: [
          { text: "☕ Brewing... Gufran runs on 3 cups/day." },
          { text: "Current caffeine level: ████████░░ 80%", color: "brand" },
        ],
      };
    case "matrix":
      return {
        matrix: true,
        lines: [{ text: "Entering the matrix...", color: "brand" }],
      };
    case "hire":
      return {
        lines: [
          { text: "📧 Redirecting to contact section...", color: "brand" },
        ],
        scrollTo: "contact",
      };
    case "help":
      return {
        lines: [
          { text: "Available commands:", color: "brand" },
          { text: "  goto <section>   Navigate to a section" },
          { text: "  whoami           About me" },
          { text: "  skills           List my technical skills" },
          { text: "  experience       Current role" },
          { text: "  social           My social links" },
          { text: "  status           Availability" },
          { text: "  streak           Coding streak stats" },
          { text: "  joke             Random dev joke" },
          { text: "  coffee           Caffeine level" },
          { text: "  matrix           Enter the matrix" },
          { text: "  hire             Jump to contact" },
          { text: "  clear            Clear terminal" },
          { text: "  help             Show this list" },
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
