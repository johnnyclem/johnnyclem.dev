import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import * as Icons from "lucide-react";
import { type Project, type SkillItem } from "@shared/schema";

interface EnrichedProject extends Project {
  skillItems: SkillItem[];
}

interface ProjectHighlightsProps {
  selectedSkillSlug: string | null;
  onSkillClick: (skillSlug: string) => void;
  onClearFilter: () => void;
}

export default function ProjectHighlights({ 
  selectedSkillSlug, 
  onSkillClick,
  onClearFilter 
}: ProjectHighlightsProps) {
  // Fetch filtered projects if a skill is selected, otherwise fetch all projects
  const { data: projects = [], isLoading } = useQuery<EnrichedProject[]>({
    queryKey: selectedSkillSlug ? ["/api/skill-items", selectedSkillSlug, "projects"] : ["/api/projects"],
  });

  if (isLoading) {
    return (
      <section className="py-20 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </section>
    );
  }

  const sortedProjects = [...projects].sort((a, b) => a.sortOrder - b.sortOrder);

  // Get the selected skill name for display
  const selectedSkill = selectedSkillSlug 
    ? projects[0]?.skillItems?.find(s => s.slug === selectedSkillSlug)
    : null;

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
          
          {selectedSkillSlug && (
            <div className="mt-6 flex items-center justify-center gap-3">
              <Badge variant="outline" className="text-base py-2 px-4">
                Filtering by: <span className="font-semibold ml-2">{selectedSkill?.name || selectedSkillSlug}</span>
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilter}
                data-testid="button-clear-filter"
              >
                <X className="w-4 h-4 mr-1" />
                Clear Filter
              </Button>
            </div>
          )}
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
                  {project.imageUrl ? (
                    <div className="rounded-lg overflow-hidden">
                      <img 
                        src={project.imageUrl} 
                        alt={`${project.title} icon`} 
                        className="w-12 h-12 object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`p-2 rounded-lg bg-primary/10 ${project.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                  )}
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
                    {project.skillItems?.map((skillItem) => {
                      const isSelected = selectedSkillSlug === skillItem.slug;
                      return (
                        <Badge 
                          key={skillItem.id} 
                          variant={skillItem.isSpecialization ? "default" : "secondary"}
                          className={`text-xs cursor-pointer transition-all ${
                            skillItem.isSpecialization ? "border-chart-2 bg-chart-2/10" : ""
                          } ${isSelected ? "ring-2 ring-primary" : ""}`}
                          onClick={() => onSkillClick(skillItem.slug)}
                          data-testid={`badge-project-skill-${skillItem.slug}`}
                        >
                          {skillItem.name}
                        </Badge>
                      );
                    })}
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
