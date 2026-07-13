import { useEffect, type ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    fetch(`${base}/api/theme-settings`)
      .then(async (res) => {
        if (!res.ok) return;
        return res.json();
      })
      .then((data) => {
        if (!data || !data.id) return;

        const root = document.documentElement;

        if (data.fontSans) root.style.setProperty("--font-sans", data.fontSans);
        if (data.fontDisplay) root.style.setProperty("--font-display", data.fontDisplay);
        if (data.fontMono) root.style.setProperty("--font-mono", data.fontMono);
        if (data.accentColor) {
          root.style.setProperty("--color-apple-blue", data.accentColor);
          root.style.setProperty("--color-apple-blue-hover", data.accentColor);
        }
        if (data.backgroundColor) root.style.setProperty("--color-body-bg", data.backgroundColor);
        if (data.textColor) root.style.setProperty("--color-text-primary", data.textColor);
        if (data.textSecondaryColor) root.style.setProperty("--color-text-secondary", data.textSecondaryColor);
        if (data.borderColor) root.style.setProperty("--color-border", data.borderColor);
      })
      .catch(() => {});
  }, []);

  return <>{children}</>;
}
