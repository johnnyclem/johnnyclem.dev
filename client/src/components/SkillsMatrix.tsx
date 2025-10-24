import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Award } from "lucide-react";
import * as Icons from "lucide-react";
import { type Skill } from "@shared/schema";
import { skillToSlug } from "@/lib/skillSlugify";

interface SkillsMatrixProps {
  onSkillClick: (skillSlug: string) => void;
  selectedSkillSlug: string | null;
}

export default function SkillsMatrix({ onSkillClick, selectedSkillSlug }: SkillsMatrixProps) {
  const { data: skills = [], isLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  if (isLoading) {
    return (
      <section className="py-20 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </section>
    );
  }

  const sortedSkills = [...skills].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section id="skills" className="py-20 bg-muted/30" data-testid="section-skills">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-skills-title">
            Technical Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive skill set spanning 10+ programming languages and multiple platforms, with specialized
            expertise in iOS development and AVFoundation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSkills.map((category) => {
            const IconComponent = (Icons as any)[category.icon] || Icons.Code2;
            return (
              <Card
                key={category.id}
                className="p-6 hover-elevate active-elevate-2 transition-all"
                data-testid={`card-skill-${category.id}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-primary/10 ${category.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, skillIdx) => {
                    const skillSlug = skillToSlug(skill);
                    const isSelected = selectedSkillSlug === skillSlug;
                    return (
                      <Badge
                        key={skillIdx}
                        variant={category.specializations.includes(skill) ? "default" : "secondary"}
                        className={`cursor-pointer transition-all ${
                          category.specializations.includes(skill) ? "border-chart-2 bg-chart-2/10" : ""
                        } ${isSelected ? "ring-2 ring-primary" : ""}`}
                        onClick={() => onSkillClick(skillSlug)}
                        data-testid={`badge-skill-${skillSlug}`}
                      >
                        {skill}
                      </Badge>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>

        {sortedSkills.some((s) => s.specializations.length > 0) && (
          <div className="mt-12 p-6 bg-card border rounded-lg">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-chart-2/10">
                <Award className="w-6 h-6 text-chart-2" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Core Specialization</h4>
                <p className="text-muted-foreground">
                  Primary expertise in AVFoundation for iOS, delivering high-performance media solutions that have
                  reached over 1 billion devices worldwide.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
