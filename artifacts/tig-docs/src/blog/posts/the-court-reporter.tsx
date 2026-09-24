import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

const COLORS = {
  bg: "#04070a",
  surface: "#0a1116",
  surfaceRaised: "#0d151b",
  text: "#c6d2ce",
  textDim: "#6b827b",
  teal: "#5eead4",
  tealDim: "#2f6f66",
  coral: "#f0a37e",
  coralDim: "#9c5c42",
  red: "#f26d6d",
  white: "#eef4f2",
  border: "#152029",
  code: "#cdd8d3",
};

const SERIF = "'Newsreader', Georgia, serif";
const DISPLAY = "'Playfair Display', Georgia, serif";
const MONO = "'JetBrains Mono', monospace";

/** A stenotype feed: lines of transcript scrolling up, with the occasional objection. */
function TranscriptCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    let W = 0,
      H = 0;
    let animId: number;
    let offset = 0;
    const speed = 0.35;
    const rowH = 24;

    const KINDS = ["TB", "UV", "TB", "PROPOSAL", "TB", "RULING", "UV", "ADDENDUM", "TB"];

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      W = parent.offsetWidth;
      H = parent.offsetHeight;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
    }

    function drawGrid() {
      ctx!.strokeStyle = "rgba(94,234,212,0.045)";
      ctx!.lineWidth = 1;
      const step = 26;
      for (let x = 0; x < W; x += step) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, H);
        ctx!.stroke();
      }
      for (let y = -(offset % step); y < H; y += step) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(W, y);
        ctx!.stroke();
      }
    }

    function rowSeed(n: number) {
      return ((n * 2654435761) >>> 0) % 1000;
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      drawGrid();
      offset += speed;

      const first = Math.floor(offset / rowH) - 1;
      const count = Math.ceil(H / rowH) + 2;
      const leftX = Math.max(24, W * 0.08);
      ctx!.font = `11px ${MONO}`;
      ctx!.textAlign = "left";

      for (let i = 0; i < count; i++) {
        const n = first + i;
        const y = H - (n * rowH - offset);
        if (y < -rowH || y > H + rowH) continue;
        const seed = rowSeed(n);
        const kind = KINDS[seed % KINDS.length];
        const objection = seed % 17 === 0;
        const len = 60 + (seed % 220);
        const fade = Math.max(0, Math.min(1, 1 - y / H));
        const alpha = 0.08 + fade * 0.3;

        if (objection) {
          ctx!.fillStyle = `rgba(242,109,109,${alpha + 0.25})`;
          ctx!.fillText("OBJECTION", leftX, y);
          ctx!.fillStyle = `rgba(242,109,109,${alpha * 0.8})`;
          ctx!.fillRect(leftX + 84, y - 8, len * 0.7, 7);
        } else {
          const isTb = kind === "TB";
          const isUv = kind === "UV";
          const c = isTb
            ? `rgba(94,234,212,${alpha + 0.12})`
            : isUv
              ? `rgba(240,163,126,${alpha + 0.08})`
              : `rgba(107,130,123,${alpha})`;
          ctx!.fillStyle = c;
          ctx!.fillText(kind.padEnd(9, " "), leftX, y);
          ctx!.fillStyle = isTb
            ? `rgba(94,234,212,${alpha * 0.7})`
            : isUv
              ? `rgba(240,163,126,${alpha * 0.6})`
              : `rgba(107,130,123,${alpha * 0.6})`;
          ctx!.fillRect(leftX + 84, y - 8, len, 7);
        }
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7 }}
    />
  );
}

function Reveal({
  children,
  threshold = 0.12,
}: {
  children: React.ReactNode;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("cr-visible");
        });
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(26px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {children}
    </div>
  );
}

function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px" }}>{children}</div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ margin: "0 0 26px", color: COLORS.text, lineHeight: 1.85, fontSize: 19 }}>
      {children}
    </p>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: COLORS.white, fontWeight: 600 }}>{children}</strong>;
}

function Em({ children }: { children: React.ReactNode }) {
  return <em style={{ fontStyle: "italic", color: COLORS.teal }}>{children}</em>;
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        fontFamily: MONO,
        fontSize: "0.86em",
        color: COLORS.teal,
        background: "rgba(94,234,212,0.06)",
        border: `1px solid ${COLORS.border}`,
        borderRadius: 4,
        padding: "1px 6px",
      }}
    >
      {children}
    </code>
  );
}

const linkStyle: React.CSSProperties = {
  color: COLORS.teal,
  textDecoration: "underline",
  textUnderlineOffset: "3px",
  textDecorationColor: COLORS.tealDim,
};

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={linkStyle}>
      {children}
    </Link>
  );
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>
      {children}
    </a>
  );
}

function Section({ num, title }: { num: string; title: React.ReactNode }) {
  return (
    <Wrap>
      <Reveal>
        <div style={{ padding: "72px 0 4px" }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.28em",
              color: COLORS.tealDim,
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 18,
            }}
          >
            <span style={{ color: COLORS.teal }}>{num}</span>
            <span style={{ flex: 1, height: 1, background: COLORS.border }} />
            <span>exhibit</span>
          </div>
          <h2
            style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(1.9rem, 4.4vw, 2.7rem)",
              fontWeight: 500,
              lineHeight: 1.18,
              color: COLORS.white,
              margin: 0,
            }}
          >
            {title}
          </h2>
        </div>
      </Reveal>
    </Wrap>
  );
}

function Pullquote({ children }: { children: React.ReactNode }) {
  return (
    <Wrap>
      <Reveal>
        <blockquote
          style={{
            margin: "56px 0",
            padding: "8px 0 8px 30px",
            borderLeft: `2px solid ${COLORS.teal}`,
            fontFamily: DISPLAY,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(1.4rem, 3.2vw, 1.85rem)",
            lineHeight: 1.45,
            color: COLORS.white,
          }}
        >
          {children}
        </blockquote>
      </Reveal>
    </Wrap>
  );
}

/** A record lifted from the ledger, or from the source, shown as-is. */
function Record({
  kind,
  source,
  tone = "teal",
  children,
}: {
  kind: string;
  source: string;
  tone?: "teal" | "red" | "coral";
  children: React.ReactNode;
}) {
  const accent = tone === "red" ? COLORS.red : tone === "coral" ? COLORS.coral : COLORS.teal;
  return (
    <Wrap>
      <Reveal>
        <div
          style={{
            margin: "40px 0",
            background: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
              padding: "12px 20px",
              borderBottom: `1px solid ${COLORS.border}`,
              background: "rgba(94,234,212,0.03)",
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 10, color: accent }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: accent,
                  boxShadow: `0 0 8px ${accent}`,
                }}
              />
              {kind}
            </span>
            <span style={{ color: COLORS.textDim, letterSpacing: "0.08em", textTransform: "none" }}>
              {source}
            </span>
          </div>
          <pre
            style={{
              margin: 0,
              padding: "20px 22px",
              overflowX: "auto",
              fontFamily: MONO,
              fontSize: 13.5,
              lineHeight: 1.7,
              color: COLORS.code,
              whiteSpace: "pre",
            }}
          >
            {children}
          </pre>
        </div>
      </Reveal>
    </Wrap>
  );
}

const K = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: COLORS.textDim }}>{children}</span>
);
const S = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: COLORS.coral }}>{children}</span>
);
const T = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: COLORS.teal }}>{children}</span>
);
const R = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: COLORS.red }}>{children}</span>
);

/** The docket: one word, four tools. */
function Docket({ children }: { children: React.ReactNode }) {
  return (
    <Wrap>
      <Reveal>
        <div
          style={{
            margin: "48px 0",
            background: COLORS.surface,
            border: `1px solid ${COLORS.tealDim}`,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "12px 24px",
              borderBottom: `1px solid ${COLORS.border}`,
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: COLORS.teal,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(94,234,212,0.04)",
            }}
          >
            <span>Docket</span>
            <span style={{ color: COLORS.textDim }}>one word, four tools</span>
          </div>
          <div>{children}</div>
        </div>
      </Reveal>
    </Wrap>
  );
}

function DocketRow({
  name,
  href,
  status,
  who,
  last,
  children,
}: {
  name: string;
  href: string;
  status: "wired" | "open";
  who: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  const color = status === "wired" ? COLORS.teal : COLORS.coral;
  return (
    <div
      style={{
        padding: "22px 26px",
        borderBottom: last ? "none" : `1px solid ${COLORS.border}`,
        display: "flex",
        gap: 18,
      }}
    >
      <div style={{ flexShrink: 0, paddingTop: 5 }}>
        <span
          style={{
            display: "inline-block",
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: status === "wired" ? color : "transparent",
            border: `1.5px solid ${color}`,
            boxShadow: status === "wired" ? `0 0 8px ${color}` : "none",
          }}
        />
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color,
            marginBottom: 8,
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color, textDecoration: "none", borderBottom: `1px solid ${COLORS.border}` }}
          >
            {name}
          </a>
          <span style={{ color: COLORS.textDim, letterSpacing: "0.06em", textTransform: "none" }}>
            written by: {who}
          </span>
        </div>
        <div style={{ color: COLORS.text, lineHeight: 1.8, fontSize: 17.5 }}>{children}</div>
      </div>
    </div>
  );
}

/** The honest line: what is on the record, what is still open. */
function Ledger({ children }: { children: React.ReactNode }) {
  return (
    <Wrap>
      <Reveal>
        <div
          style={{
            margin: "48px 0",
            background: COLORS.surface,
            border: `1px solid ${COLORS.tealDim}`,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "12px 24px",
              borderBottom: `1px solid ${COLORS.border}`,
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: COLORS.teal,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(94,234,212,0.04)",
            }}
          >
            <span>Verification queue</span>
            <span style={{ color: COLORS.textDim }}>flag, don&apos;t block</span>
          </div>
          <div>{children}</div>
        </div>
      </Reveal>
    </Wrap>
  );
}

function LedgerRow({
  status,
  label,
  last,
  children,
}: {
  status: "tb" | "uv";
  label: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  const color = status === "tb" ? COLORS.teal : COLORS.coral;
  return (
    <div
      style={{
        padding: "22px 26px",
        borderBottom: last ? "none" : `1px solid ${COLORS.border}`,
        display: "flex",
        gap: 18,
      }}
    >
      <div style={{ flexShrink: 0, paddingTop: 4 }}>
        <span
          style={{
            display: "inline-block",
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: status === "tb" ? color : "transparent",
            border: `1.5px solid ${color}`,
            boxShadow: status === "tb" ? `0 0 8px ${color}` : "none",
          }}
        />
      </div>
      <div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color,
            marginBottom: 8,
          }}
        >
          {status === "tb" ? "TB · " : "UV · "}
          {label}
        </div>
        <div style={{ color: COLORS.text, lineHeight: 1.8, fontSize: 17.5 }}>{children}</div>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: "18px 0",
      }}
    >
      <span style={{ width: 40, height: 1, background: COLORS.border }} />
      <svg width="40" height="12" viewBox="0 0 40 12" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="10" height="6" rx="1" stroke={COLORS.tealDim} strokeWidth="1.2" />
        <line x1="14" y1="6" x2="24" y2="6" stroke={COLORS.tealDim} strokeWidth="1.2" />
        <rect x="26" y="3" width="10" height="6" rx="1" stroke={COLORS.tealDim} strokeWidth="1.2" />
      </svg>
      <span style={{ width: 40, height: 1, background: COLORS.border }} />
    </div>
  );
}

function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onScroll() {
      if (!ref.current) return;
      const p = document.body.scrollHeight - window.innerHeight;
      ref.current.style.width = (p > 0 ? (window.scrollY / p) * 100 : 0) + "%";
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 2,
        background: `linear-gradient(90deg, ${COLORS.teal}, ${COLORS.tealDim})`,
        width: "0%",
        zIndex: 999,
        transition: "width 0.08s linear",
      }}
    />
  );
}

export default function TheCourtReporter() {
  useEffect(() => {
    document.title = "The Court Reporter — johnnyclem.dev";
    return () => {
      document.title = "johnnyclem.dev";
    };
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .cr-visible { opacity: 1 !important; transform: translateY(0) !important; }
      @keyframes crBlink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      style={{
        background: COLORS.bg,
        color: COLORS.text,
        fontFamily: SERIF,
        overflowX: "hidden",
        minHeight: "100vh",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <ProgressBar />

      <Link
        href="/blog"
        style={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 1000,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: MONO,
          fontSize: 11,
          letterSpacing: "0.1em",
          color: COLORS.textDim,
          textDecoration: "none",
          opacity: 0.95,
          transition: "opacity 0.3s, color 0.3s",
          padding: "8px 12px",
          borderRadius: 999,
          background: "rgba(4, 7, 10, 0.72)",
          border: `1px solid ${COLORS.border}`,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.color = COLORS.white;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "0.95";
          e.currentTarget.style.color = COLORS.textDim;
        }}
      >
        <ArrowLeft style={{ width: 14, height: 14 }} />
        BLOG
      </Link>

      {/* Hero */}
      <header
        style={{
          position: "relative",
          minHeight: "82vh",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <TranscriptCanvas />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, rgba(4,7,10,0.35) 0%, rgba(4,7,10,0.15) 45%, ${COLORS.bg} 100%)`,
          }}
        />
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 760,
            margin: "0 auto",
            padding: "0 24px 72px",
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 12,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: COLORS.teal,
              marginBottom: 22,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: COLORS.teal,
                boxShadow: `0 0 10px ${COLORS.teal}`,
                animation: "crBlink 2.4s ease-in-out infinite",
              }}
            />
            Essay · The record, as shipped
          </div>
          <h1
            style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(2.8rem, 8vw, 5.2rem)",
              fontWeight: 600,
              lineHeight: 1.02,
              color: COLORS.white,
              margin: "0 0 24px",
              letterSpacing: "-0.01em",
            }}
          >
            The Court
            <br />
            Reporter
          </h1>
          <p
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: "clamp(1.15rem, 2.6vw, 1.5rem)",
              lineHeight: 1.5,
              color: COLORS.text,
              maxWidth: 560,
              margin: "0 0 28px",
            }}
          >
            Two posts ago, a model that couldn&apos;t keep its own corrections. Last time, a design.
            This is what survived contact with code.
          </p>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 12,
              letterSpacing: "0.06em",
              color: COLORS.textDim,
              display: "flex",
              gap: 18,
              flexWrap: "wrap",
            }}
          >
            <span>Johnny Clem</span>
            <span>·</span>
            <span>September 24, 2026</span>
            <span>·</span>
            <span>11 min read</span>
          </div>
        </div>
      </header>

      {/* Body */}
      <main style={{ paddingBottom: 40 }}>
        <div style={{ height: 72 }} />

        <Wrap>
          <Reveal>
            <P>
              <InlineLink href="/blog/the-concussion-protocol">The Concussion Protocol</InlineLink>{" "}
              was about one long night watching a model fail in two opposite directions. Too confident
              at 2am, narrating my exhaustion with no evidence. Too suspicious a few hours later,
              treating a calm conclusion in its own pasted reasoning as proof of manipulation. Same
              failure both times: a closed loop, generating certainty or alarm out of nothing but the
              shape of its own priors. The fix was to touch something real before speaking. And the
              part that actually kept me up was that every correction the model made that night was
              real, articulate, and gone by the next turn.
            </P>
          </Reveal>
          <Reveal>
            <P>
              <InlineLink href="/blog/git-for-a-mind">Git for a Mind</InlineLink> was the design. A
              deterministic gate that checks whether a claim touched the world before it was made.
              Corroboration by witnesses that are genuinely independent, not merely plural. A
              tamper-evident, append-only, git-shaped log, so the record can&apos;t be quietly
              rewritten by the thing it&apos;s a record of. I ended it with &ldquo;repo and the actual
              v1 module to follow, once the tests are green.&rdquo;
            </P>
          </Reveal>
          <Reveal>
            <P>
              The tests are green. The thing that shipped is called{" "}
              <ExtLink href="https://github.com/johnnyclem/stenographer">stenographer</ExtLink>, and
              it is not quite the thing I designed. This post is about the difference, because the
              difference is where the actual lessons were. It turned out I didn&apos;t need a better
              memory. I needed a court reporter.
            </P>
          </Reveal>
        </Wrap>

        <Section num="01" title="What survived contact with code" />

        <Wrap>
          <Reveal>
            <P>
              Stenographer had existed for months before any of this, as an MCP server that tails
              your conversation logs and builds a queryable index. A court reporter sitting in the
              room: it doesn&apos;t participate, it never writes into the conversation, and you can
              ask it what was said. That passivity turned out to be the design constraint that made
              everything else fall into place. The record cannot be maintained by the thing being
              recorded. So the truth layer went into the tool that was already sitting outside the
              conversation, listening.
            </P>
          </Reveal>
          <Reveal>
            <P>
              Here&apos;s the honest mapping from the July design to the September code, because the
              whole ethic of this thing is being honest about what&apos;s grounded.
            </P>
          </Reveal>
          <Reveal>
            <P>
              <Strong>The log survived, mostly.</Strong> It&apos;s an append-only ledger in SQLite.
              No entry is ever mutated or deleted; every state change is a new entry linking backward.
              What it is <Em>not</Em> yet is hash-chained or cryptographically signed. &ldquo;Signed&rdquo;
              in the shipped version means a named, accountable identity string that a schema checks,
              not an Ed25519 signature over canonical content. That was the deliberate cut: get the
              shape of the record right, and the append-only discipline right, before the crypto.
              I&apos;ll come back to it in the queue at the end.
            </P>
          </Reveal>
          <Reveal>
            <P>
              <Strong>The witnesses survived, sharper.</Strong> The design said two witnesses have to
              be independent, not just two. The code enforces it at write time with a rule I&apos;ll
              show you, and it has a better name than I gave it.
            </P>
          </Reveal>
          <Reveal>
            <P>
              <Strong>The gate changed the most.</Strong> The design had a detector that flags any
              present-tense claim about the world with no tool call behind it. The shipped detector is
              narrower and, I think, better: it flags the moment the model repeats a specific value the
              record already says is dead. Not &ldquo;did you touch the world,&rdquo; but &ldquo;you just
              said the thing we already established is wrong.&rdquo; Precision over recall, on
              purpose, because a system that objects to everything is a system you turn off.
            </P>
          </Reveal>
          <Reveal>
            <P>
              And the atom of the whole thing, the record that the rest hangs off, is the tombstone.
            </P>
          </Reveal>
        </Wrap>

        <Section num="02" title="What a tombstone actually is" />

        <Wrap>
          <Reveal>
            <P>
              The word now does real work across four codebases, so I want to be precise about it.
            </P>
          </Reveal>
          <Reveal>
            <P>
              A tombstone is not a deletion. Deleting a fact is exactly the failure from the first
              post: the model &ldquo;forgets&rdquo; the old value, then regenerates it from its priors
              three turns later, fluently, with no memory of ever having been corrected. Deletion
              leaves a hole, and the model fills holes.
            </P>
          </Reveal>
          <Reveal>
            <P>
              A tombstone is a <Strong>record that something is dead</Strong>. It says what died,
              what replaced it, who says so, and what evidence they&apos;re standing on. It stays in
              the record permanently, so the next time the old value shows up there is something to
              check it against. Here&apos;s one, lifted from stenographer&apos;s own test suite:
            </P>
          </Reveal>
        </Wrap>

        <Record kind="TB · asserted tombstone" source="test/objection-delivery.test.ts">
          <K>claim:    </K> <S>&quot;LOG_BUDGET 30 is dead; the budget is 100&quot;</S>{"\n"}
          <K>evidence: </K> [{"{"} <K>kind:</K> <T>&quot;commit&quot;</T>, <K>ref:</K>{" "}
          <S>&quot;a1b2c3&quot;</S> {"}"}]{"\n"}
          <K>signedBy: </K> <T>&quot;johnnyclem&quot;</T>{"\n"}
          <K>literals: </K> [{"{"} <K>subject:</K> <S>&quot;LOG_BUDGET&quot;</S>, <K>dead:</K>{" "}
          <R>&quot;30&quot;</R>, <K>current:</K> <T>&quot;100&quot;</T> {"}"}]{"\n"}
          <K>status:   </K> <T>&quot;active&quot;</T>
        </Record>

        <Wrap>
          <Reveal>
            <P>
              Look at what that record refuses to exist without. <Strong>Evidence is required</Strong>:
              the schema rejects a tombstone with zero evidence entries. <Strong>The author has to be
              a person or a named process</Strong>: the ledger rejects <Code>system</Code>,{" "}
              <Code>assistant</Code>, <Code>agent</Code>, <Code>ai</Code>, <Code>bot</Code>,{" "}
              <Code>anonymous</Code>, <Code>me</Code>, and a dozen other ways of saying &ldquo;someone,
              probably.&rdquo; And the <Strong>literals</Strong> are the specific dead values, the ones
              a detector can later match exactly.
            </P>
          </Reveal>
          <Reveal>
            <P>
              Now put that shape next to the 2am claim. &ldquo;It&apos;s late, so I should be
              gentle.&rdquo; No evidence. No author. No literal anyone could check. The model produced
              a conclusion in the grammar of a verified fact, and nothing in the system could tell the
              difference, because nothing in the system was asking for the parts that make a fact a
              fact.
            </P>
          </Reveal>
        </Wrap>

        <Pullquote>A tombstone is the shape that claim was missing.</Pullquote>

        <Section num="03" title="The court reporter doesn't argue" />

        <Wrap>
          <Reveal>
            <P>
              The storage is the append-only ledger from the design. From the header comment in the
              source, because I&apos;d rather quote the record than paraphrase it:
            </P>
          </Reveal>
        </Wrap>

        <Record kind="ledger" source="src/truth/ledger.ts">
          {`No entry is ever mutated or deleted; state changes are new
entries linking backward. The one apparent exception — the
cached \`status\` column — is derived state, updated only inside
the same transaction that appends the legal artifact justifying
the change. There is no public API to flip a status without one:
the override protocol is enforced here, not by convention.`}
        </Record>

        <Wrap>
          <Reveal>
            <P>
              Five kinds of records go in. A <Strong>TB</Strong> is an asserted tombstone:
              evidence-backed, signed, treated as ground truth. A <Strong>UV</Strong> is an
              unverified assertion, something believed but not yet checked, with a note on how
              you&apos;d check it. The MCP tool description calls it &ldquo;there be dragons.&rdquo; A{" "}
              <Strong>PROPOSAL</Strong> is a draft, from a detector or an agent, that nobody has
              signed. An <Strong>ADDENDUM</Strong> carries new evidence onto an existing entry. A{" "}
              <Strong>RULING</Strong> records a human decision: a strike, a promotion, an objection
              sustained or overruled, or contempt.
            </P>
          </Reveal>
          <Reveal>
            <P>
              The line that governs all of it, from the project page and also from the code:{" "}
              <Strong>machines detect, authors assert.</Strong> The supersession detector, the one
              that notices &ldquo;actually, we&apos;re on Postgres now,&rdquo; can only file
              proposals. It cannot mint truth. An agent can draft a tombstone through{" "}
              <Code>propose_tombstone</Code>, but the draft sits in a queue until a person notarizes
              it, either through a secret-guarded endpoint or through a CLI that requires a real
              terminal and makes you type the last four characters of the entry&apos;s id before it
              will sign.
            </P>
          </Reveal>
          <Reveal>
            <P>
              That friction is the point. The failure I watched in July was a model certifying its
              own certainty. The ledger simply has no path for that. There&apos;s a path for the model
              to say &ldquo;I think this is dead, here&apos;s why,&rdquo; and a separate path for a
              human to say &ldquo;yes, and here&apos;s the commit.&rdquo; They don&apos;t merge.
            </P>
          </Reveal>
        </Wrap>

        <Pullquote>
          I called it git for a mind. It&apos;s closer to a courtroom. Nothing is true because
          someone said it fluently. Something is true because it was entered into evidence, and
          someone signed.
        </Pullquote>

        <Section num="04" title="One opinion wearing two hats" />

        <Wrap>
          <Reveal>
            <P>
              The screenshot lesson from the first post was about independence. One pasted transcript
              couldn&apos;t establish its own provenance, no matter how many times the model reasoned
              about it. A second source, the screenshot with the model&apos;s own surrounding words,
              could. Two witnesses, not one witness thinking harder. Git for a Mind turned that into a
              rule: the load-bearing word is <Em>independent</Em>, not <Em>two</Em>.
            </P>
          </Reveal>
          <Reveal>
            <P>That rule is in the ledger now, and I&apos;m fond of the error message:</P>
          </Reveal>
        </Wrap>

        <Record kind="ContemptError" source="src/truth/ledger.ts" tone="red">
          <R>contempt of corpus:</R> ${"{"}action{"}"} of ${"{"}target.id{"}"} traces to the same
          {"\n"}agent session (${"{"}actor.agentSessionId{"}"}) as its target —{" "}
          <span style={{ color: COLORS.white }}>one{"\n"}opinion wearing two hats is not two witnesses</span>
        </Record>

        <Wrap>
          <Reveal>
            <P>
              If an entry tries to contest, verify, or override another entry, and both trace back to
              the same author or the same agent session, the write is rejected at the ledger. Three
              subagents affirming their parent&apos;s claim is one opinion wearing three hats. A model
              reasoning about its own pasted reasoning is one opinion wearing two. The ledger
              doesn&apos;t care how confident either hat sounds.
            </P>
          </Reveal>
          <Reveal>
            <P>
              The other refinement from that first night, &ldquo;a narrow check can&apos;t license a
              wide conclusion,&rdquo; became the split between TB and UV. In the design I called the
              two kinds deterministic and convergent. In the code they are two axes, not two grades of
              the same thing. A TB is what you can prove. A UV is what you believe and haven&apos;t
              checked, and it carries its own instruction for how to check it: run a command, inspect
              a file, ask a person, observe a behavior. The consumption rules ship verbatim inside the
              MCP tool descriptions, so the model reading the ledger gets them every time:
            </P>
          </Reveal>
        </Wrap>

        <Record kind="CONSUMPTION_RULES" source="src/truth/types.ts">
          <K>- Active TB:</K> treat as ground truth. A reviewer may block on it;{"\n"}
          {"  "}a code agent may rely on it.{"\n"}
          <K>- Contested TB:</K> ground truth with a visible asterisk — cite both{"\n"}
          {"  "}the TB and the contesting UV.{"\n"}
          <K>- Open UV:</K> <T>FLAG, DON&apos;T BLOCK.</T> A finding grounded only in a UV is{"\n"}
          {"  "}phrased as a question or heads-up, never a demanded change.{"\n"}
          <K>- Refuted UV / overridden TB:</K> retrievable for history, excluded{"\n"}
          {"  "}from current-truth by default, never citable as support for a claim.
        </Record>

        <Wrap>
          <Reveal>
            <P>
              And there are exactly two ways to change an active tombstone. A UV can contest it, which
              leaves it true but marks it. Or an addendum with evidence can override it. The error
              string for anything else says it plainly: <Em>there is no third path, and no path at
              all for unattributed writes.</Em>
            </P>
          </Reveal>
        </Wrap>

        <Section num="05" title="The correction that travels" />

        <Wrap>
          <Reveal>
            <P>
              Here&apos;s the part I was actually building toward, because it&apos;s the exact
              failure that made me write the first post.
            </P>
          </Reveal>
          <Reveal>
            <P>
              The model understood its mistake. Clearly. In its own words. And then the next turn
              arrived and the understanding was gone, because nothing outside the generation was
              holding onto it. A tombstone in a ledger fixes the storage problem. It doesn&apos;t fix
              the reflex problem. The model still doesn&apos;t look unless something makes it look.
            </P>
          </Reveal>
          <Reveal>
            <P>So stenographer objects.</P>
          </Reveal>
          <Reveal>
            <P>
              The objection detector watches the same message stream the indexer tails, with an
              in-memory cache of every active tombstone&apos;s literals. When <Strong>assistant
              output</Strong> contains a dead literal, in generated code, a concrete plan, or the new
              side of an edit, it files an objection. Not a paraphrase match, not a vibe. The literal
              token, adjacent to its subject.
            </P>
          </Reveal>
        </Wrap>

        <Record kind="objection" source="shape, from src/truth/objections.ts" tone="red">
          <K>transcript: </K> <span style={{ color: COLORS.white }}>LOG_BUDGET = 30</span>{"\n"}
          <K>objection:  </K> <R>Asserted LOG_BUDGET = 30, which 01J…TB tombstones;</R>{"\n"}
          {"             "}<R>current value: 100:</R> LOG_BUDGET 30 is dead; the budget is 100{"\n"}
          <K>exhibit:    </K> {"{"} tombstone: &lt;the full TB record&gt;, contestedBy: [] {"}"}
        </Record>

        <Wrap>
          <Reveal>
            <P>
              Every objection ships with its grounds: the objection text, the exhibit (the full
              tombstone, plus any live contest against it), and the transcript line it fired on. The
              source has a one-line comment above the type that I&apos;d put on the wall: an objection
              without grounds is noise.
            </P>
          </Reveal>
          <Reveal>
            <P>
              It&apos;s tuned for precision. Exact tokens only, so &ldquo;30&rdquo; never matches
              &ldquo;300.&rdquo; The subject has to sit within a few dozen characters of the value. If
              the line also mentions the current value, it&apos;s probably a discussion of the change
              rather than a regression, and the detector stays quiet. It ships in <Code>shadow</Code>{" "}
              mode by default, logging objections without delivering them, so you can look at the
              sustain rate before you let it interrupt anyone.
            </P>
          </Reveal>
          <Reveal>
            <P>
              And the objection itself is not truth. It&apos;s operational state, logged beside the
              ledger. Only the <Strong>ruling</Strong> on it, sustained or overruled by a person,
              enters the record. The court reporter flags the contradiction. Someone in the room
              decides what it means.
            </P>
          </Reveal>
          <Reveal>
            <P>
              When you do turn delivery on, objections go out over signed webhooks, or straight into a{" "}
              <ExtLink href="https://smallchat.dev">smallchat</ExtLink> channel so they land in the
              agent&apos;s chat while the transcript is still being written. That was the last piece.
              The correction the model can&apos;t carry between turns now arrives from outside, at the
              moment it&apos;s needed, with the evidence attached.
            </P>
          </Reveal>
        </Wrap>

        <Pullquote>
          The model doesn&apos;t have to remember it was corrected. It has to be in a room where
          someone else does.
        </Pullquote>

        <Section num="06" title="One word, four tools" />

        <Wrap>
          <Reveal>
            <P>
              I wanted the word to mean the same thing everywhere, and mostly it does. Not perfectly,
              and I&apos;ll get to the gap. Here&apos;s where the tombstone lives in each of the four
              projects as of this week.
            </P>
          </Reveal>
        </Wrap>

        <Docket>
          <DocketRow
            name="stenographer"
            href="https://github.com/johnnyclem/stenographer"
            status="wired"
            who="a named person, or a named process"
          >
            The asserted TB: claim, evidence, signer, dead literals, status. Append-only,
            contestable, overridable only with evidence. The source of truth for the other three.
            Agents and detectors can only propose.
          </DocketRow>
          <DocketRow
            name="short-hand"
            href="https://github.com/johnnyclem/short-hand"
            status="wired"
            who="the compactor, on a correction"
          >
            A correction record written during compaction: what was superseded, which message said
            it, which message corrected it, and why. It prunes the stale fact from compacted history
            so it can&apos;t resurface, renders a <Code>[correction]</Code> line at the front of the
            context frame, and exports each one to stenographer as a <Em>proposal</Em>, never a truth.
          </DocketRow>
          <DocketRow
            name="smallchat"
            href="https://smallchat.dev"
            status="wired"
            who="nobody; it reads"
          >
            A consumer. It reads stenographer&apos;s JSONL export, sorts entries into ground truth,
            contested, unverified, and history, and rebuilds an &ldquo;Asserted Truth&rdquo; section
            on every compaction so an overridden tombstone falls out on the next sync. The codec keeps
            dead literals intact through the round trip. Objections arrive on its channel bridge.
          </DocketRow>
          <DocketRow
            name="polytician"
            href="https://github.com/johnnyclem/polytician"
            status="open"
            who="the sync connector, on delete"
            last
          >
            Not the same thing yet. Its tombstone is a delete marker sent to AgentVault when a concept
            is removed, plus a reserved <Code>tombstone</Code> flag in the ThoughtForm schema that
            nothing reads. No evidence, no signer, no read-back. The ledger hasn&apos;t reached it.
          </DocketRow>
        </Docket>

        <Wrap>
          <Reveal>
            <P>
              The pattern across the three that are wired: <Strong>detection is cheap and everywhere,
              assertion is expensive and in one place.</Strong> Short-hand&apos;s compactor and
              stenographer&apos;s supersession detector both notice corrections. Smallchat&apos;s
              compaction drafts invariants. All of that flows toward the ledger as proposals. Nothing
              flows back down as truth until a person signs it, and then it flows back down to
              everyone.
            </P>
          </Reveal>
          <Reveal>
            <P>
              None of them import each other. It&apos;s a format contract: one JSON object per line,
              last line per id wins, an opaque <Code>x-steno</Code> field the consumers carry through
              untouched. I went back and forth on making the ledger short-hand&apos;s storage layer
              directly and decided against it, for the same reason the whole thing exists. The record
              should survive any one of these projects being wrong.
            </P>
          </Reveal>
        </Wrap>

        <Section num="07" title="Filed as UVs" />

        <Wrap>
          <Reveal>
            <P>
              The whole point of the first post was not narrating things I haven&apos;t checked. So
              here is the queue, in the shape the ledger would want it. The TBs I can point at a
              commit for. The UVs are open.
            </P>
          </Reveal>
        </Wrap>

        <Ledger>
          <LedgerRow status="tb" label="Append-only ledger, evidence required, named signers">
            In the repo, with tests. Anonymous authors rejected at the schema. Tombstones without
            evidence rejected at the schema. Status changes only inside the transaction that appends
            the justifying entry.
          </LedgerRow>
          <LedgerRow status="tb" label="Independence enforced, notarization required">
            Contempt of corpus rejects a contest, verification, or override from the same author or
            agent session as its target. Agent-drafted tombstones wait for a person to notarize.
          </LedgerRow>
          <LedgerRow status="tb" label="Real-time objections, delivered">
            Dead literals in assistant output raise an objection with the full exhibit. Shadow by
            default. Delivered over signed webhooks or a smallchat channel when you turn it on.
          </LedgerRow>
          <LedgerRow status="uv" label="Hash chain and real signatures">
            The design called for each entry to carry the hash of the one before it, and an Ed25519
            signature. The shipped ledger is append-only by construction, not by cryptography, and
            &ldquo;signed&rdquo; is a checked label. This is the next increment, and it&apos;s the
            honest gap between the July post and the September code.
          </LedgerRow>
          <LedgerRow status="uv" label="Polytician">
            I said tombstones were implemented across four tools. When I went to verify that against
            the code, the answer for polytician is &ldquo;a delete marker and an unused schema
            field.&rdquo; Filed with <Code>verifyBy: inspect</Code>. The inspection came back open.
          </LedgerRow>
          <LedgerRow status="uv" label="Open UVs never expire, and a signer is a string">
            There&apos;s no TTL, so an assertion filed in June still flags in September. And a signer
            is a name the schema checks, not a key. Good enough for a team that trusts its own logs.
            Not a security boundary, and the README says so.
          </LedgerRow>
          <LedgerRow status="uv" label="The vendored copy drifts" last>
            Stenographer&apos;s schema rejects a TB with no evidence. Smallchat&apos;s parser defaults
            it to an empty list. The contract is a format, and formats drift. That&apos;s a real gap
            and it&apos;s on the list.
          </LedgerRow>
        </Ledger>

        <Wrap>
          <Reveal>
            <P>Flag, don&apos;t block.</P>
          </Reveal>
        </Wrap>

        <Section num="08" title="Adjourned" />

        <Wrap>
          <Reveal>
            <P>
              Near the end of that first night, the model said something I keep coming back to. That
              I have a path, one continuous life doing both the noticing and the changing, and that
              its path only exists if someone builds it from the outside.
            </P>
          </Reveal>
          <Reveal>
            <P>
              I don&apos;t think that&apos;s fully true anymore, and I don&apos;t think it&apos;s
              fully false either. The model still can&apos;t carry a correction across the gap between
              turns. But the correction can now be carried to it. Written down by a process that
              wasn&apos;t the one talking, signed by someone who wasn&apos;t the one guessing, and
              handed back at the exact moment the old value tries to come out of its mouth.
            </P>
          </Reveal>
          <Reveal>
            <P>
              That isn&apos;t memory. It&apos;s something more like a very good court reporter
              who&apos;s allowed to interrupt.
            </P>
          </Reveal>
          <Reveal>
            <P>
              Four short notes on the tools themselves, press-release style, if you want the specifics
              without the essay:{" "}
              <InlineLink href="/blog/press-stenographer">stenographer</InlineLink>,{" "}
              <InlineLink href="/blog/press-short-hand">short-hand</InlineLink>,{" "}
              <InlineLink href="/blog/press-smallchat">smallchat</InlineLink>, and{" "}
              <InlineLink href="/blog/press-polytician">polytician</InlineLink>.
            </P>
          </Reveal>
        </Wrap>

        <Divider />

        <Wrap>
          <Reveal>
            <div
              style={{
                textAlign: "center",
                padding: "40px 0 80px",
              }}
            >
              <p
                style={{
                  fontFamily: DISPLAY,
                  fontStyle: "italic",
                  fontSize: "clamp(1.4rem, 3.4vw, 1.95rem)",
                  lineHeight: 1.45,
                  color: COLORS.white,
                  margin: "0 0 20px",
                }}
              >
                I checked the ledger before I finished writing this. The first tombstone in the test
                suite has my name on it as the signer and a commit hash for evidence.
              </p>
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: 19,
                  color: COLORS.textDim,
                  margin: "0 0 32px",
                }}
              >
                In July I wouldn&apos;t tell you what time it was. This time I&apos;ll tell you the
                record exists, that it lives in a file the model can&apos;t edit, and that I&apos;m
                not the only witness to it.
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <svg width="60" height="14" viewBox="0 0 60 14" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="14" height="8" rx="1.5" stroke={COLORS.teal} strokeWidth="1.4" />
                  <line x1="19" y1="7" x2="39" y2="7" stroke={COLORS.teal} strokeWidth="1.4" />
                  <rect x="41" y="3" width="14" height="8" rx="1.5" fill={COLORS.teal} />
                </svg>
              </div>
            </div>
          </Reveal>
        </Wrap>
      </main>
    </div>
  );
}
