import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SkillsMatrix from "@/components/SkillsMatrix";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SocialActivity from "@/components/SocialActivity";
import PatentPortfolio from "@/components/PatentPortfolio";
import ProjectHighlights from "@/components/ProjectHighlights";
import SpecializationSection from "@/components/SpecializationSection";
import ContactSection from "@/components/ContactSection";
import ThemeToggle from "@/components/ThemeToggle";
import { ChatBot } from "@/components/ChatBot";
import { IPhoneCarousel } from "@/components/IPhoneCarousel";

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
    // TODO: Implement actual cover letter download
    console.log("Downloading cover letter...");
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
    // Scroll to projects section
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleClearFilter = () => {
    setSelectedSkillSlug(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation onDownloadResume={handleDownloadResume} />
      <ThemeToggle />

      <main>
        <HeroSection onDownloadResume={handleDownloadResume} onViewPatents={handleViewPatents} />
        
        {/* AI Chatbot Section */}
        <section className="container mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ask Me Anything</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chat with an AI assistant trained on my resume, patents, and professional experience.
            </p>
          </div>
          <ChatBot />
        </section>

        <SkillsMatrix 
          onSkillClick={handleSkillClick} 
          selectedSkillSlug={selectedSkillSlug}
        />
        <ExperienceTimeline />
        <SocialActivity />
        <PatentPortfolio />
        <ProjectHighlights 
          selectedSkillSlug={selectedSkillSlug}
          onSkillClick={handleSkillClick}
          onClearFilter={handleClearFilter}
        />
        
        {/* iPhone Carousel Section */}
        <section className="container mx-auto px-6 py-16 md:py-24" id="carousel">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Apps in Action</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See my iOS applications and projects in action
            </p>
          </div>
          <IPhoneCarousel />
        </section>

        <SpecializationSection />
        <ContactSection
          onDownloadResume={handleDownloadResume}
          onDownloadCoverLetter={handleDownloadCoverLetter}
        />
      </main>
    </div>
  );
}
