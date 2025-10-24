// Consistent slug generation for skill items (must match server-side)
export function skillToSlug(skillName: string): string {
  // Special cases for common programming languages and technologies
  const specialCases: Record<string, string> = {
    "C++": "cpp",
    "C#": "csharp",
    "Objective-C": "objective-c",
    "Node.js": "node-js",
    "AI/ML": "ai-ml",
    "REST APIs": "rest-apis",
    "CI/CD": "ci-cd",
  };

  // Check if there's a special case mapping
  if (specialCases[skillName]) {
    return specialCases[skillName];
  }

  // Default slug generation
  return skillName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
