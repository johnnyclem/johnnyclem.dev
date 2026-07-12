import { useState, useEffect } from "react";
import { getAuthHeaders } from "@/lib/admin-auth";
import { RotateCcw } from "lucide-react";

interface ThemeSettings {
  fontSans: string | null;
  fontDisplay: string | null;
  fontMono: string | null;
  accentColor: string | null;
  backgroundColor: string | null;
  textColor: string | null;
  textSecondaryColor: string | null;
  borderColor: string | null;
}

const defaults: ThemeSettings = {
  fontSans: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Inter", sans-serif',
  fontDisplay: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif',
  fontMono: '"JetBrains Mono", "SF Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  accentColor: "#0071e3",
  backgroundColor: "#ffffff",
  textColor: "#1d1d1f",
  textSecondaryColor: "#6e6e73",
  borderColor: "#d2d2d7",
};

const fontOptions = [
  { label: "System Default (SF Pro / Inter)", value: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Inter", sans-serif' },
  { label: "Inter", value: '"Inter", sans-serif' },
  { label: "Georgia (Serif)", value: 'Georgia, "Times New Roman", serif' },
  { label: "Helvetica Neue", value: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
];

const monoFontOptions = [
  { label: "JetBrains Mono", value: '"JetBrains Mono", "SF Mono", ui-monospace, monospace' },
  { label: "SF Mono", value: '"SF Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, monospace' },
  { label: "Fira Code", value: '"Fira Code", "JetBrains Mono", monospace' },
];

export default function AdminThemeSettings() {
  const [settings, setSettings] = useState<ThemeSettings>(defaults);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${base}/api/theme-settings`);
        const data = await res.json();
        if (data && data.id) {
          setSettings({
            fontSans: data.fontSans ?? defaults.fontSans,
            fontDisplay: data.fontDisplay ?? defaults.fontDisplay,
            fontMono: data.fontMono ?? defaults.fontMono,
            accentColor: data.accentColor ?? defaults.accentColor,
            backgroundColor: data.backgroundColor ?? defaults.backgroundColor,
            textColor: data.textColor ?? defaults.textColor,
            textSecondaryColor: data.textSecondaryColor ?? defaults.textSecondaryColor,
            borderColor: data.borderColor ?? defaults.borderColor,
          });
        }
      } catch {
        console.error("Failed to fetch theme settings");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch(`${base}/api/theme-settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch {
      console.error("Failed to save theme settings");
    } finally {
      setSaving(false);
    }
  };

  const resetToDefaults = () => {
    setSettings(defaults);
  };

  if (loading) {
    return <div className="text-center py-12 text-text-tertiary">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Theme Settings</h2>
        <button
          onClick={resetToDefaults}
          className="flex items-center gap-2 text-sm text-text-tertiary hover:text-text-primary transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Defaults
        </button>
      </div>

      <div className="space-y-8">
        <section>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Typography</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Primary Font</label>
              <select
                value={settings.fontSans ?? ""}
                onChange={(e) => setSettings((p) => ({ ...p, fontSans: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-apple-blue/30"
              >
                {fontOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Heading Font</label>
              <select
                value={settings.fontDisplay ?? ""}
                onChange={(e) => setSettings((p) => ({ ...p, fontDisplay: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-apple-blue/30"
              >
                {fontOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Monospace Font</label>
              <select
                value={settings.fontMono ?? ""}
                onChange={(e) => setSettings((p) => ({ ...p, fontMono: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-apple-blue/30"
              >
                {monoFontOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Colors</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: "accentColor" as const, label: "Accent Color" },
              { key: "backgroundColor" as const, label: "Background Color" },
              { key: "textColor" as const, label: "Text Color" },
              { key: "textSecondaryColor" as const, label: "Secondary Text" },
              { key: "borderColor" as const, label: "Border Color" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-text-secondary mb-1">{label}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings[key] ?? "#000000"}
                    onChange={(e) => setSettings((p) => ({ ...p, [key]: e.target.value }))}
                    className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings[key] ?? ""}
                    onChange={(e) => setSettings((p) => ({ ...p, [key]: e.target.value }))}
                    className="flex-1 px-3 py-2 rounded-lg border border-border bg-white text-sm text-text-primary font-mono focus:outline-none focus:ring-2 focus:ring-apple-blue/30"
                    placeholder="#000000"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Preview</h3>
          <div
            className="rounded-xl border p-6"
            style={{
              backgroundColor: settings.backgroundColor ?? "#ffffff",
              borderColor: settings.borderColor ?? "#d2d2d7",
              color: settings.textColor ?? "#1d1d1f",
              fontFamily: settings.fontSans ?? undefined,
            }}
          >
            <h4
              className="text-xl font-bold mb-2"
              style={{ fontFamily: settings.fontDisplay ?? undefined }}
            >
              Preview Heading
            </h4>
            <p style={{ color: settings.textSecondaryColor ?? "#6e6e73" }} className="text-sm mb-3">
              This is how your secondary text will look with the current theme.
            </p>
            <code
              className="text-sm px-2 py-1 rounded"
              style={{
                fontFamily: settings.fontMono ?? undefined,
                backgroundColor: `${settings.accentColor ?? "#0071e3"}15`,
                color: settings.accentColor ?? "#0071e3",
              }}
            >
              code example
            </code>
          </div>
        </section>

        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-apple-blue text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-apple-blue-hover transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Theme"}
          </button>
          {saved && (
            <span className="text-sm text-green-600">Theme saved! Refresh the site to see changes.</span>
          )}
        </div>
      </div>
    </div>
  );
}
