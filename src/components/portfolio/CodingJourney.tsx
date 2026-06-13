import { AnimatePresence, motion } from "framer-motion";
import { Activity, Code2, ExternalLink, Github, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ContributionGraph, type ContributionDay } from "./ContributionGraph";

const USERNAMES = {
  github: "gufran-09", // Replace with your GitHub username.
  leetcode: "gufran_21", // Replace with your LeetCode username.
  gfg: "gufran21", // Replace with your GeeksForGeeks username.
  codolio: "gufran_21", // Replace with your Codolio username.
};

type PlatformId = "github" | "leetcode" | "gfg" | "codolio";

type GitHubStats = {
  publicRepos: number;
  followers: number;
  following: number;
  publicGists: number;
};

type LeetCodeStats = {
  totalSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  acceptanceRate?: number;
  ranking?: number;
  submissionCalendar?: Record<string, number | string>;
};

const platforms = [
  {
    id: "github",
    label: "GitHub",
    icon: Github,
    color: "#f0f0f0",
    borderColor: "rgba(255,255,255,0.15)",
    titleLine1: "GITHUB",
    titleLine2: "ACTIVITY",
    subtitle: "A live view of my public GitHub activity and profile stats.",
    summary: "Live GitHub profile data",
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
    subtitle: "Live LeetCode progress pulled from my public profile data.",
    summary: "Live LeetCode profile data",
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
    subtitle:
      "My public GeeksForGeeks profile rendered from the live stats card.",
    summary: "Live GFG profile card",
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
    subtitle: "My real aggregate coding profile as maintained on Codolio.",
    summary: "Live Codolio profile link",
    cta: "VIEW ON CODOLIO",
    href: `https://codolio.com/profile/${USERNAMES.codolio}`,
  },
] as const;

const leetcodeScale = [
  "#1a1a1a",
  "rgba(255,161,22,0.2)",
  "rgba(255,161,22,0.45)",
  "rgba(255,161,22,0.7)",
  "#FFA116",
];

function toNumber(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value) || 0;
  return 0;
}

function calendarToWeeks(
  calendar?: Record<string, number | string>,
): ContributionDay[][] | null {
  if (!calendar) return null;

  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 52 * 7);

  return Array.from({ length: 53 }, (_, weekIndex) =>
    Array.from({ length: 7 }, (_, dayIndex) => {
      const date = new Date(start);
      date.setDate(start.getDate() + weekIndex * 7 + dayIndex);
      const key = Math.floor(date.getTime() / 1000).toString();
      const count = toNumber(calendar[key]);
      const level =
        count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 7 ? 3 : 4;

      return {
        date: date.toISOString().slice(0, 10),
        count,
        level,
      };
    }),
  );
}

function StatCard({
  number,
  label,
  sub,
  color,
}: {
  number: string;
  label: string;
  sub?: string;
  color: string;
}) {
  return (
    <div className="coding-stat-card">
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.8rem",
          fontWeight: 700,
          color,
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 12,
          fontWeight: 400,
          color: "var(--color-text-3)",
          marginTop: 4,
        }}
      >
        {label}
      </div>
      {sub && (
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            fontWeight: 400,
            color,
            marginTop: 4,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

function LiveNotice({ children }: { children: string }) {
  return <p className="coding-live-note">{children}</p>;
}

function GithubPanel({ stats }: { stats: GitHubStats | null }) {
  return (
    <div>
      <div className="coding-live-card">
        <img
          src={`https://github-readme-activity-graph.vercel.app/graph?username=${USERNAMES.github}&bg_color=161616&color=f0f0f0&line=6366f1&point=818cf8&hide_border=true&theme=github-compact`}
          alt={`${USERNAMES.github} GitHub activity graph`}
          style={{ width: "100%", borderRadius: 8, display: "block" }}
          loading="lazy"
        />
      </div>
      {stats ? (
        <div className="coding-gfg-stats">
          <StatCard
            number={String(stats.publicRepos)}
            label="Public Repositories"
            color="#f0f0f0"
          />
          <StatCard
            number={String(stats.followers)}
            label="Followers"
            color="#f0f0f0"
          />
          <StatCard
            number={String(stats.publicGists)}
            label="Public Gists"
            color="#f0f0f0"
          />
        </div>
      ) : (
        <LiveNotice>
          GitHub public profile stats are loading. The graph above is rendered
          live from GitHub activity data.
        </LiveNotice>
      )}
    </div>
  );
}

function LeetCodePanel({ stats }: { stats: LeetCodeStats | null }) {
  const heatmapData = useMemo(
    () => calendarToWeeks(stats?.submissionCalendar),
    [stats],
  );

  return (
    <div className="coding-two-col">
      <div>
        {heatmapData ? (
          <ContributionGraph data={heatmapData} colorScale={leetcodeScale} />
        ) : (
          <img
            src={`https://leetcard.jacoblin.cool/${USERNAMES.leetcode}?theme=dark&font=JetBrains+Mono&ext=heatmap&border=0&radius=8`}
            alt={`${USERNAMES.leetcode} LeetCode profile card`}
            style={{ width: "100%", borderRadius: 8, display: "block" }}
            loading="lazy"
          />
        )}
      </div>
      <div className="coding-stats-stack">
        <StatCard
          number={
            stats?.totalSolved != null ? String(stats.totalSolved) : "Live"
          }
          label="Problems Solved"
          color="#FFA116"
        />
        <StatCard
          number={
            stats?.acceptanceRate != null
              ? `${Math.round(stats.acceptanceRate)}%`
              : "Live"
          }
          label="Acceptance Rate"
          color="var(--color-text-1)"
        />
        <StatCard
          number={stats?.ranking != null ? `#${stats.ranking}` : "Live"}
          label="Global Ranking"
          color="#FFA116"
        />
      </div>
    </div>
  );
}

function GfgPanel() {
  return (
    <div>
      <img
        src={`https://geeks-for-geeks-stats-card.vercel.app/?username=${USERNAMES.gfg}`}
        alt={`${USERNAMES.gfg} GeeksForGeeks stats`}
        style={{
          width: "100%",
          maxWidth: 800,
          margin: "0 auto",
          display: "block",
          borderRadius: 8,
        }}
        loading="lazy"
      />
      <LiveNotice>
        GeeksForGeeks does not expose a stable browser-readable JSON API, so
        this panel renders the live public stats card for the account.
      </LiveNotice>
    </div>
  );
}

function CodolioPanel() {
  return (
    <div className="coding-codolio-live">
      <div>
        <h3 className="coding-panel-title">Codolio Profile</h3>
        <p className="body" style={{ marginBottom: 20 }}>
          Codolio aggregates verified coding platform data into one public
          profile. Their public docs describe the profile as the source of truth
          for connected platform stats, but they do not publish a browser
          embeddable stats API.
        </p>
        <a
          href={`https://codolio.com/profile/${USERNAMES.codolio}`}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary inline-flex items-center justify-center gap-2"
        >
          Open live Codolio profile
          <ExternalLink size={14} />
        </a>
      </div>
      <iframe
        title="Codolio profile preview"
        src={`https://codolio.com/profile/${USERNAMES.codolio}`}
        className="coding-codolio-frame"
      />
    </div>
  );
}

export function CodingJourney() {
  const [activePlatform, setActivePlatform] = useState<PlatformId>("github");
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats | null>(
    null,
  );
  const active =
    platforms.find((platform) => platform.id === activePlatform) ??
    platforms[0];

  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.github.com/users/${USERNAMES.github}`)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (!cancelled) {
          setGithubStats({
            publicRepos: data.public_repos,
            followers: data.followers,
            following: data.following,
            publicGists: data.public_gists,
          });
        }
      })
      .catch(() => {
        if (!cancelled) setGithubStats(null);
      });

    fetch(`https://leetcode-stats.tashif.codes/${USERNAMES.leetcode}`)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (!cancelled && data?.status !== "error") {
          setLeetcodeStats(data);
        }
      })
      .catch(() => {
        if (!cancelled) setLeetcodeStats(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

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

        <div
          className="coding-platform-switcher"
          role="tablist"
          aria-label="Coding platform"
        >
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
                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    className="coding-active-tab"
                  />
                )}
                <Icon
                  size={14}
                  style={{
                    color: isActive ? platform.color : "currentColor",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
                <span style={{ position: "relative", zIndex: 1 }}>
                  {platform.label}
                </span>
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
            {activePlatform === "github" && <GithubPanel stats={githubStats} />}
            {activePlatform === "leetcode" && (
              <LeetCodePanel stats={leetcodeStats} />
            )}
            {activePlatform === "gfg" && <GfgPanel />}
            {activePlatform === "codolio" && <CodolioPanel />}
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="coding-journey-footer">
        <div />
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
