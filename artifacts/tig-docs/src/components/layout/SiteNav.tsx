import { Link, useLocation } from "wouter";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Blog", href: "/" },
  { label: "Fake Blog", href: "/fake-blog" },
  { label: "Open Source", href: "/open-source" },
  { label: "Closed Source", href: "/work" },
] as const;

export function SiteNav() {
  const [location] = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location === "/" || location === "/blog" || location.startsWith("/blog/");
    if (href === "/fake-blog") return location === "/fake-blog" || location.startsWith("/posts/");
    return location.startsWith(href);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-body-bg/80 border-b border-border"
      style={{
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
      }}
    >
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="h-[52px] flex items-center gap-5">
          <Link
            href="/"
            className="flex items-center gap-2 font-display font-semibold text-[17px] text-text-primary no-underline hover:opacity-80 transition-opacity shrink-0"
          >
            @johnnyclem
          </Link>

          <div className="ml-auto flex items-center gap-0.5 sm:gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "px-2 sm:px-3 py-1.5 text-[12px] sm:text-[13px] font-medium rounded-md no-underline transition-colors whitespace-nowrap shrink-0",
                  isActive(tab.href)
                    ? "text-text-primary bg-[#f0f0f2]"
                    : "text-text-secondary hover:text-text-primary hover:bg-[#f5f5f7]"
                )}
              >
                {tab.label}
              </Link>
            ))}
            <a
              href="https://github.com/johnnyclem"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors ml-1 sm:ml-2 shrink-0"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
