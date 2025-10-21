import { Card } from "@/components/ui/card";
import { Award, Smartphone, Code2, Rocket } from "lucide-react";

export default function SpecializationSection() {
  return (
    <section className="py-20 bg-muted/30" data-testid="section-specialization">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chart-2/10 border border-chart-2/20 mb-4">
            <Award className="w-5 h-5 text-chart-2" />
            <span className="text-sm font-semibold text-chart-2">Core Specialization</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            AVFoundation & iOS Mastery
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Deep expertise in iPhone app development with Swift, specializing in video capture, streaming performance,
            and multimedia frameworks
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6">Expertise Areas</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Smartphone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">AVFoundation Pipeline Optimization</h4>
                  <p className="text-sm text-muted-foreground">
                    Propelled performance enhancements in AVFoundation, CoreMedia, and CoreAudio pipelines for millions
                    of users
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Code2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Swift & Objective-C Mastery</h4>
                  <p className="text-sm text-muted-foreground">
                    Expert-level proficiency in Swift and Objective-C with proven scalability and architectural
                    excellence
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Rocket className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Performance Engineering</h4>
                  <p className="text-sm text-muted-foreground">
                    Reduced p95 operation times and optimized media capture/transmission for low-latency performance
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card">
            <h3 className="text-2xl font-bold mb-6">Key Achievements</h3>
            <div className="space-y-4">
              <div className="p-4 bg-chart-2/10 rounded-lg border border-chart-2/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-chart-2" />
                  <span className="font-semibold text-chart-2">#1 App Store Ranking</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Achieved top ranking in Photo & Video category through performance optimizations and user experience
                  enhancements
                </p>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-semibold text-primary">1 Billion+ Devices</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Deployed secure iOS SDK to over 1 billion mobile devices across major social media platforms
                </p>
              </div>

              <div className="p-4 bg-chart-3/10 rounded-lg border border-chart-3/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-chart-3" />
                  <span className="font-semibold text-chart-3">Apple Keynote Feature</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  FiLMIC Pro featured in Apple's iPhone 11 keynote presentation, five years running as #1 video app
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-8 bg-gradient-to-br from-primary/5 to-chart-2/5 border-primary/20">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Framework Expertise</h3>
            <p className="text-muted-foreground mb-6">
              Comprehensive knowledge of iOS multimedia frameworks including UIKit, SwiftUI, CoreMedia, CoreAudio,
              Instruments profiling, and XCTest for unit and UI testing
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "AVFoundation",
                "CoreMedia",
                "CoreAudio",
                "UIKit",
                "SwiftUI",
                "XCTest",
                "Instruments",
                "Memory Profiling",
              ].map((tech, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-background rounded-full border text-sm font-medium"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
