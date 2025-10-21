import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Smartphone, Server, Database, Cpu, Wrench } from "lucide-react";

export default function SkillsMatrix() {
  const skillCategories = [
    {
      icon: Smartphone,
      title: "Mobile Development",
      color: "text-primary",
      skills: ["Swift", "Objective-C", "UIKit", "SwiftUI", "AVFoundation", "CoreMedia", "CoreAudio"],
      specialization: ["AVFoundation", "Swift"],
    },
    {
      icon: Code2,
      title: "Programming Languages",
      color: "text-chart-2",
      skills: ["TypeScript", "JavaScript", "C++", "Python", "Java", "Rust", "Go", "Kotlin", "C#", "Ruby"],
      specialization: [],
    },
    {
      icon: Server,
      title: "Backend & APIs",
      color: "text-chart-3",
      skills: ["REST APIs", "GraphQL", "Node.js", "Express", "WebSockets", "Microservices"],
      specialization: [],
    },
    {
      icon: Database,
      title: "Platforms & Deployment",
      color: "text-chart-4",
      skills: ["iOS", "macOS", "Android", "Web", "Desktop", "Cloud", "CI/CD", "Docker"],
      specialization: [],
    },
    {
      icon: Cpu,
      title: "AI & Innovation",
      color: "text-chart-5",
      skills: ["Agentic AI", "LLM Integration", "RAG Workflows", "ML Optimization", "Blockchain"],
      specialization: [],
    },
    {
      icon: Wrench,
      title: "Development Tools",
      color: "text-primary",
      skills: ["XCTest", "Instruments", "Git", "Jira", "Figma", "Performance Profiling"],
      specialization: [],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-muted/30" data-testid="section-skills">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-skills-title">
            Technical Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive skill set spanning 10+ programming languages and multiple platforms, with specialized
            expertise in iOS development and AVFoundation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <Card
                key={idx}
                className="p-6 hover-elevate active-elevate-2 transition-all"
                data-testid={`card-skill-${idx}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-primary/10 ${category.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIdx) => (
                    <Badge
                      key={skillIdx}
                      variant={category.specialization.includes(skill) ? "default" : "secondary"}
                      className={
                        category.specialization.includes(skill) ? "border-chart-2 bg-chart-2/10" : ""
                      }
                      data-testid={`badge-skill-${skill.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-card border rounded-lg">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-chart-2/10">
              <Award className="w-6 h-6 text-chart-2" />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Core Specialization</h4>
              <p className="text-muted-foreground">
                Deep expertise in <span className="text-foreground font-semibold">AVFoundation</span> and{" "}
                <span className="text-foreground font-semibold">iPhone app development in Swift</span>, with proven
                track record of optimizing video capture and streaming performance for #1 ranked App Store
                applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Award } from "lucide-react";
