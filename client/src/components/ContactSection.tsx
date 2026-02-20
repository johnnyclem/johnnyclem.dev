import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, MapPin, Download, FileText, Github } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { type Profile } from "@shared/schema";

interface ContactSectionProps {
  onDownloadResume?: () => void;
  onDownloadCoverLetter?: () => void;
}

export default function ContactSection({ onDownloadResume, onDownloadCoverLetter }: ContactSectionProps) {
  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  return (
    <section
      id="contact"
      className="py-24 bg-[#0a0b0d]"
      data-testid="section-contact"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="section-label">05</div>
          <h2
            className="lyric-head"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Get In Touch
          </h2>
          <p
            className="text-lg text-[#6b7280] max-w-2xl"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Open to new opportunities in R&D, rapid prototyping, and iOS development
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* Email */}
          <Card className="p-5 bg-[#111318] border-[#1f2330] hover:border-[#f59e0b]/20 transition-colors duration-300">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded bg-[#f59e0b]/10 shrink-0">
                <Mail className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <div>
                <h3
                  className="text-sm font-semibold text-white mb-1"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Email
                </h3>
                <a
                  href={`mailto:${profile?.email || "johnnyclem@gmail.com"}`}
                  className="text-sm text-[#f59e0b] hover:underline"
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  data-testid="link-email"
                >
                  {profile?.email || "johnnyclem@gmail.com"}
                </a>
              </div>
            </div>
          </Card>

          {/* LinkedIn */}
          <Card className="p-5 bg-[#111318] border-[#1f2330] hover:border-[#f59e0b]/20 transition-colors duration-300">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded bg-[#f59e0b]/10 shrink-0">
                <Linkedin className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <div>
                <h3
                  className="text-sm font-semibold text-white mb-1"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  LinkedIn
                </h3>
                <a
                  href={profile?.linkedin || "https://www.linkedin.com/in/johnnyclem"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#f59e0b] hover:underline"
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  data-testid="link-linkedin"
                >
                  linkedin.com/in/johnnyclem
                </a>
              </div>
            </div>
          </Card>

          {/* Location */}
          <Card className="p-5 bg-[#111318] border-[#1f2330] hover:border-[#f59e0b]/20 transition-colors duration-300">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded bg-[#f59e0b]/10 shrink-0">
                <MapPin className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <div>
                <h3
                  className="text-sm font-semibold text-white mb-1"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Location
                </h3>
                <p
                  className="text-sm text-[#9ca3af]"
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                >
                  {profile?.location || "Austin, TX"}
                </p>
                <p
                  className="text-xs text-[#6b7280] mt-0.5"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Remote & On-site Available
                </p>
              </div>
            </div>
          </Card>

          {/* Documents */}
          <Card className="p-5 bg-[#111318] border-[#1f2330] hover:border-[#f59e0b]/20 transition-colors duration-300">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded bg-[#f59e0b]/10 shrink-0">
                <Download className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <div className="flex-1">
                <h3
                  className="text-sm font-semibold text-white mb-2"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Documents
                </h3>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onDownloadResume}
                    className="border-[#1f2330] text-[#6b7280] hover:text-[#f59e0b] hover:border-[#f59e0b]/30 bg-transparent"
                    data-testid="button-contact-resume"
                  >
                    <FileText className="w-3 h-3 mr-1.5" />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[10px] tracking-wider uppercase">
                      Resume
                    </span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onDownloadCoverLetter}
                    className="border-[#1f2330] text-[#6b7280] hover:text-[#f59e0b] hover:border-[#f59e0b]/30 bg-transparent"
                    data-testid="button-contact-cover"
                  >
                    <FileText className="w-3 h-3 mr-1.5" />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[10px] tracking-wider uppercase">
                      Cover Letter
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Card */}
        <Card className="p-8 text-center bg-[#111318] border-[#f59e0b]/20">
          <h3
            className="text-xl font-semibold text-white mb-2"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Currently Available
          </h3>
          <p
            className="text-[#9ca3af] mb-6 max-w-lg mx-auto"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Looking for opportunities in iOS development, R&D, and technical leadership roles
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={onDownloadResume}
              className="bg-[#f59e0b] hover:bg-[#d97706] text-[#0a0b0d]"
              data-testid="button-primary-resume"
            >
              <Download className="w-4 h-4 mr-2" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs tracking-wider uppercase">
                Download Resume
              </span>
            </Button>
            <Button
              variant="outline"
              className="border-[#1f2330] text-[#6b7280] hover:text-[#f59e0b] hover:border-[#f59e0b]/30 bg-transparent"
              onClick={() => window.open(`mailto:${profile?.email || "johnnyclem@gmail.com"}`, "_blank")}
              data-testid="button-email-me"
            >
              <Mail className="w-4 h-4 mr-2" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs tracking-wider uppercase">
                Email Me
              </span>
            </Button>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-[#1f2330]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className="text-xs text-[#4b5163]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              © 2026 {profile?.name || "Jonathan Clem"}. All rights reserved.
            </p>
            <p
              className="text-xs text-[#4b5163]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Built with React, TypeScript, Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}