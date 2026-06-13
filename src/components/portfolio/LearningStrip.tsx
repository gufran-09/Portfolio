import { CURRENTLY_LEARNING } from "./skillsData";

export function LearningStrip() {
  const marqueeItems = [...CURRENTLY_LEARNING, ...CURRENTLY_LEARNING];

  return (
    <div
      className="relative mt-12 overflow-hidden rounded-lg border px-8 py-6"
      style={{
        background: "var(--color-surface-2)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="flex items-center gap-6">
        <div className="flex shrink-0 items-center gap-2 whitespace-nowrap">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full"
              style={{
                background: "var(--color-success)",
                animation: "pulse-ring 2s ease-out infinite",
              }}
            />
            <span
              className="relative h-2 w-2 rounded-full"
              style={{ background: "var(--color-success)" }}
            />
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: "var(--color-text-3)",
            }}
          >
            CURRENTLY EXPLORING
          </span>
        </div>

        <div
          className="h-8 w-px shrink-0"
          style={{ background: "var(--color-border)" }}
        />

        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-24"
            style={{
              background:
                "linear-gradient(to right, var(--color-surface-2) 0%, transparent 100%)",
              zIndex: 1,
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-24"
            style={{
              background:
                "linear-gradient(to left, var(--color-surface-2) 0%, transparent 100%)",
              zIndex: 1,
            }}
          />

          <div
            className="flex w-max gap-3"
            style={{ animation: "marquee-left 30s linear infinite" }}
          >
            {marqueeItems.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="shrink-0 rounded-sm border px-3.5 py-1.5"
                style={{
                  background: "var(--color-surface-3)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-2)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
