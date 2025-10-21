import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SkillsMatrix from "@/components/SkillsMatrix";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import PatentPortfolio from "@/components/PatentPortfolio";
import ProjectHighlights from "@/components/ProjectHighlights";
import SpecializationSection from "@/components/SpecializationSection";
import ContactSection from "@/components/ContactSection";
import ThemeToggle from "@/components/ThemeToggle";

export default function Portfolio() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const handleDownloadResume = () => {
    // TODO: Implement actual resume download
    console.log("Downloading resume...");
    const link = document.createElement("a");
    link.href = "/attached_assets/Resume - Staff iOS Engineer_1761050342129.pdf";
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation onDownloadResume={handleDownloadResume} />
      <ThemeToggle />

      <main>
        <HeroSection onDownloadResume={handleDownloadResume} onViewPatents={handleViewPatents} />
        <SkillsMatrix />
        <ExperienceTimeline />
        <PatentPortfolio />
        <ProjectHighlights />
        <SpecializationSection />
        <ContactSection
          onDownloadResume={handleDownloadResume}
          onDownloadCoverLetter={handleDownloadCoverLetter}
        />
      </main>
    </div>
  );
}
