import { useState, useEffect } from "react";
import { getAuthHeaders } from "@/lib/admin-auth";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PostForm {
  title: string;
  slug: string;
  description: string;
  content: string;
  date: string;
  readTime: string;
  tags: string;
  published: boolean;
}

const emptyForm: PostForm = {
  title: "",
  slug: "",
  description: "",
  content: "",
  date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  readTime: "5 min read",
  tags: "",
  published: false,
};

export default function AdminBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<PostForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${base}/api/blog-posts`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setPosts(data);
    } catch {
      console.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const slugify = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: creating ? slugify(title) : prev.slug,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const body = {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      };

      if (editing) {
        const res = await fetch(`${base}/api/blog-posts/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify(body),
        });
        if (res.ok) {
          await fetchPosts();
          setEditing(null);
        }
      } else {
        const res = await fetch(`${base}/api/blog-posts`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify(body),
        });
        if (res.ok) {
          await fetchPosts();
          setCreating(false);
        }
      }
      setForm(emptyForm);
    } catch {
      console.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await fetch(`${base}/api/blog-posts/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      await fetchPosts();
    } catch {
      console.error("Failed to delete");
    }
  };

  const startEdit = (post: BlogPost) => {
    setEditing(post);
    setCreating(false);
    setForm({
      title: post.title,
      slug: post.slug,
      description: post.description,
      content: post.content,
      date: post.date,
      readTime: post.readTime,
      tags: post.tags.join(", "),
      published: post.published,
    });
  };

  const startCreate = () => {
    setCreating(true);
    setEditing(null);
    setForm(emptyForm);
  };

  const cancel = () => {
    setCreating(false);
    setEditing(null);
    setForm(emptyForm);
  };

  if (creating || editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">
            {editing ? "Edit Post" : "New Post"}
          </h2>
          <button onClick={cancel} className="text-sm text-text-tertiary hover:text-text-primary">
            Cancel
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Title</label>
            <input
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-apple-blue/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Slug</label>
            <input
              value={form.slug}
              onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-apple-blue/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-apple-blue/30 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Date</label>
              <input
                value={form.date}
                onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-apple-blue/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Read Time</label>
              <input
                value={form.readTime}
                onChange={(e) => setForm((p) => ({ ...p, readTime: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-apple-blue/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Tags (comma-separated)</label>
            <input
              value={form.tags}
              onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-apple-blue/30"
              placeholder="AI, Engineering, Design"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Content (Markdown)</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
              rows={16}
              className="w-full px-3 py-2 rounded-lg border border-border bg-white text-text-primary font-mono text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue/30 resize-y"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))}
                className="w-4 h-4 rounded border-border text-apple-blue focus:ring-apple-blue/30"
              />
              <span className="text-sm text-text-secondary">Published</span>
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving || !form.title || !form.slug}
              className="bg-apple-blue text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-apple-blue-hover transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : editing ? "Update Post" : "Create Post"}
            </button>
            <button
              onClick={cancel}
              className="px-6 py-2 rounded-lg font-medium text-sm text-text-secondary border border-border hover:bg-[#f5f5f7] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Blog Posts</h2>
        <button
          onClick={startCreate}
          className="flex items-center gap-2 bg-apple-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-apple-blue-hover transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-text-tertiary">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-tertiary mb-4">No blog posts yet</p>
          <button
            onClick={startCreate}
            className="text-apple-blue text-sm font-medium hover:underline"
          >
            Create your first post
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-[#fafafa] transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-text-primary truncate">{post.title}</h3>
                  {post.published ? (
                    <span className="flex items-center gap-1 text-[11px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      <Eye className="w-3 h-3" /> Published
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] text-text-tertiary bg-[#f5f5f7] px-2 py-0.5 rounded-full">
                      <EyeOff className="w-3 h-3" /> Draft
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-tertiary truncate">{post.description}</p>
                <div className="flex gap-2 mt-1">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[10px] text-apple-blue bg-apple-blue/8 px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => startEdit(post)}
                  className="p-2 text-text-tertiary hover:text-apple-blue hover:bg-apple-blue/10 rounded-lg transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 text-text-tertiary hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
