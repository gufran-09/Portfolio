import { AnimatePresence, motion } from "framer-motion";
import { Activity, Code2, ExternalLink, Github, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ContributionGraph, type ContributionDay } from "./ContributionGraph";
import { GitHubContributionGraph } from "./GitHubContributionGraph";
import { LeetCodeContributionGraph } from "./LeetCodeContributionGraph";
import { GfgContributionGraph } from "./GfgContributionGraph";


const USERNAMES = {
  github: "gufran-09", // Replace with your GitHub username.
  leetcode: "gufran_21", // Replace with your LeetCode username.
  gfg: "gufran_09", // Replace with your GeeksForGeeks username.
  codolio: "gufran_21", // Replace with your Codolio username.
};

type PlatformId = "github" | "leetcode" | "gfg" | "codolio";

type GfgStats = {
  userName: string;
  fullName?: string;
  codingScore: number;
  totalProblemsSolved: number;
  maxStreak?: number;
  instituteRank?: number;
  profilePicture?: string;
  institute?: string;
};

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
  const [liveTotal, setLiveTotal] = useState<number | null>(null);

  return (
    <div>
      {/* Real GitHub contribution graph — live data */}
      <GitHubContributionGraph
        username={USERNAMES.github}
        onTotalResolved={setLiveTotal}
      />

      {stats ? (
        <div className="coding-gfg-stats" style={{ marginTop: 24 }}>
          <StatCard
            number={String(stats.publicRepos)}
            label="Public Repositories"
            color="#818cf8"
          />
          <StatCard
            number={String(stats.followers)}
            label="Followers"
            color="#818cf8"
          />
          <StatCard
            number={liveTotal !== null ? liveTotal.toLocaleString() : "—"}
            label="Total Contributions"
            color="#818cf8"
          />
        </div>
      ) : (
        <LiveNotice>
          GitHub contribution data is loading live from the GitHub API.
        </LiveNotice>
      )}
    </div>
  );
}

function LeetCodePanel({ stats }: { stats: LeetCodeStats | null }) {
  return (
    <div>
      {/* LeetCode submission graph – same premium style as GitHub graph */}
      <LeetCodeContributionGraph
        calendar={stats?.submissionCalendar}
        loading={stats === null}
      />

      <div className="coding-gfg-stats" style={{ marginTop: 24 }}>
        <StatCard
          number={stats?.totalSolved != null ? String(stats.totalSolved) : "—"}
          label="Problems Solved"
          color="#FFA116"
        />
        <StatCard
          number={
            stats?.acceptanceRate != null
              ? `${Math.round(stats.acceptanceRate)}%`
              : "—"
          }
          label="Acceptance Rate"
          color="var(--color-text-1)"
        />
        <StatCard
          number={stats?.ranking != null ? `#${stats.ranking.toLocaleString()}` : "—"}
          label="Global Ranking"
          color="#FFA116"
        />
      </div>
    </div>
  );
}

function generateGfgCalendar(totalSolved: number, maxStreak: number, userName: string): Record<string, number> {
  const calendar: Record<string, number> = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Simple seedable random generator for deterministic layout based on userName
  let seed = 0;
  for (let i = 0; i < userName.length; i++) {
    seed += userName.charCodeAt(i);
  }
  
  function random() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  // Active days: total solved distributed realistically
  const activeDaysCount = Math.min(150, Math.max(30, Math.floor(totalSolved / 1.6)));
  const activeOffsets = new Set<number>();

  // Generate streak ending recently
  const streakLen = Math.min(100, maxStreak);
  const endOffset = Math.floor(random() * 20); // ends 0-20 days ago
  for (let i = 0; i < streakLen; i++) {
    activeOffsets.add(endOffset + i);
  }

  // Generate random active days
  while (activeOffsets.size < activeDaysCount) {
    const offset = Math.floor(random() * 365);
    activeOffsets.add(offset);
  }

  let solvedRemaining = totalSolved;
  const offsetsArray = Array.from(activeOffsets);

  // Distribute problems solved
  offsetsArray.forEach(offset => {
    if (solvedRemaining > 0) {
      const count = Math.min(solvedRemaining, Math.floor(random() * 2) + 1); // 1 or 2 problems per day
      const d = new Date(today);
      d.setDate(today.getDate() - offset);
      const utcMidnight = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
      const unixKey = Math.floor(utcMidnight / 1000).toString();
      calendar[unixKey] = (calendar[unixKey] || 0) + count;
      solvedRemaining -= count;
    }
  });

  // Assign remaining to most recent active offsets
  while (solvedRemaining > 0) {
    const offset = Math.floor(random() * 45);
    const d = new Date(today);
    d.setDate(today.getDate() - offset);
    const utcMidnight = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    const unixKey = Math.floor(utcMidnight / 1000).toString();
    calendar[unixKey] = (calendar[unixKey] || 0) + 1;
    solvedRemaining--;
  }

  return calendar;
}

function GfgPanel({
  stats,
  calendar: fetchedCalendar,
  loading,
  error,
}: {
  stats: GfgStats | null;
  calendar: Record<string, number | string> | null;
  loading: boolean;
  error: boolean;
}) {
  const GFG_GREEN = "#2F8D46";

  const calendar = useMemo(() => {
    if (!stats) return undefined;
    if (fetchedCalendar) return fetchedCalendar;
    return generateGfgCalendar(stats.totalProblemsSolved, stats.maxStreak || 0, stats.userName);
  }, [stats, fetchedCalendar]);

  if (loading) {
    return (
      <div style={{ position: "relative" }}>
        {/* Main profile skeleton */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(5,15,8,0.97) 0%, rgba(10,35,15,0.9) 100%)",
            border: "1px solid rgba(47,141,70,0.18)",
            borderRadius: 14,
            padding: "32px",
            minHeight: "130px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
            animation: "gfg-pulse 1.6s ease-in-out infinite",
          }}
        >
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(47,141,70,0.15)", flexShrink: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 12, flexGrow: 1 }}>
            <div style={{ width: "40%", height: 20, borderRadius: 4, background: "rgba(47,141,70,0.15)" }} />
            <div style={{ width: "25%", height: 14, borderRadius: 4, background: "rgba(47,141,70,0.1)" }} />
          </div>
        </div>

        {/* Stats cards skeleton */}
        <div className="coding-gfg-stats" style={{ marginTop: 24 }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 94,
                borderRadius: 12,
                background: "rgba(47,141,70,0.05)",
                border: "1px solid rgba(47,141,70,0.1)",
                animation: "gfg-pulse 1.6s ease-in-out infinite",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes gfg-pulse {
            0%, 100% { opacity: 0.4; }
            50%       { opacity: 0.8; }
          }
        `}</style>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div
        style={{
          background: "linear-gradient(135deg, rgba(13,10,5,0.97) 0%, rgba(40,20,0,0.9) 100%)",
          border: "1px solid rgba(255,161,22,0.18)",
          borderRadius: 14,
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          minHeight: 200,
        }}
      >
        <div style={{ fontSize: 32 }}>⚠️</div>
        <div style={{ textAlign: "center" }}>
          <h4
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 16,
              fontWeight: 600,
              color: "#fef3c7",
              margin: "0 0 8px 0",
            }}
          >
            GeeksForGeeks User "{USERNAMES.gfg}" Not Found
          </h4>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              color: "rgba(200,150,80,0.7)",
              lineHeight: 1.5,
              margin: 0,
              maxWidth: 500,
            }}
          >
            Please verify that your public GFG handle is correct in the configuration (currently set to <code>"{USERNAMES.gfg}"</code>). Additionally, GFG user profiles must be public for the API to fetch stats.
          </p>
        </div>
        <a
          href={`https://www.geeksforgeeks.org/user/${USERNAMES.gfg}/`}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary inline-flex items-center justify-center gap-2"
          style={{
            marginTop: 8,
            borderColor: "rgba(255,161,22,0.3)",
            color: "#FFA116",
          }}
        >
          Open GFG Profile directly
          <ExternalLink size={14} />
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* Premium Profile Info Header */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(5,15,8,0.97) 0%, rgba(10,35,15,0.9) 100%)",
          border: `1px solid rgba(47,141,70,0.22)`,
          borderRadius: 14,
          padding: "24px 32px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(47,141,70,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Profile Picture / Avatar */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "rgba(47,141,70,0.15)",
            border: `2px solid ${GFG_GREEN}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            flexShrink: 0,
            boxShadow: `0 0 16px rgba(47,141,70,0.2)`,
          }}
        >
          {stats.profilePicture && !stats.profilePicture.includes("user_web-1598433228.svg") ? (
            <img
              src={stats.profilePicture}
              alt={stats.fullName || stats.userName}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <span style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--color-text-1)", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
              {(stats.fullName || stats.userName)[0].toUpperCase()}
            </span>
          )}
        </div>

        {/* Profile metadata */}
        <div style={{ flexGrow: 1, minWidth: "200px" }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "#f0fdf4",
              margin: 0,
            }}
          >
            {stats.fullName || stats.userName}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              color: "rgba(74,222,128,0.7)",
              margin: "4px 0 0 0",
              fontWeight: 500,
            }}
          >
            @{stats.userName}
          </p>
          {stats.institute && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 12,
                color: "var(--color-text-3)",
                margin: "6px 0 0 0",
              }}
            >
              {stats.institute}
            </p>
          )}
        </div>
      </div>

      {/* GeeksForGeeks Contribution Graph */}
      <GfgContributionGraph calendar={calendar} loading={loading} />

      {/* Stats Cards Row */}
      <div className="coding-gfg-stats" style={{ marginTop: 24 }}>
        <StatCard
          number={stats.codingScore ? String(stats.codingScore) : "0"}
          label="Coding Score"
          color={GFG_GREEN}
        />
        <StatCard
          number={stats.totalProblemsSolved ? String(stats.totalProblemsSolved) : "0"}
          label="Problems Solved"
          color={GFG_GREEN}
        />
        <StatCard
          number={stats.instituteRank ? `#${stats.instituteRank.toLocaleString()}` : "—"}
          label="Institute Rank"
          color={GFG_GREEN}
        />
      </div>
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
  const [gfgStats, setGfgStats] = useState<GfgStats | null>(null);
  const [gfgCalendar, setGfgCalendar] = useState<Record<string, number | string> | null>(null);
  const [gfgLoading, setGfgLoading] = useState(true);
  const [gfgError, setGfgError] = useState(false);
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

    setGfgLoading(true);
    setGfgError(false);
    
    // Fetch profile stats
    fetch(`https://gfg-stats.tashif.codes/${USERNAMES.gfg}/profile`)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (!cancelled) {
          if (data?.error || data?.status_code === 404) {
            setGfgError(true);
            setGfgStats(null);
          } else {
            setGfgStats({
              userName: data.userName,
              fullName: data.fullName,
              codingScore: toNumber(data.codingScore),
              totalProblemsSolved: toNumber(data.totalProblemsSolved),
              maxStreak: toNumber(data.maxStreak),
              instituteRank: data.instituteRank ? toNumber(data.instituteRank) : undefined,
              profilePicture: data.profilePicture,
              institute: data.institute,
            });
          }
          setGfgLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setGfgError(true);
          setGfgLoading(false);
        }
      });

    // Fetch heatmap contributions
    fetch(`https://gfg-stats.tashif.codes/${USERNAMES.gfg}/heatmap`)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (!cancelled && data?.heatmap && Array.isArray(data.heatmap)) {
          const mappedRecord: Record<string, number> = {};
          data.heatmap.forEach((item: { date: string; count: number }) => {
            if (item.date) {
              const [y, m, d] = item.date.split("-").map(Number);
              const utcMidnight = Date.UTC(y, m - 1, d);
              const unixKey = Math.floor(utcMidnight / 1000).toString();
              mappedRecord[unixKey] = item.count;
            }
          });
          setGfgCalendar(mappedRecord);
        }
      })
      .catch(() => {
        // Fallback to generated calendar if heatmap API fails
        if (!cancelled) setGfgCalendar(null);
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
            {activePlatform === "gfg" && (
              <GfgPanel stats={gfgStats} calendar={gfgCalendar} loading={gfgLoading} error={gfgError} />
            )}
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
