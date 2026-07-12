import { useEffect, useState } from "react";
import { ChevronRight, Github } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import type { PostMeta } from "@/posts/registry";

interface PostNavProps {
  post: PostMeta;
}

export function PostNav({ post }: PostNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Overview");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((prev, current) =>
            prev.boundingClientRect.top < current.boundingClientRect.top
              ? prev
              : current
          );
          if (topEntry.target.textContent) {
            setActiveSection(topEntry.target.textContent);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    const elements = document.querySelectorAll("h2[id], h1");
    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-[52px] bg-body-bg/80 border-b border-border flex items-center px-6 gap-5 transition-shadow duration-300",
          scrolled && "shadow-sm"
        )}
        style={{
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-display font-semibold text-[17px] text-text-primary no-underline hover:opacity-80 transition-opacity"
        >
          @johnnyclem
        </Link>

        <div className="text-[12px] text-text-tertiary flex items-center gap-1 font-medium tracking-wide min-w-0 flex-1">
          <Link
            href="/fake-blog"
            className="shrink-0 hidden sm:inline text-text-tertiary no-underline hover:text-text-secondary transition-colors"
          >
            DX Review
          </Link>
          <ChevronRight
            className="w-3 h-3 text-text-tertiary/60 shrink-0 hidden sm:block"
            strokeWidth={3}
          />
          <span className="shrink-0 hidden sm:inline">{post.category}</span>
          <ChevronRight
            className="w-3 h-3 text-text-tertiary/60 shrink-0 hidden sm:block"
            strokeWidth={3}
          />
          <span className="text-text-secondary truncate">{post.title}</span>
        </div>

        <div className="ml-auto">
          <a href="https://github.com/johnnyclem" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </nav>

      <div
        className={cn(
          "fixed top-[52px] left-0 right-0 z-40 bg-body-bg/90 backdrop-blur-md border-b border-border/50 px-6 py-2 text-[12px] font-medium text-text-secondary lg:hidden transition-transform duration-300",
          scrolled ? "translate-y-0" : "-translate-y-full"
        )}
      >
        {activeSection}
      </div>
    </>
  );
}
