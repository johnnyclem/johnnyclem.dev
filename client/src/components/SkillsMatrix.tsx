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
      <section className="py-24 flex items-center justify-center bg-[#111318]">
        <Loader2 className="w-8 h-8 animate-spin text-[#f59e0b]" />
      </section>
    );
  }

  const sortedSkills = [...skills].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section
      id="skills"
      className="py-24 bg-[#111318]"
      data-testid="section-skills"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="section-label">01</div>
          <h2
            className="lyric-head"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Technical Expertise
          </h2>
          <p
            className="text-lg text-[#6b7280] max-w-2xl"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Comprehensive skill set spanning 10+ programming languages and multiple platforms, with specialized
            expertise in iOS development and AVFoundation
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {sortedSkills.map((category) => {
            const IconComponent = (Icons as any)[category.icon] || Icons.Code2;
            return (
              <Card
                key={category.id}
                className="p-6 bg-[#0a0b0d] border-[#1f2330] hover:border-[#f59e0b]/20 transition-colors duration-300"
                data-testid={`card-skill-${category.id}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded bg-[#f59e0b]/10">
                    <IconComponent className="w-5 h-5 text-[#f59e0b]" />
                  </div>
                  <h3
                    className="text-base font-semibold text-white"
                    style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                  >
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((skill, skillIdx) => {
                    const skillSlug = skillToSlug(skill);
                    const isSelected = selectedSkillSlug === skillSlug;
                    const isSpecialization = category.specializations.includes(skill);

                    return (
                      <Badge
                        key={skillIdx}
                        variant="outline"
                        className={`cursor-pointer transition-all border-[#1f2330] ${
                          isSpecialization
                            ? "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20 hover:border-[#f59e0b]/40"
                            : "text-[#6b7280] hover:text-[#e2e4e9] hover:border-[#f59e0b]/30"
                        } ${isSelected ? "ring-1 ring-[#f59e0b]" : ""}`}
                        onClick={() => onSkillClick(skillSlug)}
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        data-testid={`badge-skill-${skillSlug}`}
                      >
                        <span className="text-[10px] tracking-wider">{skill}</span>
                      </Badge>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Core Specialization */}
        {sortedSkills.some((s) => s.specializations.length > 0) && (
          <div className="mt-12 p-6 bg-[#0a0b0d] border border-[#1f2330] rounded-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded bg-[#22c55e]/10 shrink-0">
                <Award className="w-5 h-5 text-[#22c55e]" />
              </div>
              <div>
                <h4
                  className="text-base font-semibold text-white mb-2"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  Core Specialization
                </h4>
                <p
                  className="text-sm text-[#9ca3af]"
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                >
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