import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Download } from "lucide-react";
import { type Profile } from "@shared/schema";

interface NavigationProps {
  onDownloadResume?: () => void;
}

export default function Navigation({ onDownloadResume }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "About", id: "hero" },
    { label: "Experience", id: "experience" },
    { label: "Patents", id: "patents" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  const pageLinks = [
    { label: "Blog", href: "/blog" },
    { label: "Consulting", href: "/consulting" },
  ];

  return (
    <>
      {/* Progress bar */}
      <div className="progress-bar" id="nav-progress" />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0a0b0d]/90 backdrop-blur-md border-b border-[#1f2330]"
            : "bg-transparent"
        }`}
        data-testid="header-navigation"
      >
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("hero")}
              className="group flex items-center gap-3 px-2 py-1"
              data-testid="button-logo"
            >
              <span
                className="font-[family-name:var(--font-heading)] text-lg tracking-tight"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                {profile?.name?.split(" ")[0] || "Jonathan"}
              </span>
              <span
                className="text-xs font-[family-name:var(--font-label)] text-[#f59e0b] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {profile?.title?.split(" & ")[0] || "Engineer"}
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {location === "/" && navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="px-4 py-2 text-xs font-medium tracking-widest uppercase text-[#6b7280] hover:text-[#f59e0b] transition-colors duration-200"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  data-testid={`link-${link.id}`}
                >
                  {link.label}
                </button>
              ))}
              {pageLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <button
                    className={`px-4 py-2 text-xs font-medium tracking-widest uppercase transition-colors duration-200 ${
                      location === link.href
                        ? "text-[#f59e0b]"
                        : "text-[#6b7280] hover:text-[#f59e0b]"
                    }`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    data-testid={`link-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </button>
                </Link>
              ))}
              {onDownloadResume && (
                <Button
                  onClick={onDownloadResume}
                  size="sm"
                  variant="outline"
                  className="ml-4 border-[#1f2330] text-[#6b7280] hover:text-[#f59e0b] hover:border-[#f59e0b]/50 bg-transparent"
                  data-testid="button-download-resume"
                >
                  <Download className="w-3.5 h-3.5 mr-2" />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs tracking-wider uppercase">
                    Resume
                  </span>
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#6b7280] hover:text-[#f59e0b] transition-colors"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div
              className="md:hidden mt-4 py-4 border-t border-[#1f2330] flex flex-col gap-1"
              data-testid="mobile-menu"
            >
              {location === "/" && navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="px-4 py-3 text-left text-xs font-medium tracking-widest uppercase text-[#6b7280] hover:text-[#f59e0b] transition-colors"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  data-testid={`link-mobile-${link.id}`}
                >
                  {link.label}
                </button>
              ))}
              {pageLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full px-4 py-3 text-left text-xs font-medium tracking-widest uppercase transition-colors ${
                      location === link.href
                        ? "text-[#f59e0b]"
                        : "text-[#6b7280] hover:text-[#f59e0b]"
                    }`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </button>
                </Link>
              ))}
              {onDownloadResume && (
                <Button
                  onClick={onDownloadResume}
                  size="sm"
                  variant="outline"
                  className="mt-4 border-[#1f2330] text-[#6b7280] hover:text-[#f59e0b] hover:border-[#f59e0b]/50"
                  data-testid="button-mobile-download"
                >
                  <Download className="w-3.5 h-3.5 mr-2" />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs tracking-wider uppercase">
                    Resume
                  </span>
                </Button>
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Scroll progress script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('scroll', () => {
              const progressBar = document.getElementById('nav-progress');
              const scrollHeight = document.body.scrollHeight - window.innerHeight;
              const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
              if (progressBar) progressBar.style.width = progress + '%';
            });
          `
        }}
      />
    </>
  );
}