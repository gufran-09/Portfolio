import type { Project } from "./projectsData";

interface ProjectDetailPanelProps {
  activeProject: Project;
}

export function ProjectDetailPanel({ activeProject }: ProjectDetailPanelProps) {
  return (
    <div style={{ height: "fit-content" }}>
      {/* Row 1 - Meta */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: "13px",
              color: "var(--color-text-3)",
            }}
          >
            {activeProject.number}
          </span>
          <div
            style={{
              width: "20px",
              height: "1px",
              background: "var(--color-border)",
              margin: "0 10px",
            }}
          />
          <span
            style={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: "11px",
              color: "var(--color-text-3)",
              letterSpacing: "0.1em",
            }}
          >
            {activeProject.type}
          </span>
        </div>
        <div
          style={{
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            borderRadius: "6px",
            padding: "4px 10px",
            fontFamily: "JetBrains Mono",
            fontWeight: 500,
            fontSize: "11px",
            color: "var(--color-text-3)",
          }}
        >
          {activeProject.date}
        </div>
      </div>

      {/* Row 2 - Title */}
      <h3
        style={{
          fontFamily: "Sora",
          fontWeight: 700,
          fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
          color: "var(--color-text-1)",
          margin: "0 0 16px 0",
        }}
      >
        {activeProject.name}
      </h3>

      {/* Row 3 - Desc */}
      <p
        style={{
          fontFamily: "Inter",
          fontWeight: 400,
          fontSize: "15px",
          color: "var(--color-text-2)",
          lineHeight: 1.75,
          marginBottom: "20px",
        }}
      >
        {activeProject.description}
      </p>

      {/* Row 4 - Bullets */}
      <div style={{ marginBottom: "28px" }}>
        {activeProject.bullets.map((bullet, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: "13px",
                color: activeProject.accentColor,
                width: "14px",
                flexShrink: 0,
                marginTop: "3px",
              }}
            >
              ✦
            </span>
            <span
              style={{
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: "13px",
                color: "var(--color-text-2)",
                lineHeight: 1.6,
              }}
            >
              {bullet}
            </span>
          </div>
        ))}
      </div>

      {/* Row 5 - Tech */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {activeProject.stack.map((tech) => (
          <div
            key={tech}
            style={{
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              borderRadius: "6px",
              padding: "6px 12px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: "11px",
              color: "var(--color-text-2)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-border-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-border)")
            }
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "3px",
                background: activeProject.accentColor,
                opacity: 0.2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  color: activeProject.accentColor,
                  opacity: 1,
                  position: "absolute",
                }}
              >
                {tech.substring(0, 2)}
              </span>
            </div>
            {tech}
          </div>
        ))}
      </div>

      {/* Row 6 - Actions */}
      <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
        <a
          href={activeProject.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary"
          data-cursor="VIEW"
        >
          View Live ↗
        </a>
        <a
          href={activeProject.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost"
          data-cursor="GITHUB"
          style={{
            border: "1px solid var(--color-border)",
            background: "transparent",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "6px" }}
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
          Source Code
        </a>
      </div>
    </div>
  );
}
