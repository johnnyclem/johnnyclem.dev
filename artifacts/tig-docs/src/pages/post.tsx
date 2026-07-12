import { Suspense, lazy, useMemo, useEffect, useState } from "react";
import { useParams, Redirect } from "wouter";
import { getPost, type PostMeta } from "@/posts/registry";
import { PostLayout } from "@/components/layout/PostLayout";

interface PageItemOverride {
  title: string | null;
  description: string | null;
  subtitle: string | null;
  date: string | null;
  category: string | null;
  coverGradient: string | null;
  coverIcon: string | null;
}

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;
  const [override, setOverride] = useState<PageItemOverride | null>(null);

  useEffect(() => {
    if (!slug) return;
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    fetch(`${base}/api/page-item-overrides?registryType=posts`)
      .then((res) => res.json())
      .then((data: Array<PageItemOverride & { slug: string }>) => {
        const match = data.find((o) => o.slug === slug);
        if (match) setOverride(match);
      })
      .catch(() => {});
  }, [slug]);

  const mergedPost: PostMeta | undefined = useMemo(() => {
    if (!post) return undefined;
    if (!override) return post;
    return {
      ...post,
      title: override.title ?? post.title,
      description: override.description ?? post.description,
      subtitle: override.subtitle ?? post.subtitle,
      date: override.date ?? post.date,
      category: override.category ?? post.category,
      coverGradient: override.coverGradient ?? post.coverGradient,
      coverIcon: override.coverIcon ?? post.coverIcon,
    };
  }, [post, override]);

  useEffect(() => {
    if (mergedPost) {
      document.title = `${mergedPost.title} — johnnyclem.dev`;
    }
    return () => {
      document.title = "johnnyclem.dev";
    };
  }, [mergedPost]);

  const PostContent = useMemo(() => {
    if (!post) return null;
    return lazy(post.component);
  }, [post]);

  if (!post || !PostContent) {
    return <Redirect to="/" />;
  }

  return (
    <PostLayout post={mergedPost!}>
      <Suspense
        fallback={
          <div className="animate-pulse space-y-4 py-8">
            <div className="h-8 bg-code-bg rounded w-2/3" />
            <div className="h-4 bg-code-bg rounded w-1/2" />
            <div className="h-4 bg-code-bg rounded w-3/4" />
          </div>
        }
      >
        <PostContent />
      </Suspense>
    </PostLayout>
  );
}
