import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

// ─── Color scale: dark bg → vivid purple ─────────────────────────────────────
export const GITHUB_SCALE = [
  "#161b22",   // level 0 – empty
  "#2d1f6e",   // level 1 – dim purple
  "#4338a8",   // level 2 – medium indigo
  "#6457d6",   // level 3 – bright indigo-violet
  "#818cf8",   // level 4 – vivid lavender
];

// ─── Types ────────────────────────────────────────────────────────────────────
export type ContribDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  isFuture: boolean;
};

type ApiContribution = {
  date: string;     // "YYYY-MM-DD"
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type ApiResponse = {
  total: Record<string, number>;
  contributions: ApiContribution[];
};

// ─── Convert flat API array → 53 weeks × 7 days grid ─────────────────────────
function toWeeks(contributions: ApiContribution[]): ContribDay[][] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Build a lookup map for O(1) access
  const map = new Map<string, ApiContribution>();
  contributions.forEach((c) => map.set(c.date, c));

  // Start from a Sunday 52 full weeks ago
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay() - 52 * 7);

  return Array.from({ length: 53 }, (_, wi) =>
    Array.from({ length: 7 }, (_, di) => {
      const d = new Date(start);
      d.setDate(start.getDate() + wi * 7 + di);
      const dateStr = d.toISOString().slice(0, 10);
      const entry = map.get(dateStr);
      const isFuture = d > today;
      return {
        date: dateStr,
        count: entry?.count ?? 0,
        level: (entry?.level ?? 0) as 0 | 1 | 2 | 3 | 4,
        isFuture,
      };
    }),
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────
function SkeletonGraph() {
  const CELL = 13;
  const GAP = 3;
  return (
    <div style={{ display: "flex", gap: GAP, animation: "skeleton-pulse 1.6s ease-in-out infinite" }}>
      {Array.from({ length: 53 }, (_, wi) => (
        <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
          {Array.from({ length: 7 }, (_, di) => (
            <div
              key={di}
              style={{
                width: CELL,
                height: CELL,
                borderRadius: 3,
                background: "rgba(129,140,248,0.08)",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Month label positions ────────────────────────────────────────────────────
function getMonthLabels(weeks: ContribDay[][]): { label: string; col: number }[] {
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const labels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const month = new Date(`${week[0].date}T12:00:00`).getMonth();
    if (month !== lastMonth) {
      labels.push({ label: MONTHS[month], col: wi });
      lastMonth = month;
    }
  });
  return labels;
}

// ─── Main component ───────────────────────────────────────────────────────────
export function GitHubContributionGraph({
  username = "gufran-09",
  onTotalResolved,
}: {
  username?: string;
  onTotalResolved?: (total: number) => void;
}) {
  const [weeks, setWeeks] = useState<ContribDay[][] | null>(null);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch real data from the public contributions proxy
  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setWeeks(null);

    // Fetch all years so we can compute the real all-time total
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=all&t=${Date.now()}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<ApiResponse>;
      })
      .then((data) => {
        if (cancelled) return;

        // Real all-time total from the API's "total" map
        const allTimeTotal = Object.values(data.total).reduce(
          (sum, n) => sum + (typeof n === "number" ? n : 0),
          0,
        );

        // Build the last-52-week grid for display
        const grid = toWeeks(data.contributions);
        // Last-year count shown in the graph footer
        const lastYearTotal = grid
          .flat()
          .filter((d) => !d.isFuture)
          .reduce((s, d) => s + d.count, 0);

        setWeeks(grid);
        setTotalContributions(lastYearTotal);
        setStatus("success");

        // Bubble the real total up to the stat card
        onTotalResolved?.(allTimeTotal);
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => { cancelled = true; };
  }, [username]);

  const monthLabels = useMemo(() => (weeks ? getMonthLabels(weeks) : []), [weeks]);

  const [hoveredDay, setHoveredDay] = useState<ContribDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const CELL = 13;
  const GAP = 3;
  const STEP = CELL + GAP;

  function updateTooltipPos(e: React.MouseEvent) {
    const tw = tooltipRef.current?.offsetWidth ?? 180;
    const th = tooltipRef.current?.offsetHeight ?? 32;
    setTooltipPos({
      x: Math.min(e.clientX - tw / 2, window.innerWidth - tw - 8),
      y: Math.max(e.clientY - th - 10, 8),
    });
  }

  function handleMouseEnter(day: ContribDay, e: React.MouseEvent) {
    setHoveredDay(day);
    setTooltipVisible(true);
    updateTooltipPos(e);
  }

  function handleMouseLeave() {
    setTooltipVisible(false);
    setHoveredDay(null);
  }

  const tooltipText = useMemo(() => {
    if (!hoveredDay) return "";
    if (hoveredDay.isFuture) return "No contributions yet";
    const formatted = new Date(`${hoveredDay.date}T12:00:00`).toLocaleDateString("en-US", {
      weekday: "short", month: "short", day: "numeric", year: "numeric",
    });
    return hoveredDay.count === 0
      ? `No contributions on ${formatted}`
      : `${hoveredDay.count} contribution${hoveredDay.count !== 1 ? "s" : ""} on ${formatted}`;
  }, [hoveredDay]);

  return (
    <>
      {/* Fixed tooltip */}
      {mounted && typeof document !== "undefined" && createPortal(
        <div
          ref={tooltipRef}
          style={{
            position: "fixed",
            left: tooltipPos.x,
            top: tooltipPos.y,
            pointerEvents: "none",
            zIndex: 9999,
            opacity: tooltipVisible && hoveredDay ? 1 : 0,
            transition: "opacity 0.1s ease",
            background: "rgba(13,17,23,0.96)",
            border: "1px solid rgba(129,140,248,0.35)",
            borderRadius: 8,
            padding: "7px 12px",
            fontFamily: "var(--font-sans)",
            fontSize: 12,
            fontWeight: 500,
            color: "#e2e8f0",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
          }}
        >
          {tooltipText}
        </div>,
        document.body
      )}

      {/* Graph card */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(13,17,23,0.95) 0%, rgba(22,14,50,0.85) 100%)",
          border: "1px solid rgba(129,140,248,0.18)",
          borderRadius: 14,
          padding: "28px 28px 20px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,87,214,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* ── Loading state ── */}
        {status === "loading" && (
          <div style={{ position: "relative" }}>
            {/* Month label skeleton */}
            <div style={{ height: 20, marginBottom: 6 }} />
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <div style={{ width: 20, flexShrink: 0 }} />
              <SkeletonGraph />
            </div>
            <div
              style={{
                marginTop: 16,
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                color: "rgba(140,150,180,0.5)",
              }}
            >
              Loading contributions from GitHub…
            </div>
          </div>
        )}

        {/* ── Error state ── */}
        {status === "error" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 140,
              gap: 12,
            }}
          >
            <div style={{ fontSize: 28 }}>⚠️</div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                color: "rgba(140,150,180,0.7)",
                textAlign: "center",
                margin: 0,
              }}
            >
              Couldn't load contribution data.
              <br />
              The GitHub contributions API may be temporarily unavailable.
            </p>
          </div>
        )}

        {/* ── Success state ── */}
        {status === "success" && weeks && (
          <div style={{ position: "relative" }}>
            {/* Month labels */}
            <div style={{ position: "relative", height: 20, marginBottom: 6, paddingLeft: 28 }}>
              {monthLabels.map(({ label, col }) => (
                <span
                  key={`${label}-${col}`}
                  style={{
                    position: "absolute",
                    left: 28 + col * STEP,
                    top: 0,
                    fontFamily: "var(--font-sans)",
                    fontSize: 11,
                    fontWeight: 500,
                    color: "rgba(140,150,180,0.85)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Graph body */}
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              {/* Day-of-week labels */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: GAP,
                  width: 20,
                  flexShrink: 0,
                }}
              >
                {["", "Mon", "", "Wed", "", "Fri", ""].map((label, i) => (
                  <div
                    key={i}
                    style={{
                      height: CELL,
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "var(--font-sans)",
                      fontSize: 10,
                      color: "rgba(140,150,180,0.7)",
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>

              {/* Weeks grid */}
              <div style={{ display: "flex", gap: GAP }}>
                {weeks.map((week, wi) => (
                  <motion.div
                    key={wi}
                    style={{ display: "flex", flexDirection: "column", gap: GAP }}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, delay: wi * 0.007, ease: "easeOut" }}
                  >
                    {week.map((day) => {
                      const isHovered = hoveredDay?.date === day.date;
                      const color = day.isFuture
                        ? "rgba(255,255,255,0.04)"
                        : GITHUB_SCALE[day.level];
                      return (
                        <div
                          key={day.date}
                          onMouseEnter={(e) => handleMouseEnter(day, e)}
                          onMouseMove={updateTooltipPos}
                          onMouseLeave={handleMouseLeave}
                          style={{
                            width: CELL,
                            height: CELL,
                            borderRadius: 3,
                            background: color,
                            flexShrink: 0,
                            cursor: "default",
                            transition: "transform 0.1s ease, box-shadow 0.1s ease",
                            transform: isHovered ? "scale(1.4)" : "scale(1)",
                            boxShadow:
                              isHovered && day.level > 0
                                ? `0 0 8px 2px ${GITHUB_SCALE[day.level]}70`
                                : "none",
                            position: "relative",
                            zIndex: isHovered ? 10 : 1,
                          }}
                        />
                      );
                    })}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer: count + legend */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 16,
                paddingLeft: 28,
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  color: "rgba(140,150,180,0.85)",
                }}
              >
                <strong style={{ color: "#e2e8f0", fontWeight: 600 }}>
                  {totalContributions.toLocaleString()}
                </strong>{" "}
                contributions in the last year
              </span>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontFamily: "var(--font-sans)",
                  fontSize: 12,
                  color: "rgba(140,150,180,0.75)",
                }}
              >
                <span>Less</span>
                {GITHUB_SCALE.map((color, i) => (
                  <div
                    key={i}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 3,
                      background: color,
                      flexShrink: 0,
                    }}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1;   }
        }
      `}</style>
    </>
  );
}
