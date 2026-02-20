import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SkillsMatrix from "@/components/SkillsMatrix";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import PatentPortfolio from "@/components/PatentPortfolio";
import ProjectHighlights from "@/components/ProjectHighlights";
import OpenSourceSection from "@/components/OpenSourceSection";
import ContactSection from "@/components/ContactSection";
import { ChatBot } from "@/components/ChatBot";

export default function Portfolio() {
  const [selectedSkillSlug, setSelectedSkillSlug] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/attached_assets/Resume - Staff iOS Engineer_1761322308766.pdf";
    link.download = "Jonathan_Clem_Resume.pdf";
    link.click();
  };

  const handleDownloadCoverLetter = () => {
    const link = document.createElement("a");
    link.href = "/attached_assets/Cover Letter - Staff iOS Engineer_1761050342129.pdf";
    link.download = "Jonathan_Clem_Cover_Letter.pdf";
    link.click();
  };

  const handleViewPatents = () => {
    const patentsSection = document.getElementById("patents");
    if (patentsSection) {
      patentsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSkillClick = (skillSlug: string) => {
    setSelectedSkillSlug(skillSlug);
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleClearFilter = () => {
    setSelectedSkillSlug(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#e2e4e9]">
      <Navigation onDownloadResume={handleDownloadResume} />

      <main>
        {/* Hero */}
        <HeroSection onDownloadResume={handleDownloadResume} onViewPatents={handleViewPatents} />

        {/* Skills */}
        <SkillsMatrix
          onSkillClick={handleSkillClick}
          selectedSkillSlug={selectedSkillSlug}
        />

        {/* Experience */}
        <ExperienceTimeline />

        {/* Patents */}
        <PatentPortfolio />

        {/* Projects */}
        <ProjectHighlights
          selectedSkillSlug={selectedSkillSlug}
          onSkillClick={handleSkillClick}
          onClearFilter={handleClearFilter}
        />

        {/* Open Source */}
        <OpenSourceSection />

        {/* AI Chatbot */}
        <section className="py-24 bg-[#111318]">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-12">
              <div className="section-label">Chat</div>
              <h2
                className="lyric-head"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                Ask Me Anything
              </h2>
              <p
                className="text-lg text-[#6b7280] max-w-2xl"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                Chat with an AI assistant trained on my resume, patents, and professional experience
              </p>
            </div>
            <ChatBot />
          </div>
        </section>

        {/* Contact */}
        <ContactSection
          onDownloadResume={handleDownloadResume}
          onDownloadCoverLetter={handleDownloadCoverLetter}
        />
      </main>
    </div>
  );
}