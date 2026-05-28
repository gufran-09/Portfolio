export const projectsData = [
  {
    id: 1,
    number: "01",
    type: "WEB APP",
    date: "Q1 2025",
    name: "DevFlow",
    tagline: "Project management built for developers, not managers.",
    description: "A full-stack project management tool designed around developer workflows — with GitHub integration, sprint tracking, and real-time collaboration.",
    bullets: [
      "Real-time collaboration via WebSockets with presence indicators",
      "Deep GitHub integration — PRs, commits, and issues synced automatically",
      "Sprint velocity tracking with burndown charts and cycle time metrics",
      "Role-based access control with team workspaces and audit logs"
    ],
    stack: ["React","TypeScript","Node.js","PostgreSQL",
            "WebSockets","Redis","Docker","AWS"],
    gradient: "linear-gradient(135deg, #e91e8c 0%, #c2185b 50%, #880e4f 100%)",
    accentColor: "#e91e8c",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    number: "02",
    type: "WEB APP",
    date: "Q3 2024",
    name: "CodeSync",
    tagline: "Real-time collaborative code editing — like Google Docs for developers.",
    description: "A multiplayer code editor with real-time sync, syntax highlighting for 40+ languages, and built-in video calling — zero setup required.",
    bullets: [
      "Operational transformation for conflict-free real-time editing",
      "Monaco editor with full LSP support and 40+ language syntax",
      "Integrated WebRTC video calling with screen share",
      "Session replay — rewind any coding session frame by frame"
    ],
    stack: ["React","Socket.io","Monaco Editor",
            "Node.js","Redis","WebRTC","TypeScript"],
    gradient: "linear-gradient(135deg, #7b2fff 0%, #5c35cc 50%, #3d1a99 100%)",
    accentColor: "#7b2fff",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    number: "03",
    type: "OPEN SOURCE",
    date: "Q2 2024",
    name: "AuraUI",
    tagline: "A component library that makes your UI feel alive.",
    description: "An open-source React component library focused on micro-animations, accessible design, and developer experience — with a Storybook-powered docs site.",
    bullets: [
      "60+ animated components built on Framer Motion and Radix UI",
      "Full TypeScript support with auto-generated prop documentation",
      "WCAG 2.1 AA accessibility compliance on every component",
      "Tree-shakeable — import only what you use, zero bloat"
    ],
    stack: ["React","TypeScript","Framer Motion",
            "Radix UI","Rollup","Storybook","Tailwind CSS"],
    gradient: "linear-gradient(135deg, #00b4d8 0%, #0077b6 50%, #023e8a 100%)",
    accentColor: "#00b4d8",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 4,
    number: "04",
    type: "WEB APP",
    date: "Q4 2024",
    name: "Taskly",
    tagline: "AI decides what you should work on next. You just execute.",
    description: "An intelligent task manager that uses GPT-4 to prioritize your backlog based on deadlines, energy levels, and project impact — so you never waste time deciding.",
    bullets: [
      "AI priority scoring that learns your work patterns over time",
      "Natural language task input — 'Call John tomorrow 3pm' just works",
      "Energy-based scheduling — hard tasks when you're fresh, easy ones later",
      "Integrates with Notion, Linear, and GitHub Issues"
    ],
    stack: ["Next.js","OpenAI API","Prisma",
            "PostgreSQL","Tailwind CSS","Vercel"],
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #92400e 100%)",
    accentColor: "#f59e0b",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 5,
    number: "05",
    type: "WEB APP",
    date: "Q1 2024",
    name: "StockSense",
    tagline: "Your portfolio, finally making sense.",
    description: "A stock portfolio tracker with real-time prices, P&L analysis, sector allocation charts, and AI-powered insights — built for retail investors who care about data.",
    bullets: [
      "Live price feeds via WebSocket from multiple exchanges",
      "Advanced P&L breakdown with cost basis and tax lot tracking",
      "AI portfolio analysis with rebalancing recommendations",
      "Customizable alerts for price targets, volatility, and news"
    ],
    stack: ["React","Python FastAPI","PostgreSQL",
            "Chart.js","WebSockets","Docker","AWS"],
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 50%, #064e3b 100%)",
    accentColor: "#10b981",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 6,
    number: "06",
    type: "DESKTOP APP",
    date: "Q2 2023",
    name: "ByteNotes",
    tagline: "A note-taking app that thinks in Markdown and speaks in code.",
    description: "A developer-focused desktop note app built with Electron — with a split-pane Markdown editor, code block execution, local-first storage, and instant search.",
    bullets: [
      "Split-pane editor with live Markdown preview and vim keybindings",
      "Executable code blocks — run JS, Python, or Bash inline",
      "Full-text search across 10,000+ notes in under 50ms",
      "Local-first with optional encrypted cloud sync"
    ],
    stack: ["Electron","React","SQLite",
            "CodeMirror","Node.js","TypeScript"],
    gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #3730a3 100%)",
    accentColor: "#6366f1",
    liveUrl: "#",
    githubUrl: "#"
  }
];

export type Project = typeof projectsData[0];
