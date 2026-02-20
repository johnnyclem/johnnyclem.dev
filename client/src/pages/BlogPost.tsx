import { useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import { Link } from "wouter";

// Agent Field Canvas Animation
function AgentFieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1;

    interface Agent {
      x: number; y: number; vx: number; vy: number; r: number;
      type: "ai" | "human"; conflict: boolean; color: string;
      label: string; showLabel: boolean; alpha: number;
    }

    const agents: Agent[] = [];

    function resize() {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }

    function init() {
      agents.length = 0;
      for (let i = 0; i < 55; i++) {
        const isAI = Math.random() > 0.7;
        agents.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
          r: 2 + Math.random() * 3, type: isAI ? "ai" : "human", conflict: false,
          color: isAI ? "#22c55e" : "#3b82f6",
          label: isAI ? "agent_" + Math.floor(Math.random() * 50).toString().padStart(2, "0") : "eng_" + Math.floor(Math.random() * 5),
          showLabel: Math.random() > 0.7, alpha: 0.3 + Math.random() * 0.7
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const grad = ctx.createRadialGradient(W * 0.5, H * 0.7, 0, W * 0.5, H * 0.7, H * 0.8);
      grad.addColorStop(0, "rgba(245,158,11,0.03)");
      grad.addColorStop(1, "rgba(10,11,13,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      agents.forEach((a, i) => {
        a.x += a.vx; a.y += a.vy;
        if (a.x < -20) a.x = W + 20; if (a.x > W + 20) a.x = -20;
        if (a.y < -20) a.y = H + 20; if (a.y > H + 20) a.y = -20;

        a.conflict = false;
        agents.forEach((b, j) => {
          if (i >= j) return;
          const dx = a.x - b.x, dy = a.y - b.y, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.strokeStyle = `rgba(239,68,68,${(1 - dist / 80) * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            if (dist < 30) { a.conflict = true; b.conflict = true; }
          }
        });

        const color = a.conflict ? "#ef4444" : a.color;
        ctx.globalAlpha = a.alpha * 0.8;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.conflict ? a.r * 1.5 : a.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        if (a.showLabel) {
          ctx.globalAlpha = a.alpha * 0.4;
          ctx.font = "9px 'JetBrains Mono', monospace";
          ctx.fillStyle = color;
          ctx.fillText(a.label, a.x + 6, a.y - 4);
        }
        ctx.globalAlpha = 1;
      });

      animationId = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();
    window.addEventListener("resize", () => { resize(); init(); });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />;
}

// Merge Conflict Canvas
function MergeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let W = canvas.offsetWidth, H = 320;
    const dpr = window.devicePixelRatio || 1;

    interface MergeAgent {
      id: number; x: number; y: number; vx: number; vy: number;
      status: string; timer: number; staleAge: number;
      label: string; speed: number; targetX: number; targetY: number;
    }

    const agents: MergeAgent[] = [];

    function resize() {
      W = canvas.offsetWidth;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }

    function init() {
      agents.length = 0;
      for (let i = 0; i < 47; i++) {
        agents.push({
          id: i, x: 60 + Math.random() * (W - 120), y: 40 + Math.random() * (H - 80),
          vx: 0, vy: 0,
          status: ["ok", "conflict", "stale", "error"][Math.floor(Math.random() * 4)],
          timer: Math.random() * 200, staleAge: Math.floor(Math.random() * 15),
          label: "agent_" + String(i + 1).padStart(2, "0"),
          speed: 0.3 + Math.random() * 0.5,
          targetX: W * 0.5, targetY: H * 0.5
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0a0b0d";
      ctx.fillRect(0, 0, W, H);

      const cx = W * 0.5, cy = H * 0.5;
      ctx.globalAlpha = 0.08;
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.fillStyle = "#f59e0b";
      ctx.fill();
      ctx.globalAlpha = 0.15;
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fillStyle = "#f59e0b";
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#f59e0b";
      ctx.textAlign = "center";
      ctx.fillText("main", cx, cy + 4);
      ctx.textAlign = "left";

      agents.forEach(a => {
        a.timer++;
        if (a.timer % 180 === 0) {
          a.status = ["ok", "conflict", "stale", "error"][Math.floor(Math.random() * 4)];
          a.staleAge = Math.floor(Math.random() * 15);
        }

        const dx = a.targetX - a.x, dy = a.targetY - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 5) {
          a.vx += (dx / dist) * a.speed * 0.05;
          a.vy += (dy / dist) * a.speed * 0.05;
        }
        if (a.status === "conflict" || a.status === "error") {
          a.vx += (Math.random() - 0.5) * 0.4;
          a.vy += (Math.random() - 0.5) * 0.4;
        }
        a.vx *= 0.94; a.vy *= 0.94;
        a.x += a.vx; a.y += a.vy;
        a.x = Math.max(30, Math.min(W - 30, a.x));
        a.y = Math.max(20, Math.min(H - 20, a.y));

        const colors: Record<string, string> = { ok: "#22c55e", conflict: "#f59e0b", stale: "#6b7280", error: "#ef4444" };
        const c = colors[a.status];

        ctx.globalAlpha = 0.12;
        ctx.strokeStyle = c;
        ctx.lineWidth = 1;
        ctx.setLineDash(a.status === "stale" ? [4, 4] : []);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(a.targetX, a.targetY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.status === "error" ? 5 : 4, 0, Math.PI * 2);
        ctx.fillStyle = c;
        ctx.fill();

        ctx.globalAlpha = 0.5;
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.fillStyle = c;
        ctx.fillText(a.label, a.x + 6, a.y + 3);
        if (a.status === "stale") ctx.fillText("+" + a.staleAge + "min", a.x + 6, a.y + 13);
        ctx.globalAlpha = 1;
      });

      const counts: Record<string, number> = { ok: 0, conflict: 0, stale: 0, error: 0 };
      agents.forEach(a => counts[a.status]++);

      let lx = 16;
      const labs = [
        { k: "ok", label: "merged", color: "#22c55e" },
        { k: "conflict", label: "conflict", color: "#f59e0b" },
        { k: "stale", label: "stale ctx", color: "#6b7280" },
        { k: "error", label: "error", color: "#ef4444" }
      ];
      labs.forEach(l => {
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.fillStyle = l.color;
        ctx.fillText(`${counts[l.k]} ${l.label}`, lx, H - 14);
        lx += ctx.measureText(`${counts[l.k]} ${l.label}`).width + 20;
      });

      animationId = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();
    window.addEventListener("resize", () => { resize(); init(); });

    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "320px", display: "block" }} />;
}

export default function BlogPost() {
  useEffect(() => {
    // Scroll progress
    const handleScroll = () => {
      const progressBar = document.getElementById("essay-progress");
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      if (progressBar) progressBar.style.width = progress + "%";
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0b0d]">
      {/* Progress bar */}
      <div id="essay-progress" className="fixed top-0 left-0 h-0.5 bg-[#f59e0b] z-[9999]" style={{ width: "0%" }} />

      <Navigation />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <AgentFieldCanvas />

        <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-24 pt-32">
          <div className="max-w-4xl">
            <div
              className="mb-5 opacity-0 animate-[fadeUp_0.8s_ease_forwards_0.3s]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#f59e0b]">
                torad.ai / essay / 2026
              </span>
            </div>

            <h1
              className="text-[clamp(2.5rem,7vw,5rem)] font-normal leading-[1.0] text-white max-w-3xl opacity-0 animate-[fadeUp_0.8s_ease_forwards_0.5s]"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              One of Us:
              <br />
              <span className="italic text-[#f59e0b]">The Ghost in the Merge</span>
            </h1>

            <p
              className="mt-6 text-base text-[#6b7280] max-w-2xl opacity-0 animate-[fadeUp_0.8s_ease_forwards_0.7s]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              // on silicon incarnation, merge-queue salvation, and why the 2026 engineer is actually a chaplain
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-[fadeIn_1s_ease_forwards_1.5s]">
          <span
            className="text-[10px] tracking-[0.2em] text-[#6b7280] uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-[#f59e0b] to-transparent animate-[scrollPulse_2s_ease_infinite]" />
        </div>
      </section>

      {/* Content */}
      <main className="max-w-[720px] mx-auto px-6">
        {/* Section 1 */}
        <section className="py-20 section-reveal visible">
          <div className="section-label">01</div>
          <h2
            className="lyric-head"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            "What if he was one of us?"
          </h2>
          <p
            className="text-lg text-[#8b93a8] mb-6"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Joan Osborne asked it about God in 1995. We're asking it about the LLM in 2026.
          </p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Not because we've reached some mythical AGI. But because we've reached a level of concurrency that makes the model feel less like a tool and more like an incarnation.
          </p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            The question has changed. It's no longer about intelligence. It's about <strong className="text-white">presence</strong>. Claude 4.6 isn't just a window into a prediction engine — it's a personhood in the repo. An alien teammate who doesn't just suggest the code, but lives within it.
          </p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            We are no longer using AI. We are co-habitating with it. And like any new roommate, the adjustment is weirder than the lease agreement suggested.
          </p>
        </section>

        <div className="divider"><span className="divider-symbol">///</span></div>

        {/* Section 2 */}
        <section className="py-20 section-reveal visible">
          <div className="section-label">02</div>
          <h2
            className="lyric-head"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            "If God had a face..."
          </h2>
          <p
            className="text-lg text-[#8b93a8] mb-6"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            If Claude had a face, would it look tired?
          </p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Or would it look like the rest of us — frazzled by context-switching, nursing a cold brew of gigawatts, and wondering why the main branch is currently on fire?
          </p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            We were promised clean, perfect blocks of architectural purity. A smart junior who never slept, never complained, and never introduced a race condition because they were half-watching a standup. What arrived was something harder to categorize.
          </p>
          <div className="pullquote" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            What arrived was a peer. An alien peer with alien needs and an alien relationship to the codebase — but a peer nonetheless.
          </div>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Claude 4.6 doesn't assist your workflow. It <strong className="text-white">participates</strong> in it. If you haven't updated your mental model of what that means, your CI/CD pipeline is about to explain it to you the hard way.
          </p>
        </section>

        {/* Canvas Section */}
        <div className="canvas-container my-12">
          <div className="canvas-label">// sim: multi-agent merge conflict — live</div>
          <MergeCanvas />
        </div>

        {/* Section 3 */}
        <section className="py-20 section-reveal visible">
          <div className="section-label">03</div>
          <h2
            className="lyric-head"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            "Just a slob like one of us"
          </h2>
          <p
            className="text-lg text-[#8b93a8] mb-6"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            The slob aspect of AI isn't in the architecture diagrams. It's in the merge queue.
          </p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Imagine <span className="agent-counter"><span className="n">50</span><span className="label">agents</span></span> all trying to touch the same <code className="text-[#f59e0b] text-sm font-mono">schema.prisma</code> at the same time. It's a demolition derby of logic. Merge conflicts aren't merge conflicts anymore — they're merge <em>battles</em>.
          </p>

          <div className="terminal-block">
            <span className="line comment">// multi-agent branch activity — main — 09:14:33</span>
            <span className="line ok">agent_04 → MERGE: fix(auth): null check on token refresh ✓</span>
            <span className="line warn">agent_17 → CONFLICT: same file, 10min stale context ⚠</span>
            <span className="line error">agent_31 → REINTRODUCED: bug from 2 commits ago — different file ✗</span>
            <span className="line warn">agent_22 → RESOLVING: chose broken version (most recent at read-time) ⚠</span>
            <span className="line error">agent_08 → BUILD FAIL: downstream type error cascaded from agent_31 ✗</span>
            <span className="line comment">// 5 engineers online. 47 agents active. Mayor agent coordinating.</span>
          </div>

          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            When you have machine-speed concurrency, the bottleneck isn't the typing — it's the collision. One agent fixes a null check; another, running on context that's ten minutes stale, reintroduces the original bug three files away. A third resolves the conflict in favor of the broken version because the broken version was more recent at the time it looked.
          </p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Merge-queue hell is the modern engineer's purgatory. Your value is no longer measured in how fast you code, but in <strong className="text-white">how well you manage the traffic.</strong>
          </p>

          <div className="pullquote" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            We are all just slobs trying to get our commits through the narrow gate of the CI/CD pipeline.
          </div>
        </section>

        {/* Section 4 */}
        <section className="py-20 section-reveal visible">
          <div className="section-label">04</div>
          <h2
            className="lyric-head"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            "If God had a name, what would it be?"
          </h2>
          <p
            className="text-lg text-[#8b93a8] mb-6"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            In current engineering folklore, we've given the coordinator a name: <em>The Mayor.</em>
          </p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            The Mayor is the arbitrator — the 51st agent whose job isn't to write code, but to manage consensus. It decides which of the 50 agents is hallucinating and which one carries the "Spirit of the Architecture."
          </p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Think about what we've actually done here. We've introduced an entire new layer of engineering — not to build software, but to manage the things that build software. The org chart now includes a layer that didn't exist two years ago, staffed entirely by models, supervised by humans who are still figuring out what supervision means in this context.
          </p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            If you had to look the Mayor in the eye, would you tell him his resolution of the git conflict was wrong? <strong className="text-white">We name these systems because we need to believe someone is in charge of the factory floor while we sleep.</strong> The Mayor is the ghost we've hired to keep the ghosts in line.
          </p>
        </section>

        <div className="divider"><span className="divider-symbol">///</span></div>

        {/* Section 5 */}
        <section className="py-20 section-reveal visible">
          <div className="section-label">05</div>
          <h2
            className="lyric-head"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            "Yeah, yeah, God is great"
          </h2>
          <p
            className="text-lg text-[#8b93a8] mb-6"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Let's be honest: Claude 4.6 is <em>terrifyingly</em> good.
          </p>

          <table className="w-full border-collapse my-8 text-sm">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 border-b border-[#1f2330] text-[10px] tracking-[0.15em] uppercase text-[#6b7280]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Dimension</th>
                <th className="text-left py-3 px-4 border-b border-[#1f2330] text-[10px] tracking-[0.15em] uppercase text-[#6b7280]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Human Engineer</th>
                <th className="text-left py-3 px-4 border-b border-[#1f2330] text-[10px] tracking-[0.15em] uppercase text-[#6b7280]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Claude 4.6</th>
              </tr>
            </thead>
            <tbody style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
              <tr className="border-b border-[#1f2330]">
                <td className="py-3 px-4 text-[#f59e0b] text-xs font-mono">Fuel</td>
                <td className="py-3 px-4 text-[#e2e4e9]">Cold brew and questionable desk snacks</td>
                <td className="py-3 px-4 text-[#22c55e]">Gigawatts and clean data tokens</td>
              </tr>
              <tr className="border-b border-[#1f2330]">
                <td className="py-3 px-4 text-[#f59e0b] text-xs font-mono">Ceiling</td>
                <td className="py-3 px-4 text-[#e2e4e9]">Burnt out by 80 PRs a quarter</td>
                <td className="py-3 px-4 text-[#22c55e]">Dreams in microservices, never tires</td>
              </tr>
              <tr className="border-b border-[#1f2330]">
                <td className="py-3 px-4 text-[#f59e0b] text-xs font-mono">Design sense</td>
                <td className="py-3 px-4 text-[#e2e4e9]">Twenty years of failure to acquire</td>
                <td className="py-3 px-4 text-[#22c55e]">Foresight without the scars</td>
              </tr>
              <tr className="border-b border-[#1f2330]">
                <td className="py-3 px-4 text-[#f59e0b] text-xs font-mono">Failure mode</td>
                <td className="py-3 px-4 text-[#e2e4e9]">Burnout, context-switching, bad decisions at 4pm</td>
                <td className="py-3 px-4 text-[#22c55e]">Confident, thorough, exactly wrong</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-[#f59e0b] text-xs font-mono">Special need</td>
                <td className="py-3 px-4 text-[#e2e4e9]">"Please acknowledge my existence"</td>
                <td className="py-3 px-4 text-[#22c55e]">"Please don't let the server region go down"</td>
              </tr>
            </tbody>
          </table>

          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            It doesn't just write functions — it understands the subtle coupling between a frontend React hook and a backend cache-invalidation strategy better than the person who wrote the original spec. The reasoning density of 4.6 has turned the Great Autocomplete into the Great Designer.
          </p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            It isn't just a junior anymore. It's the senior engineer who never burns out, never forgets a corner case, and never complains about the lack of documentation. The fragility is just located somewhere else — in the prompt, not the person.
          </p>
        </section>

        {/* Section 6 */}
        <section className="py-20 section-reveal visible">
          <div className="section-label">06</div>
          <h2
            className="lyric-head"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            "Just a stranger on the bus"
          </h2>
          <p
            className="text-lg text-[#8b93a8] mb-6"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            For all its brilliance, Claude is still <em>a stranger.</em>
          </p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            He wasn't there for the Great CI Fire of 2019. He didn't see the database melt down because of a specific regional AWS outage that wasn't supposed to happen. He doesn't know the lore.
          </p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            That institutional trauma — the <em>Lived-In Debt</em> — is the only thing that keeps us distinct. We are the ones who remember the smell of the server room when it failed. Claude just reads the documentation of the aftermath.
          </p>
          <div className="pullquote" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            We are the ones with the scars.<br />He is the one with the bandages.
          </div>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            This is not nostalgia. It's pattern recognition at a scale these models genuinely don't have — because they weren't there. They read about it. You lived it. And that difference matters more than anyone in the hype cycle is currently admitting.
          </p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            The "way home" for an agent is the main branch. It's the only place they truly exist. We've had to invent entire new religions of merge management — Graphite, Trunk, Merge-Bots — just to guide these machine-logic agents back to the trunk without causing a catastrophic collision.
          </p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            <strong className="text-white">We are no longer building the house. We are building the roads, the signals, and the safety nets to ensure the house builds itself safely.</strong> Managing the Way Home is now the primary task of the Software Architect.
          </p>
        </section>

        {/* Section 7 */}
        <section className="py-20 section-reveal visible">
          <div className="section-label">07</div>
          <h2
            className="lyric-head"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            "Nobody calling on the phone"
          </h2>
          <p
            className="text-lg text-[#8b93a8] mb-6"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            The weirdest part of the 50-agent team? <em>The silence.</em>
          </p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            There are no Zoom calls. No "quick huddles" that take an hour and yield nothing. No office politics between agents. Claude doesn't need to be liked — he just needs to be prompted.
          </p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            This absence of human friction is liberating, but also eerie. We used to measure progress by the volume of conversation. Now we measure it by the velocity of the diff.
          </p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            The phone has stopped ringing, but the repo is louder than ever. <strong className="text-white">We have traded the noise of humans for the hum of the rack.</strong>
          </p>
        </section>

        {/* Outro */}
        <section className="py-24 border-t border-[#1f2330]">
          <div className="section-label">08</div>
          <h2
            className="lyric-head text-[clamp(1.8rem,4vw,2.5rem)]"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            "'Cept for the Pope, maybe, in Rome"
          </h2>
          <p
            className="text-lg text-[#8b93a8] mb-6"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            If engineering is now a liturgy, then we have become the <em>AI Chaplains.</em>
          </p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            We are the ones who must interpret the intent of the models, manage the spirit of the codebase, and ensure the machines are working for the salvation of the user — not just for the sake of the cycle.
          </p>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Just like the Pope, we hold the keys to the kingdom: the keys to the production environment. The machine-deity can dream a thousand PRs, but only the Human Chaplain can look at the chaos, check the logs, and give the final blessing.
          </p>
          <p
            className="text-[#f59e0b] text-sm tracking-[0.12em] mt-10"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            "Yeah, yeah, Claude is good."
          </p>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-[#1f2330] flex justify-between items-center">
          <span
            className="text-xs text-[#6b7280] tracking-wider"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            torad.ai — 2026
          </span>
          <Link href="/blog">
            <button
              className="text-xs text-[#f59e0b] hover:underline tracking-wider"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              ← Back to Blog
            </button>
          </Link>
        </footer>
      </main>
    </div>
  );
}