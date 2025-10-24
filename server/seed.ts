import { storage } from "./storage";

export async function seedDatabase() {
  console.log("🌱 Seeding database...");

  // Check if profile already exists
  const existingProfile = await storage.getProfile();
  if (existingProfile) {
    console.log("✅ Database already seeded");
    return;
  }

  // Seed profile
  await storage.createProfile({
    name: "Jonathan Clem",
    title: "Polymath Engineer & Innovation Architect",
    subtitle: "Specializing in R&D and rapid prototyping with extensive jack-of-all-trades experience across 10+ programming languages and a dozen platforms.",
    bio: "Senior iOS Engineer with over a decade of experience in mobile app development",
    email: "johnnyclem@gmail.com",
    linkedin: "https://www.linkedin.com/in/johnnyclem",
    location: "Austin, TX",
    yearsExperience: 10,
    patentCount: 4,
    devicesDeployed: "1B+",
  });

  // Seed skills
  await storage.createSkill({
    category: "Mobile Development",
    title: "Mobile Development",
    icon: "Smartphone",
    color: "text-primary",
    items: ["Swift", "Objective-C", "UIKit", "SwiftUI", "AVFoundation", "CoreMedia", "CoreAudio"],
    specializations: ["AVFoundation", "Swift"],
    sortOrder: 0,
  });

  await storage.createSkill({
    category: "Programming Languages",
    title: "Programming Languages",
    icon: "Code2",
    color: "text-chart-2",
    items: ["TypeScript", "JavaScript", "C++", "Python", "Java", "Rust", "Go", "Kotlin", "C#", "Ruby"],
    specializations: [],
    sortOrder: 1,
  });

  await storage.createSkill({
    category: "Backend & APIs",
    title: "Backend & APIs",
    icon: "Server",
    color: "text-chart-3",
    items: ["REST APIs", "GraphQL", "Node.js", "Express", "WebSockets", "Microservices"],
    specializations: [],
    sortOrder: 2,
  });

  await storage.createSkill({
    category: "Platforms & Deployment",
    title: "Platforms & Deployment",
    icon: "Database",
    color: "text-chart-4",
    items: ["iOS", "macOS", "Android", "Web", "Desktop", "Cloud", "CI/CD", "Docker"],
    specializations: [],
    sortOrder: 3,
  });

  await storage.createSkill({
    category: "AI & Innovation",
    title: "AI & Innovation",
    icon: "Cpu",
    color: "text-chart-5",
    items: ["Agentic AI", "LLM Integration", "RAG Workflows", "ML Optimization", "Blockchain"],
    specializations: [],
    sortOrder: 4,
  });

  await storage.createSkill({
    category: "Development Tools",
    title: "Development Tools",
    icon: "Wrench",
    color: "text-primary",
    items: ["XCTest", "Instruments", "Git", "Jira", "Figma", "Performance Profiling"],
    specializations: [],
    sortOrder: 5,
  });

  // Seed experiences
  await storage.createExperience({
    company: "AI Layer Labs / Wire Network",
    companyLogoUrl: "/attached_assets/generated_images/AI_Layer_Labs_logo_b1b77a03.png",
    role: "Senior Blockchain Engineer (AI Agents)",
    period: "Nov 2024 - Jun 2025",
    location: "Remote, United States",
    type: "AI & Blockchain",
    achievements: [
      "Architected and launched open-source agentic AI application for MacOS",
      "Contributed to successful $2M pre-seed fundraise",
      "Established TypeScript ecosystem for AI agents",
      "Engineered LLM+RAG workflows",
    ],
    sortOrder: 0,
  });

  await storage.createExperience({
    company: "Truepic",
    companyLogoUrl: "/attached_assets/generated_images/Truepic_company_logo_clean_d437eee2.png",
    role: "Senior iOS Engineer",
    period: "Nov 2023 - Nov 2024",
    location: "Remote, United States",
    type: "iOS Development",
    achievements: [
      "Developed secure content-provenance iOS SDK adopted by 6 major social media platforms",
      "Enhanced media capture and transmission pipelines for low latency",
      "Reduced p95 operation time across diverse network conditions",
      "Collaborated with Product and Design teams on usability improvements",
    ],
    sortOrder: 1,
  });

  await storage.createExperience({
    company: "Belief Agency",
    companyLogoUrl: "/attached_assets/generated_images/Belief_Agency_wordmark_logo_29c2ec98.png",
    role: "Director of Digital",
    period: "Nov 2019 - Aug 2022",
    location: "Seattle, United States",
    type: "Leadership",
    achievements: [
      "Guided multi-disciplinary mobile and web teams",
      "Instituted best practices for code review and testing methodologies",
      "Collaborated with creative and account teams on diverse solutions",
      "Drove informed technical decisions across projects",
    ],
    sortOrder: 2,
  });

  await storage.createExperience({
    company: "FiLMIC Inc.",
    companyLogoUrl: "/attached_assets/generated_images/FiLMiC_Inc_company_logo_9b82d21a.png",
    role: "Staff iOS Engineer, Chief Technology Officer",
    period: "Feb 2015 - Jan 2019",
    location: "Seattle, United States",
    type: "CTO",
    achievements: [
      "Directed and mentored mobile engineering team from 1 to 8 engineers",
      "Achieved #1 App Store ranking in Photo & Video category",
      "Enhanced performance within AVFoundation, CoreMedia, and CoreAudio pipelines",
      "Instituted release discipline and architectural guidelines",
    ],
    sortOrder: 3,
  });

  // Seed patents
  await storage.createPatent({
    number: "US10481758 B2",
    title: "Location Based Augmented Reality System",
    year: "2019",
    company: "iOcculi",
    status: "Awarded",
    description: "Location-based augmented reality systems for exchange of items based on location sensing and associated triggering icons.",
    category: "AR/Mobile",
    sortOrder: 0,
  });

  await storage.createPatent({
    number: "US20200259974 A1",
    title: "Cubiform Method",
    year: "2020",
    company: "Filmic Inc.",
    status: "Awarded",
    description: "Method for generating color lookup tables for real-time image modification and color grading in mobile video applications.",
    category: "Video/Imaging",
    sortOrder: 1,
  });

  await storage.createPatent({
    number: "US20150350041 A1",
    title: "Protocols & Mechanisms of Communication",
    year: "2015",
    company: "Paladin Innovators",
    status: "Contributor",
    description: "Communication protocols between live production servers and mobile/remote clients using WebSockets for real-time video production control.",
    category: "Networking",
    sortOrder: 2,
  });

  await storage.createPatent({
    number: "US20150350289 A1",
    title: "Methods & Systems for Transmission of High Resolution Data",
    year: "2015",
    company: "Paladin Innovators",
    status: "Contributor",
    description: "Ultra low latency streaming methods for transmitting high-resolution video with minimal error and low latency over standard networks.",
    category: "Streaming",
    sortOrder: 3,
  });

  // Seed projects
  await storage.createProject({
    title: "FiLMIC Pro",
    company: "FiLMIC Inc.",
    role: "Staff iOS Engineer & CTO",
    description: "Achieved #1 App Store ranking in Photo & Video. Featured in Apple's iPhone 11 keynote. Optimized AVFoundation pipelines for millions of users.",
    impact: "#1 App Store",
    icon: "Video",
    color: "text-chart-3",
    technologies: ["Swift", "AVFoundation", "CoreMedia"],
    imageUrl: "/attached_assets/generated_images/FiLMiC_Pro_app_icon_9165a6a3.png",
    featured: true,
    sortOrder: 0,
  });

  await storage.createProject({
    title: "Content-Provenance SDK",
    company: "Truepic",
    role: "Senior iOS Engineer",
    description: "Developed secure iOS SDK for content authenticity, adopted by 6 major social media platforms and deployed to over 1 billion mobile devices.",
    impact: "1B+ devices",
    icon: "Shield",
    color: "text-primary",
    technologies: ["Swift", "Security", "SDK"],
    imageUrl: "/attached_assets/generated_images/Truepic_company_logo_clean_d437eee2.png",
    featured: false,
    sortOrder: 1,
  });

  await storage.createProject({
    title: "Agentic AI Platform",
    company: "AI Layer Labs",
    role: "Senior Blockchain Engineer",
    description: "Architected open-source agentic AI application for MacOS. Established TypeScript ecosystem for AI agents and LLM+RAG workflows.",
    impact: "$2M raised",
    icon: "Bot",
    color: "text-chart-5",
    technologies: ["TypeScript", "AI/ML", "RAG"],
    imageUrl: "/attached_assets/generated_images/AI_Layer_Labs_logo_b1b77a03.png",
    featured: false,
    sortOrder: 2,
  });

  await storage.createProject({
    title: "Ultra Low-Latency Streaming",
    company: "Paladin Innovators",
    role: "Senior Engineer",
    description: "Pioneered methods for transmitting high-resolution video with sub-100ms latency, enabling real-time production control from mobile devices.",
    impact: "<100ms latency",
    icon: "Zap",
    color: "text-chart-2",
    technologies: ["WebSockets", "Video", "Real-time"],
    imageUrl: "/attached_assets/generated_images/Paladin_Innovators_corporate_logo_0d89c73f.png",
    featured: false,
    sortOrder: 3,
  });

  // Seed companies
  const companyData = [
    { name: "Meta", sortOrder: 0 },
    { name: "OpenAI", sortOrder: 1 },
    { name: "Starbucks", sortOrder: 2 },
    { name: "X", sortOrder: 3 },
    { name: "Truepic", sortOrder: 4 },
  ];

  for (const company of companyData) {
    await storage.createCompany(company);
  }

  console.log("✅ Database seeded successfully!");
}
