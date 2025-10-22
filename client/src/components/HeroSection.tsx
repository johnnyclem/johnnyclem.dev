import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Download, FileText, Award, Loader2 } from "lucide-react";
import { type Profile, type Company } from "@shared/schema";
import heroBackground from "@assets/generated_images/Professional_tech_hero_background_2aa09870.png";
import ProjectCarousel from "./ProjectCarousel";

interface HeroSectionProps {
  onDownloadResume?: () => void;
  onViewPatents?: () => void;
}

export default function HeroSection({ onDownloadResume, onViewPatents }: HeroSectionProps) {
  const { data: profile, isLoading: profileLoading } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const { data: companies = [], isLoading: companiesLoading } = useQuery<Company[]>({
    queryKey: ["/api/companies"],
  });

  if (profileLoading || companiesLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </section>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      data-testid="section-hero"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 60%, hsl(var(--background) / 0.75) 100%), url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="space-y-12">
          <div className="grid md:grid-cols-[1.1fr,0.9fr] gap-8 items-start">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{profile.title.split(" & ")[0]}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight" data-testid="text-hero-title">
                  {profile.title.includes(" & ") ? (
                    <>
                      {profile.title.split(" & ")[0]} &{" "}
                      <span className="text-primary">{profile.title.split(" & ")[1]}</span>
                    </>
                  ) : (
                    profile.title
                  )}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl" data-testid="text-hero-subtitle">
                  {profile.subtitle}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  {profile.yearsExperience && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-chart-2" />
                      <span className="text-muted-foreground">{profile.yearsExperience}+ Years Experience</span>
                    </div>
                  )}
                  {profile.patentCount && profile.patentCount > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-chart-2" />
                      <span className="text-muted-foreground">{profile.patentCount} Patents</span>
                    </div>
                  )}
                  {profile.devicesDeployed && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-chart-2" />
                      <span className="text-muted-foreground">{profile.devicesDeployed} Devices Deployed</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
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

              {companies.length > 0 && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Trusted by leading companies</p>
                  <div className="flex flex-wrap gap-5 items-center text-muted-foreground">
                    {companies.map((company) => (
                      <span key={company.id} className="text-base font-semibold">
                        {company.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden md:block">
              <ProjectCarousel />
            </div>
          </div>

          <div className="md:hidden">
            <ProjectCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
