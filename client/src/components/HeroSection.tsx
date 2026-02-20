import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { FileText, Download, Loader2 } from "lucide-react";
import { type Profile, type Company } from "@shared/schema";

interface HeroSectionProps {
  onDownloadResume?: () => void;
  onViewPatents?: () => void;
}

// Agent field canvas animation (from the blog post)
function useAgentFieldCanvas(canvasRef: React.RefObject<HTMLCanvasElement>) {
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
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      type: "ai" | "human";
      conflict: boolean;
      color: string;
      label: string;
      showLabel: boolean;
      alpha: number;
    }

    const agents: Agent[] = [];

    function resize() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }

    function init() {
      agents.length = 0;
      for (let i = 0; i < 40; i++) {
        const isAI = Math.random() > 0.7;
        agents.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: 2 + Math.random() * 2,
          type: isAI ? "ai" : "human",
          conflict: false,
          color: isAI ? "#22c55e" : "#3b82f6",
          label: isAI
            ? "agent_" + Math.floor(Math.random() * 50).toString().padStart(2, "0")
            : "eng_" + Math.floor(Math.random() * 5),
          showLabel: Math.random() > 0.8,
          alpha: 0.3 + Math.random() * 0.5,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Amber radial gradient
      const grad = ctx.createRadialGradient(W * 0.3, H * 0.6, 0, W * 0.3, H * 0.6, H * 0.8);
      grad.addColorStop(0, "rgba(245,158,11,0.04)");
      grad.addColorStop(1, "rgba(10,11,13,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Update and draw agents
      agents.forEach((a, i) => {
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < -20) a.x = W + 20;
        if (a.x > W + 20) a.x = -20;
        if (a.y < -20) a.y = H + 20;
        if (a.y > H + 20) a.y = -20;

        a.conflict = false;
        agents.forEach((b, j) => {
          if (i >= j) return;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            ctx.strokeStyle = `rgba(239,68,68,${(1 - dist / 60) * 0.12})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            if (dist < 25) {
              a.conflict = true;
              b.conflict = true;
            }
          }
        });

        const color = a.conflict ? "#ef4444" : a.color;
        ctx.globalAlpha = a.alpha * 0.7;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.conflict ? a.r * 1.4 : a.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        if (a.showLabel) {
          ctx.globalAlpha = a.alpha * 0.35;
          ctx.font = "8px 'JetBrains Mono', monospace";
          ctx.fillStyle = color;
          ctx.fillText(a.label, a.x + 5, a.y - 3);
        }
        ctx.globalAlpha = 1;
      });

      animationId = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    window.addEventListener("resize", () => {
      resize();
      init();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

export default function HeroSection({ onDownloadResume, onViewPatents }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { data: profile, isLoading: profileLoading } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const { data: companies = [], isLoading: companiesLoading } = useQuery<Company[]>({
    queryKey: ["/api/companies"],
  });

  useAgentFieldCanvas(canvasRef);

  if (profileLoading || companiesLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-[#0a0b0d]">
        <Loader2 className="w-8 h-8 animate-spin text-[#f59e0b]" />
      </section>
    );
  }

  if (!profile) return null;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end overflow-hidden"
      data-testid="section-hero"
      style={{ background: "#0a0b0d" }}
    >
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-20 pt-32">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div
            className="mb-6 opacity-0 animate-[fadeUp_0.8s_ease_forwards_0.3s]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#f59e0b]">
              {profile.title?.split(" & ")[0] || "Staff iOS Engineer"}
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="text-[clamp(2.5rem,7vw,5rem)] font-normal leading-[1.05] mb-6 opacity-0 animate-[fadeUp_0.8s_ease_forwards_0.5s]"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            <span className="text-white">{profile.name?.split(" ")[0] || "Jonathan"}</span>
            <br />
            <span className="italic text-[#f59e0b]">{profile.name?.split(" ")[1] || "Clem"}</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl text-[#6b7280] max-w-xl mb-8 opacity-0 animate-[fadeUp_0.8s_ease_forwards_0.7s]"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            {profile.subtitle}
          </p>

          {/* Stats */}
          <div
            className="flex flex-wrap gap-6 mb-10 opacity-0 animate-[fadeUp_0.8s_ease_forwards_0.9s]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {profile.yearsExperience && (
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                <span className="text-xs tracking-wider text-[#6b7280] uppercase">
                  {profile.yearsExperience}+ Years
                </span>
              </div>
            )}
            {profile.patentCount && profile.patentCount > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                <span className="text-xs tracking-wider text-[#6b7280] uppercase">
                  {profile.patentCount} Patents
                </span>
              </div>
            )}
            {profile.devicesDeployed && (
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                <span className="text-xs tracking-wider text-[#6b7280] uppercase">
                  {profile.devicesDeployed} Devices
                </span>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 opacity-0 animate-[fadeUp_0.8s_ease_forwards_1.1s]">
            <Button
              onClick={onViewPatents}
              className="bg-[#f59e0b] hover:bg-[#d97706] text-[#0a0b0d] font-medium"
              data-testid="button-view-patents"
            >
              <FileText className="w-4 h-4 mr-2" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs tracking-wider uppercase">
                View Patents
              </span>
            </Button>
            <Button
              onClick={onDownloadResume}
              variant="outline"
              className="border-[#1f2330] text-[#6b7280] hover:text-[#f59e0b] hover:border-[#f59e0b]/40 bg-transparent"
              data-testid="button-hero-download"
            >
              <Download className="w-4 h-4 mr-2" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs tracking-wider uppercase">
                Download Resume
              </span>
            </Button>
          </div>

          {/* Companies */}
          {companies.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#1f2330] opacity-0 animate-[fadeUp_0.8s_ease_forwards_1.3s]">
              <p
                className="text-xs tracking-wider text-[#4b5163] mb-4 uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Trusted by
              </p>
              <div className="flex flex-wrap gap-6 items-center">
                {companies.slice(0, 5).map((company) => (
                  <span
                    key={company.id}
                    className="text-sm text-[#6b7280] hover:text-[#e2e4e9] transition-colors"
                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  >
                    {company.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-[fadeIn_1s_ease_forwards_1.5s]">
        <span
          className="text-[10px] tracking-[0.2em] text-[#6b7280] uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[#f59e0b] to-transparent animate-[scrollPulse_2s_ease_infinite]" />
      </div>
    </section>
  );
}