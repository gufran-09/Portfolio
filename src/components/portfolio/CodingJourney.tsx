import { AnimatePresence, motion } from "framer-motion";
import { Activity, Code2, ExternalLink, Flame, Github, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { ContributionGraph, ContributionLegend, type ContributionDay } from "./ContributionGraph";

const USERNAMES = {
  github: "gufran-09", // Replace with your GitHub username.
  leetcode: "gufran_21", // Replace with your LeetCode username.
  gfg: "gufran_09", // Replace with your GeeksForGeeks username.
  codolio: "gufran_21", // Replace with your Codolio username.
};

type PlatformId = "github" | "leetcode" | "gfg" | "codolio";

const platforms = [
  {
    id: "github",
    label: "GitHub",
    icon: Github,
    color: "#f0f0f0",
    borderColor: "rgba(255,255,255,0.15)",
    titleLine1: "GITHUB",
    titleLine2: "ACTIVITY",
    subtitle: "A visualization of my consistent coding habits and contributions over the past year.",
    summary: "259 contributions this year",
    cta: "VIEW ON GITHUB",
    href: `https://github.com/${USERNAMES.github}`,
  },
  {
    id: "leetcode",
    label: "LeetCode",
    icon: Zap,
    color: "#FFA116",
    borderColor: "rgba(255,161,22,0.3)",
    titleLine1: "LEETCODE",
    titleLine2: "STREAK",
    subtitle: "My competitive programming journey — 1000+ problems solved and counting.",
    summary: "1000+ problems solved",
    cta: "VIEW ON LEETCODE",
    href: `https://leetcode.com/${USERNAMES.leetcode}`,
  },
  {
    id: "gfg",
    label: "GeeksForGeeks",
    icon: Code2,
    color: "#2F8D46",
    borderColor: "rgba(47,141,70,0.3)",
    titleLine1: "GFG",
    titleLine2: "PROGRESS",
    subtitle: "Data structures, algorithms, and interview prep — tracked on GeeksForGeeks.",
    summary: "500+ problems solved",
    cta: "VIEW ON GFG",
    href: `https://www.geeksforgeeks.org/user/${USERNAMES.gfg}`,
  },
  {
    id: "codolio",
    label: "Codolio",
    icon: Activity,
    color: "#6366f1",
    borderColor: "rgba(99,102,241,0.25)",
    titleLine1: "CODOLIO",
    titleLine2: "JOURNEY",
    subtitle: "My overall coding consistency tracked across platforms on Codolio.",
    summary: "342 day streak",
    cta: "VIEW ON CODOLIO",
    href: `https://codolio.com/profile/${USERNAMES.codolio}`,
  },
] as const;

const githubScale = ["#1a1a1a", "rgba(99,102,241,0.25)", "rgba(99,102,241,0.50)", "rgba(99,102,241,0.75)", "#6366f1"];
const leetcodeScale = ["#1a1a1a", "rgba(255,161,22,0.2)", "rgba(255,161,22,0.45)", "rgba(255,161,22,0.7)", "#FFA116"];
const codolioScale = ["#1a1a1a", "rgba(99,102,241,0.2)", "rgba(99,102,241,0.45)", "rgba(99,102,241,0.7)", "#6366f1"];

function seededRandom(seed: number) {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
}

function generateContributionData(seed: number, recentBoost = 0): ContributionDay[][] {
  const start = new Date();
  start.setDate(start.getDate() - 52 * 7);

  return Array.from({ length: 53 }, (_, weekIndex) =>
    Array.from({ length: 7 }, (_, dayIndex) => {
      const date = new Date(start);
      date.setDate(start.getDate() + weekIndex * 7 + dayIndex);
      const recency = weekIndex / 52;
      const activityChance = 0.32 + recentBoost * recency;
      const roll = seededRandom(seed + weekIndex * 17 + dayIndex * 31);
      const count = roll > activityChance ? 0 : Math.floor(seededRandom(seed + weekIndex * 43 + dayIndex * 11) * 13);
      const level = count === 0 ? 0 : count <= 3 ? 1 : count <= 6 ? 2 : count <= 9 ? 3 : 4;

      return {
        date: date.toISOString().slice(0, 10),
        count,
        level,
      };
    }),
  );
}

function StatCard({ number, label, sub, color, compact = false }: { number: string; label: string; sub?: string; color: string; compact?: boolean }) {
  return (
    <div className="coding-stat-card">
      <div style={{ fontFamily: "var(--font-display)", fontSize: compact ? "1.4rem" : "1.8rem", fontWeight: 700, color }}>
        {number}
      </div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 400, color: "var(--color-text-3)", marginTop: 4 }}>
        {label}
      </div>
      {sub && (
        <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 400, color, marginTop: 4 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function GithubPanel({ data }: { data: ContributionDay[][] }) {
  return (
    <ContributionGraph data={data} colorScale={githubScale} />
  );
}

function LeetCodePanel({ data }: { data: ContributionDay[][] }) {
  return (
    <div className="coding-two-col">
      <ContributionGraph data={data} colorScale={leetcodeScale} />
      <div className="coding-stats-stack">
        <StatCard number="1000+" label="Problems Solved" sub="Top 5% globally" color="#FFA116" />
        <StatCard number="68%" label="Acceptance Rate" color="var(--color-text-1)" />
        <StatCard number="45 days" label="Current Streak" color="#FFA116" compact />
      </div>
    </div>
  );
}

function GfgPanel() {
  return (
    <div>
      <img
        src={`https://geeks-for-geeks-stats-card.vercel.app/?username=${USERNAMES.gfg}`}
        alt="GeeksForGeeks stats"
        style={{ width: "100%", maxWidth: 800, margin: "0 auto", display: "block", borderRadius: 8 }}
        loading="lazy"
      />
      <div className="coding-gfg-stats">
        <StatCard number="500+" label="Problems Solved" color="#2F8D46" />
        <StatCard number="1800+" label="Coding Score" color="#2F8D46" />
        <StatCard number="Top 10%" label="Monthly Rank" color="#2F8D46" compact />
      </div>
    </div>
  );
}

function CodolioPanel({ data }: { data: ContributionDay[][] }) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = 342 / 365;

  return (
    <div className="coding-two-col">
      <div>
        <h3 className="coding-panel-title">Activity Heatmap</h3>
        <ContributionGraph data={data} colorScale={codolioScale} />
      </div>
      <div className="coding-codolio-panel">
        <div className="coding-ring">
          <svg width="190" height="190" viewBox="0 0 190 190" aria-hidden="true">
            <circle cx="95" cy="95" r={radius} stroke="var(--color-border)" strokeWidth="4" fill="none" />
            <motion.circle
              cx="95"
              cy="95"
              r={radius}
              stroke="#6366f1"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset: (1 - progress) * circumference }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
            />
          </svg>
          <div className="coding-ring-center">
            <div style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 800, color: "var(--color-text-1)", lineHeight: 1 }}>
              342 <span style={{ fontSize: "1.5rem" }}>🔥</span>
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 400, color: "var(--color-text-3)", marginTop: 8 }}>
              day streak
            </div>
          </div>
        </div>
        <div className="coding-mini-stats">
          <StatCard number="1000+" label="Problems" color="#6366f1" compact />
          <StatCard number="342" label="Day Streak" color="#6366f1" compact />
          <StatCard number="Top 5%" label="Ranking" color="#6366f1" compact />
        </div>
        <a href={`https://codolio.com/profile/${USERNAMES.codolio}`} target="_blank" rel="noreferrer" className="btn-secondary inline-flex items-center justify-center gap-2" style={{ marginTop: 20 }}>
          View on Codolio
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}

export function CodingJourney() {
  const [activePlatform, setActivePlatform] = useState<PlatformId>("github");
  const githubData = useMemo(() => generateContributionData(21, 0.12), []);
  const leetcodeData = useMemo(() => generateContributionData(42, 0.18), []);
  const codolioData = useMemo(() => generateContributionData(84, 0.26), []);
  const active = platforms.find((platform) => platform.id === activePlatform) ?? platforms[0];

  const legendScale = activePlatform === "github" ? githubScale : activePlatform === "codolio" ? codolioScale : null;

  return (
    <section id="coding-journey" className="coding-journey-section">
      <header className="coding-journey-header">
        <div className="coding-journey-label">MY CODING JOURNEY</div>
        <AnimatePresence mode="wait">
          <motion.h2
            key={activePlatform}
            className="coding-journey-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
          >
            {active.titleLine1}
            <br />
            {active.titleLine2}
          </motion.h2>
        </AnimatePresence>
        <p className="coding-journey-subtitle">{active.subtitle}</p>

        <div className="coding-platform-switcher" role="tablist" aria-label="Coding platform">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const isActive = activePlatform === platform.id;
            return (
              <button
                key={platform.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className="coding-platform-tab"
                style={{
                  color: isActive ? platform.color : "var(--color-text-3)",
                  borderColor: isActive ? platform.borderColor : "transparent",
                }}
                onClick={() => setActivePlatform(platform.id)}
              >
                {isActive && <motion.span layoutId="activeTab" className="coding-active-tab" />}
                <Icon size={14} style={{ color: isActive ? platform.color : "currentColor", position: "relative", zIndex: 1 }} />
                <span style={{ position: "relative", zIndex: 1 }}>{platform.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      <div className="coding-graph-area">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePlatform}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {activePlatform === "github" && <GithubPanel data={githubData} />}
            {activePlatform === "leetcode" && <LeetCodePanel data={leetcodeData} />}
            {activePlatform === "gfg" && <GfgPanel />}
            {activePlatform === "codolio" && <CodolioPanel data={codolioData} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="coding-journey-footer">
        <div>{legendScale && <ContributionLegend colorScale={legendScale} />}</div>
        <a
          href={active.href}
          target="_blank"
          rel="noreferrer"
          className="coding-journey-cta"
          data-platform={activePlatform}
          style={{ borderColor: active.borderColor }}
        >
          {active.cta}
          <ExternalLink size={16} />
        </a>
        <div className="coding-journey-summary">{active.summary}</div>
      </footer>
    </section>
  );
}
