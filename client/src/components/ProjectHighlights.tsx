import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Bot, Video, Zap, Users, TrendingUp } from "lucide-react";

export default function ProjectHighlights() {
  const projects = [
    {
      icon: Shield,
      title: "Secure Content-Provenance SDK",
      company: "Truepic",
      description:
        "Technical leadership in developing iOS SDK for content authenticity, adopted by 6 major social media platforms and deployed to over 1 billion mobile devices.",
      impact: "1B+ devices",
      tech: ["Swift", "Objective-C", "Security", "SDK Design"],
      color: "text-primary",
    },
    {
      icon: Bot,
      title: "Agentic AI MacOS Application",
      company: "AI Layer Labs",
      description:
        "Architected and launched open-source agentic AI application, establishing TypeScript ecosystem for AI agents and LLM+RAG workflows. Contributed to $2M fundraise.",
      impact: "$2M raised",
      tech: ["TypeScript", "AI/ML", "RAG", "macOS"],
      color: "text-chart-5",
    },
    {
      icon: Video,
      title: "FiLMIC Pro App Store #1",
      company: "FiLMIC Inc.",
      description:
        "Led mobile engineering team and optimized AVFoundation, CoreMedia, and CoreAudio pipelines to achieve #1 App Store ranking in Photo & Video category.",
      impact: "#1 App Store",
      tech: ["Swift", "AVFoundation", "CoreMedia", "Performance"],
      color: "text-chart-3",
    },
    {
      icon: Zap,
      title: "Ultra Low-Latency Streaming",
      company: "Paladin Innovators",
      description:
        "Pioneered methods for transmitting high-resolution video with sub-100ms latency over standard networks, enabling real-time production control from mobile devices.",
      impact: "<100ms latency",
      tech: ["WebSockets", "Video Streaming", "Real-time"],
      color: "text-chart-2",
    },
    {
      icon: Users,
      title: "Multi-Platform SDK Integration",
      company: "Various",
      description:
        "Delivered significant code contributions to tier-1 applications from Meta, OpenAI, Starbucks, and X, demonstrating versatility across diverse technical stacks.",
      impact: "Tier-1 apps",
      tech: ["iOS", "Cross-platform", "Integration"],
      color: "text-chart-4",
    },
    {
      icon: TrendingUp,
      title: "Team Scaling & Mentorship",
      company: "FiLMIC Inc.",
      description:
        "Grew mobile engineering team from 1 to 8 engineers while establishing release discipline, quality standards, and architectural guidelines.",
      impact: "8x team growth",
      tech: ["Leadership", "Mentoring", "Architecture"],
      color: "text-primary",
    },
  ];

  return (
    <section id="projects" className="py-20" data-testid="section-projects">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-projects-title">
            Project Highlights
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Proven track record of delivering high-impact solutions across mobile, AI, and video technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => {
            const Icon = project.icon;
            return (
              <Card
                key={idx}
                className="p-6 hover-elevate active-elevate-2 transition-all flex flex-col"
                data-testid={`card-project-${idx}`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-primary/10 ${project.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.company}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 flex-1">{project.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20">
                      {project.impact}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIdx) => (
                      <Badge key={techIdx} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
