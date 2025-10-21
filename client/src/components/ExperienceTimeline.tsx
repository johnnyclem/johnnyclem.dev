import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Building2 } from "lucide-react";

export default function ExperienceTimeline() {
  const experiences = [
    {
      company: "AI Layer Labs / Wire Network",
      role: "Senior Blockchain Engineer (AI Agents)",
      period: "Nov 2024 - Jun 2025",
      location: "Remote, United States",
      type: "AI & Blockchain",
      achievements: [
        "Architected and launched open-source agentic AI application for MacOS",
        "Contributed to successful $2M pre-seed fundraise",
        "Established TypeScript ecosystem for AI agents",
        "Engineered LLM+RAG workflows",
      ],
    },
    {
      company: "Truepic",
      role: "Senior iOS Engineer",
      period: "Nov 2023 - Nov 2024",
      location: "Remote, United States",
      type: "iOS Development",
      achievements: [
        "Developed secure content-provenance iOS SDK adopted by 6 major social media platforms",
        "Enhanced media capture and transmission pipelines for low latency",
        "Reduced p95 operation time across diverse network conditions",
        "Collaborated with Product and Design teams on usability improvements",
      ],
    },
    {
      company: "Belief Agency",
      role: "Director of Digital",
      period: "Nov 2019 - Aug 2022",
      location: "Seattle, United States",
      type: "Leadership",
      achievements: [
        "Guided multi-disciplinary mobile and web teams",
        "Instituted best practices for code review and testing methodologies",
        "Collaborated with creative and account teams on diverse solutions",
        "Drove informed technical decisions across projects",
      ],
    },
    {
      company: "FiLMIC Inc.",
      role: "Staff iOS Engineer, Chief Technology Officer",
      period: "Feb 2015 - Jan 2019",
      location: "Seattle, United States",
      type: "CTO",
      achievements: [
        "Directed and mentored mobile engineering team from 1 to 8 engineers",
        "Achieved #1 App Store ranking in Photo & Video category",
        "Enhanced performance within AVFoundation, CoreMedia, and CoreAudio pipelines",
        "Instituted release discipline and architectural guidelines",
      ],
    },
  ];

  const typeColors: Record<string, string> = {
    "AI & Blockchain": "bg-chart-5/10 text-chart-5 border-chart-5/20",
    "iOS Development": "bg-primary/10 text-primary border-primary/20",
    Leadership: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    CTO: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  };

  return (
    <section id="experience" className="py-20" data-testid="section-experience">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-experience-title">
            Work Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Over a decade of leading technical innovation, scaling teams, and delivering high-impact applications
            to millions of users
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  idx % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
                data-testid={`timeline-item-${idx}`}
              >
                <div className="md:w-1/2" />
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 mt-6 border-4 border-background hidden md:block" />

                <Card className="md:w-1/2 p-6 hover-elevate transition-all" data-testid={`card-experience-${idx}`}>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 mt-1">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold" data-testid={`text-company-${idx}`}>
                          {exp.company}
                        </h3>
                        <p className="text-lg font-semibold text-primary">{exp.role}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className={typeColors[exp.type]}>
                      {exp.type}
                    </Badge>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {exp.period}
                    </Badge>
                  </div>

                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIdx) => (
                      <li key={achIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
