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
      <section className="py-20 flex items-center justify-center bg-muted/30">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </section>
    );
  }

  const sortedPatents = [...patents].sort((a, b) => a.sortOrder - b.sortOrder);

  const statusColors: Record<string, string> = {
    Awarded: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    Contributor: "bg-primary/10 text-primary border-primary/20",
  };

  return (
    <section id="patents" className="py-20 bg-muted/30" data-testid="section-patents">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chart-2/10 border border-chart-2/20 mb-4">
            <Award className="w-5 h-5 text-chart-2" />
            <span className="text-sm font-semibold text-chart-2">Patent Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-patents-title">
            Intellectual Property
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Awarded patents and contributions spanning augmented reality, video processing, and real-time streaming
            technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {sortedPatents.map((patent, idx) => (
            <Card
              key={patent.id}
              className="p-6 hover-elevate active-elevate-2 transition-all group"
              data-testid={`card-patent-${idx}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-chart-2/10">
                    <FileText className="w-5 h-5 text-chart-2" />
                  </div>
                  <div>
                    <p className="font-mono text-sm text-muted-foreground mb-1" data-testid={`text-patent-number-${idx}`}>
                      {patent.number}
                    </p>
                    <h3 className="text-lg font-bold mb-2">{patent.title}</h3>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => window.open(`https://patents.google.com/patent/${patent.number}`, '_blank')}
                  data-testid={`button-view-patent-${idx}`}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{patent.description}</p>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={statusColors[patent.status] || "bg-primary/10 text-primary border-primary/20"}>
                  {patent.status}
                </Badge>
                <Badge variant="secondary">{patent.category}</Badge>
                <Badge variant="outline" className="border-muted-foreground/20">
                  {patent.company} • {patent.year}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
