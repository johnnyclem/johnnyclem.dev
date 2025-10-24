import { storage } from "./storage";
import { skillToSlug } from "./utils/slugify";

async function finalLinkSkills() {
  console.log("🔗 Final skill linking...");

  const getAllSkill = async (name: string) => {
    const slug = skillToSlug(name);
    return await storage.getSkillItemBySlug(slug);
  };

  const projects = await storage.getAllProjects();

  // Define correct technologies for each project
  const projectTechnologies: Record<string, string[]> = {
    "FiLMIC Pro": ["Swift", "Objective-C", "AVFoundation", "CoreMedia", "CoreAudio", "UIKit", "iOS", "SwiftUI"],
    "Content-Provenance SDK": ["Swift", "iOS", "UIKit"],
    "Souls - Agentic AI Platform": ["TypeScript", "JavaScript", "Agentic AI", "LLM Integration", "RAG Workflows", "macOS", "Node.js", "Blockchain"],
    "Ultra Low-Latency Streaming": ["WebSockets", "C++", "iOS", "Objective-C", "CoreMedia", "CoreAudio"],
  };

  for (const project of projects) {
    const techs = projectTechnologies[project.title];
    if (!techs) continue;

    console.log(`\n  ${project.title}:`);
    for (const techName of techs) {
      const skill = await getAllSkill(techName);
      if (skill) {
        try {
          await storage.addSkillToProject(project.id, skill.id);
          console.log(`    + ${techName}`);
        } catch (e) {}
      } else {
        console.log(`    ! Not found: ${techName}`);
      }
    }
  }

  console.log("\n✅ Final linking completed!");
  process.exit(0);
}

finalLinkSkills().catch((error) => {
  console.error("❌ Failed:", error);
  process.exit(1);
});
