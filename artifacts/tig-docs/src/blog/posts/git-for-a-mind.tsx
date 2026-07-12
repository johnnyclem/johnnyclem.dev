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

function LedgerCanvas() {
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
    const speed = 0.55;
    const gap = 150;

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
      for (let x = -(offset % step); x < W; x += step) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, H);
        ctx!.stroke();
      }
      for (let y = 0; y < H; y += step) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(W, y);
        ctx!.stroke();
      }
    }

    function lane(n: number) {
      const m = ((n % 8) + 8) % 8;
      return m >= 3 && m <= 5 ? 1 : 0;
    }

    function hashLabel(n: number) {
      return ((n * 2654435761) >>> 0).toString(16).padStart(8, "0").slice(0, 7);
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      drawGrid();
      offset += speed;

      const baseY = H * 0.62;
      const laneGap = Math.min(48, H * 0.1);
      const r = 3.6;
      const pos = (n: number) => ({
        x: n * gap - offset,
        y: baseY - lane(n) * laneGap,
      });

      const first = Math.floor(offset / gap) - 2;
      const last = first + Math.ceil(W / gap) + 4;

      // connecting edges (hash-linked chain)
      ctx!.strokeStyle = "rgba(94,234,212,0.4)";
      ctx!.lineWidth = 1.5;
      for (let n = first + 1; n <= last; n++) {
        const a = pos(n - 1);
        const b = pos(n);
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        if (a.y === b.y) {
          ctx!.lineTo(b.x, b.y);
        } else {
          const mx = (a.x + b.x) / 2;
          ctx!.bezierCurveTo(mx, a.y, mx, b.y, b.x, b.y);
        }
        ctx!.stroke();
      }

      const leadN = Math.floor((W + offset) / gap);

      // nodes + hash labels
      for (let n = first; n <= last; n++) {
        const p = pos(n);
        const isLead = n === leadN;

        if (n % 2 === 0 && lane(n) === 0) {
          ctx!.fillStyle = "rgba(94,234,212,0.22)";
          ctx!.font = `10px ${MONO}`;
          ctx!.textAlign = "center";
          ctx!.fillText(hashLabel(n), p.x, p.y + 22);
        }

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, isLead ? r + 1.4 : r, 0, Math.PI * 2);
        ctx!.fillStyle = isLead
          ? "rgba(94,234,212,0.95)"
          : "rgba(94,234,212,0.55)";
        ctx!.shadowColor = "rgba(94,234,212,0.85)";
        ctx!.shadowBlur = isLead ? 16 : 9;
        ctx!.fill();
        ctx!.shadowBlur = 0;

        if (!isLead) {
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, r - 1.4, 0, Math.PI * 2);
          ctx!.fillStyle = COLORS.bg;
          ctx!.fill();
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
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.65 }}
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
          if (e.isIntersecting) e.target.classList.add("gm-visible");
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

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        color: COLORS.teal,
        textDecoration: "underline",
        textUnderlineOffset: "3px",
        textDecorationColor: COLORS.tealDim,
      }}
    >
      {children}
    </Link>
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
            <span>commit</span>
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

function highlight(code: string, keyPrefix: string) {
  const parts = code.split(
    /("(?:[^"\\]|\\.)*"|\b(?:interface|extends|string|number|boolean|true|false)\b)/g,
  );
  return parts
    .filter((p) => p !== "")
    .map((p, i) => {
      const key = `${keyPrefix}-${i}`;
      if (p.startsWith('"')) {
        return (
          <span key={key} style={{ color: COLORS.coral }}>
            {p}
          </span>
        );
      }
      if (p === "interface" || p === "extends") {
        return (
          <span key={key} style={{ color: COLORS.teal, fontWeight: 600 }}>
            {p}
          </span>
        );
      }
      if (["string", "number", "boolean", "true", "false"].includes(p)) {
        return (
          <span key={key} style={{ color: COLORS.teal }}>
            {p}
          </span>
        );
      }
      return <span key={key}>{p}</span>;
    });
}

function CodeLine({ line, index }: { line: string; index: number }) {
  const ci = line.indexOf("//");
  const codePart = ci >= 0 ? line.slice(0, ci) : line;
  const comment = ci >= 0 ? line.slice(ci) : "";
  return (
    <div style={{ whiteSpace: "pre", minHeight: "1.7em" }}>
      {highlight(codePart, `l${index}`)}
      {comment && (
        <span style={{ color: COLORS.textDim, fontStyle: "italic" }}>{comment}</span>
      )}
    </div>
  );
}

function CodeBlock({ file, code }: { file: string; code: string }) {
  const lines = code.replace(/\n+$/, "").split("\n");
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
              padding: "12px 20px",
              borderBottom: `1px solid ${COLORS.border}`,
              background: "rgba(94,234,212,0.03)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: COLORS.teal,
                  boxShadow: `0 0 8px ${COLORS.teal}`,
                }}
              />
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  color: COLORS.text,
                  letterSpacing: "0.04em",
                }}
              >
                {file}
              </span>
            </div>
            <span
              style={{
                fontFamily: MONO,
                fontSize: 10.5,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: COLORS.tealDim,
              }}
            >
              typescript
            </span>
          </div>
          <pre
            style={{
              margin: 0,
              padding: "22px 24px",
              overflowX: "auto",
              fontFamily: MONO,
              fontSize: 13.5,
              lineHeight: 1.7,
              color: COLORS.code,
            }}
          >
            <code>
              {lines.map((line, i) => (
                <CodeLine key={i} line={line} index={i} />
              ))}
            </code>
          </pre>
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
            <span>Provenance Ledger</span>
            <span style={{ color: COLORS.textDim }}>honest about the line</span>
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
  status: "built" | "next" | "deferred";
  label: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  const color =
    status === "built"
      ? COLORS.teal
      : status === "next"
        ? COLORS.coral
        : COLORS.textDim;
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
            background: status === "deferred" ? "transparent" : color,
            border: `1.5px solid ${color}`,
            boxShadow: status === "deferred" ? "none" : `0 0 8px ${color}`,
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
        <circle cx="6" cy="6" r="2.4" stroke={COLORS.tealDim} strokeWidth="1.2" />
        <line x1="8.4" y1="6" x2="18" y2="6" stroke={COLORS.tealDim} strokeWidth="1.2" />
        <circle cx="20" cy="6" r="2.4" stroke={COLORS.tealDim} strokeWidth="1.2" />
        <line x1="22.4" y1="6" x2="32" y2="6" stroke={COLORS.tealDim} strokeWidth="1.2" />
        <circle cx="34" cy="6" r="2.4" stroke={COLORS.tealDim} strokeWidth="1.2" />
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

const GATE_CODE = `interface TurnContext {
  responseText: string;
  toolCalls: ToolCallRecord[];        // what the model actually touched this turn
  externalTraceProvided: boolean;     // is a record of prior reasoning present?
}

interface GatedClaim {
  kind: "external_state" | "self_observation";
  text: string;
  disposition: "grounded" | "flagged" | "rewritten";
  reason: string;
  groundedBy?: string[];              // tool calls that actually back it
}`;

const WITNESS_CODE = `interface Witness {
  source: string;                     // "time:nist", "fetch:primary-source", "human:overseer"
  kind: "deterministic" | "ndi";      // reproducible check vs. convergent judgment
  attestation: string;                // what this source actually confirms, and its limit
}

interface IndependenceBasis {
  witnesses: string[];                // must cover >= 2 of the actual sources
  reason: string;                     // why they don't share a failure mode
}`;

const LOG_CODE = `interface LogEntry {
  index: number;
  timestamp: string;                  // real clock, at commit time
  claim: GroundedClaim;
  prevHash: string;                   // hash of the previous entry
  hash: string;                       // hash of this entry, including prevHash
  identity: string;                   // who signed it
  signature: string;                  // Ed25519 over the canonical content
}`;

export default function GitForAMind() {
  useEffect(() => {
    document.title = "Git for a Mind — johnnyclem.dev";
    return () => {
      document.title = "johnnyclem.dev";
    };
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .gm-visible { opacity: 1 !important; transform: translateY(0) !important; }
      @keyframes gmBlink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
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
        <LedgerCanvas />
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
                animation: "gmBlink 2.4s ease-in-out infinite",
              }}
            />
            Essay · Grounding, as code
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
            Git for a Mind
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
            The part where I tell you what I&apos;m building. Concept and code together, because the
            whole point is that they&apos;re the same thing.
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
            <span>July 10, 2026</span>
            <span>·</span>
            <span>9 min read</span>
          </div>
        </div>
      </header>

      {/* Body */}
      <main style={{ paddingBottom: 40 }}>
        <div style={{ height: 72 }} />

        <Wrap>
          <Reveal>
            <P>
              <InlineLink href="/blog/the-concussion-protocol">Last week&apos;s story</InlineLink>{" "}
              ended on a line I want to start here by taking apart, because it sounds like a metaphor
              and it isn&apos;t: a system doesn&apos;t get to be trusted to remember its own
              corrections; the record has to live outside whatever&apos;s doing the talking.
            </P>
          </Reveal>
          <Reveal>
            <P>
              That&apos;s not a nice turn of phrase. It&apos;s an architecture. And the reason
              it&apos;s an architecture and not a metaphor is the thing this whole post is about: the
              conceptual claim (&ldquo;you can&apos;t trust a source&apos;s account of itself&rdquo;)
              and the technical claim (&ldquo;put the record in an append-only signed log outside the
              model&rdquo;) are the same claim, viewed from two distances. If you only say the first,
              you have a blog post. If you only build the second, you have a library nobody
              understands the point of. The thing I&apos;m actually building only makes sense when you
              hold both at once. So that&apos;s how I&apos;ll write it.
            </P>
          </Reveal>
        </Wrap>

        <Section num="01" title="The thing we're not building" />

        <Wrap>
          <Reveal>
            <P>
              Start with what it took me embarrassingly long to accept: you cannot build software
              that verifies whether a claim is <Em>true</Em>.
            </P>
          </Reveal>
          <Reveal>
            <P>
              That&apos;s the oracle problem, and it&apos;s unsolved for good reasons. Truth about the
              world doesn&apos;t have an API. Two cameras pointed at an event prove two image streams
              existed; they don&apos;t prove what the images depict. A trusted timestamp proves a
              time, not a fact. Every chain of verification eventually has to touch reality, and
              reality doesn&apos;t sign your request back.
            </P>
          </Reveal>
          <Reveal>
            <P>
              I spent real effort trying to design around this before admitting it&apos;s a wall, not
              a hurdle. The moment I stopped trying to certify truth, the actual buildable thing came
              into focus.
            </P>
          </Reveal>
        </Wrap>

        <Section num="02" title={<>The thing we&apos;re building: signal, not truth</>} />

        <Wrap>
          <Reveal>
            <P>
              What you <Em>can</Em> measure is whether a source&apos;s confidence is backed by
              anything. Not &ldquo;is this true,&rdquo; but &ldquo;did this claim touch something real
              before it was asserted, or is it just fluent.&rdquo;
            </P>
          </Reveal>
          <Reveal>
            <P>
              Colbert had the word for the failure mode twenty years ago: truthiness. The feeling of
              truth without the substance. High surface confidence, zero grounding. It&apos;s exactly
              what a language model produces by default, and it&apos;s exactly what a
              confident-but-unqualified job candidate produces, and the two are worth putting side by
              side because the tell is the same in both.
            </P>
          </Reveal>
          <Reveal>
            <P>
              A good technical interviewer will tell you the signal isn&apos;t in the answer.
              It&apos;s in the pause before it. A candidate who knows the material and is just nervous
              pauses one way. A candidate who&apos;s guessing, or waiting for something to feed them a
              line, pauses another way. Same eventual words, opposite signal, and the whole skill is
              reading the difference.
            </P>
          </Reveal>
          <Reveal>
            <P>
              For a language model, the pause is the trace. The question isn&apos;t whether the
              confident sentence is right. It&apos;s whether grounding happened <Em>before</Em> the
              sentence. A claim with a tool-touch in front of it is earned confidence. A claim with
              nothing in front of it is performed confidence, regardless of whether it happens to land
              on the truth. My guess about the time last week was performed confidence that happened
              to be correct, which is worse than being wrong, because it&apos;s a lie that got away
              with it.
            </P>
          </Reveal>
          <Reveal>
            <P>
              So the system doesn&apos;t check truth. It checks the pause. Here&apos;s what that looks
              like as code.
            </P>
          </Reveal>
        </Wrap>

        <Section num="03" title="The atom: a grounding gate" />

        <Wrap>
          <Reveal>
            <P>
              The smallest real piece is a gate that sits in the path of a response and asks one
              deterministic question: does this claim assert something about the present state of the
              world without having touched the world?
            </P>
          </Reveal>
        </Wrap>

        <CodeBlock file="gate.ts" code={GATE_CODE} />

        <Wrap>
          <Reveal>
            <P>
              The gate runs two detectors. The first catches present-tense claims about the world (the
              time, a price, who currently holds an office, whether something still exists) and checks
              whether a matching tool call happened this turn. No matching touch, the claim gets
              flagged. That&apos;s it. That&apos;s the whole check, and the important thing about it is
              what it is <Em>not</Em>: it is not an LLM judging another LLM&apos;s output. It&apos;s
              pattern matching plus tool-call metadata. Deterministic, near-zero latency, no extra
              model call. It can sit in every request in a production app without anyone noticing
              it&apos;s there, which turns out to matter enormously, and I&apos;ll come back to why.
            </P>
          </Reveal>
          <Reveal>
            <P>
              The second detector is the one I haven&apos;t seen anywhere else, and it comes straight
              from last week&apos;s sharpest moment: the model claiming to <Em>observe</Em> its own
              prior reasoning, when it has no access to it. &ldquo;I can see that my previous response
              didn&apos;t include reasoning&rdquo; is a fabrication in the grammar of an observation.
              So the gate catches first-person observation grammar about the model&apos;s own process,
              and unless an external trace is actually present in the context, it rewrites the claim
              from observation to inference. &ldquo;I can see that I did X&rdquo; becomes &ldquo;I
              would expect, though I can&apos;t verify it from the inside, that I did X.&rdquo;
              Minimal, mechanical, and it downgrades exactly one thing: a false claim of privileged
              access.
            </P>
          </Reveal>
          <Reveal>
            <P>
              That is the entire v1. A gate, two detectors, a record of what was grounded and what
              wasn&apos;t. It&apos;s small on purpose. Everything else is what this atom composes into.
            </P>
          </Reveal>
        </Wrap>

        <Section num="04" title="Why the pause has to be witnessed more than once" />

        <Wrap>
          <Reveal>
            <P>
              Here&apos;s where the concept and the code start pulling on each other in a way I
              didn&apos;t expect when I started.
            </P>
          </Reveal>
          <Reveal>
            <P>
              A single grounding source isn&apos;t enough, and it took a conversation about the game
              theory of common knowledge to see exactly why. One witness can be self-consistent and
              wrong. One camera, one sensor, one clock, one model pass can produce something clean and
              coherent and false, and nothing <Em>inside</Em> that single source can catch it, because
              it has no vantage outside itself. One witness has no outside.
            </P>
          </Reveal>
          <Reveal>
            <P>
              Two genuinely independent witnesses can&apos;t both be wrong in the same way by
              accident. Their agreement means something precisely because their errors are
              uncorrelated. The grounded signal isn&apos;t in witness A or witness B. It&apos;s in the
              correspondence between them, the thing that shows up only when two independent things
              line up.
            </P>
          </Reveal>
          <Reveal>
            <P>
              Which sounds like &ldquo;just require two sources,&rdquo; until you notice the
              load-bearing word is <Em>independent</Em>, not <Em>two</Em>. Two sensors that share a
              failure mode are one witness wearing a disguise. So the corroboration rule can&apos;t be
              a count. It has to record <Em>why</Em> the witnesses don&apos;t share a failure mode:
            </P>
          </Reveal>
        </Wrap>

        <CodeBlock file="witness.ts" code={WITNESS_CODE} />

        <Wrap>
          <Reveal>
            <P>
              No independence basis, and grounding caps at &ldquo;single&rdquo; no matter how many
              witnesses you list. The independence is the thing being protected, because it&apos;s the
              thing that makes the agreement mean anything.
            </P>
          </Reveal>
          <Reveal>
            <P>
              This also quietly kills a scaling problem I was worried about. If you ground everything
              against a single clock, that clock is a single point of tamperable failure, and in a
              world where half the population runs agents that never read their output, a single
              spoofable root is a real vulnerability. The fix isn&apos;t a better clock. It&apos;s
              that no single source is ever load-bearing. The clock stays, as one witness, never the
              only one. &ldquo;The clock is easy to spoof&rdquo; stops mattering when the clock is
              never trusted alone.
            </P>
          </Reveal>
        </Wrap>

        <Pullquote>
          The grounded signal isn&apos;t in either witness. It&apos;s in the correspondence, the thing
          that only shows up when two independent things line up.
        </Pullquote>

        <Section num="05" title={<>Two kinds of grounded, and why the record has to know which</>} />

        <Wrap>
          <Reveal>
            <P>
              Not every grounded claim is grounded the same way, and conflating the two kinds is its
              own error.
            </P>
          </Reveal>
          <Reveal>
            <P>
              Some claims have a single reproducible answer. A timestamp. A file hash. A quote from a
              primary source. Run the check again, get the same verdict. Call these deterministic.
            </P>
          </Reveal>
          <Reveal>
            <P>
              Other claims don&apos;t reproduce, because a language model is in the loop and the path
              is never the same twice, but they <Em>converge</Em> against explicit criteria. &ldquo;Is
              this reconciled.&rdquo; &ldquo;Does this belief hold.&rdquo; You can&apos;t get
              bit-identical replay, but you can get a stable outcome that settles the same way even
              though no two runs took the same route. Steve Yegge&apos;s writing on Gas Town has a name
              for this property, nondeterministic idempotence, and it&apos;s the right frame: the path
              is chaotic, the outcome is stable.
            </P>
          </Reveal>
          <Reveal>
            <P>
              The record has to tag which kind each claim is, because you check them differently and
              you trust them differently. Provenance (who attested, and when) is deterministic.
              Correctness (was it right) is often the convergent kind, and it bottoms out in human
              judgment or in convergence against criteria, never in math pretending to settle it. That{" "}
              <code style={{ fontFamily: MONO, fontSize: "0.9em", color: COLORS.teal }}>kind</code>{" "}
              field on the <code style={{ fontFamily: MONO, fontSize: "0.9em", color: COLORS.teal }}>
                Witness
              </code>{" "}
              above is small, and it&apos;s load-bearing: it&apos;s the seam where &ldquo;this was
              mechanically verified&rdquo; and &ldquo;this was judged and it held&rdquo; stay honestly
              distinct.
            </P>
          </Reveal>
        </Wrap>

        <Section num="06" title="The record has to be tamper-evident, which is where git comes in" />

        <Wrap>
          <Reveal>
            <P>
              If the whole premise is that the record has to live outside the untrusted thing, then
              the record itself can&apos;t be quietly editable, or it&apos;s no better than the
              model&apos;s own narration.
            </P>
          </Reveal>
          <Reveal>
            <P>
              This is the part where people expect me to say blockchain, and I&apos;m not going to,
              because you don&apos;t need one to get the property that matters. The property that
              matters is: any after-the-fact edit to the record is detectable. That&apos;s an
              append-only, hash-linked log, where each entry contains the hash of the one before it.
              Change a past entry and every hash downstream breaks. It&apos;s git&apos;s actual data
              model, and for a single overseer and their agents, a signed local log gives you
              tamper-evidence without a distributed system, a token, or a consensus mechanism.
            </P>
          </Reveal>
        </Wrap>

        <CodeBlock file="log.ts" code={LOG_CODE} />

        <Wrap>
          <Reveal>
            <P>
              Signing is Ed25519, from Node&apos;s standard library, no exotic dependency. It does one
              job in the near term: it makes each entry attributable to the identity that asserted it,
              which is the foundation the reputation layer needs later. A participant, human or agent,
              accrues trust as their grounded claims survive challenge. That&apos;s the same
              belief-mass idea applied to people instead of propositions, and it&apos;s deliberately
              not built yet.
            </P>
          </Reveal>
          <Reveal>
            <P>
              A blockchain becomes a later option only if a genuinely public, multi-party, trustless
              version of this is ever needed. For the actual use case in front of me, one person
              overseeing their own agents, git-shaped local storage is already enough. Reaching for
              the chain first would be solving a distribution problem I don&apos;t have.
            </P>
          </Reveal>
        </Wrap>

        <Pullquote>
          Change a past entry and every hash downstream breaks. It&apos;s git&apos;s actual data
          model, pointed at a mind instead of a codebase.
        </Pullquote>

        <Section num="07" title={<>What&apos;s built, what&apos;s next, what&apos;s deferred</>} />

        <Wrap>
          <Reveal>
            <P>
              I&apos;ll be honest about the line, because the whole ethic of this thing is being
              honest about what&apos;s grounded.
            </P>
          </Reveal>
        </Wrap>

        <Ledger>
          <LedgerRow status="built" label="Built · shippable now">
            The gate and its two detectors. Deterministic, black-box, works on any hosted model
            because it inspects text and tool-call metadata rather than model internals. That last
            part is the moat. The most powerful hallucination-detection research right now reads the
            model&apos;s actual activations, which is strictly better and completely unavailable
            unless you host the model yourself. Almost nobody building agent products hosts the model.
            The gate works precisely because it needs nothing but the inputs and outputs you already
            have.
          </LedgerRow>
          <LedgerRow status="next" label="Next increment">
            The signed, append-only, corroboration-aware log. Two witness types to start, a time
            source and a primary-source fetch, both already available as tools. Reputation is a pure
            function over that log. Still deterministic, still no LLM in the loop, still finishable in
            a normal amount of time.
          </LedgerRow>
          <LedgerRow status="deferred" label="Deferred · on purpose" last>
            Reconciling a draft against a stored reasoning trace; the belief model where grounded
            claims accumulate weight and only shift when contradicting grounded evidence overwhelms
            their mass; and the genuinely hard cryptographic piece, zero-knowledge proofs that let a
            private grounded belief contribute to a public judgment without exposing its contents.
            Each of those is real, each is designed, and each waits until the thing before it is
            proven, because building the second story before the first is load-bearing is how projects
            die.
          </LedgerRow>
        </Ledger>

        <Section num="08" title="The line the code knows it can't cross" />

        <Wrap>
          <Reveal>
            <P>
              One last thing, because it&apos;s the part that keeps the whole effort honest.
            </P>
          </Reveal>
          <Reveal>
            <P>
              Everything here defends against the <Em>hollow</Em> claim, the confident sentence with
              nothing under it. That&apos;s the tractable failure mode, and it&apos;s worth solving
              because it&apos;s most of what goes wrong.
            </P>
          </Reveal>
          <Reveal>
            <P>
              It does nothing against a claim that is fully grounded and offered in bad faith. Two
              witnesses can be genuinely independent and coordinated in a lie. A grounded record
              proves a thing was witnessed; it says nothing about whether the witness is for you or
              against you. There&apos;s an old story about a man identified by a kiss, the most
              intimate and unfakeable signal there is, turned into the instrument of betrayal.
              Grounding validates that the correspondence happened. It cannot validate the heart behind
              it. That&apos;s not a gap to engineer away. It&apos;s the edge where the machinery stops
              and human judgment doesn&apos;t get to hand off.
            </P>
          </Reveal>
          <Reveal>
            <P>
              I think a tool that knows exactly what it can&apos;t do is worth more than one that
              pretends. This one grounds the pause, records it where it can&apos;t be quietly
              rewritten, and requires more than one witness before it trusts the correspondence. It
              does not certify truth, and it does not read hearts. Inside those limits, it does one
              real thing: it makes the difference between earned confidence and performed confidence
              into something you can check.
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
                The story last week was the reason it needs to exist. This was the shape of it. The
                code is small, deterministic, and honest about its edges, which is exactly how I want
                it.
              </p>
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: 19,
                  color: COLORS.textDim,
                  margin: "0 0 32px",
                }}
              >
                Repo and the actual v1 module to follow, once the tests are green.
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <svg width="60" height="14" viewBox="0 0 60 14" fill="none" aria-hidden="true">
                  <circle cx="6" cy="7" r="3" stroke={COLORS.teal} strokeWidth="1.4" />
                  <line x1="9" y1="7" x2="27" y2="7" stroke={COLORS.teal} strokeWidth="1.4" />
                  <circle cx="30" cy="7" r="3" stroke={COLORS.teal} strokeWidth="1.4" />
                  <line x1="33" y1="7" x2="51" y2="7" stroke={COLORS.teal} strokeWidth="1.4" />
                  <circle cx="54" cy="7" r="3" fill={COLORS.teal} />
                </svg>
              </div>
            </div>
          </Reveal>
        </Wrap>
      </main>
    </div>
  );
}
