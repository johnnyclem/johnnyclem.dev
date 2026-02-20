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
      <section className="py-24 flex items-center justify-center bg-[#0a0b0d]">
        <Loader2 className="w-8 h-8 animate-spin text-[#f59e0b]" />
      </section>
    );
  }

  const sortedExperiences = [...experiences].sort((a, b) => a.sortOrder - b.sortOrder);

  const typeColors: Record<string, string> = {
    "AI & Blockchain": "bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20",
    "iOS Development": "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20",
    "Leadership": "bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20",
    "CTO": "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20",
  };

  return (
    <section
      id="experience"
      className="py-24 bg-[#0a0b0d]"
      data-testid="section-experience"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="section-label">02</div>
          <h2
            className="lyric-head"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            The arc of a career
          </h2>
          <p
            className="text-lg text-[#6b7280] max-w-2xl"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Over a decade of leading technical innovation, scaling teams, and delivering high-impact applications
            to millions of users
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[11px] md:left-1/2 top-0 bottom-0 w-px bg-[#1f2330]" />

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

                {/* Timeline dot */}
                <div className="absolute left-[7px] md:left-1/2 w-[9px] h-[9px] bg-[#f59e0b] rounded-full -translate-x-1/2 mt-6 border-2 border-[#0a0b0d]" />

                {/* Card */}
                <Card
                  className="md:w-1/2 p-6 bg-[#111318] border-[#1f2330] hover:border-[#f59e0b]/20 transition-colors duration-300"
                  data-testid={`card-experience-${idx}`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded bg-[#f59e0b]/10">
                        {exp.companyLogoUrl ? (
                          <img
                            src={exp.companyLogoUrl}
                            alt={`${exp.company} logo`}
                            className="w-10 h-10 object-contain"
                          />
                        ) : (
                          <Building2 className="w-5 h-5 text-[#f59e0b]" />
                        )}
                      </div>
                      <div>
                        <h3
                          className="text-lg font-semibold text-white"
                          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                          data-testid={`text-company-${idx}`}
                        >
                          {exp.company}
                        </h3>
                        <p
                          className="text-[#e2e4e9] mb-1"
                          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                        >
                          {exp.role}
                        </p>
                        <p
                          className="text-xs text-[#6b7280] tracking-wider"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {exp.period} · {exp.location}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={typeColors[exp.type] || "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20"}
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      <span className="text-[10px] tracking-wider uppercase">{exp.type}</span>
                    </Badge>
                  </div>

                  <ul className="space-y-2" data-testid={`achievements-${idx}`}>
                    {exp.achievements.map((achievement, achievementIdx) => (
                      <li
                        key={achievementIdx}
                        className="flex items-start gap-3 text-sm text-[#9ca3af]"
                        style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                      >
                        <span className="text-[#f59e0b] mt-1.5 text-xs">///</span>
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