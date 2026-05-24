export const IDENTITY = {
  name: "Gufran Ahmed",
  firstName: "Gufran",
  lastName: "Ahmed",
  monogram: "GA",
  role: "Software Engineer",
  location: "Hyderabad, India",
  tagline: "I build things that live on the internet.",
  email: "gufranahmed0921@gmail.com",
  github: "https://github.com/gufran-09",
  githubUser: "gufran-09",
  linkedin: "https://linkedin.com/in/gufran-ahmed21/",
  twitter: "https://twitter.com/",
  codolio: "https://codolio.com/profile/gufran_21",
  codolioUser: "gufran_21",
};

export const TYPEWRITER_STRINGS = [
  "Full Stack Engineer",
  2000,
  "System Design Enthusiast",
  2000,
  "React & Node.js Developer",
  2000,
  "Open Source Contributor",
  2000,
  "1000+ LeetCode Solved",
  2000,
];

export const HERO_STATS = [
  { label: "Years Exp", value: "3+", dot: "var(--color-accent)" },
  { label: "Projects", value: "50+", dot: "var(--color-success)" },
  { label: "LeetCode", value: "1K+", dot: "#f59e0b" },
];

export const STATS = [
  { value: 2, suffix: "", label: "Product Deployed on google" },
  { value: 15, suffix: "+", label: "Projects Built" },
  { value: 300, suffix: "+", label: "Coding Problems Solved" },
  { value: 15, suffix: "+", label: "Happy Clients" },
];

export const HIGHLIGHTS = [
  {
    icon: "Zap",
    title: "Fast Delivery",
    desc: "Ship quality features without delay.",
  },
  {
    icon: "Code2",
    title: "Clean Code",
    desc: "Readable, tested, maintainable.",
  },
  {
    icon: "Layers",
    title: "Full Stack",
    desc: "Frontend, backend, infra fluently.",
  },
  {
    icon: "Heart",
    title: "User-First",
    desc: "Design decisions rooted in empathy.",
  },
];

export const SKILLS = {
  Frontend: {
    dot: "#3b82f6",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Redux",
      "Vite",
      "Zustand",
      "TanStack Query",
    ],
  },
  Backend: {
    dot: "#10b981",
    items: [
      "Node.js",
      "Express",
      "Java",
      "Spring Boot",
      "GraphQL",
      "REST",
      "WebSockets",
      "Microservices",
    ],
  },
  Database: {
    dot: "#f59e0b",
    items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Prisma", "Drizzle"],
  },
  DevOps: {
    dot: "#a855f7",
    items: [
      "Docker",
      "Kubernetes",
      "AWS",
      "GitHub Actions",
      "Vercel",
      "Nginx",
      "Linux",
    ],
  },
  Tools: {
    dot: "#ec4899",
    items: ["Git", "Figma", "Postman", "VS Code", "IntelliJ", "Jira"],
  },
};

export const SKILL_BARS = [
  { label: "React", value: 95 },
  { label: "TypeScript", value: 88 },
  { label: "Next.js", value: 85 },
  { label: "Java / Spring", value: 82 },
  { label: "System Design", value: 78 },
];

export const METHODOLOGY = [
  {
    icon: "Search",
    title: "Discover",
    desc: "Understanding the problem deeply before writing a single line of code. Requirements, edge cases, and user goals first.",
  },
  {
    icon: "Layers",
    title: "Design",
    desc: "Architecture decisions, component design, API contracts. Getting alignment before building saves 10x the rework.",
  },
  {
    icon: "Code2",
    title: "Build",
    desc: "Clean, tested, documented code. TypeScript, component-driven development, CI/CD from day one.",
  },
  {
    icon: "Rocket",
    title: "Ship & Iterate",
    desc: "Deploy early, gather feedback, iterate fast. Metrics-driven improvements after launch.",
  },
];

export type Project = {
  name: string;
  desc: string;
  tech: string[];
  tags: string[];
  featured?: boolean;
  github?: string;
  demo?: string;
  livelink?: string;
};

export const PROJECTS: Project[] = [
  {
    name: "Flyout Tours",
    desc: "Project management tool built for engineering teams with realtime updates and sprint planning.",
    tech: ["React", "Node.js", "PostgreSQL", "WebSockets"],
    tags: ["React", "Nextjs", "Full Stack"],
    featured: true,
    github: "https://github.com/gufran-09/",
    demo: "#",
    livelink: "#",
  },
  {
    name: "Whirlpool",
    desc: "Real-time collaborative code editor with multi-cursor support and shared terminals.",
    tech: ["React", "Monaco", "Socket.io", "Redis"],
    tags: ["React", "Nextjs", "Full Stack"],
    featured: true,
    github: "https://github.com/gufran-09/Trading",
    demo: "#",
    livelink: "#",
  },
  {
    name: "Agent Ascend",
    desc: "Open source React component library with 50+ accessible primitives and themeable tokens.",
    tech: ["React", "TypeScript", "Storybook", "Rollup"],
    tags: ["React"],
    github: "https://github.com/gufran-09/Agent_Ascend",
    demo: "#",
    livelink: "#",
  },
  {
    name: "Event Manager",
    desc: "AI-powered task prioritization that learns your work patterns and reorders your day.",
    tech: ["Next.js", "OpenAI", "Prisma", "Vercel"],
    tags: ["React", "Full Stack"],
    github: "https://github.com/gufran-09/Event-Manager",
    demo: "#",
    livelink: "#",
  },
  {
    name: "StockSense",
    desc: "Stock portfolio tracker with realtime quotes, charts, and tax-lot accounting.",
    tech: ["React", "FastAPI", "PostgreSQL", "Chart.js"],
    tags: ["React", "Nextjs", "Full Stack"],
    github: "#",
    demo: "#",
    livelink: "#",
  },
  {
    name: "ByteNotes",
    desc: "Developer-focused note-taking app with markdown, code blocks, and local-first sync.",
    tech: ["Electron", "React", "SQLite"],
    tags: ["React"],
    github: "#",
    demo: "#",
    livelink: "#",
  },
];

export const PROJECT_FILTERS = [
  "All",
  "React",
  "Node.js",
  "Nextjs",
  "Full Stack",
];

export const EXPERIENCE = [
  {
    company: "Flyout Tours",
    initials: "TC",
    role: "Software Engineer",
    date: "2025 — Present",
    location: "Remote",
    bullets: [
      "Built React microfrontend architecture serving 2M+ users.",
      "Reduced bundle size by 40% through code splitting and route-level lazy loading.",
      "Mentored 3 junior developers across two product squads.",
    ],
    tech: ["React", "TypeScript", "Nextjs", "AWS"],
  },
];

export const EDUCATION = {
  degree: "B.Tech in Computer Science",
  university: "Vardhaman College of Engineering",
  initials: "VMEG",
  date: "2024 — 2028",
  location: "Hyderabad",
  cgpa: "8.9 / 10",
  coursework: ["DSA", "OS", "DBMS", "Networks", "Software Engineering", "ML", "Agile Methodologies", "System Design"],
};

export const CERTIFICATIONS = [
  {
    name: "Programming in Java with score 94%",
    issuer: "Nptel",
    year: "2025",
    initials: "AW",
  },
  {
    name: "Git - Skill Up",
    issuer: "GeeksforGeeks",
    year: "2026",
    initials: "MT",
  },
  {
    name: "Networking and Web Technology",
    issuer: "Infosys Springboard",
    year: "2025",
    initials: "GG",
  },
  {
    name: "Software Engineering and Agile software development",
    issuer: "Infosys Springboard",
    year: "2026",
    initials: "K8",
  },
  {
    name: "AI Fluency for students",
    issuer: "Anthropic",
    year: "2025",
    initials: "K8",
  },
];

export const TROPHIES = [
  {
    icon: "Trophy",
    emoji: "🏆",
    title: "Winner at Webathon - Festronix",
    sub: "National Level website Building Competition",
    year: "2026",
  },
  {
    icon: "Trophy",
    emoji: "🏆",
    title: "Runner up at Hyderabad Biggest AI Hackathon",
    sub: "Organized by Bower School of Entrepreneurship",
    year: "2023",
  },
  {
    icon: "PenTool",
    emoji: "📝",
    title: "Gold Certificate - NPTEL (94% score)",
    sub: "Programming in Java",
    year: "2025",
  },
  {
    icon: "Award",
    emoji: "🥈",
    title: "2nd Position at National Mathematics Day",
    sub: "Competeted among all the department student with focus on Aptitude, Analytical Resonning and  'add some more'",
    year: "2024",
  },
  {
    icon: "Flame",
    emoji: "🎯",
    title: "300+ Coding Problem solved",
    sub: "Solved coding problems on Leetcode, Codechef, geeksforgeeks and hackerank",
    year: "2026",
  },
  {
    icon: "Medal",
    emoji: "🏅",
    title: "College Rank 1",
    sub: "CSE Department",
    year: "2022",
  },
];

export const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "methodology", label: "Methodology" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "ask-ai", label: "Ask AI" },
  { id: "contact", label: "Contact" },
];
