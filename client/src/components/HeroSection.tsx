import { Button } from "@/components/ui/button";
import { Download, FileText, Award } from "lucide-react";
import heroBackground from "@assets/generated_images/Professional_tech_hero_background_2aa09870.png";
import headshot from "@assets/generated_images/Professional_portfolio_headshot_e5120369.png";

interface HeroSectionProps {
  onDownloadResume?: () => void;
  onViewPatents?: () => void;
}

export default function HeroSection({ onDownloadResume, onViewPatents }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      data-testid="section-hero"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 60%, hsl(var(--background) / 0.7) 100%), url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid md:grid-cols-[1.2fr,0.8fr] gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Senior iOS Engineer</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight" data-testid="text-hero-title">
                Polymath Engineer &{" "}
                <span className="text-primary">Innovation Architect</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl" data-testid="text-hero-subtitle">
                Specializing in R&D and rapid prototyping with extensive jack-of-all-trades experience across{" "}
                <span className="text-foreground font-semibold">10+ programming languages</span> and{" "}
                <span className="text-foreground font-semibold">a dozen platforms</span>.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-chart-2" />
                  <span className="text-muted-foreground">10+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-chart-2" />
                  <span className="text-muted-foreground">4 Patents</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-chart-2" />
                  <span className="text-muted-foreground">1B+ Devices Deployed</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={onViewPatents} data-testid="button-view-patents">
                  <FileText className="w-5 h-5 mr-2" />
                  View Patents
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={onDownloadResume}
                  className="backdrop-blur-sm"
                  data-testid="button-hero-download"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </Button>
              </div>
            </div>

            <div className="pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-3">Trusted by leading companies</p>
              <div className="flex flex-wrap gap-6 items-center text-muted-foreground">
                <span className="text-lg font-semibold">Meta</span>
                <span className="text-lg font-semibold">OpenAI</span>
                <span className="text-lg font-semibold">Starbucks</span>
                <span className="text-lg font-semibold">X</span>
                <span className="text-lg font-semibold">Truepic</span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
              <img
                src={headshot}
                alt="Jonathan Clem"
                className="relative w-80 h-80 rounded-full object-cover border-4 border-card shadow-2xl"
                data-testid="img-headshot"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
