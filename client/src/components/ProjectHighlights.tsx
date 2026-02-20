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
  const { data: projects = [], isLoading } = useQuery<EnrichedProject[]>({
    queryKey: selectedSkillSlug ? ["/api/skill-items", selectedSkillSlug, "projects"] : ["/api/projects"],
  });

  if (isLoading) {
    return (
      <section className="py-24 flex items-center justify-center bg-[#0a0b0d]">
        <Loader2 className="w-8 h-8 animate-spin text-[#f59e0b]" />
      </section>
    );
  }

  const sortedProjects = [...projects].sort((a, b) => a.sortOrder - b.sortOrder);
  const selectedSkill = selectedSkillSlug
    ? projects[0]?.skillItems?.find(s => s.slug === selectedSkillSlug)
    : null;

  return (
    <section
      id="projects"
      className="py-24 bg-[#0a0b0d]"
      data-testid="section-projects"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="section-label">04</div>
          <h2
            className="lyric-head"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Project Highlights
          </h2>
          <p
            className="text-lg text-[#6b7280] max-w-2xl"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Proven track record of delivering high-impact solutions across mobile, AI, and video technologies
          </p>

          {selectedSkillSlug && (
            <div className="mt-6 flex items-center gap-3">
              <Badge
                variant="outline"
                className="border-[#f59e0b]/30 text-[#f59e0b] py-2 px-4"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span className="text-xs tracking-wider">Filtering: {selectedSkill?.name || selectedSkillSlug}</span>
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilter}
                className="text-[#6b7280] hover:text-[#f59e0b]"
                data-testid="button-clear-filter"
              >
                <X className="w-4 h-4 mr-1" />
                <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs tracking-wider">
                  Clear
                </span>
              </Button>
            </div>
          )}
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {sortedProjects.map((project, idx) => {
            const IconComponent = (Icons as any)[project.icon] || Icons.Code2;
            return (
              <Card
                key={project.id}
                className="p-6 bg-[#111318] border-[#1f2330] hover:border-[#f59e0b]/20 transition-all duration-300 flex flex-col group"
                data-testid={`card-project-${idx}`}
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  {project.imageUrl ? (
                    <div className="rounded overflow-hidden shrink-0">
                      <img
                        src={project.imageUrl}
                        alt={`${project.title} icon`}
                        className="w-10 h-10 object-cover"
                      />
                    </div>
                  ) : (
                    <div className="p-2.5 rounded bg-[#f59e0b]/10 shrink-0">
                      <IconComponent className="w-5 h-5 text-[#f59e0b]" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-base font-semibold text-white truncate"
                      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-xs text-[#6b7280] tracking-wider"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {project.company}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p
                  className="text-sm text-[#9ca3af] mb-4 flex-1"
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                >
                  {project.description}
                </p>

                {/* Impact */}
                <div className="mb-4">
                  <Badge
                    className="bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    <span className="text-[10px] tracking-wider">{project.impact}</span>
                  </Badge>
                </div>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.skillItems?.slice(0, 4).map((skillItem) => {
                    const isSelected = selectedSkillSlug === skillItem.slug;
                    return (
                      <Badge
                        key={skillItem.id}
                        variant="outline"
                        className={`cursor-pointer transition-all border-[#1f2330] hover:border-[#f59e0b]/30 ${
                          isSelected ? "border-[#f59e0b] text-[#f59e0b]" : "text-[#6b7280] hover:text-[#e2e4e9]"
                        }`}
                        onClick={() => onSkillClick(skillItem.slug)}
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        data-testid={`badge-project-skill-${skillItem.slug}`}
                      >
                        <span className="text-[10px] tracking-wider">{skillItem.name}</span>
                      </Badge>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}