import { useEffect, useState, useMemo } from "react";
import { SiteNav } from "@/components/layout/SiteNav";
import { ExternalLink } from "lucide-react";

interface PageItemOverride {
  registryType: string;
  slug: string;
  title: string | null;
  description: string | null;
  role: string | null;
  period: string | null;
  gradient: string | null;
  icon: string | null;
  tags: string[] | null;
}

interface WorkProject {
  name: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  url?: string;
  tags: string[];
  gradient: string;
  icon: string;
}

const workProjects: WorkProject[] = [
  {
    name: "Realtor.com",
    role: "Senior iOS Engineer",
    period: "2025 – Present",
    description:
      "Staff-level iOS engineering at one of the largest real estate platforms in the US.",
    highlights: [
      "Hardened CI security and reduced pipeline build times by 33%",
    ],
    url: "https://www.realtor.com",
    tags: ["Swift", "iOS", "CI/CD"],
    gradient: "from-[#d32f2f] to-[#b71c1c]",
    icon: "🏠",
  },
  {
    name: "Wire Network / AI Layer Labs",
    role: "Interim CTO",
    period: "2023 – 2024",
    description:
      "Led development of an agentic macOS application with persistent agent memory, multi-model tool use, and native OS integration via an AppleScript bridge — early production work in MCP-style tool integration before MCP existed as a standard.",
    highlights: [
      "Designed agent orchestration patterns and tool-invocation interfaces for cross-platform AI assistants",
      "Shipped native macOS automation surface enabling LLM-driven agents to drive system services reliably",
      "Produced a technical video podcast documenting agentic development workflows, peaking at ~100K downloads/week",
    ],
    tags: ["Swift", "macOS", "Agents", "LLM", "AppleScript", "MCP"],
    gradient: "from-[#3949ab] to-[#1a237e]",
    icon: "🧠",
  },
  {
    name: "Truepic SDK",
    role: "Senior iOS Engineer / SDK Tech Lead",
    period: "2023 – 2024",
    description:
      "Tech lead on Truepic's image capture, sign, and validate SDK for iOS — a cryptographic content provenance system verifying photos and videos are unmanipulated from the moment of capture.",
    highlights: [
      "Built on underlying C++ libraries: image capture pipeline, cryptographic signing, and validation flows",
      "Deep AVCaptureSession integration to embed provenance metadata before any post-processing",
      "Pipeline design with direct parallels to content integrity and watermarking in streaming delivery",
    ],
    url: "https://truepic.com",
    tags: ["C++", "Swift", "AVFoundation", "Cryptography"],
    gradient: "from-[#1565c0] to-[#0d47a1]",
    icon: "🔐",
  },
  {
    name: "Belief Agency",
    role: "Director of Digital",
    period: "2021 – 2022",
    description:
      "Led digital strategy and engineering for a creative agency, bridging product vision with technical execution.",
    highlights: [],
    tags: ["Strategy", "Engineering", "Digital"],
    gradient: "from-[#6a1b9a] to-[#4a148c]",
    icon: "✦",
  },
  {
    name: "FiLMiC Pro",
    role: "CTO / Lead iOS Engineer",
    period: "2014 – 2021",
    description:
      "Led the engineering team behind FiLMiC Pro — the most widely used professional video capture app on iOS. #1 video app on the App Store for multiple years. Used to shoot segments of feature films, documentaries, and broadcast journalism.",
    highlights: [
      "Designed and shipped custom H.264 encoders: hardware-accelerated encoding via VideoToolbox, bypassing AVFoundation's standard recording pipeline for lowest achievable encode-to-network latency",
      "Built a second custom H.264 encoder for the core recording path, exposing fine-grained control over SPS/PPS emission, IDR interval, slice sizing, and rate control",
      "Integrated OpenCV into the real-time capture pipeline for on-device frame analysis and image processing",
      "Designed and shipped the C++ audio capture and processing engine: real-time metering, monitoring, gain control, and synchronized A/V recording",
      "Built a proof-of-concept ProRes software encoder for iPhone (~5-6 fps ProRes Proxy/LT), predating Apple's hardware ProRes on A15+",
      "Led the ground-up rewrite of FiLMiC Pro in Swift 2.0 (iOS 9): full AVFoundation capture pipeline, manual exposure/focus/WB, LOG color profiles, configurable codec parameters",
    ],
    url: "https://www.filmicpro.com",
    tags: ["C++", "Swift", "H.264", "AVFoundation", "OpenCV", "VideoToolbox"],
    gradient: "from-[#1a1a2e] to-[#16213e]",
    icon: "🎬",
  },
  {
    name: "Paladin Innovators",
    role: "iOS Engineer",
    period: "2012 – 2014",
    description:
      "Designed and shipped a low-latency live video streaming system: iPhone to production video switcher over point-to-point Wi-Fi, achieving sub-100ms glass-to-glass latency at 720p60 on 2012-era hardware.",
    highlights: [
      "Built custom NALU packaging to minimize decode-side buffering",
      "Tuned hardware-accelerated H.264 encoding: B-frame elimination, GOP structure, rate control for real-time delivery",
      "Used ffmpeg extensively on the server/switcher side for transcoding, muxing, and stream analysis",
      "Production-deployed at live multi-camera broadcasts and corporate productions",
    ],
    tags: ["C++", "H.264", "ffmpeg", "Low-Latency Streaming", "VideoToolbox"],
    gradient: "from-[#2e7d32] to-[#1b5e20]",
    icon: "📡",
  },
  {
    name: "CinePro",
    role: "Creator",
    period: "2012",
    description:
      "Independently built CinePro, ranked #1 in App Store video apps for 2012. Full manual camera control app built on AVFoundation with custom video recording pipeline.",
    highlights: [],
    tags: ["iOS", "AVFoundation", "Video"],
    gradient: "from-[#37474f] to-[#263238]",
    icon: "🎥",
  },
  {
    name: "DoubleTake",
    role: "Engineer",
    period: "2019 – 2020",
    description:
      "Contributed to FiLMiC's DoubleTake app — simultaneous multi-camera recording on iPhone. Required management of multiple concurrent AVCaptureDevice inputs, synchronized frame timing, and independent codec configuration per stream.",
    highlights: [],
    tags: ["Swift", "AVFoundation", "Multi-Camera"],
    gradient: "from-[#00695c] to-[#004d40]",
    icon: "◉◉",
  },
];

type Patent = {
  id: string;
  title: string;
  inventors: string;
  assignee: string;
  filed: string;
  description: string;
  url: string;
  contributor?: boolean;
};

const patents: Patent[] = [
  {
    id: "US20150350041A1",
    title:
      "Protocols & Mechanisms of Communication Between Live Production Server and Mobile or Remote Clients",
    inventors: "Jonathan Clem, Dean Bisogno",
    assignee: "Paladin Innovators",
    filed: "May 30, 2014",
    description:
      "WebSocket-based command/response protocol for coordinating real-time video production between a centralized encoding server and mobile thin clients. Covers session management, encode state control, multi-client synchronization, and hardware routing over a unified protocol.",
    url: "https://patents.google.com/patent/US20150350041A1",
  },
  {
    id: "US20150350289A1",
    title:
      "Methods & Systems for Transmission of High Resolution & Low Latency Data",
    inventors: "Jonathan Clem, Dean Bisogno",
    assignee: "Paladin Innovators",
    filed: "May 30, 2014",
    description:
      "Ultra Low Latency Streaming (ULLS): a method for delivering 1080p HD video from server to mobile/desktop/web clients with sub-100ms latency over WebSockets or TCP/UDP. Adaptively compensates for bandwidth, compresses each frame in real time, and uses frame timestamps for dynamic latency management — enabling live IPTV mixing from a mobile device.",
    url: "https://patents.google.com/patent/US20150350289A1",
  },
  {
    id: "US10481758B2",
    title:
      "Location Based Augmented Reality System for Exchange of Items Based on Location Sensing",
    inventors: "Jonathan Cowles, Jesse Bryan, John Clem",
    assignee: "iOculi, Inc.",
    filed: "Feb 27, 2017",
    description:
      "A location-based AR system in which a provider associates a triggering icon representing a value item with a specific physical location and transmits it to a mobile recipient. The recipient travels to the location, activates the triggering icon via the device camera, and receives the value item.",
    url: "https://patents.google.com/patent/US10481758B2",
  },
  {
    id: "US20200259974A1",
    title: "Cubiform Method",
    inventors: "Christopher Cohen, Daniel Hernández Portugués, Matthew Voss",
    assignee: "Filmic Inc.",
    filed: "Apr 24, 2020",
    description:
      "A method for dynamically generating color lookup tables (C-LUTs) in response to user parameter changes. The Cubiform module computes a new color value for each data-point, packages them into an RGB(A) data structure, and emits a C-LUT that replaces the current one — enabling real-time, user-driven color grading on mobile devices.",
    url: "https://patents.google.com/patent/US20200259974A1",
    contributor: true,
  },
  {
    id: "US10778947B2",
    title:
      "Sympathetic Assistive Mutation of Live Camera Preview/Display Image Stream",
    inventors: "Christopher Cohen, Matthew Voss, Neill Winston Barham",
    assignee: "Filmic Inc.",
    filed: "Mar 7, 2018",
    description:
      "A live camera preview that mutates root images by applying a shader to derive an assistive color per pixel and blending it back into the source. Powers focus peaking, exposure assist, and other operator-aid overlays during professional mobile video capture.",
    url: "https://patents.google.com/patent/US10778947B2",
    contributor: true,
  },
  {
    id: "US20190110036A1",
    title: "Inductive Micro-Contrast Evaluation Method",
    inventors: "Christopher Cohen, Matthew Voss",
    assignee: "Filmic Inc.",
    filed: "Dec 7, 2018",
    description:
      "Computes a per-pixel micro-contrast score by sampling the corners of a submatrix centered at each root pixel, then generates an assistive overlay blended into the live preview to visualize fine-grained contrast — used to guide manual focus on mobile video capture devices.",
    url: "https://patents.google.com/patent/US20190110036A1",
    contributor: true,
  },
];

function slugifyName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function WorkPage() {
  const [overrides, setOverrides] = useState<PageItemOverride[]>([]);

  useEffect(() => {
    document.title = "Work — johnnyclem.dev";
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    fetch(`${base}/api/page-item-overrides?registryType=work`)
      .then(async (res) => {
        if (!res.ok) return;
        const data = await res.json();
        // API may be unconfigured (503) or return an error object — keep static data.
        if (Array.isArray(data)) setOverrides(data);
      })
      .catch(() => {});
  }, []);

  const mergedProjects = useMemo(() => {
    return workProjects.map((project) => {
      const slug = slugifyName(project.name);
      const override = overrides.find((o) => o.slug === slug);
      if (!override) return project;
      return {
        ...project,
        name: override.title ?? project.name,
        description: override.description ?? project.description,
        role: override.role ?? project.role,
        period: override.period ?? project.period,
        gradient: override.gradient ?? project.gradient,
        icon: override.icon ?? project.icon,
        tags: override.tags ?? project.tags,
      };
    });
  }, [overrides]);

  return (
    <div className="min-h-screen bg-body-bg text-text-primary font-sans selection:bg-apple-blue/20">
      <SiteNav />
      <main className="pt-[52px]">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="py-16 lg:py-24 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="text-[13px] text-text-tertiary font-medium mb-2 uppercase tracking-[0.5px]">
              Portfolio
            </div>
            <h1 className="font-display text-[44px] lg:text-[56px] font-bold tracking-[-1px] leading-[1.05] mb-4 text-text-primary">
              Work
            </h1>
            <p className="text-[19px] lg:text-[21px] text-text-secondary font-light leading-[1.42] max-w-[600px]">
              Thirteen years of video engineering across the full
              capture-to-delivery pipeline. Custom codec work, real-time
              streaming, C++ media engines, and products used by filmmakers
              worldwide.
            </p>
          </div>

          <div className="border-t border-border pt-10 pb-10">
            <div className="grid gap-6">
              {mergedProjects.map((project, idx) => (
                <article
                  key={project.name}
                  className="rounded-2xl border border-border overflow-hidden bg-white animate-in fade-in slide-in-from-bottom-4 ease-out"
                  style={{
                    animationDelay: `${idx * 80}ms`,
                    animationFillMode: "both",
                    animationDuration: "600ms",
                  }}
                >
                  <div
                    className={`h-[120px] sm:h-[140px] bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
                  >
                    <span className="text-[48px] select-none">
                      {project.icon}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h2 className="font-display text-[20px] sm:text-[22px] font-semibold tracking-[-0.2px] text-text-primary mb-0.5">
                          {project.name}
                        </h2>
                        <div className="text-[13px] text-text-tertiary">
                          {project.role} · {project.period}
                        </div>
                      </div>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-tertiary hover:text-apple-blue transition-colors shrink-0 mt-1"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-[14px] text-text-secondary leading-[1.5] mb-3">
                      {project.description}
                    </p>
                    {project.highlights.length > 0 && (
                      <ul className="text-[13px] text-text-secondary leading-[1.6] mb-4 space-y-1.5 list-none pl-0">
                        {project.highlights.map((h, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-text-tertiary shrink-0 mt-[3px]">
                              ›
                            </span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium text-text-tertiary bg-[#f5f5f7] px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-10 pb-20">
            <div className="text-[12px] text-text-tertiary font-semibold uppercase tracking-[0.5px] mb-6">
              Patents
            </div>
            <div className="grid gap-4">
              {patents.map((p, idx) => (
                <article
                  key={p.id}
                  className="rounded-2xl border border-border p-6 bg-white animate-in fade-in slide-in-from-bottom-4 ease-out"
                  style={{
                    animationDelay: `${idx * 60}ms`,
                    animationFillMode: "both",
                    animationDuration: "600ms",
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="text-[11px] font-mono text-text-tertiary">
                          {p.id}
                        </div>
                        {p.contributor && (
                          <span className="text-[10px] font-medium text-apple-blue bg-apple-blue/10 px-2 py-0.5 rounded-full uppercase tracking-[0.5px]">
                            Contributor
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-[17px] sm:text-[18px] font-semibold tracking-[-0.2px] text-text-primary mb-1">
                        {p.title}
                      </h3>
                      <div className="text-[12px] text-text-tertiary mb-3">
                        {p.inventors} · {p.assignee} · Filed {p.filed}
                      </div>
                    </div>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-tertiary hover:text-apple-blue transition-colors shrink-0 mt-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-[14px] text-text-secondary leading-[1.5]">
                    {p.description}
                  </p>
                </article>
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
