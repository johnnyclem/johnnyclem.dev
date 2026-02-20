import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Calendar, Code2, Sparkles, Brain, Cpu, Globe, Database, Zap, Loader2 } from "lucide-react";
import type { ConsultingSettings, Testimonial } from "@shared/schema";

export default function Consulting() {
  const { data: settings, isLoading: settingsLoading } = useQuery<ConsultingSettings>({
    queryKey: ["/api/consulting/settings"],
  });

  const { data: testimonials = [], isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/consulting/testimonials"],
  });

  if (settingsLoading || testimonialsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0b0d]">
        <Loader2 className="w-8 h-8 animate-spin text-[#f59e0b]" />
      </div>
    );
  }

  const sortedTestimonials = [...testimonials].sort((a, b) => a.sortOrder - b.sortOrder);

  const expertiseAreas = [
    {
      icon: Sparkles,
      title: "AI & Machine Learning Integration",
      description: "End-to-end AI solution design, LLM integration, RAG systems, and intelligent automation",
    },
    {
      icon: Code2,
      title: "iOS & Mobile Development",
      description: "Swift, SwiftUI, UIKit, AVFoundation, and cross-platform mobile solutions",
    },
    {
      icon: Brain,
      title: "Rapid Prototyping & R&D",
      description: "Transform ideas into working prototypes quickly with proven engineering excellence",
    },
    {
      icon: Cpu,
      title: "Media & Video Processing",
      description: "Real-time video processing, codec optimization, streaming architecture",
    },
    {
      icon: Database,
      title: "Full-Stack Architecture",
      description: "Scalable backend systems, API design, database optimization, cloud infrastructure",
    },
    {
      icon: Globe,
      title: "Technical Leadership",
      description: "Team mentorship, code reviews, architecture decisions, and process improvements",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0b0d]">
      <Navigation />

      <main className="pt-24 pb-24">
        <div className="max-w-4xl mx-auto px-6 space-y-20">
          {/* Hero Section */}
          <div>
            <div className="section-label">Consulting</div>
            <h1
              className="lyric-head"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Technical Consulting
            </h1>
            <p
              className="text-lg text-[#6b7280] max-w-2xl"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Expert technical consulting for startups and enterprises. Specializing in rapid prototyping,
              AI integration, iOS development, and end-to-end system architecture.
            </p>
          </div>

          {/* Rates Section */}
          <div>
            <h2
              className="text-xs text-[#6b7280] tracking-widest uppercase mb-6"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Engagement Options
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-[#111318] border-[#1f2330]" data-testid="card-rates">
                <CardContent className="pt-6">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span
                      className="text-4xl font-semibold text-[#f59e0b]"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      ${settings?.dayRate?.toLocaleString() || "2,000"}
                    </span>
                    <span
                      className="text-[#6b7280]"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      /day
                    </span>
                  </div>
                  <h3
                    className="text-lg font-semibold text-white mb-2"
                    style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                  >
                    Full-Day Engagement
                  </h3>
                  <p
                    className="text-sm text-[#9ca3af]"
                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  >
                    Dedicated full-day consulting for intensive projects, workshops, or deep technical work
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#111318] border-[#1f2330]" data-testid="card-rates-hourly">
                <CardContent className="pt-6">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span
                      className="text-4xl font-semibold text-[#22c55e]"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      ${settings?.hourlyRate || 180}
                    </span>
                    <span
                      className="text-[#6b7280]"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      /hour
                    </span>
                  </div>
                  <h3
                    className="text-lg font-semibold text-white mb-2"
                    style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                  >
                    Retainer Agreement
                  </h3>
                  <p
                    className="text-sm text-[#9ca3af]"
                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  >
                    Ongoing support with flexible hours for code reviews, technical guidance, and advisory
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Schedule a Call */}
          {settings?.calendlyUrl && (
            <Card className="bg-[#111318] border-[#f59e0b]/20" data-testid="card-schedule">
              <CardContent className="py-8 text-center">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded bg-[#f59e0b]/10">
                    <Calendar className="w-5 h-5 text-[#f59e0b]" />
                  </div>
                  <h3
                    className="text-xl font-semibold text-white"
                    style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                  >
                    Schedule a Consultation
                  </h3>
                </div>
                <p
                  className="text-[#9ca3af] mb-6 max-w-md mx-auto"
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                >
                  Book a free 30-minute call to discuss your project and explore how I can help
                </p>
                <Button
                  size="lg"
                  className="bg-[#f59e0b] hover:bg-[#d97706] text-[#0a0b0d]"
                  asChild
                  data-testid="button-schedule-call"
                >
                  <a
                    href={settings.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs tracking-wider uppercase">
                      Schedule a Call
                    </span>
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Areas of Expertise */}
          <div>
            <h2
              className="text-xs text-[#6b7280] tracking-widest uppercase mb-6"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Areas of Expertise
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {expertiseAreas.map((area, idx) => {
                const Icon = area.icon;
                return (
                  <Card
                    key={idx}
                    className="bg-[#111318] border-[#1f2330] hover:border-[#f59e0b]/20 transition-colors"
                    data-testid={`card-expertise-${idx}`}
                  >
                    <CardContent className="pt-5">
                      <div className="w-10 h-10 rounded bg-[#f59e0b]/10 flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-[#f59e0b]" />
                      </div>
                      <h3
                        className="text-base font-semibold text-white mb-2"
                        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                      >
                        {area.title}
                      </h3>
                      <p
                        className="text-sm text-[#9ca3af]"
                        style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                      >
                        {area.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Past Work Highlights */}
          <div>
            <h2
              className="text-xs text-[#6b7280] tracking-widest uppercase mb-6"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Past Consulting Work
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-[#111318] border-[#1f2330]" data-testid="card-past-work-ai">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3
                      className="text-lg font-semibold text-white"
                      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                    >
                      AI-Powered Resume Assistant
                    </h3>
                    <Badge
                      className="bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      <span className="text-[10px] tracking-wider">AI</span>
                    </Badge>
                  </div>
                  <p
                    className="text-sm text-[#9ca3af] mb-4"
                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  >
                    Designed and implemented an advanced RAG system with OpenAI integration for a
                    career services platform. Features included real-time voice interactions using
                    ElevenLabs API, contextual document analysis, and intelligent response generation.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["OpenAI GPT-4", "RAG Architecture", "Voice Integration", "Vector Embeddings"].map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-[#1f2330] text-[#6b7280]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        <span className="text-[10px]">{tag}</span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#111318] border-[#1f2330]" data-testid="card-past-work-video">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3
                      className="text-lg font-semibold text-white"
                      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                    >
                      Video Processing Pipeline
                    </h3>
                    <Badge
                      className="bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      <span className="text-[10px] tracking-wider">iOS</span>
                    </Badge>
                  </div>
                  <p
                    className="text-sm text-[#9ca3af] mb-4"
                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  >
                    Architected a high-performance video processing system leveraging AVFoundation
                    and CoreMedia for a media tech startup. Reduced processing time by 60% and
                    implemented real-time effects processing with optimized codec handling.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["AVFoundation", "Swift", "Real-time Processing", "Performance Optimization"].map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-[#1f2330] text-[#6b7280]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        <span className="text-[10px]">{tag}</span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Testimonials */}
          {sortedTestimonials.length > 0 && (
            <div>
              <h2
                className="text-xs text-[#6b7280] tracking-widest uppercase mb-6"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Client Testimonials
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedTestimonials.map((testimonial) => (
                  <Card
                    key={testimonial.id}
                    className="bg-[#111318] border-[#1f2330]"
                    data-testid={`card-testimonial-${testimonial.id}`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex gap-0.5 mb-3">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                        ))}
                      </div>
                      <p
                        className="text-sm text-[#9ca3af] mb-4 italic"
                        style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                      >
                        "{testimonial.quote}"
                      </p>
                      <div className="space-y-0.5">
                        <p
                          className="text-sm font-medium text-white"
                          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                        >
                          {testimonial.clientName}
                        </p>
                        <p
                          className="text-xs text-[#6b7280]"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {testimonial.clientTitle}
                        </p>
                        <p
                          className="text-xs text-[#4b5163]"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {testimonial.clientCompany}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <Card className="bg-[#111318] border-[#f59e0b]/20">
            <CardContent className="py-12 text-center">
              <h2
                className="text-2xl font-semibold text-white mb-3"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                Ready to Get Started?
              </h2>
              <p
                className="text-[#9ca3af] mb-6 max-w-lg mx-auto"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                Let's discuss your project and explore how my expertise can help you achieve your goals
              </p>
              {settings?.calendlyUrl && (
                <Button
                  size="lg"
                  className="bg-[#f59e0b] hover:bg-[#d97706] text-[#0a0b0d]"
                  asChild
                  data-testid="button-cta-schedule"
                >
                  <a href={settings.calendlyUrl} target="_blank" rel="noopener noreferrer">
                    <Zap className="w-4 h-4 mr-2" />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs tracking-wider uppercase">
                      Book Your Free Consultation
                    </span>
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}