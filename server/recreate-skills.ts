import { storage } from "./storage";
import { skillToSlug } from "./utils/slugify";

async function recreateSkills() {
  console.log("🔄 Recreating skill items with correct slugs...");

  const skills = await storage.getAllSkills();
  const skillItemsMap: Record<string, string> = {};
  let sortIdx = 0;

  for (const skill of skills) {
    for (const itemName of skill.items) {
      const slug = skillToSlug(itemName);
      const isSpecialization = skill.specializations.includes(itemName);
      
      const skillItem = await storage.createSkillItem({
        skillId: skill.id,
        name: itemName,
        slug,
        isSpecialization,
        sortOrder: sortIdx++,
      });
      
      skillItemsMap[itemName] = skillItem.id;
      console.log(`  Created: ${itemName} → ${slug}`);
    }
  }

  // Link projects to skill items
  const projects = await storage.getAllProjects();
  
  for (const project of projects) {
    console.log(`\n  Linking: ${project.title}`);
    for (const techName of project.technologies) {
      const skillItemId = skillItemsMap[techName];
      if (skillItemId) {
        try {
          await storage.addSkillToProject(project.id, skillItemId);
          console.log(`    + ${techName}`);
        } catch (e) {}
      } else {
        console.log(`    ! Missing: ${techName}`);
      }
    }
  }

  console.log("\n✅ Recreation completed!");
  process.exit(0);
}

recreateSkills().catch((error) => {
  console.error("❌ Failed:", error);
  process.exit(1);
});
