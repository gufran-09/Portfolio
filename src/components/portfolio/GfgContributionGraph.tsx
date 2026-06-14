import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";

// ─── GFG green color scale ──────────────────────────────────────────────────
export const GFG_SCALE = [
  "#161b22",          // level 0 – empty (same dark base as GitHub graph)
  "#143d1f",          // level 1 – very dim green
  "#1e682f",          // level 2 – medium green
  "#2a9d47",          // level 3 – bright green
  "#2F8D46",          // level 4 – GFG brand green
];

// ─── Types ────────────────────────────────────────────────────────────────────
type GfgDay = {
  date: string;   // "YYYY-MM-DD"
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  isFuture: boolean;
};

// ─── Convert Unix-keyed submissionCalendar → 53-week grid ────────────────────
function toNumber(v: unknown): number {
  if (typeof v === "number") return v;
  if (typeof v === "string") return Number(v) || 0;
  return 0;
}

export function calendarToGrid(
  calendar: Record<string, number | string> | undefined,
): GfgDay[][] | null {
  if (!calendar) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(today);
  // Align to Sunday 52 full weeks back
  start.setDate(today.getDate() - today.getDay() - 52 * 7);

  return Array.from({ length: 53 }, (_, wi) =>
    Array.from({ length: 7 }, (_, di) => {
      const d = new Date(start);
      d.setDate(start.getDate() + wi * 7 + di);

      // Compute UTC midnight timestamp
      const utcMidnight = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
      const unixKey = Math.floor(utcMidnight / 1000).toString();

      const count = toNumber(calendar[unixKey]);
      const isFuture = d > today;
      const level: 0 | 1 | 2 | 3 | 4 =
        isFuture || count === 0
          ? 0
          : count <= 1
            ? 1
            : count <= 2
              ? 2
              : count <= 3
                ? 3
                : 4;

      // Safe local date formatting to avoid ISO timezone shift
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;

      return {
        date: dateStr,
        count,
        level,
        isFuture,
      };
    }),
  );
}

// ─── Month labels ─────────────────────────────────────────────────────────────
function getMonthLabels(weeks: GfgDay[][]): { label: string; col: number }[] {
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function Skeleton() {
  const CELL = 13, GAP = 3;
  return (
    <div style={{ display: "flex", gap: GAP, opacity: 0.4, animation: "gfg-pulse 1.6s ease-in-out infinite" }}>
      {Array.from({ length: 53 }, (_, wi) => (
        <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
          {Array.from({ length: 7 }, (_, di) => (
            <div key={di} style={{ width: CELL, height: CELL, borderRadius: 3, background: "rgba(47,141,70,0.15)" }} />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function GfgContributionGraph({
  calendar,
  loading = false,
}: {
  calendar?: Record<string, number | string>;
  loading?: boolean;
}) {
  const weeks = useMemo(() => calendarToGrid(calendar), [calendar]);

  const totalLastYear = useMemo(
    () =>
      weeks
        ? weeks.flat().filter((d) => !d.isFuture).reduce((s, d) => s + d.count, 0)
        : 0,
    [weeks],
  );

  const monthLabels = useMemo(() => (weeks ? getMonthLabels(weeks) : []), [weeks]);

  const [hoveredDay, setHoveredDay] = useState<GfgDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const CELL = 13;
  const GAP = 3;
  const STEP = CELL + GAP;

  function updatePos(e: React.MouseEvent) {
    const tw = tooltipRef.current?.offsetWidth ?? 180;
    const th = tooltipRef.current?.offsetHeight ?? 32;
    setTooltipPos({
      x: Math.min(e.clientX - tw / 2, window.innerWidth - tw - 8),
      y: Math.max(e.clientY - th - 10, 8),
    });
  }

  const tooltipText = useMemo(() => {
    if (!hoveredDay) return "";
    if (hoveredDay.isFuture) return "No submissions yet";
    const fmt = new Date(`${hoveredDay.date}T12:00:00`).toLocaleDateString("en-US", {
      weekday: "short", month: "short", day: "numeric", year: "numeric",
    });
    return hoveredDay.count === 0
      ? `No submissions on ${fmt}`
      : `${hoveredDay.count} submission${hoveredDay.count !== 1 ? "s" : ""} on ${fmt}`;
  }, [hoveredDay]);

  const isLoading = loading || (!weeks && !calendar);
  const hasData = !!weeks;

  return (
    <>
      {/* Tooltip */}
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
          background: "rgba(5,15,8,0.96)",
          border: "1px solid rgba(47,141,70,0.35)",
          borderRadius: 8,
          padding: "7px 12px",
          fontFamily: "var(--font-sans)",
          fontSize: 12,
          fontWeight: 500,
          color: "#e8f5e9",
          whiteSpace: "nowrap",
          boxShadow: "0 4px 24px rgba(0,0,0,0.7)",
        }}
      >
        {tooltipText}
      </div>

      {/* Card */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(5,15,8,0.97) 0%, rgba(10,35,15,0.9) 100%)",
          border: "1px solid rgba(47,141,70,0.18)",
          borderRadius: 14,
          padding: "28px 28px 20px",
          overflow: "hidden",
          position: "relative",
          marginTop: 24,
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(47,141,70,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* ── Loading ── */}
        {isLoading && (
          <div style={{ position: "relative" }}>
            <div style={{ height: 20, marginBottom: 6 }} />
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <div style={{ width: 20, flexShrink: 0 }} />
              <Skeleton />
            </div>
            <div style={{ marginTop: 16, fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(47,141,70,0.4)" }}>
              Loading submissions from GeeksForGeeks…
            </div>
          </div>
        )}

        {/* ── No data (after load) ── */}
        {!isLoading && !hasData && (
          <div
            style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", minHeight: 140, gap: 12,
            }}
          >
            <div style={{ fontSize: 28 }}>⚠️</div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(47,141,70,0.6)", textAlign: "center", margin: 0 }}>
              Couldn't load submission calendar.
            </p>
          </div>
        )}

        {/* ── Graph ── */}
        {!isLoading && hasData && weeks && (
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
                    color: "rgba(74,222,128,0.85)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Graph body */}
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              {/* Day labels */}
              <div style={{ display: "flex", flexDirection: "column", gap: GAP, width: 20, flexShrink: 0 }}>
                {["", "Mon", "", "Wed", "", "Fri", ""].map((label, i) => (
                  <div
                    key={i}
                    style={{
                      height: CELL, display: "flex", alignItems: "center",
                      fontFamily: "var(--font-sans)", fontSize: 10,
                      color: "rgba(74,222,128,0.7)",
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>

              {/* Weeks */}
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
                        ? "rgba(255,255,255,0.03)"
                        : GFG_SCALE[day.level];
                      return (
                        <div
                          key={day.date}
                          onMouseEnter={(e) => {
                            setHoveredDay(day);
                            setTooltipVisible(true);
                            updatePos(e);
                          }}
                          onMouseMove={updatePos}
                          onMouseLeave={() => { setTooltipVisible(false); setHoveredDay(null); }}
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
                                ? `0 0 8px 2px ${GFG_SCALE[day.level]}60`
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

            {/* Footer */}
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
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(74,222,128,0.85)" }}>
                <strong style={{ color: "#e8f5e9", fontWeight: 600 }}>
                  {totalLastYear.toLocaleString()}
                </strong>{" "}
                submissions in the last year
              </span>

              <div
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  fontFamily: "var(--font-sans)", fontSize: 12,
                  color: "rgba(74,222,128,0.7)",
                }}
              >
                <span>Less</span>
                {GFG_SCALE.map((color, i) => (
                  <div
                    key={i}
                    style={{ width: 12, height: 12, borderRadius: 3, background: color, flexShrink: 0 }}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes gfg-pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.85; }
        }
      `}</style>
    </>
  );
}
