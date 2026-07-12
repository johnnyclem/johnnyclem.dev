import type { BlogPost } from "@/blog/registry";
import { SiteNav } from "./SiteNav";
import { ArrowLeft, ExternalLink, Clock } from "lucide-react";
import { Link } from "wouter";

interface BlogPostLayoutProps {
  post: BlogPost;
  children: React.ReactNode;
}

export function BlogPostLayout({ post, children }: BlogPostLayoutProps) {
  return (
    <div className="min-h-screen bg-body-bg text-text-primary font-sans selection:bg-apple-blue/20">
      <SiteNav />
      <main className="pt-[52px]">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-10 pb-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[13px] text-text-tertiary hover:text-text-primary no-underline transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Blog
            </Link>
          </div>

          <header className="pt-4 pb-8 border-b border-border">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold text-apple-blue bg-apple-blue/8 px-2.5 py-1 rounded-full uppercase tracking-[0.5px]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-[32px] sm:text-[40px] font-bold tracking-[-0.5px] leading-[1.1] mb-4 text-text-primary">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-[13px] text-text-tertiary">
              <span>{post.date}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              {post.externalUrl && (
                <a
                  href={post.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-text-tertiary hover:text-apple-blue transition-colors no-underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Read on Medium
                </a>
              )}
            </div>
          </header>

          <div className="blog-prose py-10">{children}</div>

          <div className="border-t border-border py-8 text-[12px] text-text-tertiary leading-[1.6]">
            <p>© 2026 Johnny Clem. All rights reserved.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
