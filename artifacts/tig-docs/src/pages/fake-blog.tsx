import { useEffect } from "react";
import { Link } from "wouter";
import { posts } from "@/posts/registry";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/layout/SiteNav";

export default function FakeBlogPage() {
  useEffect(() => {
    document.title = "DX Review — johnnyclem.dev";
  }, []);
  return (
    <div className="min-h-screen bg-body-bg text-text-primary font-sans selection:bg-apple-blue/20">
      <SiteNav />
      <main className="pt-[52px]">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="py-16 lg:py-24 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="text-[13px] text-text-tertiary font-medium mb-2 uppercase tracking-[0.5px]">Field Notes</div>
            <h1 className="font-display text-[44px] lg:text-[56px] font-bold tracking-[-1px] leading-[1.05] mb-4 text-text-primary">
              Developer<br />Experience Review
            </h1>
            <p className="text-[19px] lg:text-[21px] text-text-secondary font-light leading-[1.42] max-w-[600px]">
              Hands-on reviews of developer tools, frameworks, and platforms. Deep dives into documentation quality, API design, and the craft of building for developers.
            </p>
          </div>

          <div className="border-t border-border pt-10 pb-20">
            <div className="text-[12px] text-text-tertiary font-semibold uppercase tracking-[0.5px] mb-6">
              All Posts
            </div>

            <div className="grid gap-6">
              {posts.map((post, idx) => (
                <Link key={post.slug} href={`/posts/${post.slug}`} className="no-underline group">
                  <article
                    className="rounded-2xl border border-border overflow-hidden bg-white hover:shadow-lg hover:shadow-apple-blue/5 transition-all duration-300 hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-4 ease-out"
                    style={{ animationDelay: `${idx * 100}ms`, animationFillMode: "both", animationDuration: "600ms" }}
                  >
                    <div className={`h-[200px] bg-gradient-to-br ${post.coverGradient} flex items-center justify-center relative overflow-hidden`}>
                      <div className="text-[64px] font-mono font-bold text-white/20 select-none group-hover:scale-110 transition-transform duration-500">{post.coverIcon}</div>
                      <div className="absolute bottom-4 left-5 flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-white/70 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full uppercase tracking-[0.5px]">{post.category}</span>
                        <span className="text-[11px] text-white/50">{post.date}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="font-display text-[22px] font-semibold tracking-[-0.2px] text-text-primary mb-1 group-hover:text-apple-blue transition-colors">
                            {post.title}
                          </h2>
                          <p className="text-[14px] text-text-secondary leading-[1.5] max-w-[520px]">
                            {post.description}
                          </p>
                        </div>
                        <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center group-hover:bg-apple-blue group-hover:text-white transition-all duration-300">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-border py-8 text-[12px] text-text-tertiary leading-[1.6]">
            <p>
              © 2026 Johnny Clem. All rights reserved.
            </p>
            <p className="mt-1 italic">
              Opinions expressed are the author's own. Tools reviewed independently.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
