import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, MapPin, Download, FileText } from "lucide-react";

interface ContactSectionProps {
  onDownloadResume?: () => void;
  onDownloadCoverLetter?: () => void;
}

export default function ContactSection({ onDownloadResume, onDownloadCoverLetter }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 bg-muted/30" data-testid="section-contact">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-contact-title">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground">
            Open to new opportunities in R&D, rapid prototyping, and iOS development
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 hover-elevate active-elevate-2 transition-all">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <a
                  href="mailto:johnnyclem@gmail.com"
                  className="text-primary hover:underline"
                  data-testid="link-email"
                >
                  johnnyclem@gmail.com
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover-elevate active-elevate-2 transition-all">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Linkedin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">LinkedIn</h3>
                <a
                  href="https://www.linkedin.com/in/johnnyclem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                  data-testid="link-linkedin"
                >
                  linkedin.com/in/johnnyclem
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover-elevate active-elevate-2 transition-all">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-muted-foreground">Austin, TX</p>
                <p className="text-sm text-muted-foreground">Remote & On-site Available</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover-elevate active-elevate-2 transition-all">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Download className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Documents</h3>
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onDownloadResume}
                    data-testid="button-contact-resume"
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    Resume
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onDownloadCoverLetter}
                    data-testid="button-contact-cover"
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    Cover Letter
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-chart-2/5 border-primary/20">
          <h3 className="text-xl font-bold mb-2">Currently Available</h3>
          <p className="text-muted-foreground mb-6">
            Looking for opportunities in iOS development, R&D, and technical leadership roles
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={onDownloadResume} size="lg" data-testid="button-primary-resume">
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open("mailto:johnnyclem@gmail.com", "_blank")}
              data-testid="button-email-me"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Me
            </Button>
          </div>
        </Card>
      </div>

      <footer className="mt-20 pt-8 border-t">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Jonathan Clem. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with React, TypeScript, Tailwind CSS, and Shadcn UI
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
