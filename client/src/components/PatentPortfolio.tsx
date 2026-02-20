import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, FileText, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Patent } from "@shared/schema";

export default function PatentPortfolio() {
  const { data: patents = [], isLoading } = useQuery<Patent[]>({
    queryKey: ["/api/patents"],
  });

  if (isLoading) {
    return (
      <section className="py-24 flex items-center justify-center bg-[#111318]">
        <Loader2 className="w-8 h-8 animate-spin text-[#f59e0b]" />
      </section>
    );
  }

  const sortedPatents = [...patents].sort((a, b) => a.sortOrder - b.sortOrder);

  const statusColors: Record<string, string> = {
    Awarded: "bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20",
    Contributor: "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20",
  };

  return (
    <section
      id="patents"
      className="py-24 bg-[#111318]"
      data-testid="section-patents"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="section-label">03</div>
          <h2
            className="lyric-head"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Intellectual Property
          </h2>
          <p
            className="text-lg text-[#6b7280] max-w-2xl"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Awarded patents and contributions spanning augmented reality, video processing, and real-time streaming
            technologies
          </p>

          {/* Stats bar */}
          <div
            className="flex gap-6 mt-6"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              <span className="text-xs tracking-wider text-[#6b7280] uppercase">
                {patents.filter(p => p.status === "Awarded").length} Awarded
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
              <span className="text-xs tracking-wider text-[#6b7280] uppercase">
                {patents.filter(p => p.status === "Contributor").length} Contributions
              </span>
            </div>
          </div>
        </div>

        {/* Patent Cards */}
        <div className="space-y-6">
          {sortedPatents.map((patent, idx) => (
            <Card
              key={patent.id}
              className="p-6 bg-[#0a0b0d] border-[#1f2330] hover:border-[#f59e0b]/20 transition-all duration-300 group"
              data-testid={`card-patent-${idx}`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Icon */}
                  <div className="p-3 rounded bg-[#f59e0b]/10 shrink-0">
                    <FileText className="w-5 h-5 text-[#f59e0b]" />
                  </div>

                  <div className="flex-1">
                    {/* Patent Number */}
                    <p
                      className="text-xs text-[#6b7280] mb-1 tracking-wider"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      data-testid={`text-patent-number-${idx}`}
                    >
                      {patent.number}
                    </p>

                    {/* Title */}
                    <h3
                      className="text-lg font-semibold text-white mb-2"
                      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                    >
                      {patent.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm text-[#9ca3af] mb-4"
                      style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                    >
                      {patent.description}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className={statusColors[patent.status] || "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20"}
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        <span className="text-[10px] tracking-wider uppercase">{patent.status}</span>
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-[#1f2330] text-[#6b7280]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        <span className="text-[10px] tracking-wider">{patent.category}</span>
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-[#1f2330] text-[#4b5163]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        <span className="text-[10px]">{patent.company} · {patent.year}</span>
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* External Link */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="shrink-0 text-[#6b7280] hover:text-[#f59e0b] opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => window.open(`https://patents.google.com/patent/${patent.number}`, '_blank')}
                  data-testid={`button-view-patent-${idx}`}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}