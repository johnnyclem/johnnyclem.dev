import { storage } from "./storage";

async function migrateSkills() {
  console.log("🔄 Migrating skills to skill items...");

  // Get all existing skills
  const skills = await storage.getAllSkills();
  
  const skillItemsMap: Record<string, string> = {};
  const usedSlugs = new Set<string>();
  let sortIdx = 0;

  // Create skill items from skills
  for (const skill of skills) {
    for (const itemName of skill.items) {
      // Generate unique slug, handling special cases
      let baseSlug = itemName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      let slug = baseSlug;
      let counter = 1;
      
      // If slug is already used, append counter
      while (usedSlugs.has(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      
      usedSlugs.add(slug);
      const isSpecialization = skill.specializations.includes(itemName);
      
      const skillItem = await storage.createSkillItem({
        skillId: skill.id,
        name: itemName,
        slug,
        isSpecialization,
        sortOrder: sortIdx++,
      });
      
      skillItemsMap[itemName] = skillItem.id;
      console.log(`  Created skill item: ${itemName} (${slug})`);
    }
  }

  // Get all projects and link them to skill items
  const projects = await storage.getAllProjects();
  
  for (const project of projects) {
    console.log(`\n  Linking skills for project: ${project.title}`);
    for (const techName of project.technologies) {
      const skillItemId = skillItemsMap[techName];
      if (skillItemId) {
        try {
          await storage.addSkillToProject(project.id, skillItemId);
          console.log(`    - Linked ${techName}`);
        } catch (error) {
          console.log(`    - Already linked ${techName} (skipping)`);
        }
      } else {
        console.log(`    - Skill not found: ${techName}`);
      }
    }
  }

  console.log("\n✅ Migration completed!");
  process.exit(0);
}

migrateSkills().catch((error) => {
  console.error("❌ Migration failed:", error);
  process.exit(1);
});
