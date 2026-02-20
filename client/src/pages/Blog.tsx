import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import type { BlogPost } from "@shared/schema";

// Featured Essay Component
function FeaturedEssay() {
  return (
    <Card className="overflow-hidden bg-[#111318] border-[#1f2330] hover:border-[#f59e0b]/20 transition-colors duration-300 group">
      <div className="relative h-64 bg-[#0a0b0d] overflow-hidden">
        {/* Amber gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b]/10 via-transparent to-[#22c55e]/5" />

        {/* Title overlay */}
        <div className="absolute inset-0 flex items-end p-6">
          <div>
            <Badge
              className="mb-3 bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="text-[10px] tracking-wider uppercase">Featured Essay</span>
            </Badge>
            <h2
              className="text-2xl md:text-3xl text-white"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              One of Us: The Ghost in the Merge
            </h2>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p
          className="text-[#9ca3af] mb-4"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          On silicon incarnation, merge-queue salvation, and why the 2026 engineer is actually a chaplain.
          A meditation on what it means to build with AI as a peer, not a tool.
        </p>

        <div
          className="flex items-center justify-between"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span className="text-xs text-[#6b7280] tracking-wider">
            February 19, 2026
          </span>
          <Link href="/blog/one-of-us">
            <button className="flex items-center gap-2 text-xs text-[#f59e0b] hover:gap-3 transition-all">
              <span className="tracking-wider uppercase">Read Essay</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default function Blog() {
  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const publishedPosts = posts.filter(p => p.status === "published");

  return (
    <div className="min-h-screen bg-[#0a0b0d]">
      <Navigation />

      <main className="pt-24 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Page Header */}
          <div className="mb-16">
            <div className="section-label">Writing</div>
            <h1
              className="lyric-head"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Thoughts on Engineering
            </h1>
            <p
              className="text-lg text-[#6b7280] max-w-2xl"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Essays and reflections on software, systems, and the future we're building together
            </p>
          </div>

          {/* Featured Essay */}
          <div className="mb-12">
            <FeaturedEssay />
          </div>

          {/* Other Posts */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-[#f59e0b]" />
            </div>
          ) : publishedPosts.length > 0 ? (
            <div className="space-y-4">
              <h3
                className="text-xs text-[#6b7280] tracking-widest uppercase mb-6"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                More Writing
              </h3>

              {publishedPosts.map((post) => (
                <Card
                  key={post.id}
                  className="p-5 bg-[#111318] border-[#1f2330] hover:border-[#f59e0b]/20 transition-colors duration-300 group"
                  data-testid={`blog-post-card-${post.slug}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3
                        className="text-lg font-semibold text-white mb-1 group-hover:text-[#f59e0b] transition-colors"
                        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                      >
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p
                          className="text-sm text-[#9ca3af] line-clamp-2"
                          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                        >
                          {post.excerpt}
                        </p>
                      )}
                      {post.publishedAt && (
                        <p
                          className="text-xs text-[#6b7280] mt-2 tracking-wider"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#6b7280] group-hover:text-[#f59e0b] transition-colors shrink-0 mt-1" />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center bg-[#111318] border-[#1f2330]">
              <p
                className="text-[#6b7280]"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                More essays coming soon. Check back later.
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}