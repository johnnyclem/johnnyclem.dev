import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { SidebarSection } from "@/posts/registry";

interface PostSidebarProps {
  sections: SidebarSection[];
}

export function PostSidebar({ sections }: PostSidebarProps) {
  const [activeId, setActiveId] = useState(
    sections[0]?.links[0]?.id || ""
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(
          (entry) => entry.isIntersecting
        );
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((prev, current) =>
            prev.boundingClientRect.top < current.boundingClientRect.top
              ? prev
              : current
          );
          if (topEntry.target.id) {
            setActiveId(topEntry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: [0, 0.5, 1] }
    );

    const allIds = sections.flatMap((s) => s.links.map((l) => l.id));
    const selector = allIds
      .map((id) => `#${id}`)
      .join(", ");
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y =
        element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <aside className="fixed top-[52px] left-0 bottom-0 w-[260px] bg-sidebar-bg border-r border-border overflow-y-auto py-4 hidden lg:block scroll-smooth">
      {sections.map((section, idx) => (
        <div key={idx} className="mb-6">
          <div className="text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px] px-5 py-1.5 mb-1">
            {section.title}
          </div>
          <div className="flex flex-col">
            {section.links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleClick(e, link.id)}
                className={cn(
                  "px-5 py-1.5 text-[13px] no-underline transition-all duration-300 relative border-l-[3px]",
                  activeId === link.id
                    ? "text-apple-blue font-medium bg-sidebar-active border-apple-blue pl-[18px]"
                    : "text-text-secondary hover:bg-sidebar-active border-transparent"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
