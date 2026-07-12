import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { getAdminToken, setAdminToken, clearAdminToken } from "@/lib/admin-auth";
import AdminBlogPosts from "./admin-blog-posts";
import AdminPageContent from "./admin-page-content";
import AdminThemeSettings from "./admin-theme-settings";
import { FileText, Layout, Palette, LogOut } from "lucide-react";

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const base = import.meta.env.BASE_URL.replace(/\/$/, "");
      const response = await fetch(`${base}/api/admin/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
      });

      if (response.ok) {
        setAdminToken(password);
        onLogin();
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Admin Login</h1>
        <p className="text-text-secondary text-sm mb-6">
          Enter the admin password to continue.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-apple-blue/30 focus:border-apple-blue mb-4"
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-apple-blue text-white py-3 rounded-lg font-medium hover:bg-apple-blue-hover transition-colors disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

const tabs = [
  { id: "blog", label: "Blog Posts", icon: FileText },
  { id: "content", label: "Page Content", icon: Layout },
  { id: "theme", label: "Theme Settings", icon: Palette },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("blog");
  const [, setLocation] = useLocation();

  useEffect(() => {
    document.title = "Admin — johnnyclem.dev";
    const token = getAdminToken();
    if (token) {
      const base = import.meta.env.BASE_URL.replace(/\/$/, "");
      fetch(`${base}/api/admin/verify`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (res.ok) setAuthenticated(true);
          else clearAdminToken();
        })
        .catch(() => clearAdminToken());
    }
  }, []);

  if (!authenticated) {
    return <LoginForm onLogin={() => setAuthenticated(true)} />;
  }

  const handleLogout = () => {
    clearAdminToken();
    setAuthenticated(false);
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <header className="bg-white border-b border-border px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-text-tertiary hover:text-text-primary transition-colors no-underline">
            &larr; Back to site
          </Link>
          <h1 className="text-lg font-semibold text-text-primary">Admin</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-text-tertiary hover:text-red-500 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-2 mb-6 bg-white rounded-xl p-1.5 shadow-sm border border-border">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-apple-blue text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary hover:bg-[#f5f5f7]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
          {activeTab === "blog" && <AdminBlogPosts />}
          {activeTab === "content" && <AdminPageContent />}
          {activeTab === "theme" && <AdminThemeSettings />}
        </div>
      </div>
    </div>
  );
}
