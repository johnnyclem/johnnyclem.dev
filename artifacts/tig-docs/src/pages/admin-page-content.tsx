import { useState, useEffect } from "react";
import { getAuthHeaders } from "@/lib/admin-auth";
import { posts as postsRegistry } from "@/posts/registry";
import { blogPosts as blogRegistry } from "@/blog/registry";
import { Check, Pencil, X } from "lucide-react";

interface PageItemOverride {
  id: number;
  registryType: string;
  slug: string;
  title: string | null;
  description: string | null;
  subtitle: string | null;
  date: string | null;
  category: string | null;
  coverGradient: string | null;
  coverIcon: string | null;
  tags: string[] | null;
  role: string | null;
  period: string | null;
  gradient: string | null;
  icon: string | null;
}

interface RegistryItem {
  registryType: string;
  slug: string;
  title: string;
  description: string;
  date?: string;
  category?: string;
  subtitle?: string;
  coverGradient?: string;
  coverIcon?: string;
  tags?: string[];
}

export default function AdminPageContent() {
  const [overrides, setOverrides] = useState<PageItemOverride[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [activeRegistry, setActiveRegistry] = useState<"posts" | "blog">("posts");

  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  const fetchOverrides = async () => {
    try {
      const res = await fetch(`${base}/api/page-item-overrides`);
      const data = await res.json();
      setOverrides(data);
    } catch {
      console.error("Failed to fetch overrides");
    }
  };

  useEffect(() => {
    fetchOverrides();
  }, []);

  const items: RegistryItem[] =
    activeRegistry === "posts"
      ? postsRegistry.map((p) => ({
          registryType: "posts",
          slug: p.slug,
          title: p.title,
          description: p.description,
          date: p.date,
          category: p.category,
          subtitle: p.subtitle,
          coverGradient: p.coverGradient,
          coverIcon: p.coverIcon,
        }))
      : blogRegistry.map((p) => ({
          registryType: "blog",
          slug: p.slug,
          title: p.title,
          description: p.description,
          date: p.date,
          tags: p.tags,
        }));

  const getOverride = (registryType: string, slug: string) =>
    overrides.find((o) => o.registryType === registryType && o.slug === slug);

  const startEdit = (item: RegistryItem) => {
    const key = `${item.registryType}:${item.slug}`;
    const override = getOverride(item.registryType, item.slug);
    const fields: Record<string, string> = {
      title: override?.title ?? item.title,
      description: override?.description ?? item.description,
    };
    if (item.date !== undefined) fields.date = override?.date ?? item.date ?? "";
    if (item.category !== undefined) fields.category = override?.category ?? item.category ?? "";
    if (item.subtitle !== undefined) fields.subtitle = override?.subtitle ?? item.subtitle ?? "";
    if (item.coverGradient !== undefined) fields.coverGradient = override?.coverGradient ?? item.coverGradient ?? "";
    if (item.coverIcon !== undefined) fields.coverIcon = override?.coverIcon ?? item.coverIcon ?? "";
    if (item.tags !== undefined) fields.tags = (override?.tags ?? item.tags ?? []).join(", ");

    setEditingKey(key);
    setEditForm(fields);
  };

  const handleSave = async (item: RegistryItem) => {
    setSaving(true);
    try {
      const body: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(editForm)) {
        if (k === "tags") {
          body[k] = v.split(",").map((t) => t.trim()).filter(Boolean);
        } else {
          body[k] = v || null;
        }
      }

      await fetch(`${base}/api/page-item-overrides/${item.registryType}/${item.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      });

      await fetchOverrides();
      setEditingKey(null);
    } catch {
      console.error("Failed to save override");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Page Content</h2>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveRegistry("posts")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeRegistry === "posts"
              ? "bg-apple-blue text-white"
              : "text-text-secondary bg-[#f5f5f7] hover:bg-[#e8e8ed]"
          }`}
        >
          Documentation Posts ({postsRegistry.length})
        </button>
        <button
          onClick={() => setActiveRegistry("blog")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeRegistry === "blog"
              ? "bg-apple-blue text-white"
              : "text-text-secondary bg-[#f5f5f7] hover:bg-[#e8e8ed]"
          }`}
        >
          Blog Posts ({blogRegistry.length})
        </button>
      </div>

      <p className="text-sm text-text-tertiary mb-4">
        Edit metadata for existing content. Changes are stored in the database and merged with static defaults at render time.
      </p>

      <div className="space-y-3">
        {items.map((item) => {
          const key = `${item.registryType}:${item.slug}`;
          const override = getOverride(item.registryType, item.slug);
          const isEditing = editingKey === key;

          return (
            <div
              key={key}
              className="rounded-xl border border-border p-4 hover:bg-[#fafafa] transition-colors"
            >
              {isEditing ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-tertiary font-mono">{item.slug}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(item)}
                        disabled={saving}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingKey(null)}
                        className="p-1.5 text-text-tertiary hover:bg-[#f5f5f7] rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {Object.entries(editForm).map(([field, value]) => (
                    <div key={field}>
                      <label className="block text-xs font-medium text-text-tertiary mb-1 capitalize">
                        {field}
                      </label>
                      {field === "description" ? (
                        <textarea
                          value={value}
                          onChange={(e) => setEditForm((p) => ({ ...p, [field]: e.target.value }))}
                          rows={2}
                          className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-apple-blue/30 resize-none"
                        />
                      ) : (
                        <input
                          value={value}
                          onChange={(e) => setEditForm((p) => ({ ...p, [field]: e.target.value }))}
                          className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-apple-blue/30"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-text-primary">{override?.title ?? item.title}</h3>
                      {override && (
                        <span className="text-[10px] text-apple-blue bg-apple-blue/8 px-1.5 py-0.5 rounded">
                          Modified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-tertiary truncate">
                      {override?.description ?? item.description}
                    </p>
                    <span className="text-xs text-text-tertiary font-mono">{item.slug}</span>
                  </div>
                  <button
                    onClick={() => startEdit(item)}
                    className="p-2 text-text-tertiary hover:text-apple-blue hover:bg-apple-blue/10 rounded-lg transition-colors ml-4"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
