import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { projectsData } from "./projectsData";
import { ProjectCard } from "./ProjectCard";
import { ProjectDetailPanel } from "./ProjectDetailPanel";
import { MarqueeTitle } from "./MarqueeTitle";

export function Projects() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="projects" className="section surface-section" style={{ position: "relative", overflow: "hidden", paddingBottom: "calc(128px + 3rem)" }}>
      <MarqueeTitle text="PROJECTS" direction="right" />
      {/* SECTION HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '80px', position: 'relative', zIndex: 1 }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>04 / PROJECTS</div>
        <h2 className="h1" style={{ margin: 0 }}>Things I've built.</h2>
      </div>

      {/* OVERALL LAYOUT */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        {isMobile ? (
          /* MOBILE LAYOUT */
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {projectsData.map((project) => (
              <div key={project.id}>
                <ProjectCard project={project} isMobile={true} />
              </div>
            ))}
          </div>
        ) : (
          /* DESKTOP LAYOUT */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '120px' }}>
            {projectsData.map((project) => (
              <div key={project.id} style={{ display: 'flex', gap: '4%', alignItems: 'center' }}>
                <div style={{ width: '58%' }}>
                  <ProjectCard project={project} isMobile={false} />
                </div>
                <div style={{ width: '38%' }}>
                  <ProjectDetailPanel activeProject={project} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BOTTOM CTA */}
        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '64px',
          textAlign: 'center',
          marginTop: isMobile ? '64px' : '120px'
        }}>
          <p style={{
            fontFamily: 'Inter',
            fontWeight: 400,
            fontSize: '15px',
            color: 'var(--color-text-3)',
            marginBottom: '16px'
          }}>
            Want to see more?
          </p>
          <Link to="/project" className="btn btn-secondary" data-cursor="VIEW">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
