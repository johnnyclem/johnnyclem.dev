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
    { label: "Skills", id: "skills" },
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b" : "bg-transparent"
      }`}
      data-testid="header-navigation"
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xl font-bold hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-colors"
            data-testid="button-logo"
          >
            {profile?.name || "Jonathan Clem"}
          </button>

          <div className="hidden md:flex items-center gap-1">
            {location === "/" && navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover-elevate active-elevate-2 rounded-md transition-colors"
                data-testid={`link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
            {pageLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <button
                  className={`px-4 py-2 text-sm font-medium hover-elevate active-elevate-2 rounded-md transition-colors ${
                    location === link.href
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid={`link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </button>
              </Link>
            ))}
            <Link href="/">
              <button
                className={`px-4 py-2 text-sm font-medium hover-elevate active-elevate-2 rounded-md transition-colors ${
                  location === "/"
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid="link-portfolio"
              >
                Portfolio
              </button>
            </Link>
            {onDownloadResume && (
              <Button
                onClick={onDownloadResume}
                size="sm"
                className="ml-2"
                data-testid="button-download-resume"
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover-elevate active-elevate-2 rounded-md"
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t flex flex-col gap-2 bg-background rounded-lg" data-testid="mobile-menu">
            {location === "/" && navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-4 py-2 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover-elevate active-elevate-2 rounded-md transition-colors"
                data-testid={`link-mobile-${link.id}`}
              >
                {link.label}
              </button>
            ))}
            {pageLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full px-4 py-2 text-left text-sm font-medium hover-elevate active-elevate-2 rounded-md transition-colors ${
                    location === link.href
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </button>
              </Link>
            ))}
            <Link href="/">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-full px-4 py-2 text-left text-sm font-medium hover-elevate active-elevate-2 rounded-md transition-colors ${
                  location === "/"
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid="link-mobile-portfolio"
              >
                Portfolio
              </button>
            </Link>
            {onDownloadResume && (
              <Button
                onClick={onDownloadResume}
                size="sm"
                className="mt-2"
                data-testid="button-mobile-download"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
