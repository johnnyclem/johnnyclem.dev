import { storage } from "./storage";
import { skillToSlug } from "./utils/slugify";

export async function seedDatabase() {
  console.log("🌱 Seeding database...");

  // Check if profile already exists
  const existingProfile = await storage.getProfile();
  if (existingProfile) {
    console.log("✅ Database already seeded");
    
    // But still seed chat prompts if they don't exist
    const existingPrompts = await storage.getAllChatPrompts();
    if (existingPrompts.length === 0) {
      console.log("🌱 Seeding chat prompts...");
      const chatPromptsData = [
        { 
          prompt: "Tell me about a project you've worked on that you're really proud of.",
          sortOrder: 0,
          isActive: true,
        },
        { 
          prompt: "Tell me about a time you overcame a conflict with a coworker.",
          sortOrder: 1,
          isActive: true,
        },
        { 
          prompt: 'Given the following input string, write a parcel in swift to convert raw text into markdown syntax: "Input string goes here"',
          sortOrder: 2,
          isActive: true,
        },
      ];

      for (const promptData of chatPromptsData) {
        await storage.createChatPrompt(promptData);
      }
      console.log("✅ Chat prompts seeded successfully!");
    }
    
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
  const mobileDev = await storage.createSkill({
    category: "Mobile Development",
    title: "Mobile Development",
    icon: "Smartphone",
    color: "text-primary",
    items: ["Swift", "Objective-C", "UIKit", "SwiftUI", "AVFoundation", "CoreMedia", "CoreAudio"],
    specializations: ["AVFoundation", "Swift"],
    sortOrder: 0,
  });

  const programmingLangs = await storage.createSkill({
    category: "Programming Languages",
    title: "Programming Languages",
    icon: "Code2",
    color: "text-chart-2",
    items: ["TypeScript", "JavaScript", "C++", "Python", "Java", "Rust", "Go", "Kotlin", "C#", "Ruby"],
    specializations: [],
    sortOrder: 1,
  });

  const backendAPIs = await storage.createSkill({
    category: "Backend & APIs",
    title: "Backend & APIs",
    icon: "Server",
    color: "text-chart-3",
    items: ["REST APIs", "GraphQL", "Node.js", "Express", "WebSockets", "Microservices"],
    specializations: [],
    sortOrder: 2,
  });

  const platforms = await storage.createSkill({
    category: "Platforms & Deployment",
    title: "Platforms & Deployment",
    icon: "Database",
    color: "text-chart-4",
    items: ["iOS", "macOS", "Android", "Web", "Desktop", "Cloud", "CI/CD", "Docker"],
    specializations: [],
    sortOrder: 3,
  });

  const aiInnovation = await storage.createSkill({
    category: "AI & Innovation",
    title: "AI & Innovation",
    icon: "Cpu",
    color: "text-chart-5",
    items: ["Agentic AI", "LLM Integration", "RAG Workflows", "ML Optimization", "Blockchain"],
    specializations: [],
    sortOrder: 4,
  });

  const devTools = await storage.createSkill({
    category: "Development Tools",
    title: "Development Tools",
    icon: "Wrench",
    color: "text-primary",
    items: ["XCTest", "Instruments", "Git", "Jira", "Figma", "Performance Profiling"],
    specializations: [],
    sortOrder: 5,
  });

  // Create skill items from the skills categories
  const skillItemsMap: Record<string, string> = {};
  let sortIdx = 0;

  for (const skill of [mobileDev, programmingLangs, backendAPIs, platforms, aiInnovation, devTools]) {
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
    }
  }

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
    companyLogoUrl: "/attached_assets/truepic-logo-color_1761321859430.png",
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
    companyLogoUrl: "/attached_assets/Belief_Lockup_Stacked_1.png_1761322028607.webp",
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

  await storage.createExperience({
    company: "General Assembly",
    companyLogoUrl: "/attached_assets/general-1523860193.jpg_1761322141229.avif",
    role: "Instructor, Web Development Immersive",
    period: "2014 - 2015",
    location: "Seattle, United States",
    type: "Education",
    achievements: [
      "Taught full-stack web development to career-changing students",
      "Covered HTML, CSS, JavaScript, Ruby on Rails, and modern frameworks",
      "Mentored students through project development and portfolio building",
      "Guided graduates into successful software engineering careers",
    ],
    sortOrder: 4,
  });

  await storage.createExperience({
    company: "Analytics Pros",
    companyLogoUrl: "/attached_assets/1_1761322057415.jpeg",
    role: "Senior Software Engineer",
    period: "2013 - 2014",
    location: "Seattle, United States",
    type: "Development",
    achievements: [
      "Built analytics and data visualization solutions for enterprise clients",
      "Developed custom integrations with Google Analytics and marketing platforms",
      "Created automated reporting dashboards and data pipelines",
      "Collaborated with marketing teams to deliver actionable insights",
    ],
    sortOrder: 5,
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

  // Seed projects with their skill relationships
  const filmicPro = await storage.createProject({
    title: "FiLMiC Pro",
    company: "FiLMiC Inc.",
    role: "Staff iOS Engineer & CTO",
    description: "Achieved #1 App Store ranking in Photo & Video. Featured in Apple's iPhone 11 keynote. Optimized AVFoundation pipelines for millions of users.",
    impact: "#1 App Store",
    icon: "Video",
    color: "text-chart-3",
    technologies: ["Swift", "Objective-C", "AVFoundation", "CoreMedia", "CoreAudio", "UIKit", "iOS", "SwiftUI"],
    imageUrl: "/attached_assets/generated_images/FiLMiC_Pro_app_icon_9165a6a3.png",
    featured: true,
    sortOrder: 0,
  });

  const truepicSDK = await storage.createProject({
    title: "Content-Provenance SDK",
    company: "Truepic",
    role: "Senior iOS Engineer",
    description: "Developed secure iOS SDK for content authenticity, adopted by 6 major social media platforms and deployed to over 1 billion mobile devices.",
    impact: "1B+ devices",
    icon: "Shield",
    color: "text-primary",
    technologies: ["Swift", "iOS", "UIKit"],
    imageUrl: "/attached_assets/truepic-logo-color_1761321859430.png",
    featured: false,
    sortOrder: 1,
  });

  const soulsAI = await storage.createProject({
    title: "Souls - Agentic AI Platform",
    company: "AI Layer Labs / Wire Network",
    role: "Senior Blockchain Engineer",
    description: "Architected and launched Souls, an open-source agentic AI application for MacOS. No code, no complexity—just intelligent software that works for you. Established TypeScript ecosystem for AI agents and LLM+RAG workflows.",
    impact: "$2M raised",
    icon: "Bot",
    color: "text-chart-5",
    technologies: ["TypeScript", "JavaScript", "Agentic AI", "LLM Integration", "RAG Workflows", "macOS", "Node.js", "Blockchain"],
    imageUrl: "/attached_assets/App-1_1761321900465.png",
    featured: true,
    sortOrder: 2,
  });

  const ultraLowLatency = await storage.createProject({
    title: "Ultra Low-Latency Streaming",
    company: "Paladin Innovators",
    role: "Senior Engineer",
    description: "Pioneered methods for transmitting high-resolution video with sub-100ms latency, enabling real-time production control from mobile devices.",
    impact: "<100ms latency",
    icon: "Zap",
    color: "text-chart-2",
    technologies: ["WebSockets", "C++", "iOS", "Objective-C", "CoreMedia", "CoreAudio"],
    imageUrl: "/attached_assets/generated_images/Paladin_Innovators_corporate_logo_0d89c73f.png",
    featured: false,
    sortOrder: 3,
  });

  // Link projects to skill items via junction table
  const projects = [filmicPro, truepicSDK, soulsAI, ultraLowLatency];
  
  for (const project of projects) {
    for (const techName of project.technologies) {
      const skillItemId = skillItemsMap[techName];
      if (skillItemId) {
        await storage.addSkillToProject(project.id, skillItemId);
      }
    }
  }

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

  // Seed chat prompts
  const chatPromptsData = [
    { 
      prompt: "Tell me about a project you've worked on that you're really proud of.",
      sortOrder: 0,
      isActive: true,
    },
    { 
      prompt: "Tell me about a time you overcame a conflict with a coworker.",
      sortOrder: 1,
      isActive: true,
    },
    { 
      prompt: 'Given the following input string, write a parcel in swift to convert raw text into markdown syntax: "Input string goes here"',
      sortOrder: 2,
      isActive: true,
    },
  ];

  for (const promptData of chatPromptsData) {
    await storage.createChatPrompt(promptData);
  }

  console.log("✅ Database seeded successfully!");
}
