import { useEffect, useState, useMemo } from "react";
import { Link } from "wouter";
import { SiteNav } from "@/components/layout/SiteNav";
import { blogPosts, type BlogPost } from "@/blog/registry";
import { ArrowRight, Clock, ExternalLink } from "lucide-react";

interface DbBlogPost {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  published: boolean;
}

interface MergedBlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  externalUrl?: string;
  source: "static" | "db";
}

export default function BlogPage() {
  const [dbPosts, setDbPosts] = useState<DbBlogPost[]>([]);

  useEffect(() => {
    document.title = "Blog — johnnyclem.dev";
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    fetch(`${base}/api/blog-posts`)
      .then(async (res) => {
        if (!res.ok) return;
        const data = await res.json();
        if (!Array.isArray(data)) return;
        setDbPosts(data.filter((p: DbBlogPost) => p.published));
      })
      .catch(() => {});
  }, []);

  const allPosts: MergedBlogPost[] = useMemo(() => {
    const staticPosts: MergedBlogPost[] = blogPosts.map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      date: p.date,
      readTime: p.readTime,
      tags: p.tags,
      externalUrl: p.externalUrl,
      source: "static" as const,
    }));

    const dynamicPosts: MergedBlogPost[] = dbPosts
      .filter((dp) => !blogPosts.some((sp) => sp.slug === dp.slug))
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        description: p.description,
        date: p.date,
        readTime: p.readTime,
        tags: p.tags,
        source: "db" as const,
      }));

    return [...staticPosts, ...dynamicPosts];
  }, [dbPosts]);

  return (
    <div className="min-h-screen bg-body-bg text-text-primary font-sans selection:bg-apple-blue/20">
      <SiteNav />
      <main className="pt-[52px]">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="py-16 lg:py-24 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="text-[13px] text-text-tertiary font-medium mb-2 uppercase tracking-[0.5px]">
              Writing
            </div>
            <h1 className="font-display text-[44px] lg:text-[56px] font-bold tracking-[-1px] leading-[1.05] mb-4 text-text-primary">
              Blog
            </h1>
            <p className="text-[19px] lg:text-[21px] text-text-secondary font-light leading-[1.42] max-w-[600px]">
              Thoughts on software, design, and the things in between.
            </p>
          </div>

          <div className="border-t border-border pt-10 pb-20">
            <div className="grid gap-4">
              {allPosts.map((post, idx) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="no-underline group"
                >
                  <article
                    className="rounded-2xl border border-border p-6 bg-white hover:shadow-lg hover:shadow-apple-blue/5 transition-all duration-300 hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-4 ease-out"
                    style={{
                      animationDelay: `${idx * 100}ms`,
                      animationFillMode: "both",
                      animationDuration: "600ms",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-semibold text-apple-blue bg-apple-blue/8 px-2 py-0.5 rounded-full uppercase tracking-[0.5px]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h2 className="font-display text-[18px] sm:text-[20px] font-semibold tracking-[-0.2px] text-text-primary mb-2 group-hover:text-apple-blue transition-colors leading-snug">
                          {post.title}
                        </h2>
                        <p className="text-[14px] text-text-secondary leading-[1.5] mb-3">
                          {post.description}
                        </p>
                        <div className="flex items-center gap-4 text-[12px] text-text-tertiary">
                          <span>{post.date}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                          {post.externalUrl && (
                            <span className="flex items-center gap-1">
                              <ExternalLink className="w-3 h-3" />
                              Medium
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center group-hover:bg-apple-blue group-hover:text-white transition-all duration-300">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-border py-8 text-[12px] text-text-tertiary leading-[1.6]">
            <p>&copy; 2026 Johnny Clem. All rights reserved.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
