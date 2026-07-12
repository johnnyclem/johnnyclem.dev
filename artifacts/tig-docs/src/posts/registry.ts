import type { ComponentType } from "react";

export interface SidebarSection {
  title: string;
  links: { id: string; label: string }[];
}

export interface PostMeta {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  category: string;
  description: string;
  coverGradient: string;
  coverIcon: string;
  component: () => Promise<{ default: ComponentType }>;
  sidebar: SidebarSection[];
}

export const posts: PostMeta[] = [
  {
    slug: "terminal-interface-guidelines",
    title: "Terminal Interface Guidelines",
    subtitle: "TIG 2.0",
    date: "March 2026",
    category: "Design",
    description:
      "Designing immersive, pixel-considered experiences within the profound constraint of a fixed-width character grid.",
    coverGradient: "from-[#1e1e2e] to-[#313244]",
    coverIcon: ">_",
    component: () => import("./terminal-interface-guidelines"),
    sidebar: [
      {
        title: "Terminal Interface Guidelines",
        links: [
          { id: "overview", label: "Overview" },
          { id: "foundations", label: "Foundations" },
          { id: "philosophy", label: "Design Philosophy" },
          { id: "typography", label: "Typography" },
          { id: "color", label: "Color" },
          { id: "layout", label: "Layout & Composition" },
          { id: "interaction", label: "Interaction Model" },
          { id: "resizing", label: "Dynamic Resizing" },
        ],
      },
      {
        title: "Components",
        links: [
          { id: "borders", label: "Borders & Boxes" },
          { id: "modals", label: "Modal Dialogs" },
          { id: "progress", label: "Progress Indicators" },
        ],
      },
      {
        title: "Appendix",
        links: [
          { id: "known-issues", label: "Known Behaviors" },
          { id: "deprecated", label: "Deprecated Paradigms" },
        ],
      },
    ],
  },
  {
    slug: "vibescriptjs",
    title: "VibeScriptJS",
    subtitle: "v4.2.0",
    date: "March 2026",
    category: "Developer Tools",
    description:
      "A next-generation application development framework built on the principle that code is an implementation detail.",
    coverGradient: "from-[#0a0a1a] to-[#1a1035]",
    coverIcon: "V",
    component: () => import("./vibescriptjs"),
    sidebar: [
      {
        title: "Getting Started",
        links: [
          { id: "overview", label: "Overview" },
          { id: "installation", label: "Installation" },
          { id: "quickstart", label: "Quickstart" },
        ],
      },
      {
        title: "Core Concepts",
        links: [
          { id: "vibes", label: "Vibes" },
          { id: "prompt-lifecycle", label: "The Prompt Lifecycle" },
          { id: "intentions", label: "Intention Architecture" },
        ],
      },
      {
        title: "API Reference",
        links: [
          { id: "api-reference", label: "vibe()" },
          { id: "config", label: "Configuration" },
          { id: "auth", label: "Authentication" },
          { id: "errors", label: "Error Handling" },
        ],
      },
      {
        title: "Advanced",
        links: [
          { id: "architecture", label: "Architecture Patterns" },
          { id: "performance", label: "Performance" },
          { id: "migration", label: "Migration Guide" },
          { id: "testing", label: "Testing" },
        ],
      },
      {
        title: "Resources",
        links: [
          { id: "faq", label: "FAQ" },
          { id: "changelog", label: "Changelog" },
        ],
      },
    ],
  },
  {
    slug: "chaintime-protocol",
    title: "ChainTime Protocol API",
    subtitle: "v3.1.0",
    date: "March 2026",
    category: "Web3 / API",
    description:
      "Decentralized, consensus-validated, cryptographically verifiable temporal data for applications that require trustless certainty about what time it is.",
    coverGradient: "from-[#1b1b1b] to-[#2d1a00]",
    coverIcon: "⧖",
    component: () => import("./chaintime-protocol"),
    sidebar: [
      {
        title: "Overview",
        links: [
          { id: "overview", label: "Introduction" },
          { id: "authorize", label: "Authorization" },
        ],
      },
      {
        title: "Endpoints",
        links: [
          { id: "temporal-queries", label: "temporal-queries" },
          { id: "time-zones", label: "time-zones" },
          { id: "staking", label: "staking" },
          { id: "legacy", label: "legacy (deprecated)" },
        ],
      },
      {
        title: "Models",
        links: [{ id: "schemas", label: "Schemas" }],
      },
    ],
  },
  {
    slug: "docs-docs",
    title: "Documentation: A Documentation",
    subtitle: "docs.docs",
    date: "March 2026",
    category: "Documentation",
    description:
      "A comprehensive guide to understanding why you should write documentation, written instead of writing documentation.",
    coverGradient: "from-[#20232a] to-[#25c2a0]",
    coverIcon: "📄",
    component: () => import("./docs-docs"),
    sidebar: [
      {
        title: "Introduction",
        links: [
          { id: "overview", label: "Why Documentation Matters" },
          { id: "kevin", label: "Documentation vs. Telling Kevin" },
          { id: "audience", label: "Knowing Your Audience" },
        ],
      },
      {
        title: "Getting Started",
        links: [
          { id: "tooling", label: "Choosing a Docs Framework" },
          { id: "first-page", label: "Writing Your First Page" },
        ],
      },
      {
        title: "Core Concepts",
        links: [
          { id: "five-stages", label: "The Five Stages" },
          { id: "when", label: "When to Write Docs" },
          { id: "types", label: "Types of Documentation" },
        ],
      },
      {
        title: "Advanced Guides",
        links: [
          { id: "excuses", label: "Making Excuses" },
          { id: "maintenance", label: "Keeping Docs Updated" },
        ],
      },
      {
        title: "Reference",
        links: [
          { id: "glossary", label: "Glossary" },
          { id: "faq", label: "FAQ" },
        ],
      },
    ],
  },
  {
    slug: "orbly",
    title: "Orbly",
    subtitle: "Issues",
    date: "March 2026",
    category: "Project Management",
    description:
      "Cycle 43: Marcus’s Vision. 2 of 31 tickets completed. Both were sticker orders.",
    coverGradient: "from-[#0d0d0d] to-[#1a1a2e]",
    coverIcon: "📋",
    component: () => import("./orbly"),
    sidebar: [
      {
        title: "Workspace",
        links: [{ id: "overview", label: "Active Cycle" }],
      },
    ],
  },
  {
    slug: "glean-in",
    title: "Glean In",
    subtitle: "Cher",
    date: "March 2026",
    category: "Business / Self-Help",
    description:
      "How to LOOK like you work smarter, not harder. A guide to strategic disengagement, performative productivity, and enterprise search as a coping mechanism.",
    coverGradient: "from-[#1a1a2e] to-[#16213e]",
    coverIcon: "📖",
    component: () => import("./glean-in"),
    sidebar: [
      {
        title: "Contents",
        links: [
          { id: "overview", label: "Cover" },
          { id: "introduction", label: "Introduction: The Promise" },
          { id: "chapter-1", label: "1. The Art of the Strategic Nod" },
          { id: "chapter-2", label: "2. The Eleven-Second Recovery" },
          { id: "chapter-3", label: "3. Resting Meeting Face" },
          { id: "chapter-4", label: "4. The Mute Button Is Your Co-Founder" },
          { id: "chapter-5", label: "5. Prompt Engineering Your Performance Review" },
          { id: "chapter-6", label: "6. The Meeting Simulator" },
          { id: "about", label: "About the Author" },
        ],
      },
    ],
  },
  {
    slug: "vibe-up",
    title: "Vibe Up",
    subtitle: "38signals",
    date: "March 2026",
    category: "Methodology / Satire",
    description:
      "Stop Shipping Software and Start Shipping Opinions. A book by 38signals about six-week cycles, fat marker vibes, and the content-product flywheel.",
    coverGradient: "from-[#2c1810] to-[#4a2c1a]",
    coverIcon: "▲",
    component: () => import("./vibe-up"),
    sidebar: [
      {
        title: "Contents",
        links: [
          { id: "overview", label: "Cover" },
          { id: "foreword", label: "Foreword" },
          { id: "ch1", label: "1. Less Is More" },
          { id: "ch2", label: "2. The Six-Week Feeling" },
          { id: "ch3", label: "3. Appetites, Not Estimates" },
          { id: "ch4", label: "4. Fat Marker Vibes" },
          { id: "ch5", label: "5. The Blog Post Is the Product" },
          { id: "ch6", label: "6. Convention Over Configuration" },
          { id: "ch7", label: "7. Bets, Not Backlogs" },
          { id: "ch8", label: "8. The Hill Chart of Feelings" },
          { id: "ch9", label: "9. Move On" },
          { id: "glossary", label: "Glossary" },
          { id: "stack", label: "Appendix: The Stack" },
        ],
      },
    ],
  },
  {
    slug: "fontmid",
    title: "FontMid",
    subtitle: "Icon Library",
    date: "March 2026",
    category: "Developer Tools",
    description:
      "The Internet's Okayest Icon Library. 2,847 icons that do the job. Not beautifully. Not poorly. Just… adequately.",
    coverGradient: "from-[#1b2a4a] to-[#243b5e]",
    coverIcon: "—",
    component: () => import("./fontmid"),
    sidebar: [
      {
        title: "Browse",
        links: [
          { id: "overview", label: "Overview" },
          { id: "sentiment", label: "Sentiment" },
          { id: "status", label: "Status" },
          { id: "commerce", label: "Commerce" },
          { id: "navigation", label: "Navigation" },
          { id: "workplace", label: "Workplace" },
          { id: "developer", label: "Developer" },
          { id: "pro", label: "Go Mediocre" },
          { id: "usage", label: "Getting Started" },
          { id: "testimonials", label: "Testimonials" },
        ],
      },
    ],
  },
  {
    slug: "daring-firewall",
    title: "Daring Firewall",
    subtitle: "Blog",
    date: "March 2026",
    category: "Design Criticism",
    description:
      "By John Goober. A week of obsessive, pixel-level design criticism of Ubuntu Linux, written by the inventor of Markdown. The middle dot haunts him.",
    coverGradient: "from-[#3d4f5f] to-[#4a525a]",
    coverIcon: "★",
    component: () => import("./daring-firewall"),
    sidebar: [
      {
        title: "Posts",
        links: [
          { id: "overview", label: "Top" },
          { id: "post-middledot", label: "★ The Middle Dot" },
          { id: "post-dots", label: "Password Dots" },
          { id: "post-nautilus", label: "★ 1px Off-Center" },
          { id: "post-wallpaper", label: "The Newt Wallpaper" },
          { id: "post-hotcorner", label: "★ Hot Corner" },
          { id: "post-scrollbar", label: "The Scrollbar Situation" },
          { id: "post-shuttleworth", label: "★ Better Than Ever" },
          { id: "post-list", label: "The Opinionated List" },
        ],
      },
    ],
  },
  {
    slug: "mean-jerk-time",
    title: "Mean Jerk Time: A Mathematical Analysis",
    subtitle: "Preprint",
    date: "March 2026",
    category: "Research",
    description:
      "Optimal Prompt Throughput for N Startups with a Single API Key. We prove that 96.4% of startups are building the same four apps.",
    coverGradient: "from-[#1a1a1a] to-[#1a5276]",
    coverIcon: "∫",
    component: () => import("./mean-jerk-time"),
    sidebar: [
      {
        title: "Paper",
        links: [
          { id: "overview", label: "Abstract" },
          { id: "introduction", label: "1. Introduction" },
          { id: "naive-model", label: "2. The Naive Model" },
          { id: "parallelism", label: "3. The Parallelism Trap" },
          { id: "context-window", label: "4. Context Window Bottleneck" },
          { id: "middle-out", label: "5. The Middle-Out Insight" },
          { id: "revised-model", label: "6. Revised Model" },
          { id: "discussion", label: "7. Discussion" },
          { id: "conclusion", label: "8. Conclusion" },
        ],
      },
    ],
  },
  {
    slug: "git-merge-pray",
    title: "Introducing git merge --pray",
    subtitle: "The GitHub Blog",
    date: "March 2026",
    category: "Engineering",
    description:
      "Conflict resolution for the age of AI-assisted development. When understanding the code isn't an option, faith is a feature.",
    coverGradient: "from-[#0d1117] to-[#161b22]",
    coverIcon: "🙏",
    component: () => import("./git-merge-pray"),
    sidebar: [
      {
        title: "Article",
        links: [
          { id: "overview", label: "Introduction" },
          { id: "motivation", label: "Motivation" },
          { id: "how-it-works", label: "How It Works" },
          { id: "faith-levels", label: "Faith Levels" },
          { id: "algorithm", label: "Resolution Algorithm" },
          { id: "copilot-integration", label: "Copilot Integration" },
          { id: "hooks", label: "New Git Hooks" },
          { id: "configuration", label: "Configuration" },
          { id: "metrics", label: "Beta Metrics" },
          { id: "roadmap", label: "Roadmap" },
          { id: "getting-started", label: "Getting Started" },
        ],
      },
    ],
  },
  {
    slug: "vibe-manifesto",
    title: "Manifesto for Vibe-Driven Software Development",
    subtitle: "vibemanifesto.org",
    date: "March 2026",
    category: "Methodology",
    description:
      "We are uncovering better ways of developing software by prompting for it and seeing what happens. Prompts over Plans. Instant Gratification over Maintainable Software.",
    coverGradient: "from-[#8a7d62] to-[#6b6248]",
    coverIcon: "📜",
    component: () => import("./vibe-manifesto"),
    sidebar: [
      {
        title: "Manifesto",
        links: [
          { id: "overview", label: "The Manifesto" },
          { id: "principles", label: "Twelve Principles" },
          { id: "signatories", label: "Signatories" },
          { id: "history", label: "History" },
        ],
      },
    ],
  },
  {
    slug: "p95-emoji-latency",
    title: "P95 Emoji Latency",
    subtitle: "Engagefully Engineering Blog",
    date: "March 2026",
    category: "Observability",
    description:
      "How we monitor Slack engagement at scale. An observability-first approach to measuring how fast your team reacts with 🔥 and whether the 👀 ever converts to an actual reply.",
    coverGradient: "from-[#0f172a] to-[#1e293b]",
    coverIcon: "📊",
    component: () => import("./p95-emoji-latency"),
    sidebar: [
      {
        title: "Article",
        links: [
          { id: "overview", label: "Overview" },
          { id: "key-metrics", label: "Key Metrics" },
          { id: "understanding", label: "Understanding Emoji Latency" },
          { id: "fire-inflation", label: "The 🔥 Inflation Problem" },
          { id: "slo-framework", label: "SLO Framework" },
          { id: "incident", label: "Incident Report" },
          { id: "emoji-funnel", label: "The Emoji Funnel" },
          { id: "channel-analytics", label: "Channel Analytics" },
          { id: "salute-emergence", label: "The 🫡 Emergence" },
          { id: "roadmap", label: "Roadmap" },
          { id: "conclusion", label: "Conclusion" },
        ],
      },
    ],
  },
];

export function getPost(slug: string): PostMeta | undefined {
  return posts.find((p) => p.slug === slug);
}
