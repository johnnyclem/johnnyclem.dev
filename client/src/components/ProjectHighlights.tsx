import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import * as Icons from "lucide-react";
import { type Project } from "@shared/schema";

export default function ProjectHighlights() {
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (isLoading) {
    return (
      <section className="py-20 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </section>
    );
  }

  const sortedProjects = [...projects].sort((a, b) => a.sortOrder - b.sortOrder);

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
          {sortedProjects.map((project, idx) => {
            const IconComponent = (Icons as any)[project.icon] || Icons.Code2;
            return (
              <Card
                key={project.id}
                className="p-6 hover-elevate active-elevate-2 transition-all flex flex-col"
                data-testid={`card-project-${idx}`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-primary/10 ${project.color}`}>
                    <IconComponent className="w-6 h-6" />
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
                    {project.technologies.map((tech, techIdx) => (
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
