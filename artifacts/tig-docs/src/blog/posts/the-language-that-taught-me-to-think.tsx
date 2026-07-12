import { useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

const COLORS = {
  bg: "#06070a",
  surface: "#0c0e14",
  text: "#d8dce6",
  textDim: "#8891a4",
  accent: "#e8943a",
  accentDim: "#a06420",
  blue: "#5b8def",
  green: "#4ade80",
  red: "#f87171",
  border: "#1a1e2e",
  codeBg: "#0f1219",
};

function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    let W = 0, H = 0;
    let animId: number;

    class Particle {
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; hue: number;
      constructor() {
        this.x = Math.random() * (W || 1200);
        this.y = Math.random() * (H || 800);
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = 0.2 + Math.random() * 0.5;
        this.r = 1.5 + Math.random() * 2;
        this.alpha = 0.2 + Math.random() * 0.4;
        this.hue = Math.random() > 0.7 ? 30 : 210;
      }
      reset() {
        this.x = Math.random() * (W || 1200);
        this.y = -10;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = 0.2 + Math.random() * 0.5;
        this.r = 1.5 + Math.random() * 2;
        this.alpha = 0.2 + Math.random() * 0.4;
        this.hue = Math.random() > 0.7 ? 30 : 210;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y > (H || 800) + 10) this.reset();
      }
      draw(c: CanvasRenderingContext2D) {
        const color = this.hue === 30
          ? `rgba(232,148,58,${this.alpha})`
          : `rgba(91,141,239,${this.alpha * 0.6})`;
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        c.fillStyle = color;
        c.fill();
      }
    }

    const particles: Particle[] = [];

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      W = parent.offsetWidth;
      H = parent.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
    }

    function init() {
      resize();
      const count = Math.min(80, Math.floor(W * H / 8000));
      for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.12;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(232,148,58,${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }
      particles.forEach(p => { p.update(); p.draw(ctx!); });
      animId = requestAnimationFrame(draw);
    }

    init();
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
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }}
    />
  );
}

function MsgCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    let W = 0, H = 0;
    let animId: number;

    interface MsgNode { x: number; y: number; label: string; r: number; alpha: number; }
    interface MsgPulse { from: MsgNode; to: MsgNode; t: number; speed: number; alive: boolean; }

    const nodes: MsgNode[] = [];
    const pulses: MsgPulse[] = [];

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      W = parent.offsetWidth;
      H = parent.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
    }

    function init() {
      resize();
      const labels = ["sender", "cache", "dispatch", "isa", "IMP", "proxy", "protocol", "forward"];
      for (let i = 0; i < labels.length; i++) {
        const angle = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
        const rx = 0.3 + Math.random() * 0.05;
        const ry = 0.35 + Math.random() * 0.05;
        nodes.push({
          x: 0.5 + Math.cos(angle) * rx,
          y: 0.5 + Math.sin(angle) * ry,
          label: labels[i],
          r: 4,
          alpha: 0.6,
        });
      }
    }

    let frame = 0;
    function draw() {
      ctx!.clearRect(0, 0, W, H);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          ctx!.beginPath();
          ctx!.moveTo(nodes[i].x * W, nodes[i].y * H);
          ctx!.lineTo(nodes[j].x * W, nodes[j].y * H);
          ctx!.strokeStyle = "rgba(26,30,46,0.8)";
          ctx!.lineWidth = 0.5;
          ctx!.stroke();
        }
      }
      nodes.forEach(n => {
        ctx!.beginPath();
        ctx!.arc(n.x * W, n.y * H, n.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(232,148,58,${n.alpha})`;
        ctx!.fill();
        ctx!.fillStyle = "rgba(136,145,164,0.5)";
        ctx!.font = "10px JetBrains Mono, monospace";
        ctx!.textAlign = "center";
        ctx!.fillText(n.label, n.x * W, n.y * H + 18);
      });
      pulses.forEach(p => {
        p.t += p.speed;
        if (p.t >= 1) {
          p.alive = false;
          p.to.alpha = 1;
          setTimeout(() => { p.to.alpha = 0.6; }, 300);
          return;
        }
        const x = (p.from.x + (p.to.x - p.from.x) * p.t) * W;
        const y = (p.from.y + (p.to.y - p.from.y) * p.t) * H;
        ctx!.beginPath();
        ctx!.arc(x, y, 3, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(232,148,58,${0.9 - p.t * 0.5})`;
        ctx!.fill();
        const tx = (p.from.x + (p.to.x - p.from.x) * Math.max(0, p.t - 0.1)) * W;
        const ty = (p.from.y + (p.to.y - p.from.y) * Math.max(0, p.t - 0.1)) * H;
        ctx!.beginPath();
        ctx!.moveTo(tx, ty);
        ctx!.lineTo(x, y);
        ctx!.strokeStyle = "rgba(232,148,58,0.3)";
        ctx!.lineWidth = 1;
        ctx!.stroke();
      });
      for (let i = pulses.length - 1; i >= 0; i--) {
        if (!pulses[i].alive) pulses.splice(i, 1);
      }
      frame++;
      if (frame % 40 === 0 && nodes.length >= 2) {
        const from = nodes[Math.floor(Math.random() * nodes.length)];
        let to: MsgNode;
        do { to = nodes[Math.floor(Math.random() * nodes.length)]; } while (to === from);
        pulses.push({ from, to, t: 0, speed: 0.008 + Math.random() * 0.008, alive: true });
      }
      animId = requestAnimationFrame(draw);
    }

    init();
    draw();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div style={{ position: "relative", height: 300, margin: "20px 0", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      <div style={{
        position: "absolute", bottom: 12, right: 20,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
        letterSpacing: "0.1em", color: COLORS.textDim, opacity: 0.5,
      }}>
        {"// sim: objc_msgSend — selector resolution"}
      </div>
    </div>
  );
}

function Section({ id, num, title, children }: {
  id: string; num: string; title: React.ReactNode; children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("essay-visible"); });
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      style={{
        maxWidth: 720, margin: "0 auto", padding: "100px 24px",
        opacity: 0, transform: "translateY(30px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <div style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
        letterSpacing: "0.2em", color: COLORS.accentDim, textTransform: "uppercase" as const,
        marginBottom: 12, display: "flex", alignItems: "center", gap: 12,
      }}>
        {num}
        <span style={{ flex: 1, height: 1, background: COLORS.border }} />
      </div>
      <h2 style={{
        fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
        fontWeight: 400, lineHeight: 1.2, color: "#fff", marginBottom: 28,
      }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ marginBottom: 22, color: COLORS.text, lineHeight: 1.8 }}>{children}</p>;
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: "#fff", fontWeight: 500 }}>{children}</strong>;
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82em",
      color: COLORS.accent, background: COLORS.codeBg,
      padding: "2px 7px", borderRadius: 3, border: `1px solid ${COLORS.border}`,
    }}>
      {children}
    </code>
  );
}

function Em({ children }: { children: React.ReactNode }) {
  return <em style={{ color: COLORS.accent, fontStyle: "italic" }}>{children}</em>;
}

function Pullquote({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      position: "relative", margin: "48px 0", padding: "32px 0 32px 28px",
      borderLeft: `2px solid ${COLORS.accent}`,
      fontFamily: "'DM Serif Display', serif",
      fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
      fontStyle: "italic", lineHeight: 1.5, color: "#fff",
    }}>
      {children}
    </div>
  );
}

function CodeBlock({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: COLORS.codeBg, border: `1px solid ${COLORS.border}`,
      borderRadius: 8, padding: "24px 28px", margin: "32px 0",
      fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
      lineHeight: 1.7, overflowX: "auto" as const, position: "relative" as const,
    }}>
      <div style={{
        position: "absolute" as const, top: 10, right: 14,
        fontSize: 10, letterSpacing: "0.1em", color: COLORS.textDim,
        textTransform: "uppercase" as const,
      }}>
        {lang}
      </div>
      {children}
    </div>
  );
}

const kw = { color: COLORS.blue };
const fn = { color: COLORS.accent };
const cmt = { color: COLORS.textDim, fontStyle: "italic" as const };
const tp = { color: "#c084fc" };
const sel = { color: COLORS.red };

function DispatchViz() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("essay-visible"); });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const steps = [
    { num: "1", label: "Cache hit", desc: " → done. Sub-nanosecond.", delay: 0.1 },
    { num: "2", label: "Dispatch table", desc: " → selector lookup in class", delay: 0.3 },
    { num: "3", label: "Superclass chain", desc: " → walk the isa hierarchy", delay: 0.5 },
    { num: "4", label: "forwardInvocation:", desc: " → last chance to handle", delay: 0.7 },
    { num: "✕", label: "doesNotRecognizeSelector:", desc: "", delay: 0.9, isError: true },
  ];

  return (
    <div ref={ref} style={{
      background: COLORS.surface, border: `1px solid ${COLORS.border}`,
      borderRadius: 8, padding: 32, margin: "48px 0",
      fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
      lineHeight: 2, color: COLORS.textDim, overflowX: "auto" as const,
    }}>
      {steps.map((step, i) => (
        <div key={i}>
          {i > 0 && (
            <div style={{ color: COLORS.accentDim, paddingLeft: 36, fontSize: 11 }}>↓ miss</div>
          )}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            opacity: 0, transform: "translateX(-10px)",
            transition: `all 0.5s ease ${step.delay}s`,
          }} className="dispatch-step">
            <div style={{
              width: 24, height: 24, borderRadius: "50%",
              border: `1px solid ${COLORS.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, color: COLORS.accent, flexShrink: 0,
            }}>
              {step.num}
            </div>
            <span style={{ color: step.isError ? COLORS.red : COLORS.text }}>{step.label}</span>
            {step.desc && <span style={{ color: COLORS.textDim }}>{step.desc}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function ConceptMap() {
  const rows = [
    ["@selector(name)", "ToolSelector"],
    ["IMP", "ToolIMP"],
    ["objc_msgSend", "toolkit_dispatch()"],
    ["Method cache", "ResolutionCache"],
    ["isa chain", "Superclass traversal"],
    ["forwardInvocation:", "Forwarding chain"],
    ["Method swizzling", "runtime.swizzle()"],
    ["NSProxy", "ToolProxy"],
    ["Protocol", "ToolProtocol"],
    ["Category", "ToolCategory"],
  ];

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr auto 1fr",
      gap: "2px 0", margin: "48px 0",
      fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
    }}>
      <div style={{ padding: "10px 16px", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: COLORS.accent, borderBottom: `1px solid ${COLORS.border}` }}>
        Obj-C Runtime
      </div>
      <div style={{ padding: "10px 12px", color: COLORS.accentDim, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: `1px solid ${COLORS.border}` }} />
      <div style={{ padding: "10px 16px", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: COLORS.accent, borderBottom: `1px solid ${COLORS.border}` }}>
        smallchat
      </div>
      {rows.map(([left, right], i) => (
        <div key={i} style={{ display: "contents" }}>
          <div style={{ padding: "10px 16px", color: COLORS.textDim, borderBottom: `1px solid ${COLORS.border}`, background: COLORS.surface, borderRadius: "4px 0 0 4px" }}>{left}</div>
          <div style={{ padding: "10px 12px", color: COLORS.accentDim, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: `1px solid ${COLORS.border}` }}>→</div>
          <div style={{ padding: "10px 16px", color: COLORS.text, borderBottom: `1px solid ${COLORS.border}`, background: COLORS.surface, borderRadius: "0 4px 4px 0" }}>{right}</div>
        </div>
      ))}
    </div>
  );
}

function Divider() {
  return (
    <div style={{
      textAlign: "center" as const, padding: "40px 0",
      color: COLORS.accentDim, fontFamily: "'JetBrains Mono', monospace",
      fontSize: 14, letterSpacing: "0.4em",
    }}>
      ///
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
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} style={{
      position: "fixed", top: 0, left: 0, height: 2,
      background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDim})`,
      width: "0%", zIndex: 999, transition: "width 0.08s linear",
    }} />
  );
}

export default function TheLanguageThatTaughtMeToThink() {
  useEffect(() => {
    document.title = "The Language That Taught Me to Think — johnnyclem.dev";
    return () => { document.title = "johnnyclem.dev"; };
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .essay-visible { opacity: 1 !important; transform: translateY(0) !important; }
      .essay-visible .dispatch-step { opacity: 1 !important; transform: translateX(0) !important; }
      @keyframes essayFadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes essayScrollPulse { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div style={{
      background: COLORS.bg, color: COLORS.text,
      fontFamily: "'Fraunces', Georgia, serif", fontSize: 19,
      lineHeight: 1.8, overflowX: "hidden" as const,
      WebkitFontSmoothing: "antialiased", minHeight: "100vh",
    }}>
      <ProgressBar />

      <Link
        href="/blog"
        style={{
          position: "fixed", top: 16, left: 16, zIndex: 1000,
          display: "inline-flex", alignItems: "center", gap: 6,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
          letterSpacing: "0.1em", color: COLORS.textDim,
          textDecoration: "none", opacity: 0.95, transition: "opacity 0.3s, color 0.3s",
          padding: "8px 12px", borderRadius: 999,
          background: "rgba(10, 10, 12, 0.72)",
          border: `1px solid ${COLORS.border ?? "rgba(255,255,255,0.08)"}`,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = "0.95"; e.currentTarget.style.color = COLORS.textDim; }}
      >
        <ArrowLeft style={{ width: 14, height: 14 }} />
        BLOG
      </Link>

      <section style={{
        position: "relative", minHeight: "100vh",
        display: "flex", flexDirection: "column" as const,
        justifyContent: "flex-end", padding: "0 8vw 10vh", overflow: "hidden",
      }}>
        <HeroCanvas />
        <div style={{
          position: "relative", zIndex: 1,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
          letterSpacing: "0.18em", color: COLORS.textDim,
          textTransform: "uppercase" as const, marginBottom: 20,
          animation: "essayFadeUp 1s ease 0.2s both",
        }}>
          johnnyclem.dev / essay / 2026
        </div>
        <h1 style={{
          position: "relative", zIndex: 1,
          fontFamily: "'DM Serif Display', serif",
          fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
          fontWeight: 400, lineHeight: 1.1, color: "#fff", maxWidth: 900,
          animation: "essayFadeUp 1s ease 0.4s both",
        }}>
          The Language That<br />Taught Me <em style={{ fontStyle: "italic", color: COLORS.accent }}>to Think</em>
        </h1>
        <div style={{
          position: "relative", zIndex: 1,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
          color: COLORS.textDim, marginTop: 20, maxWidth: 600,
          animation: "essayFadeUp 1s ease 0.6s both",
        }}>
          {"// on Smalltalk, objc_msgSend, and why tool dispatch was always message passing"}
        </div>
        <div style={{
          position: "absolute", bottom: 30, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 8,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          letterSpacing: "0.2em", color: COLORS.textDim,
          textTransform: "uppercase" as const,
          animation: "essayFadeUp 1s ease 1.2s both",
        }}>
          <span>scroll</span>
          <div style={{
            width: 1, height: 40,
            background: `linear-gradient(to bottom, ${COLORS.accent}, transparent)`,
            animation: "essayScrollPulse 2s ease infinite",
          }} />
        </div>
      </section>

      <Section id="s1" num="01 — the failures" title={<>I tried to learn to code <Em>for years</Em></>}>
        <P>Plural. I bounced off Ruby. I bounced off JavaScript. I bought books, did tutorials, stared at syntax that might as well have been cuneiform. Every language I tried felt like memorizing someone else's notation system for a thought process I couldn't quite see.</P>
        <P>Then I opened Xcode, looked at Objective-C, and something clicked.</P>
        <P>Not immediately. Not all at once. But the first time I wrote <Code>[tableView reloadData]</Code> and understood what was happening (not just syntactically but <em style={{ color: COLORS.accent }}>conceptually</em>), something shifted. I wasn't calling a function. I was <Strong>sending a message</Strong>. I was telling this object what I wanted, and it was deciding how to do it.</P>
      </Section>

      <Divider />

      <Section id="s2" num="02 — the click" title={<>Brackets as <Em>punctuation</Em></>}>
        <P>That distinction sounds academic until it isn't. For whatever reason, my brain couldn't parse <Code>reloadData(tableView)</Code> as anything other than arbitrary notation. But <Code>[tableView reloadData]</Code>, subject and verb, that was a sentence. That was communication.</P>
        <P>The brackets weren't syntax to me. They were punctuation.</P>
        <Pullquote>Objective-C was my first programming language. Other <em>attempts</em> came before. This one stuck.</Pullquote>
        <P>UIKit and message passing were where programming stopped being a thing I was trying to learn and started being a thing I could <Strong>think in</Strong>.</P>
        <P>I went on to spend seven years as CTO of FiLMiC Pro, building one of the most complex camera apps ever shipped on iOS, living deep inside AVFoundation and the Obj-C runtime. But the seed of all of it was that moment: the realization that computation could be modeled as objects talking to each other.</P>
        <P>I have Alan Kay to thank for that.</P>
      </Section>

      <MsgCanvas />

      <Section id="s3" num="03 — 1972" title={<>The big idea is <Em>messaging</Em></>}>
        <P>In 1972, Alan Kay designed Smalltalk at Xerox PARC. The core insight was radical and simple: everything is an object, and objects communicate by sending messages. There are no function calls. There is no <Code>goto</Code>. There is just: you send a message to an object, and the object decides what to do with it.</P>
        <P>This sounds like computer science trivia until you realize it's the most consequential design decision in the history of programming languages. Kay himself said it plainly:</P>
        <Pullquote>
          "The big idea is messaging."<br />
          <span style={{ fontSize: "0.6em", color: COLORS.textDim, fontStyle: "normal", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em" }}>— ALAN KAY</span>
        </Pullquote>
        <P>Not objects. Not classes. Not inheritance. <Strong>Messaging.</Strong></P>
        <P>The receiver decides. That's the whole thing.</P>
      </Section>

      <Divider />

      <Section id="s4" num="04 — 1984" title={<>C with <Em>Smalltalk's soul</Em></>}>
        <P>In 1984, Brad Cox created Objective-C by grafting Smalltalk's message-passing onto C. The result was weird and beautiful: a language where you could drop into raw pointer arithmetic on one line and send a polymorphic message to a dynamically-resolved receiver on the next.</P>
        <P>At the heart of it was <Code>objc_msgSend</Code>, a single C function that every Objective-C method call compiled down to:</P>
        <CodeBlock lang="obj-c">
          <span style={cmt}>{"// every [object doSomething] becomes:"}</span><br />
          <span style={fn}>objc_msgSend</span>(object, <span style={sel}>@selector</span>(<span style={fn}>doSomething</span>))
        </CodeBlock>
        <P><Code>objc_msgSend</Code> is arguably the most important function in the history of consumer software. Every tap on every iPhone, every frame of every animation, every gesture and scroll and notification: all of it flows through that one function. It's the heartbeat of the runtime.</P>
      </Section>

      <Section id="s5" num="05 — the resolution chain" title={<>How <Em>objc_msgSend</Em> thinks</>}>
        <P>And it's fast. Absurdly fast. Because the runtime caches method resolutions. The first time you send <Code>reloadData</Code> to a table view, the runtime walks the class hierarchy, finds the implementation, and caches the mapping. The second time? Direct lookup. Sub-nanosecond.</P>
        <P>The runtime <em style={{ color: COLORS.accent }}>learns</em> your program's patterns as it runs.</P>
        <DispatchViz />
        <P>That resolution order hasn't fundamentally changed in <Strong>40 years</Strong>, because it didn't need to.</P>
      </Section>

      <Divider />

      <Section id="s6" num="06 — the connection" title={<>Tool use <Em>is</Em> message dispatch</>}>
        <P>I've been building AI agent tooling for the past year. MCP servers, tool orchestration, the whole stack. And I kept running into the same problem everyone runs into: tool selection doesn't scale.</P>
        <P>You've got 50 tools. The LLM sees all 50 schemas in its context window on every turn. Thousands of tokens. The model is doing triage in the prompt instead of reasoning about the user's question.</P>
        <P>And I kept thinking: <Strong>I've seen this solved before.</Strong></P>
        <P><Code>objc_msgSend</Code> solved it in 1984. The runtime doesn't evaluate every method on every class every time you send a message. It caches. It interns selectors. It walks a hierarchy only when it has to.</P>
        <Pullquote>
          The LLM sends a message like "search for code," and something needs to resolve that to a concrete tool. Right now, the LLM does that resolution itself by staring at 50 tool descriptions. That's like skipping the method cache and re-walking the entire class hierarchy on every single call.
        </Pullquote>
        <P>Once I saw it, I couldn't unsee it.</P>
      </Section>

      <Section id="s7" num="07 — the mapping" title={<>Smalltalk → <Em>smallchat</Em></>}>
        <ConceptMap />
        <P>I built <a href="https://github.com/johnnyclem/smallchat" style={{ color: COLORS.accent }}>smallchat</a>, first in TypeScript, because that's where the MCP ecosystem lives. Selector interning. Resolution caching. Superclass chains. Forwarding. Swizzling. The whole Obj-C runtime vocabulary, applied to tool orchestration.</P>
        <P>It works. It's on npm. People are using it. You can read more at <a href="https://smallchat.dev" style={{ color: COLORS.accent }}>smallchat.dev</a>.</P>
        <P>But it's not <em style={{ color: COLORS.accent }}>home</em> yet.</P>
      </Section>

      <Divider />

      <Section id="s8" num="08 — homecoming" title={<>smallchat-<Em>swift</Em></>}>
        <P>smallchat-swift is the native port. Swift 6, strict concurrency, Accelerate framework for vector math, the full deal.</P>
        <P>And here's the thing about writing this in Swift instead of TypeScript: <Strong>the metaphors stop being metaphors.</Strong></P>
        <P>In the TypeScript version, when I call something a "selector" or an "IMP," I'm borrowing vocabulary from a runtime that exists in a different language on a different platform. In Swift, those concepts are <em style={{ color: COLORS.accent }}>native</em>. The Objective-C runtime that inspired the architecture is literally available as an import.</P>
        <CodeBlock lang="swift">
          <span style={cmt}>{"// TypeScript: hand-rolled cosine similarity"}</span><br />
          <span style={kw}>function</span> <span style={fn}>cosineSim</span>(a, b) {"{ "}<span style={cmt}>{"/* 8 lines of math */"}</span>{" }"}<br />
          <br />
          <span style={cmt}>{"// Swift: Accelerate does the work"}</span><br />
          <span style={kw}>import</span> <span style={tp}>Accelerate</span><br />
          <span style={kw}>let</span> similarity = <span style={fn}>vDSP.cosineSimilarity</span>(a, b)
        </CodeBlock>
        <P><Code>ToolSelector</Code> in TypeScript is a struct with a <Code>vector</Code> field and a <Code>canonical</Code> string. <Code>ToolSelector</Code> in Swift is a <Code>Sendable</Code> value type with Accelerate-backed vector operations and compile-time concurrency safety. The resolution cache uses Swift's actor model instead of manually synchronized Maps.</P>
        <Pullquote>
          The tool dispatch model I built <em>came from</em> this platform's DNA. Bringing it back is like a cover version of a song played by the original artist. The phrasing is just different when you're the one who wrote it.
        </Pullquote>
      </Section>

      <Section id="s9" num="09 — on-device" title={<>Where <Em>objc_msgSend</Em> lives</>}>
        <P>The on-device story is what makes the Swift version essential. TypeScript smallchat runs on servers, in Node, in the cloud. Swift smallchat runs on the device: in an iOS app, in a macOS agent, on the same hardware where <Code>objc_msgSend</Code> has been running for seventeen years.</P>
        <P>When your on-device LLM needs to dispatch a tool call, the resolution happens in the same process, on the same chip, with the same Accelerate framework that powers Core ML. No network round-trip. No server. Single-digit millisecond dispatch with a memory footprint measured in kilobytes.</P>
        <P>That's "feels like <Code>objc_msgSend</Code>" territory.</P>
        <P>Which is the whole point.</P>
      </Section>

      <Divider />

      <Section id="s10" num="10 — full circle" title={<>What Alan Kay <Em>got right</Em></>}>
        <P>The big idea really is messaging. Not because messages are technically superior to function calls (at the metal, they compile to the same thing), but because messaging as a <em style={{ color: COLORS.accent }}>mental model</em> changes how you think about systems.</P>
        <P>When I was failing to learn Ruby, nobody told me to think about objects as actors that communicate. They told me to think about classes, inheritance, data structures, algorithms. Important things. True things. But not the thing that made it click.</P>
        <P>Objective-C taught me that a program is a society of objects sending messages to each other, and each object gets to decide what a message means. That model is flexible enough to build a camera app that pushes AVFoundation to its limits, and it's flexible enough to build a tool dispatch runtime for AI agents.</P>
        <Pullquote>The pattern hasn't changed. The messages just got smarter.</Pullquote>
        <P>smallchat is my attempt to take the insight that made me a programmer and apply it to the problem I'm spending my career on now. The TypeScript version proves the concept. The Swift version brings it home.</P>
      </Section>

      <footer style={{
        maxWidth: 720, margin: "0 auto",
        borderTop: `1px solid ${COLORS.border}`,
        padding: "40px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
        color: COLORS.textDim, letterSpacing: "0.08em",
        flexWrap: "wrap" as const, gap: 12,
      }}>
        <div>
          <a href="https://smallchat.dev" style={{ color: COLORS.accentDim, textDecoration: "none" }}>smallchat.dev</a>
          {" · "}
          <a href="https://github.com/johnnyclem/smallchat" style={{ color: COLORS.accentDim, textDecoration: "none" }}>GitHub</a>
          {" · "}
          <a href="https://twitter.com/johnnyclem" style={{ color: COLORS.accentDim, textDecoration: "none" }}>@johnnyclem</a>
        </div>
        <div>johnnyclem.dev / 2026</div>
      </footer>
    </div>
  );
}
