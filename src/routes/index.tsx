import { createFileRoute } from "@tanstack/react-router";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { ReadingProgress } from "@/components/portfolio/ReadingProgress";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Methodology } from "@/components/portfolio/Methodology";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Education } from "@/components/portfolio/Education";
import { Achievements } from "@/components/portfolio/Achievements";
import { CodingJourney } from "@/components/portfolio/CodingJourney";
import { AskAI } from "@/components/portfolio/AskAI";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Terminal } from "@/components/portfolio/Terminal";
import { BackToTop } from "@/components/portfolio/BackToTop";
import { useActiveSection } from "@/lib/portfolio/useActiveSection";
import { IDENTITY } from "@/lib/portfolio/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${IDENTITY.name} | ${IDENTITY.role}` },
      {
        name: "description",
        content: `${IDENTITY.name} — ${IDENTITY.role} from ${IDENTITY.location}. ${IDENTITY.tagline}`,
      },
      { property: "og:title", content: `${IDENTITY.name} | ${IDENTITY.role}` },
      { property: "og:description", content: IDENTITY.tagline },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const active = useActiveSection();
  return (
    <div className="dark min-h-screen" style={{ background: "var(--color-bg)", color: "var(--color-text-1)" }}>
      <CustomCursor />
      <ReadingProgress />
      <Navbar active={active} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Methodology />
        <Projects />
        <Experience />
        <Education />
        <Achievements />
        <CodingJourney />
        <AskAI />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Terminal />
    </div>
  );
}
