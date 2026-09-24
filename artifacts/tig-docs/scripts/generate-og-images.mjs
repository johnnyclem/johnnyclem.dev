import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "og");

const posts = [
  {
    slug: "terminal-interface-guidelines",
    title: "Terminal Interface\nGuidelines",
    category: "DESIGN",
    icon: ">_",
    gradient: ["#1e1e2e", "#313244"],
  },
  {
    slug: "vibescriptjs",
    title: "VibeScriptJS",
    category: "DEVELOPER TOOLS",
    icon: "V",
    gradient: ["#0a0a1a", "#1a1035"],
  },
  {
    slug: "chaintime-protocol",
    title: "ChainTime\nProtocol API",
    category: "WEB3 / API",
    icon: "⧖",
    gradient: ["#1b1b1b", "#2d1a00"],
  },
  {
    slug: "docs-docs",
    title: "Documentation:\nA Documentation",
    category: "DOCUMENTATION",
    icon: "📄",
    gradient: ["#20232a", "#25c2a0"],
  },
  {
    slug: "orbly",
    title: "Orbly",
    category: "PROJECT MANAGEMENT",
    icon: "📋",
    gradient: ["#0d0d0d", "#1a1a2e"],
  },
  {
    slug: "glean-in",
    title: "Glean In",
    category: "BUSINESS / SELF-HELP",
    icon: "📖",
    gradient: ["#1a1a2e", "#16213e"],
  },
  {
    slug: "vibe-up",
    title: "Vibe Up",
    category: "METHODOLOGY / SATIRE",
    icon: "▲",
    gradient: ["#2c1810", "#4a2c1a"],
  },
  {
    slug: "fontmid",
    title: "FontMid",
    category: "DEVELOPER TOOLS",
    icon: "—",
    gradient: ["#1b2a4a", "#243b5e"],
  },
  {
    slug: "daring-firewall",
    title: "Daring Firewall",
    category: "DESIGN CRITICISM",
    icon: "★",
    gradient: ["#3d4f5f", "#4a525a"],
  },
  {
    slug: "mean-jerk-time",
    title: "Mean Jerk Time:\nA Mathematical\nAnalysis",
    category: "RESEARCH",
    icon: "∫",
    gradient: ["#1a1a1a", "#1a5276"],
  },
  {
    slug: "git-merge-pray",
    title: "Introducing\ngit merge --pray",
    category: "ENGINEERING",
    icon: "🙏",
    gradient: ["#0d1117", "#161b22"],
  },
  {
    slug: "vibe-manifesto",
    title: "Manifesto for\nVibe-Driven Software\nDevelopment",
    category: "METHODOLOGY",
    icon: "📜",
    gradient: ["#8a7d62", "#6b6248"],
  },
  {
    slug: "p95-emoji-latency",
    title: "P95 Emoji Latency",
    category: "OBSERVABILITY",
    icon: "📊",
    gradient: ["#0f172a", "#1e293b"],
  },
];

const blogPosts = [
  {
    slug: "the-court-reporter",
    title: "The Court\nReporter",
    category: "ESSAY · AI / ENGINEERING",
    icon: "⚖",
    gradient: ["#04070a", "#0a2620"],
  },
  {
    slug: "press-stenographer",
    title: "Stenographer:\nThe Truth Ledger",
    category: "PRESS · OPEN SOURCE",
    icon: "⎘",
    gradient: ["#04070a", "#0a2b28"],
  },
  {
    slug: "press-short-hand",
    title: "Short-hand:\nCorrection Tombstones",
    category: "PRESS · OPEN SOURCE",
    icon: "≡",
    gradient: ["#04070a", "#0a2b28"],
  },
  {
    slug: "press-smallchat",
    title: "Smallchat:\nReading the Ledger",
    category: "PRESS · OPEN SOURCE",
    icon: "◎",
    gradient: ["#04070a", "#0a2b28"],
  },
  {
    slug: "press-polytician",
    title: "Polytician:\nWhere the Tombstone\nStands",
    category: "PRESS · OPEN SOURCE",
    icon: "◇",
    gradient: ["#04070a", "#0a2b28"],
  },
  {
    slug: "git-for-a-mind",
    title: "Git for a Mind",
    category: "ESSAY · AI / ENGINEERING",
    icon: "⎇",
    gradient: ["#04070a", "#0a2620"],
  },
  {
    slug: "the-concussion-protocol",
    title: "The Concussion\nProtocol",
    category: "ESSAY · AI / MEMORY",
    icon: "🩺",
    gradient: ["#04070a", "#0a2b28"],
  },
  {
    slug: "the-language-that-taught-me-to-think",
    title: "The Language That\nTaught Me to Think",
    category: "ESSAY",
    icon: "💬",
    gradient: ["#06070a", "#111827"],
  },
  {
    slug: "agent-tool-problem",
    title: "Your Agent Has\na Tool Problem",
    category: "AI / OPEN SOURCE",
    icon: "🔧",
    gradient: ["#0c1220", "#1a2744"],
  },
  {
    slug: "gastown-merge-queue",
    title: "Then God Told\nSteve Yegge to\nBuild an Ark",
    category: "AI / ENGINEERING",
    icon: "🏗️",
    gradient: ["#1a0f0a", "#2d1810"],
  },
];

function createSvg(post, section) {
  const [c1, c2] = post.gradient;
  const lines = post.title.split("\n");
  const fontSize = lines.some((l) => l.length > 20) ? 56 : 64;
  const lineHeight = fontSize * 1.15;
  const titleY = 150;
  const footer = section === "blog" ? "@johnnyclem · Blog" : "@johnnyclem · DX Review";

  const titleLines = lines
    .map(
      (line, i) =>
        `<text x="80" y="${titleY + i * lineHeight}" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="${fontSize}" font-weight="800" fill="white">${escapeXml(line)}</text>`,
    )
    .join("\n    ");

  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <text x="80" y="100" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="600" fill="rgba(255,255,255,0.5)" letter-spacing="3">${escapeXml(post.category)}</text>
  ${titleLines}
  <text x="80" y="560" font-family="Inter, system-ui, sans-serif" font-size="15" font-weight="500" fill="rgba(255,255,255,0.35)">${footer}</text>
  <text x="1100" y="570" font-family="serif" font-size="80" fill="rgba(255,255,255,0.2)" text-anchor="middle">${escapeXml(post.icon)}</text>
</svg>`;
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function main() {
  const { mkdirSync } = await import("fs");
  mkdirSync(outDir, { recursive: true });

  for (const post of posts) {
    const svg = createSvg(post, "dx");
    const outPath = path.join(outDir, `${post.slug}.png`);
    await sharp(Buffer.from(svg)).png().toFile(outPath);
    console.log(`Generated: ${post.slug}.png`);
  }

  for (const post of blogPosts) {
    const svg = createSvg(post, "blog");
    const outPath = path.join(outDir, `blog-${post.slug}.png`);
    await sharp(Buffer.from(svg)).png().toFile(outPath);
    console.log(`Generated: blog-${post.slug}.png`);
  }

  console.log("Done! All OG images generated.");
}

main().catch(console.error);
