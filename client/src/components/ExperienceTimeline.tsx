import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Building2 } from "lucide-react";
import { type Experience } from "@shared/schema";

export default function ExperienceTimeline() {
  const { data: experiences = [], isLoading } = useQuery<Experience[]>({
    queryKey: ["/api/experiences"],
  });

  if (isLoading) {
    return (
      <section className="py-20 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </section>
    );
  }

  const sortedExperiences = [...experiences].sort((a, b) => a.sortOrder - b.sortOrder);

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
            {sortedExperiences.map((exp, idx) => (
              <div
                key={exp.id}
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
                        <p className="text-lg text-foreground font-medium mb-1">{exp.role}</p>
                        <p className="text-sm text-muted-foreground">
                          {exp.period} • {exp.location}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className={typeColors[exp.type] || "bg-primary/10 text-primary border-primary/20"}>
                      {exp.type}
                    </Badge>
                  </div>

                  <ul className="space-y-2 text-sm" data-testid={`achievements-${idx}`}>
                    {exp.achievements.map((achievement, achievementIdx) => (
                      <li key={achievementIdx} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
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
