import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { projectsData } from "@/components/portfolio/projectsData";
import { CustomCursor } from "@/components/portfolio/CustomCursor";

export const Route = createFileRoute("/project")({
  component: ProjectPage,
});

function ProjectPage() {
  return (
    <div className="dark min-h-screen" style={{ background: "var(--color-bg)", color: "var(--color-text-1)", position: "relative" }}>
      <CustomCursor />
      
      {/* Back button */}
      <div style={{ padding: '40px', position: 'relative', zIndex: 10 }}>
        <Link to="/" style={{ color: 'var(--color-text-3)', fontFamily: 'Inter', fontSize: '14px', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </div>

      <main style={{ padding: '0 40px 128px', maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
        
        {/* HERO SECTION */}
        <div style={{ position: 'relative', textAlign: 'center', marginBottom: '100px', marginTop: '60px' }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '15vw',
            fontWeight: 800,
            color: 'rgba(255,255,255,0.03)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 0,
            letterSpacing: '-0.02em',
            lineHeight: 0.8
          }}>
            projects
          </div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ 
              fontFamily: 'Inter', 
              fontWeight: 600, 
              fontSize: '12px', 
              letterSpacing: '0.2em', 
              color: 'var(--color-text-3)',
              marginBottom: '16px'
            }}>
              SOME OF MY
            </div>
            <h1 style={{
              fontFamily: 'Newsreader, serif',
              fontWeight: 400,
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              margin: 0,
              letterSpacing: '-0.02em'
            }}>
              <span style={{ color: 'white', marginRight: '16px' }}>Curated</span>
              <span style={{ 
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #7b2fff 0%, #e91e8c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Work</span>
            </h1>
          </div>
        </div>

        {/* PROJECTS MASONRY GRID */}
        <style>
          {`
            .projects-masonry {
              column-count: 1;
              column-gap: 40px;
              width: 100%;
            }
            @media (min-width: 768px) {
              .projects-masonry {
                column-count: 2;
              }
            }
          `}
        </style>
        <div className="projects-masonry">
          {projectsData.map((project) => (
            <div key={project.id} style={{ breakInside: 'avoid', marginBottom: '80px' }}>
              <ProjectGridCard project={project} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Inline card component for the grid
function ProjectGridCard({ project }: { project: typeof projectsData[0] }) {
  const renderMockup = () => {
    const browserChrome = (
      <div style={{ height: '28px', background: '#111113', borderRadius: '10px 10px 0 0', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }} />
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
      </div>
    );

    let content = null;
    switch (project.name) {
      case "DevFlow":
        content = (
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ width: '20%', background: '#16161a', borderRight: '1px solid #222' }}>
               <div style={{ margin: '12px 8px', height: '8px', background: '#333', borderRadius: '4px' }} />
               <div style={{ margin: '8px', height: '8px', background: '#222', borderRadius: '4px' }} />
               <div style={{ margin: '8px', height: '8px', background: '#222', borderRadius: '4px' }} />
            </div>
            <div style={{ flex: 1, padding: '12px' }}>
               <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                 <div style={{ flex: 1, height: '40px', background: '#16161a', borderRadius: '6px' }} />
                 <div style={{ flex: 1, height: '40px', background: '#16161a', borderRadius: '6px' }} />
                 <div style={{ flex: 1, height: '40px', background: '#16161a', borderRadius: '6px' }} />
               </div>
               <div style={{ height: '60px', background: '#16161a', borderRadius: '6px' }} />
            </div>
          </div>
        );
        break;
      case "CodeSync":
        content = (
          <div style={{ padding: '16px', fontFamily: 'monospace' }}>
             <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
               <div style={{ width: '20px', height: '8px', background: '#c678dd', borderRadius: '4px' }} />
               <div style={{ width: '60px', height: '8px', background: '#61afef', borderRadius: '4px' }} />
             </div>
             <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', paddingLeft: '16px' }}>
               <div style={{ width: '40px', height: '8px', background: '#e5c07b', borderRadius: '4px' }} />
               <div style={{ width: '30px', height: '8px', background: '#98c379', borderRadius: '4px' }} />
               <div style={{ width: '80px', height: '8px', background: '#abb2bf', borderRadius: '4px' }} />
             </div>
             <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', paddingLeft: '16px' }}>
               <div style={{ width: '50px', height: '8px', background: '#e5c07b', borderRadius: '4px' }} />
               <div style={{ width: '2px', height: '12px', background: '#528bff' }} />
             </div>
             <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
               <div style={{ width: '20px', height: '8px', background: '#c678dd', borderRadius: '4px' }} />
             </div>
          </div>
        );
        break;
      case "AuraUI":
        content = (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', padding: '16px', height: '100%' }}>
            <div style={{ background: '#16161a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#00b4d8' }} />
            </div>
            <div style={{ background: '#16161a', borderRadius: '8px', padding: '12px' }}>
              <div style={{ height: '8px', width: '60%', background: '#333', borderRadius: '4px', marginBottom: '8px' }} />
              <div style={{ height: '8px', width: '40%', background: '#222', borderRadius: '4px' }} />
            </div>
            <div style={{ background: '#16161a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '40px', height: '20px', borderRadius: '10px', background: '#0077b6' }} />
            </div>
            <div style={{ background: '#16161a', borderRadius: '8px', gridColumn: 'span 3' }}>
               <div style={{ height: '100%', width: '100%', background: 'linear-gradient(90deg, #00b4d822 0%, transparent 100%)' }} />
            </div>
          </div>
        );
        break;
      case "Taskly":
        content = (
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[ '#f59e0b', '#10b981', '#ef4444', '#6366f1' ].map((color, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#16161a', padding: '10px', borderRadius: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', border: `2px solid ${color}` }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: '6px', width: `${50 + Math.random() * 30}%`, background: '#eee', borderRadius: '3px', marginBottom: '4px' }} />
                  <div style={{ height: '4px', width: '20%', background: '#555', borderRadius: '2px' }} />
                </div>
              </div>
            ))}
          </div>
        );
        break;
      case "StockSense":
        content = (
          <div style={{ padding: '16px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
               <div>
                 <div style={{ height: '12px', width: '60px', background: '#eee', borderRadius: '4px', marginBottom: '6px' }} />
                 <div style={{ height: '8px', width: '40px', background: '#10b981', borderRadius: '4px' }} />
               </div>
               <div style={{ height: '20px', width: '20px', borderRadius: '50%', background: '#16161a' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
               {[40, 60, 30, 80, 50, 90, 70, 100].map((h, i) => (
                 <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 7 ? '#10b981' : '#222', borderRadius: '2px 2px 0 0' }} />
               ))}
            </div>
          </div>
        );
        break;
      case "ByteNotes":
        content = (
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flex: 1, padding: '16px', borderRight: '1px solid #222' }}>
               <div style={{ height: '10px', width: '40%', background: '#6366f1', borderRadius: '4px', marginBottom: '12px' }} />
               <div style={{ height: '6px', width: '90%', background: '#eee', borderRadius: '3px', marginBottom: '8px' }} />
               <div style={{ height: '6px', width: '80%', background: '#eee', borderRadius: '3px', marginBottom: '16px' }} />
               <div style={{ padding: '8px', background: '#111', borderRadius: '4px' }}>
                 <div style={{ height: '6px', width: '60%', background: '#a5b4fc', borderRadius: '3px' }} />
               </div>
            </div>
            <div style={{ flex: 1, padding: '16px', background: '#1a1a24' }}>
               <div style={{ height: '14px', width: '50%', background: '#fff', borderRadius: '4px', marginBottom: '12px' }} />
               <div style={{ height: '8px', width: '95%', background: '#aaa', borderRadius: '4px', marginBottom: '8px' }} />
               <div style={{ height: '8px', width: '85%', background: '#aaa', borderRadius: '4px', marginBottom: '16px' }} />
               <div style={{ padding: '8px', background: '#000', borderRadius: '4px', borderLeft: '2px solid #6366f1' }}>
                 <div style={{ height: '6px', width: '60%', background: '#fff', borderRadius: '3px' }} />
               </div>
            </div>
          </div>
        );
        break;
      default:
        content = <div />;
    }

    return (
      <div style={{
        background: '#1a1a1f',
        borderRadius: '10px',
        width: '85%',
        height: '220px',
        maxHeight: '280px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        {browserChrome}
        <div style={{ flex: 1, background: '#0f0f0f', overflow: 'hidden' }}>
          {content}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Meta Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '11px', color: 'var(--color-text-3)' }}>{project.number}</span>
          <div style={{ width: '16px', height: '1px', background: 'var(--color-border)', margin: '0 10px' }} />
          <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '10px', color: 'var(--color-text-3)', letterSpacing: '0.1em' }}>{project.type}</span>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '6px',
          padding: '4px 10px',
          fontFamily: 'JetBrains Mono',
          fontWeight: 500,
          fontSize: '10px',
          color: 'var(--color-text-3)'
        }}>
          {project.date}
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'Sora',
        fontWeight: 700,
        fontSize: '20px',
        color: 'var(--color-text-1)',
        margin: '0 0 16px 0'
      }}>
        {project.name}
      </h3>

      {/* Image Container */}
      <div 
        style={{
          width: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
          marginBottom: '20px',
          border: '1px solid rgba(255,255,255,0.05)'
        }}
        onClick={() => window.open(project.liveUrl, '_blank')}
      >
        <div style={{
          height: '100px',
          background: project.gradient,
          padding: '24px',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
        }}>
          <h3 style={{
            fontFamily: 'Sora',
            fontWeight: 600,
            fontSize: '13px',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '80%',
            lineHeight: 1.4,
            margin: 0
          }}>
            {project.tagline}
          </h3>
          
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <ArrowUpRight size={14} color="white" />
          </div>
        </div>

        <div style={{
          background: '#0d0d0f',
          minHeight: '260px',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {renderMockup()}
        </div>
      </div>

      {/* Tech Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {project.stack.map(tech => (
          <div key={tech} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '6px',
            padding: '4px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '9px',
            color: 'var(--color-text-2)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: project.accentColor, opacity: 0.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '8px', color: project.accentColor, opacity: 1, position: 'absolute' }}>{tech.substring(0, 2)}</span>
            </div>
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}
