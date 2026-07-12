import { Suspense, lazy, useMemo, useEffect, useState } from "react";
import { useParams, Redirect } from "wouter";
import { getBlogPost } from "@/blog/registry";
import { BlogPostLayout } from "@/components/layout/BlogPostLayout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-apple-blue prose-code:text-sm prose-code:bg-code-bg prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-terminal-bg prose-pre:text-terminal-text">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const staticPost = slug ? getBlogPost(slug) : undefined;
  const [dbPost, setDbPost] = useState<DbBlogPost | null>(null);
  const [dbLoading, setDbLoading] = useState(!staticPost);
  const [dbNotFound, setDbNotFound] = useState(false);

  useEffect(() => {
    if (staticPost) {
      document.title = `${staticPost.title} — johnnyclem.dev`;
      return () => { document.title = "johnnyclem.dev"; };
    }

    if (!slug) return;

    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    fetch(`${base}/api/blog-posts/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data: DbBlogPost) => {
        if (!data.published) {
          setDbNotFound(true);
        } else {
          setDbPost(data);
          document.title = `${data.title} — johnnyclem.dev`;
        }
      })
      .catch(() => setDbNotFound(true))
      .finally(() => setDbLoading(false));

    return () => { document.title = "johnnyclem.dev"; };
  }, [slug, staticPost]);

  const PostContent = useMemo(() => {
    if (!staticPost) return null;
    return lazy(staticPost.component);
  }, [staticPost]);

  if (staticPost && PostContent) {
    if (staticPost.fullPage) {
      return (
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#06070a]">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-[#1a1e2e] rounded w-48" />
                <div className="h-4 bg-[#1a1e2e] rounded w-32" />
              </div>
            </div>
          }
        >
          <PostContent />
        </Suspense>
      );
    }
    return (
      <BlogPostLayout post={staticPost}>
        <Suspense
          fallback={
            <div className="animate-pulse space-y-4 py-8">
              <div className="h-4 bg-code-bg rounded w-3/4" />
              <div className="h-4 bg-code-bg rounded w-1/2" />
              <div className="h-4 bg-code-bg rounded w-2/3" />
            </div>
          }
        >
          <PostContent />
        </Suspense>
      </BlogPostLayout>
    );
  }

  if (dbLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-code-bg rounded w-48" />
          <div className="h-4 bg-code-bg rounded w-32" />
        </div>
      </div>
    );
  }

  if (dbNotFound || !dbPost) {
    return <Redirect to="/blog" />;
  }

  const layoutPost = {
    slug: dbPost.slug,
    title: dbPost.title,
    description: dbPost.description,
    date: dbPost.date,
    readTime: dbPost.readTime,
    tags: dbPost.tags,
    component: () => Promise.resolve({ default: () => null }),
  };

  return (
    <BlogPostLayout post={layoutPost}>
      <MarkdownContent content={dbPost.content} />
    </BlogPostLayout>
  );
}
