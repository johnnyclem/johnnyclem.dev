import { useEffect, useState } from "react";
import { PostNav } from "./PostNav";
import { PostSidebar } from "./PostSidebar";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PostMeta } from "@/posts/registry";

interface PostLayoutProps {
  post: PostMeta;
  children: React.ReactNode;
}

export function PostLayout({ post, children }: PostLayoutProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-body-bg text-text-primary font-sans selection:bg-apple-blue/20 relative overflow-x-hidden">
      <PostNav post={post} />
      <div className="flex flex-1 pt-[52px]">
        <PostSidebar sections={post.sidebar} />
        <main className="flex-1 lg:ml-[260px] min-w-0">
          <div className="max-w-[820px] mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-12 pb-32">
            {children}
          </div>
        </main>
      </div>

      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 z-50 p-3 rounded-full bg-apple-blue text-white shadow-lg hover:bg-apple-blue-hover transition-all duration-300 transform",
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 pointer-events-none"
        )}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
      </button>
    </div>
  );
}
