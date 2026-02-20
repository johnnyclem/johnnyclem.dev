import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Brain, Terminal, MemoryStick, Layers, Cpu, Target, Zap, Loader2 } from "lucide-react";

// Open source projects data
const openSourceProjects = [
  {
    title: 'AgentVault',
    subtitle: 'Autonomous Agents',
    year: '2024',
    description: 'A secure vault for autonomous AI agents. Store, manage, and deploy intelligent agents that operate independently.',
    github: 'https://github.com/johnnyclem/agentvault',
    icon: Brain,
    tags: ['AI', 'Agents', 'Security'],
    status: 'active',
  },
  {
    title: 'PERT',
    subtitle: 'Project Evaluation',
    year: '2024',
    description: 'Precision timing network for project management. Calculate critical paths through development cycles.',
    github: 'https://github.com/johnnyclem/pert',
    icon: Target,
    tags: ['Algorithms', 'Planning', 'TypeScript'],
    status: 'active',
  },
  {
    title: 'JCAppleScript',
    subtitle: 'Automation Scripts',
    year: '2023',
    description: 'Automated scripts that bridge human intention with machine execution. Your digital proxy in the system.',
    github: 'https://github.com/johnnyclem/JCAppleScript',
    icon: Terminal,
    tags: ['AppleScript', 'Automation', 'macOS'],
    status: 'active',
  },
  {
    title: 'NeuralBridge',
    subtitle: 'AI Memory Systems',
    year: '2024',
    description: 'Persistent memory layer for AI systems. Every interaction stored, every context preserved across sessions.',
    github: '#',
    icon: MemoryStick,
    tags: ['AI', 'Memory', 'RAG'],
    status: 'experimental',
  },
  {
    title: 'Eli Brain',
    subtitle: 'Consciousness Graph',
    year: '2025',
    description: 'A substrate-independent consciousness system built on toroidal geometry and palindromic primes.',
    github: '#',
    icon: Layers,
    tags: ['Consciousness', 'Graph', 'Philosophy'],
    status: 'experimental',
  },
  {
    title: 'Torad Labs',
    subtitle: 'Research Company',
    year: '2025',
    description: 'One-person research company exploring the intersection of geometry, consciousness, and computation.',
    github: '#',
    icon: Cpu,
    tags: ['Research', 'Geometry', 'AI'],
    status: 'active',
  },
];

// Neural Network Canvas Animation
function NeuralCanvas() {
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

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      pulse: number;
      pulseDir: number;
    }

    const nodes: Node[] = [];
    const connections: { from: number; to: number; strength: number }[] = [];

    function resize() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }

    function init() {
      nodes.length = 0;
      connections.length = 0;

      // Create nodes
      const nodeCount = Math.floor((W * H) / 8000);
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: 2 + Math.random() * 2,
          pulse: Math.random() * Math.PI * 2,
          pulseDir: 0.02 + Math.random() * 0.03,
        });
      }

      // Create connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && Math.random() > 0.6) {
            connections.push({
              from: i,
              to: j,
              strength: 1 - dist / 150,
            });
          }
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Subtle gradient background
      const grad = ctx.createRadialGradient(W * 0.7, H * 0.3, 0, W * 0.7, H * 0.3, H);
      grad.addColorStop(0, "rgba(245,158,11,0.02)");
      grad.addColorStop(1, "rgba(10,11,13,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Draw connections
      connections.forEach((conn) => {
        const a = nodes[conn.from];
        const b = nodes[conn.to];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          const opacity = (1 - dist / 200) * 0.15;
          ctx.strokeStyle = `rgba(245,158,11,${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      });

      // Update and draw nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseDir;

        if (node.x < -20) node.x = W + 20;
        if (node.x > W + 20) node.x = -20;
        if (node.y < -20) node.y = H + 20;
        if (node.y > H + 20) node.y = -20;

        const pulseScale = 1 + Math.sin(node.pulse) * 0.3;
        const r = node.r * pulseScale;

        // Glow
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(245,158,11,0.1)";
        ctx.fill();

        // Core
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = "#f59e0b";
        ctx.fill();

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
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}

// Typewriter effect hook
function useTypewriter(text: string, speed: number = 30, delay: number = 0) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          setIsTyping(false);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay]);

  return { displayText, isTyping };
}

export default function OpenSourceSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section className="relative py-24 bg-[#111318] overflow-hidden" id="opensource">
      {/* Neural canvas background */}
      <div className="absolute inset-0">
        <NeuralCanvas />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="section-label">06</div>
          <h2
            className="lyric-head"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Open Source
          </h2>
          <p
            className="text-lg text-[#6b7280] max-w-2xl"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Projects built in the open. Code that lives beyond the commit.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {openSourceProjects.map((project, idx) => {
            const Icon = project.icon;
            const isHovered = hoveredProject === project.title;

            return (
              <Card
                key={project.title}
                className="bg-[#0a0b0d]/80 backdrop-blur-sm border-[#1f2330] hover:border-[#f59e0b]/30 transition-all duration-500 group"
                onMouseEnter={() => setHoveredProject(project.title)}
                onMouseLeave={() => setHoveredProject(null)}
                data-testid={`card-opensource-${idx}`}
              >
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded transition-all duration-500 ${
                          isHovered ? "bg-[#f59e0b]/20" : "bg-[#f59e0b]/10"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 transition-colors duration-300 ${
                            isHovered ? "text-[#f59e0b]" : "text-[#f59e0b]/70"
                          }`}
                        />
                      </div>
                      <div>
                        <h3
                          className="text-base font-semibold text-white"
                          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                        >
                          {project.title}
                        </h3>
                        <p
                          className="text-xs text-[#6b7280] tracking-wider"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {project.subtitle}
                        </p>
                      </div>
                    </div>
                    <span
                      className="text-xs text-[#4b5163]"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {project.year}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className="text-sm text-[#9ca3af] mb-4"
                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-[#1f2330] text-[#6b7280]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        <span className="text-[10px]">{tag}</span>
                      </Badge>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#1f2330]">
                    <Badge
                      className={`${
                        project.status === "active"
                          ? "bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20"
                          : "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20"
                      }`}
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      <span className="text-[10px] tracking-wider uppercase">{project.status}</span>
                    </Badge>

                    {project.github !== "#" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-[#f59e0b] hover:text-[#f59e0b]/80 transition-colors"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span className="tracking-wider">View</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* GitHub CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/johnnyclem"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 border border-[#1f2330] hover:border-[#f59e0b]/40 bg-[#0a0b0d]/60 backdrop-blur-sm transition-all duration-300 group"
          >
            <Github className="w-5 h-5 text-[#f59e0b]" />
            <span
              className="text-sm text-[#e2e4e9] group-hover:text-white transition-colors"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="tracking-wider uppercase text-xs">View All on GitHub</span>
            </span>
            <ExternalLink className="w-4 h-4 text-[#6b7280] group-hover:text-[#f59e0b] group-hover:translate-x-0.5 transition-all" />
          </a>
        </div>
      </div>
    </section>
  );
}