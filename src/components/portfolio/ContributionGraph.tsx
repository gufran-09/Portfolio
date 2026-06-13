import { motion } from "framer-motion";

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type ContributionGraphProps = {
  data: ContributionDay[][];
  colorScale: string[];
  cellSize?: number;
  showDayLabels?: boolean;
};

const months = [
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
];
const dayLabels = ["M", "", "W", "", "F", "", ""];

function formatTooltip(day: ContributionDay) {
  const date = new Date(`${day.date}T00:00:00`);
  return `${day.count} contributions · ${date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })}`;
}

export function ContributionGraph({
  data,
  colorScale,
  cellSize = 13,
  showDayLabels = true,
}: ContributionGraphProps) {
  const gap = cellSize <= 10 ? 2 : 3;

  return (
    <div className="coding-graph-shell">
      <div
        className="coding-months"
        style={{
          gridTemplateColumns: `${showDayLabels ? 20 : 0}px repeat(${months.length}, 1fr)`,
          columnGap: gap,
        }}
      >
        <span />
        {months.map((month, index) => (
          <span key={`${month}-${index}`}>{month}</span>
        ))}
      </div>

      <div className="coding-graph-row">
        {showDayLabels && (
          <div className="coding-day-labels" style={{ gap }}>
            {dayLabels.map((label, index) => (
              <span key={index} style={{ height: cellSize }}>
                {label}
              </span>
            ))}
          </div>
        )}

        <div className="coding-graph-grid" style={{ gap }}>
          {data.map((week, weekIndex) => (
            <motion.div
              key={weekIndex}
              className="coding-graph-week"
              style={{ gap }}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.25,
                delay: weekIndex * 0.01,
                ease: "easeOut",
              }}
            >
              {week.map((day) => (
                <span
                  key={day.date}
                  className="coding-graph-cell"
                  data-tooltip={formatTooltip(day)}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    background: colorScale[day.level],
                  }}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ContributionLegend({ colorScale }: { colorScale: string[] }) {
  return (
    <div className="coding-legend">
      <span>Less</span>
      <div className="coding-legend-squares">
        {colorScale.map((color) => (
          <span key={color} style={{ background: color }} />
        ))}
      </div>
      <span>More</span>
    </div>
  );
}
