import { useState, useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { RotatingBadge } from "./RotatingBadge";
import type { Project } from "./projectsData";

interface ProjectCardProps {
  project: Project;
  isMobile: boolean;
}

export function ProjectCard({ project, isMobile }: ProjectCardProps) {
  const [hover, setHover] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const cardHeight = rect.height;
      const start = windowHeight / 2;
      const scrolled = start - rect.top;
      
      let progress = 0;
      if (scrolled > 0) {
        progress = Math.min(1, scrolled / cardHeight);
      }
      
      setScrollProgress(progress * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        overflow: 'hidden'
      }}>
        {browserChrome}
        <div style={{ flex: 1, background: '#0f0f0f', overflow: 'hidden' }}>
          {content}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      ref={cardRef}
      className="project-card-container"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: '100%',
        marginBottom: isMobile ? '64px' : '0',
      }}
    >
      <div 
        style={{
          width: '100%',
          borderRadius: '20px',
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
          transform: hover ? 'translateY(-4px)' : 'none',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseMove={handleMouseMove}
        onClick={() => window.open(project.liveUrl, '_blank')}
      >
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: '2px',
          background: 'var(--color-border)',
          zIndex: 5
        }}>
          <div style={{
            background: project.accentColor,
            height: `${scrollProgress}%`,
            width: '100%',
            transition: 'height 0.1s linear'
          }} />
        </div>

        <div style={{
          height: '140px',
          background: project.gradient,
          padding: '28px 32px',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
        }}>
          <h3 style={{
            fontFamily: 'Sora',
            fontWeight: 600,
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '70%',
            lineHeight: 1.35,
            margin: 0
          }}>
            {project.tagline}
          </h3>
          
          <div 
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: hover ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
          >
            <ArrowUpRight 
              size={16} 
              color="white" 
              style={{ 
                transform: hover ? 'rotate(0deg)' : 'rotate(45deg)',
                transition: 'transform 0.2s'
              }} 
            />
          </div>
        </div>

        <div style={{
          background: '#0d0d0f',
          minHeight: '340px',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {renderMockup()}
        </div>

        {!isMobile && (
          <RotatingBadge 
            visible={hover} 
            x={mousePos.x} 
            y={mousePos.y} 
            color={project.accentColor} 
          />
        )}
      </div>

      {isMobile && (
        <div style={{ marginTop: '24px' }}>
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
             <div style={{ display: 'flex', alignItems: 'center' }}>
               <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px', color: 'var(--color-text-3)' }}>{project.number}</span>
               <div style={{ width: '20px', height: '1px', background: 'var(--color-border)', margin: '0 10px' }} />
               <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '11px', color: 'var(--color-text-3)', letterSpacing: '0.1em' }}>{project.type}</span>
             </div>
             <div style={{
               background: 'var(--color-surface-2)',
               border: '1px solid var(--color-border)',
               borderRadius: '6px',
               padding: '4px 10px',
               fontFamily: 'JetBrains Mono',
               fontWeight: 500,
               fontSize: '11px',
               color: 'var(--color-text-3)'
             }}>
               {project.date}
             </div>
           </div>

           <h3 style={{
             fontFamily: 'Sora',
             fontWeight: 700,
             fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
             color: 'var(--color-text-1)',
             marginBottom: '16px'
           }}>
             {project.name}
           </h3>

           <p style={{
             fontFamily: 'Inter',
             fontWeight: 400,
             fontSize: '15px',
             color: 'var(--color-text-2)',
             lineHeight: 1.75,
             marginBottom: '20px'
           }}>
             {project.description}
           </p>

           <div style={{ marginBottom: '28px' }}>
             {project.bullets.map((bullet, i) => (
               <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px' }}>
                 <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '13px', color: project.accentColor, width: '14px', flexShrink: 0, marginTop: '3px' }}>✦</span>
                 <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '13px', color: 'var(--color-text-2)', lineHeight: 1.6 }}>{bullet}</span>
               </div>
             ))}
           </div>

           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
             {project.stack.map(tech => (
               <div key={tech} style={{
                 background: 'var(--color-surface-2)',
                 border: '1px solid var(--color-border)',
                 borderRadius: '6px',
                 padding: '6px 12px',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '6px',
                 fontFamily: 'Inter',
                 fontWeight: 600,
                 fontSize: '11px',
                 color: 'var(--color-text-2)',
                 letterSpacing: '0.05em',
                 textTransform: 'uppercase'
               }}>
                 <div style={{ width: '16px', height: '16px', borderRadius: '3px', background: project.accentColor, opacity: 0.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <span style={{ fontSize: '10px', color: project.accentColor, opacity: 1, position: 'absolute' }}>{tech.substring(0, 2)}</span>
                 </div>
                 {tech}
               </div>
             ))}
           </div>

           <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
             <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-secondary" data-cursor="VIEW">
               View Live ↗
             </a>
             <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-ghost" data-cursor="GITHUB" style={{ border: '1px solid var(--color-border)', background: 'transparent' }}>
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
               Source Code
             </a>
           </div>
        </div>
      )}
    </motion.div>
  );
}
