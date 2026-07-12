export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  externalUrl?: string;
  fullPage?: boolean;
  component: () => Promise<{ default: React.ComponentType }>;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "git-for-a-mind",
    title: "Git for a Mind",
    description:
      "The companion to The Concussion Protocol. What it takes to build grounding as code: a deterministic gate that checks the pause, corroboration by genuinely independent witnesses, and a tamper-evident, git-shaped log. Concept and implementation as the same claim.",
    date: "July 10, 2026",
    readTime: "9 min read",
    tags: ["AI", "Engineering", "Essay"],
    fullPage: true,
    component: () => import("./posts/git-for-a-mind"),
  },
  {
    slug: "the-concussion-protocol",
    title: "The Concussion Protocol",
    description:
      "A late-night conversation with an AI about the things it can't see, including itself. On confabulation, unreliable self-report, and why the record has to live outside the process that generated it.",
    date: "July 3, 2026",
    readTime: "10 min read",
    tags: ["AI", "Memory", "Essay"],
    fullPage: true,
    component: () => import("./posts/the-concussion-protocol"),
  },
  {
    slug: "the-language-that-taught-me-to-think",
    title: "The Language That Taught Me to Think",
    description:
      "On Smalltalk, objc_msgSend, and why tool dispatch was always message passing. How Objective-C taught me to code — and how that lesson became smallchat.",
    date: "March 31, 2026",
    readTime: "12 min read",
    tags: ["Swift", "Objective-C", "AI", "Open Source"],
    fullPage: true,
    component: () => import("./posts/the-language-that-taught-me-to-think"),
  },
  {
    slug: "agent-tool-problem",
    title: "Your Agent Has a Tool Problem",
    description:
      "The \"just put all 50 tools in the prompt\" approach doesn't scale. I built smallchat — a tool compiler inspired by the Objective-C runtime's message dispatch — to fix it.",
    date: "March 31, 2026",
    readTime: "7 min read",
    tags: ["AI", "Open Source", "MCP"],
    component: () => import("./posts/agent-tool-problem"),
  },
  {
    slug: "ai-assistant-forgot-conversation",
    title: "My AI Assistant Forgot Our Conversation — But Its Wiki Survived",
    description:
      "I built an AI assistant. We talked for hours. It pushed commits, set up wiki memory, patched bugs. Then it restarted and forgot everything. But the wiki survived. That's the signal.",
    date: "April 9, 2026",
    readTime: "4 min read",
    tags: ["AI", "Agents", "Memory"],
    component: () => import("./posts/ai-assistant-forgot-conversation"),
  },
  {
    slug: "gastown-merge-queue",
    title:
      "Then God told Steve Yegge to build an Ark: Gastown and the Industrialization of the Merge Queue",
    description:
      "Most of the industry is busy building better text editors. Steve Yegge is solving for the system as a whole — an industrial factory to manage the monkey knife fight of 50 AI agents merging into main.",
    date: "January 6, 2026",
    readTime: "6 min read",
    tags: ["AI", "Engineering", "DevTools"],
    externalUrl:
      "https://medium.com/@johnnyclem/then-god-told-steve-yegge-to-build-an-ark-gastown-and-the-industrialization-of-the-merge-queue-0b7ad30e17f6",
    component: () => import("./posts/gastown-merge-queue"),
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
