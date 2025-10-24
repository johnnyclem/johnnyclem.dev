import { storage } from "./storage";

async function linkMissingSkills() {
  console.log("🔗 Linking missing skills to projects...");

  // Get all skill items by slug
  const getSkillByName = async (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const allSkills = await storage.getAllSkillItems();
    // Handle special cases where slug generation differs
    if (name === "C++") return allSkills.find(s => s.slug === "c");
    if (name === "C#") return allSkills.find(s => s.slug === "c-1");
    return allSkills.find(s => s.slug === slug);
  };

  const projects = await storage.getAllProjects();

  // FiLMiC Pro - add missing skills
  const filmicPro = projects.find(p => p.title === "FiLMiC Pro");
  if (filmicPro) {
    const missingSkills = ["Objective-C", "UIKit", "iOS", "SwiftUI"];
    for (const skillName of missingSkills) {
      const skill = await getSkillByName(skillName);
      if (skill) {
        try {
          await storage.addSkillToProject(filmicPro.id, skill.id);
          console.log(`  FiLMiC Pro + ${skillName}`);
        } catch (e) { }
      }
    }
  }

  // Content-Provenance SDK - add missing skills
  const truepicSDK = projects.find(p => p.title === "Content-Provenance SDK");
  if (truepicSDK) {
    const missingSkills = ["UIKit"];
    for (const skillName of missingSkills) {
      const skill = await getSkillByName(skillName);
      if (skill) {
        try {
          await storage.addSkillToProject(truepicSDK.id, skill.id);
          console.log(`  Content-Provenance SDK + ${skillName}`);
        } catch (e) { }
      }
    }
  }

  // Souls - add missing skills
  const souls = projects.find(p => p.title === "Souls - Agentic AI Platform");
  if (souls) {
    const missingSkills = ["JavaScript", "LLM Integration", "RAG Workflows", "macOS", "Node.js", "Blockchain"];
    for (const skillName of missingSkills) {
      const skill = await getSkillByName(skillName);
      if (skill) {
        try {
          await storage.addSkillToProject(souls.id, skill.id);
          console.log(`  Souls + ${skillName}`);
        } catch (e) { }
      }
    }
  }

  // Ultra Low-Latency Streaming - add missing skills
  const ultraLowLatency = projects.find(p => p.title === "Ultra Low-Latency Streaming");
  if (ultraLowLatency) {
    const missingSkills = ["C++", "iOS", "Objective-C", "CoreAudio"];
    for (const skillName of missingSkills) {
      const skill = await getSkillByName(skillName);
      if (skill) {
        try {
          await storage.addSkillToProject(ultraLowLatency.id, skill.id);
          console.log(`  Ultra Low-Latency Streaming + ${skillName}`);
        } catch (e) { }
      }
    }
  }

  console.log("\n✅ Linking completed!");
  process.exit(0);
}

linkMissingSkills().catch((error) => {
  console.error("❌ Linking failed:", error);
  process.exit(1);
});
