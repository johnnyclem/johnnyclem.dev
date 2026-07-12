import type { Plugin } from "vite";
import fs from "fs";
import path from "path";

const SITE_NAME = "johnnyclem.dev";
const SITE_DESCRIPTION =
  "Developer experience reviews, blog, open source projects, and work portfolio by Johnny Clem.";
const SITE_AUTHOR = "@johnnyclem";

interface PostOG {
  slug: string;
  title: string;
  description: string;
}

const postsMeta: PostOG[] = [
  {
    slug: "terminal-interface-guidelines",
    title: "Terminal Interface Guidelines",
    description:
      "Designing immersive, pixel-considered experiences within the profound constraint of a fixed-width character grid.",
  },
  {
    slug: "vibescriptjs",
    title: "VibeScriptJS",
    description:
      "A next-generation application development framework built on the principle that code is an implementation detail.",
  },
  {
    slug: "chaintime-protocol",
    title: "ChainTime Protocol API",
    description:
      "Decentralized, consensus-validated, cryptographically verifiable temporal data for applications that require trustless certainty about what time it is.",
  },
  {
    slug: "docs-docs",
    title: "Documentation: A Documentation",
    description:
      "A comprehensive guide to understanding why you should write documentation, written instead of writing documentation.",
  },
  {
    slug: "orbly",
    title: "Orbly",
    description:
      "Cycle 43: Marcus's Vision. 2 of 31 tickets completed. Both were sticker orders.",
  },
  {
    slug: "glean-in",
    title: "Glean In",
    description:
      "How to LOOK like you work smarter, not harder. A guide to strategic disengagement, performative productivity, and enterprise search as a coping mechanism.",
  },
  {
    slug: "vibe-up",
    title: "Vibe Up",
    description:
      "Stop Shipping Software and Start Shipping Opinions. A book by 38signals about six-week cycles, fat marker vibes, and the content-product flywheel.",
  },
  {
    slug: "fontmid",
    title: "FontMid",
    description:
      "The Internet's Okayest Icon Library. 2,847 icons that do the job. Not beautifully. Not poorly. Just… adequately.",
  },
  {
    slug: "daring-firewall",
    title: "Daring Firewall",
    description:
      "By John Goober. A week of obsessive, pixel-level design criticism of Ubuntu Linux, written by the inventor of Markdown. The middle dot haunts him.",
  },
  {
    slug: "mean-jerk-time",
    title: "Mean Jerk Time: A Mathematical Analysis",
    description:
      "Optimal Prompt Throughput for N Startups with a Single API Key. We prove that 96.4% of startups are building the same four apps.",
  },
  {
    slug: "git-merge-pray",
    title: "Introducing git merge --pray",
    description:
      "Conflict resolution for the age of AI-assisted development. When understanding the code isn't an option, faith is a feature.",
  },
  {
    slug: "vibe-manifesto",
    title: "Manifesto for Vibe-Driven Software Development",
    description:
      "We are uncovering better ways of developing software by prompting for it and seeing what happens. Prompts over Plans. Instant Gratification over Maintainable Software.",
  },
  {
    slug: "p95-emoji-latency",
    title: "P95 Emoji Latency",
    description:
      "How we monitor Slack engagement at scale. An observability-first approach to measuring how fast your team reacts with 🔥 and whether the 👀 ever converts to an actual reply.",
  },
];

const blogPostsMeta: PostOG[] = [
  {
    slug: "git-for-a-mind",
    title: "Git for a Mind",
    description:
      "The companion to The Concussion Protocol. What it takes to build grounding as code: a deterministic gate that checks the pause, corroboration by genuinely independent witnesses, and a tamper-evident, git-shaped log. Concept and implementation as the same claim.",
  },
  {
    slug: "the-concussion-protocol",
    title: "The Concussion Protocol",
    description:
      "A late-night conversation with an AI about the things it can't see, including itself. On confabulation, unreliable self-report, and why the record has to live outside the process that generated it.",
  },
  {
    slug: "the-language-that-taught-me-to-think",
    title: "The Language That Taught Me to Think",
    description:
      "On Smalltalk, objc_msgSend, and why tool dispatch was always message passing. How Objective-C taught me to code — and how that lesson became smallchat.",
  },
  {
    slug: "agent-tool-problem",
    title: "Your Agent Has a Tool Problem",
    description:
      "The \"just put all 50 tools in the prompt\" approach doesn't scale. I built smallchat — a tool compiler inspired by the Objective-C runtime's message dispatch — to fix it.",
  },
  {
    slug: "ai-assistant-forgot-conversation",
    title: "My AI Assistant Forgot Our Conversation — But Its Wiki Survived",
    description:
      "I built an AI assistant. We talked for hours. It pushed commits, set up wiki memory, patched bugs. Then it restarted and forgot everything. But the wiki survived. That's the signal.",
  },
  {
    slug: "gastown-merge-queue",
    title:
      "Then God Told Steve Yegge to Build an Ark: Gastown and the Industrialization of the Merge Queue",
    description:
      "Most of the industry is busy building better text editors. Steve Yegge is solving for the system as a whole — an industrial factory to manage the monkey knife fight of 50 AI agents merging into main.",
  },
];

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function ogTagsPlugin(): Plugin {
  let resolvedBase = "/";
  let outDir = "";

  return {
    name: "og-tags",
    configResolved(config) {
      resolvedBase = config.base;
      outDir = config.build.outDir;
    },
    transformIndexHtml(html) {
      const siteUrl = process.env.VITE_SITE_URL || "";
      const baseUrl = siteUrl
        ? `${siteUrl.replace(/\/$/, "")}${resolvedBase}`
        : resolvedBase;
      const ogImageUrl = `${baseUrl.replace(/\/$/, "")}/opengraph.jpg`;

      const tags = [
        `<meta name="description" content="${escapeHtml(SITE_DESCRIPTION)}" />`,
        `<meta name="author" content="${SITE_AUTHOR}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
        `<meta property="og:title" content="${escapeHtml(SITE_NAME)}" />`,
        `<meta property="og:description" content="${escapeHtml(SITE_DESCRIPTION)}" />`,
        `<meta property="og:url" content="${baseUrl}" />`,
        `<meta property="og:image" content="${ogImageUrl}" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:creator" content="${SITE_AUTHOR}" />`,
        `<meta name="twitter:title" content="${escapeHtml(SITE_NAME)}" />`,
        `<meta name="twitter:description" content="${escapeHtml(SITE_DESCRIPTION)}" />`,
        `<meta name="twitter:image" content="${ogImageUrl}" />`,
      ].join("\n    ");

      return html.replace("</head>", `    ${tags}\n  </head>`);
    },
    writeBundle() {
      if (!outDir) return;

      const indexPath = path.resolve(outDir, "index.html");
      if (!fs.existsSync(indexPath)) return;

      const baseHtml = fs.readFileSync(indexPath, "utf-8");

      const siteUrl = process.env.VITE_SITE_URL || "";
      const baseUrl = siteUrl
        ? `${siteUrl.replace(/\/$/, "")}${resolvedBase}`
        : resolvedBase;
      const base = baseUrl.replace(/\/$/, "");

      function writePostHtml(
        post: PostOG,
        urlPath: string,
        ogImagePath: string,
      ) {
        const postTitle = `${post.title} — ${SITE_NAME}`;
        const postUrl = `${base}${urlPath}`;
        const postOgImage = `${base}${ogImagePath}`;
        const escaped = {
          title: escapeHtml(postTitle),
          description: escapeHtml(post.description),
        };

        const postHtml = baseHtml
          .replace(
            /<meta property="og:title" content="[^"]*"/,
            `<meta property="og:title" content="${escaped.title}"`,
          )
          .replace(
            /<meta property="og:description" content="[^"]*"/,
            `<meta property="og:description" content="${escaped.description}"`,
          )
          .replace(
            /<meta property="og:url" content="[^"]*"/,
            `<meta property="og:url" content="${postUrl}"`,
          )
          .replace(
            /<meta property="og:image" content="[^"]*"/,
            `<meta property="og:image" content="${postOgImage}"`,
          )
          .replace(
            /<meta name="twitter:title" content="[^"]*"/,
            `<meta name="twitter:title" content="${escaped.title}"`,
          )
          .replace(
            /<meta name="twitter:description" content="[^"]*"/,
            `<meta name="twitter:description" content="${escaped.description}"`,
          )
          .replace(
            /<meta name="twitter:image" content="[^"]*"/,
            `<meta name="twitter:image" content="${postOgImage}"`,
          )
          .replace(
            /<meta name="description" content="[^"]*"/,
            `<meta name="description" content="${escaped.description}"`,
          )
          .replace(/<title>[^<]*<\/title>/, `<title>${escaped.title}</title>`);

        const segments = urlPath.replace(/^\//, "").split("/");
        const postDir = path.resolve(outDir, ...segments);
        fs.mkdirSync(postDir, { recursive: true });
        fs.writeFileSync(path.resolve(postDir, "index.html"), postHtml);
      }

      for (const post of postsMeta) {
        writePostHtml(
          post,
          `/posts/${post.slug}`,
          `/og/${post.slug}.png`,
        );
      }

      for (const post of blogPostsMeta) {
        writePostHtml(
          post,
          `/blog/${post.slug}`,
          `/og/blog-${post.slug}.png`,
        );
      }
    },
  };
}
