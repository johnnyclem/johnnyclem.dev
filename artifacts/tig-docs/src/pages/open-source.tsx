import { useEffect } from "react";
import { SiteNav } from "@/components/layout/SiteNav";
import { Github, Star, GitFork, ExternalLink } from "lucide-react";

interface Project {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  url: string;
}

const projects: Project[] = [
  {
    name: "smallchat",
    description: "A minimal, lightweight chat interface. Simple by design.",
    language: "Swift",
    languageColor: "#F05138",
    url: "https://github.com/johnnyclem/smallchat",
  },
  {
    name: "AgentVault",
    description: "Secure credential management for AI agents and automated workflows.",
    language: "Python",
    languageColor: "#3572A5",
    url: "https://github.com/johnnyclem/AgentVault",
  },
  {
    name: "JCAppleScript",
    description: "A collection of AppleScript utilities for macOS automation and productivity.",
    language: "AppleScript",
    languageColor: "#101F1F",
    url: "https://github.com/johnnyclem/JCAppleScript",
  },
];

export default function OpenSourcePage() {
  useEffect(() => {
    document.title = "Open Source — johnnyclem.dev";
  }, []);

  return (
    <div className="min-h-screen bg-body-bg text-text-primary font-sans selection:bg-apple-blue/20">
      <SiteNav />
      <main className="pt-[52px]">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="py-16 lg:py-24 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="text-[13px] text-text-tertiary font-medium mb-2 uppercase tracking-[0.5px]">
              Projects
            </div>
            <h1 className="font-display text-[44px] lg:text-[56px] font-bold tracking-[-1px] leading-[1.05] mb-4 text-text-primary">
              Open Source
            </h1>
            <p className="text-[19px] lg:text-[21px] text-text-secondary font-light leading-[1.42] max-w-[600px]">
              Things I've built and released into the wild. Use them, break them, make them better.
            </p>
          </div>

          <div className="border-t border-border pt-10 pb-20">
            <div className="grid gap-4">
              {projects.map((project, idx) => (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline group"
                >
                  <article
                    className="rounded-2xl border border-border p-6 bg-white hover:shadow-lg hover:shadow-apple-blue/5 transition-all duration-300 hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-4 ease-out"
                    style={{ animationDelay: `${idx * 100}ms`, animationFillMode: "both", animationDuration: "600ms" }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Github className="w-4 h-4 text-text-tertiary shrink-0" />
                          <h2 className="font-display text-[18px] font-semibold tracking-[-0.2px] text-text-primary group-hover:text-apple-blue transition-colors truncate">
                            {project.name}
                          </h2>
                        </div>
                        <p className="text-[14px] text-text-secondary leading-[1.5] mb-3">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-4 text-[12px] text-text-tertiary">
                          <span className="flex items-center gap-1.5">
                            <span
                              className="w-3 h-3 rounded-full inline-block"
                              style={{ backgroundColor: project.languageColor }}
                            />
                            {project.language}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5" />
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-text-tertiary shrink-0 mt-1 group-hover:text-apple-blue transition-colors" />
                    </div>
                  </article>
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-border py-8 text-[12px] text-text-tertiary leading-[1.6]">
            <p>© 2026 Johnny Clem. All rights reserved.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
