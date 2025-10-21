import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PatentPortfolio() {
  const patents = [
    {
      number: "US10481758 B2",
      title: "Location Based Augmented Reality System",
      year: "2019",
      company: "iOcculi",
      status: "Awarded",
      description:
        "Location-based augmented reality systems for exchange of items based on location sensing and associated triggering icons.",
      category: "AR/Mobile",
    },
    {
      number: "US20200259974 A1",
      title: "Cubiform Method",
      year: "2020",
      company: "Filmic Inc.",
      status: "Awarded",
      description:
        "Method for generating color lookup tables for real-time image modification and color grading in mobile video applications.",
      category: "Video/Imaging",
    },
    {
      number: "US20150350041 A1",
      title: "Protocols & Mechanisms of Communication",
      year: "2015",
      company: "Paladin Innovators",
      status: "Contributor",
      description:
        "Communication protocols between live production servers and mobile/remote clients using WebSockets for real-time video production control.",
      category: "Networking",
    },
    {
      number: "US20150350289 A1",
      title: "Methods & Systems for Transmission of High Resolution Data",
      year: "2015",
      company: "Paladin Innovators",
      status: "Contributor",
      description:
        "Ultra low latency streaming methods for transmitting high-resolution video with minimal error and low latency over standard networks.",
      category: "Streaming",
    },
  ];

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
          {patents.map((patent, idx) => (
            <Card
              key={idx}
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
                  onClick={() => console.log(`View patent ${patent.number}`)}
                  data-testid={`button-view-patent-${idx}`}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{patent.description}</p>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={statusColors[patent.status]}>
                  {patent.status}
                </Badge>
                <Badge variant="secondary">{patent.category}</Badge>
                <Badge variant="secondary" className="font-mono">
                  {patent.year}
                </Badge>
                <Badge variant="outline">{patent.company}</Badge>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Patents demonstrate expertise in mobile technologies, real-time streaming, and innovative user experiences
          </p>
        </div>
      </div>
    </section>
  );
}
