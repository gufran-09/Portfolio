# Project & Route Structure - Portfolio

This document outlines the directory structure and file-based routing architecture for this TanStack Start (SSR) portfolio project.

## Directory Structure

```text
portfolio/
├── .vercel/                 # Vercel deployment cache and config
├── public/                  # Static assets (favicons, audio files, images)
├── src/                     # Main source code directory
│   ├── assets/              # Bundler-imported assets (logos, illustrations)
│   ├── components/          # React Components
│   │   ├── portfolio/       # Portfolio-specific components
│   │   │   ├── realtime/    # Components/hooks for realtime interactions
│   │   │   │   └── hooks/   
│   │   │   │       └── use-sounds.ts  # Handles ambient and interactive audio effects
│   │   │   ├── About.tsx               # About section with detailed profile
│   │   │   ├── Achievements.tsx        # Highlighted accomplishments
│   │   │   ├── AskAI.tsx               # Interactive AI Assistant interface
│   │   │   ├── CodingJourney.tsx       # Interactive timeline of programming history
│   │   │   ├── Contact.tsx             # Contact form component
│   │   │   ├── GitHubContributionGraph.tsx # Custom Git contribution chart
│   │   │   ├── Hero.tsx                # Main welcome landing fold with animations
│   │   │   ├── Navbar.tsx              # Top navigation bar
│   │   │   ├── Projects.tsx            # Project listing section
│   │   │   ├── Terminal.tsx            # Interactive developer CLI terminal
│   │   │   └── ... (additional subcomponents and data configs)
│   │   └── ui/              # Reusable Shadcn UI component library (Button, Card, Dialog, etc.)
│   ├── data/                # Static data configuration
│   │   └── constants.ts     # Configuration for social links, info, and profiles
│   ├── hooks/               # Custom global React hooks
│   │   └── use-mobile.tsx   # Hook to detect mobile screen width
│   ├── lib/                 # Core helper libraries and utilities
│   │   ├── portfolio/       # Portfolio-specific utilities (active section, terminal cmds)
│   │   │   ├── data.ts
│   │   │   ├── terminalCommands.ts
│   │   │   ├── useActiveSection.ts
│   │   │   └── useCountUp.ts
│   │   ├── error-capture.ts # SSR Server Error capture helper
│   │   ├── error-page.ts    # Fallback HTML page render wrapper for critical errors
│   │   └── utils.ts         # Utility class merger for Tailwind styles
│   ├── routes/              # TanStack Router File-Based Routing (The core route definition)
│   │   ├── __root.tsx       # Root layout wrapper (Houses HTML header, metadata, global styles, providers)
│   │   ├── index.tsx        # Homepage route (/) - orchestrates the single-page sections
│   │   └── project.tsx      # Project detail route (/project) - shows project specifics
│   ├── routeTree.gen.ts     # Automatically generated TanStack Router route tree
│   ├── router.tsx           # Instantiates TanStack Router configuration
│   ├── server.ts            # SSR Server entry point (Nitro backend wrapper)
│   ├── start.ts             # React Start client bootstrap
│   └── styles.css           # Global CSS stylesheet (contains Tailwind variables and custom animations)
├── index.html               # Main HTML wrapper index file
├── package.json             # Dependencies, devDependencies, and scripts
├── tsconfig.json            # Root TypeScript compiler settings
└── vite.config.ts           # Vite configuration featuring TanStack Router and Nitro Vercel compiler settings
```

---

## Route Structure

This application uses **TanStack Router** file-based routing. The actual routes are derived directly from files inside the `src/routes/` directory:

| Route Path | Route File | Description |
| :--- | :--- | :--- |
| **Root layout** | [__root.tsx](file:///d:/Porfolio/portfolio/src/routes/__root.tsx) | The layout skeleton (nav bar, custom cursor, theme loader, sound player, and footer wrapper) that wraps all page elements. |
| **`/`** | [index.tsx](file:///d:/Porfolio/portfolio/src/routes/index.tsx) | The main portfolio index page (renders the animated Hero, About, Projects, Experience, Skills, AskAI Assistant, and Terminal sections). |
| **`/project`** | [project.tsx](file:///d:/Porfolio/portfolio/src/routes/project.tsx) | The detail route that handles showing deep insights, statistics, and reviews for individual projects. |
