import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Video, Shield, Bot, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      icon: Video,
      title: "FiLMIC Pro",
      company: "FiLMIC Inc.",
      role: "Staff iOS Engineer & CTO",
      description:
        "Achieved #1 App Store ranking in Photo & Video. Featured in Apple's iPhone 11 keynote. Optimized AVFoundation pipelines for millions of users.",
      impact: "#1 App Store",
      tech: ["Swift", "AVFoundation", "CoreMedia"],
      color: "text-chart-3",
      highlight: true,
    },
    {
      icon: Shield,
      title: "Content-Provenance SDK",
      company: "Truepic",
      role: "Senior iOS Engineer",
      description:
        "Developed secure iOS SDK for content authenticity, adopted by 6 major social media platforms and deployed to over 1 billion mobile devices.",
      impact: "1B+ devices",
      tech: ["Swift", "Security", "SDK"],
      color: "text-primary",
      highlight: false,
    },
    {
      icon: Bot,
      title: "Agentic AI Platform",
      company: "AI Layer Labs",
      role: "Senior Blockchain Engineer",
      description:
        "Architected open-source agentic AI application for MacOS. Established TypeScript ecosystem for AI agents and LLM+RAG workflows.",
      impact: "$2M raised",
      tech: ["TypeScript", "AI/ML", "RAG"],
      color: "text-chart-5",
      highlight: false,
    },
    {
      icon: Zap,
      title: "Ultra Low-Latency Streaming",
      company: "Paladin Innovators",
      role: "Senior Engineer",
      description:
        "Pioneered methods for transmitting high-resolution video with sub-100ms latency, enabling real-time production control from mobile devices.",
      impact: "<100ms latency",
      tech: ["WebSockets", "Video", "Real-time"],
      color: "text-chart-2",
      highlight: false,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [projects.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const project = projects[currentIndex];
  const Icon = project.icon;

  return (
    <div className="relative" data-testid="carousel-projects">
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-lg bg-primary/10 ${project.color} flex-shrink-0`}>
            <Icon className="w-7 h-7" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-2xl font-bold" data-testid={`carousel-title-${currentIndex}`}>
                {project.title}
              </h3>
              {project.highlight && (
                <Badge className="bg-chart-3/10 text-chart-3 border-chart-3/20 flex-shrink-0">
                  Featured
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-1">{project.company}</p>
            <p className="text-sm font-medium text-primary">{project.role}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20">{project.impact}</Badge>
          {project.tech.map((tech, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex gap-1">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30"
                }`}
                data-testid={`carousel-dot-${idx}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={prevSlide}
              className="h-8 w-8"
              data-testid="button-carousel-prev"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={nextSlide}
              className="h-8 w-8"
              data-testid="button-carousel-next"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
