import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Calendar, Code2, Sparkles, Brain, Cpu, Globe, Database, Zap } from "lucide-react";
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
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
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-16 pt-24 max-w-6xl space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-foreground">
            Consulting Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert technical consulting for startups and enterprises. Specializing in rapid prototyping, 
            AI integration, iOS development, and end-to-end system architecture.
          </p>
        </div>

        {/* Rates Section */}
        <Card data-testid="card-rates">
          <CardHeader>
            <CardTitle className="text-3xl">Engagement Options</CardTitle>
            <CardDescription>Flexible consulting arrangements to match your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg border bg-card space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">
                    ${settings?.dayRate?.toLocaleString() || "2,000"}
                  </span>
                  <span className="text-muted-foreground">/day</span>
                </div>
                <h3 className="font-semibold text-lg">Full-Day Engagement</h3>
                <p className="text-sm text-muted-foreground">
                  Dedicated full-day consulting for intensive projects, workshops, or deep technical work
                </p>
              </div>

              <div className="p-6 rounded-lg border bg-card space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-accent">
                    ${settings?.hourlyRate || 180}
                  </span>
                  <span className="text-muted-foreground">/hour</span>
                </div>
                <h3 className="font-semibold text-lg">Retainer Agreement</h3>
                <p className="text-sm text-muted-foreground">
                  Ongoing support with flexible hours for code reviews, technical guidance, and advisory
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule a Call */}
        {settings?.calendlyUrl && (
          <Card data-testid="card-schedule">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl flex items-center justify-center gap-3">
                <Calendar className="w-8 h-8 text-primary" />
                Schedule a Consultation
              </CardTitle>
              <CardDescription>
                Book a free 30-minute call to discuss your project and explore how I can help
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button
                size="lg"
                asChild
                data-testid="button-schedule-call"
              >
                <a
                  href={settings.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule a Call
                </a>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Areas of Expertise */}
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-foreground">Areas of Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Deep technical knowledge across multiple domains with a track record of delivering results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <Card key={idx} className="hover-elevate" data-testid={`card-expertise-${idx}`}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{area.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Past Work Highlights */}
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-foreground">Past Consulting Work</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Representative projects showcasing AI integration and technical consulting excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card data-testid="card-past-work-ai">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">AI-Powered Resume Assistant</CardTitle>
                  <Badge variant="secondary">AI Consulting</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Designed and implemented an advanced RAG system with OpenAI integration for a 
                  career services platform. Features included real-time voice interactions using 
                  ElevenLabs API, contextual document analysis, and intelligent response generation.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">OpenAI GPT-4</Badge>
                  <Badge variant="outline" className="text-xs">RAG Architecture</Badge>
                  <Badge variant="outline" className="text-xs">Voice Integration</Badge>
                  <Badge variant="outline" className="text-xs">Vector Embeddings</Badge>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-past-work-video">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">Video Processing Pipeline</CardTitle>
                  <Badge variant="secondary">Technical Consulting</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Architected a high-performance video processing system leveraging AVFoundation 
                  and CoreMedia for a media tech startup. Reduced processing time by 60% and 
                  implemented real-time effects processing with optimized codec handling.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">AVFoundation</Badge>
                  <Badge variant="outline" className="text-xs">Swift</Badge>
                  <Badge variant="outline" className="text-xs">Real-time Processing</Badge>
                  <Badge variant="outline" className="text-xs">Performance Optimization</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testimonials */}
        {sortedTestimonials.length > 0 && (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-foreground">Client Testimonials</h2>
              <p className="text-muted-foreground">
                What clients say about working together
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="hover-elevate" data-testid={`card-testimonial-${testimonial.id}`}>
                  <CardHeader>
                    <div className="flex gap-1 mb-2">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <CardDescription className="italic">"{testimonial.quote}"</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">{testimonial.clientName}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.clientTitle}
                      </p>
                      <p className="text-xs text-muted-foreground">
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
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="py-12 text-center space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-foreground">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Let's discuss your project and explore how my expertise can help you achieve your goals
              </p>
            </div>
            {settings?.calendlyUrl && (
              <Button size="lg" asChild data-testid="button-cta-schedule">
                <a href={settings.calendlyUrl} target="_blank" rel="noopener noreferrer">
                  <Zap className="w-4 h-4 mr-2" />
                  Book Your Free Consultation
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
