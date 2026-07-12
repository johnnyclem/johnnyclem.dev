import type { ReactNode } from "react";

const gh = {
  bg: "#fff",
  dark: "#0d1117",
  header: "#161b22",
  text: "#1f2328",
  text2: "#656d76",
  text3: "#8b949e",
  border: "#d0d7de",
  borderLight: "#e6eaef",
  link: "#0969da",
  green: "#1a7f37",
  greenBg: "#dafbe1",
  greenBorder: "#aceebb",
  purple: "#8250df",
  purpleBg: "#fbefff",
  orange: "#bc4c00",
  orangeBg: "#fff8c5",
  red: "#cf222e",
  codeBg: "#f6f8fa",
  codeDark: "#161b22",
};

export function GHHeader() {
  return (
    <div
      className="-mx-4 sm:-mx-6 lg:-mx-12 -mt-10 lg:-mt-12 reveal"
      style={{ background: gh.header, padding: "16px 24px", display: "flex", alignItems: "center", gap: 16 }}
    >
      <svg viewBox="0 0 16 16" width={32} height={32} fill="#fff">
        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
      </svg>
      <nav style={{ display: "flex", gap: 16, fontSize: 14, fontWeight: 500 }}>
        {["Product", "Solutions", "Open Source"].map((l) => (
          <a key={l} href="#" onClick={(e) => e.preventDefault()} style={{ color: "#fff", textDecoration: "none", opacity: 0.7 }}>
            {l}
          </a>
        ))}
        <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#fff", textDecoration: "none", opacity: 1 }}>
          Blog
        </a>
        <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#fff", textDecoration: "none", opacity: 0.7 }}>
          Pricing
        </a>
      </nav>
    </div>
  );
}

export function GHBanner({
  label,
  title,
  titleCode,
  subtitle,
}: {
  label: string;
  title?: string;
  titleCode?: string;
  subtitle: string;
}) {
  return (
    <div
      className="-mx-4 sm:-mx-6 lg:-mx-12 reveal"
      style={{
        background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2433 100%)",
        padding: "48px 24px",
        textAlign: "center",
        borderBottom: "1px solid #30363d",
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: gh.purple,
          textTransform: "uppercase",
          letterSpacing: 1,
          marginBottom: 12,
        }}
      >
        {label}
      </div>
      <h1
        style={{
          fontSize: 40,
          fontWeight: 800,
          color: "#fff",
          lineHeight: 1.2,
          maxWidth: 720,
          margin: "0 auto 16px",
          letterSpacing: -0.5,
          fontFamily: "inherit",
        }}
      >
        {title}
        {titleCode && (
          <code
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 36,
              background: "rgba(255,255,255,0.08)",
              padding: "2px 10px",
              borderRadius: 6,
              fontWeight: 600,
            }}
          >
            {titleCode}
          </code>
        )}
      </h1>
      <p style={{ fontSize: 18, color: gh.text3, maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>
        {subtitle}
      </p>
    </div>
  );
}

export function GHAuthorBar({
  avatar,
  name,
  date,
  readTime,
}: {
  avatar: string;
  name: string;
  date: string;
  readTime: string;
}) {
  return (
    <div className="reveal" style={{ maxWidth: 720, margin: "0 auto", padding: "24px 0 0", display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${gh.purple}, #c084fc)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          color: "#fff",
        }}
      >
        {avatar}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>
          <a href="#" onClick={(e) => e.preventDefault()} style={{ color: gh.text, textDecoration: "none" }}>
            {name}
          </a>
        </div>
        <div style={{ fontSize: 13, color: gh.text2 }}>
          {date} · {readTime}
        </div>
      </div>
    </div>
  );
}

export function GHArticle({ children }: { children: ReactNode }) {
  return (
    <div
      className="gh-article"
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "32px 0 80px",
        fontSize: 16,
        lineHeight: 1.7,
        color: gh.text,
      }}
    >
      <style>{`
        .gh-article p { margin-bottom: 16px; }
        .gh-article h2 {
          font-size: 24px; font-weight: 700; margin-top: 40px; margin-bottom: 16px;
          padding-bottom: 8px; border-bottom: 1px solid ${gh.borderLight}; letter-spacing: -0.2px;
        }
        .gh-article h3 { font-size: 20px; font-weight: 600; margin-top: 32px; margin-bottom: 12px; }
        .gh-article a { color: ${gh.link}; text-decoration: none; }
        .gh-article a:hover { text-decoration: underline; }
        .gh-article ul, .gh-article ol { margin-bottom: 16px; padding-left: 24px; }
        .gh-article li { margin-bottom: 6px; line-height: 1.6; }
        .gh-article > code, .gh-article p code, .gh-article li code, .gh-article td code, .gh-article blockquote code {
          font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.88em;
          background: ${gh.codeBg}; padding: 2px 6px; border-radius: 4px;
        }
        .gh-article blockquote {
          margin: 20px 0; padding: 4px 0 4px 20px;
          border-left: 3px solid ${gh.border}; color: ${gh.text2};
        }
        .gh-article blockquote p { color: ${gh.text2}; }
      `}</style>
      {children}
    </div>
  );
}

export function GHCodeBlock({
  header,
  headerRight,
  children,
}: {
  header: string;
  headerRight?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="reveal"
      style={{
        margin: "20px 0 24px",
        borderRadius: 8,
        overflow: "hidden",
        border: `1px solid ${gh.border}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 16px",
          background: gh.codeBg,
          borderBottom: `1px solid ${gh.border}`,
          fontSize: 12,
          fontWeight: 500,
          color: gh.text2,
        }}
      >
        <span>{header}</span>
        {headerRight && (
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>{headerRight}</span>
        )}
      </div>
      <div
        style={{
          background: gh.codeDark,
          padding: "16px 20px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13.5,
          lineHeight: 1.6,
          color: "#e6edf3",
          overflowX: "auto",
          whiteSpace: "pre",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function CB({ type, children }: { type: "cmt" | "str" | "kw" | "fn" | "flag" | "out" | "err" | "dim"; children: ReactNode }) {
  const colors: Record<string, string> = {
    cmt: "#8b949e",
    str: "#a5d6ff",
    kw: "#ff7b72",
    fn: "#d2a8ff",
    flag: "#79c0ff",
    out: "#7ee787",
    err: "#ffa657",
    dim: "#484f58",
  };
  return <span style={{ color: colors[type], fontStyle: type === "cmt" ? "italic" : undefined }}>{children}</span>;
}

export function GHCallout({
  type,
  label,
  icon,
  children,
}: {
  type: "note" | "warning" | "tip";
  label: string;
  icon: string;
  children: ReactNode;
}) {
  const styles: Record<string, { bg: string; border: string; labelColor: string }> = {
    note: { bg: "#ddf4ff", border: "#54aeff", labelColor: "#0969da" },
    warning: { bg: gh.orangeBg, border: gh.orange, labelColor: gh.orange },
    tip: { bg: gh.greenBg, border: gh.green, labelColor: gh.green },
  };
  const s = styles[type];
  return (
    <div
      className="reveal"
      style={{
        margin: "24px 0",
        padding: "16px 20px",
        borderRadius: 8,
        borderLeft: `4px solid ${s.border}`,
        background: s.bg,
        fontSize: 14,
        lineHeight: 1.6,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, display: "flex", alignItems: "center", gap: 6, color: s.labelColor }}>
        {icon} {label}
      </div>
      <div style={{ marginBottom: 0 }}>{children}</div>
    </div>
  );
}

export function GHTable({ children }: { children: ReactNode }) {
  return (
    <div className="reveal" style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          margin: "20px 0",
          fontSize: 14,
        }}
      >
        {children}
      </table>
      <style>{`
        .gh-article th {
          text-align: left; font-weight: 600; padding: 10px 12px;
          border-bottom: 2px solid ${gh.border}; background: ${gh.codeBg}; font-size: 13px;
        }
        .gh-article td {
          padding: 10px 12px; border-bottom: 1px solid ${gh.borderLight};
          vertical-align: top; line-height: 1.5;
        }
      `}</style>
    </div>
  );
}

export function GHTags({ tags }: { tags: string[] }) {
  return (
    <div
      className="reveal"
      style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        margin: "32px 0 0",
        paddingTop: 20,
        borderTop: `1px solid ${gh.borderLight}`,
      }}
    >
      {tags.map((t) => (
        <a
          key={t}
          href="#"
          onClick={(e) => e.preventDefault()}
          style={{
            fontSize: 12,
            fontWeight: 500,
            padding: "4px 12px",
            borderRadius: 20,
            background: gh.purpleBg,
            color: gh.purple,
            textDecoration: "none",
          }}
        >
          {t}
        </a>
      ))}
    </div>
  );
}

export function GHFooter() {
  return (
    <div
      className="-mx-4 sm:-mx-6 lg:-mx-12 reveal"
      style={{
        background: gh.dark,
        padding: "40px 24px",
        textAlign: "center",
        fontSize: 12,
        color: gh.text3,
        lineHeight: 1.8,
        marginTop: 40,
      }}
    >
      <p style={{ fontWeight: 700, marginBottom: 0 }}>The GitHub Blog</p>
      <p style={{ marginTop: 8, marginBottom: 0 }}>
        {["Product", "Engineering", "Enterprise", "Community", "Changelog"].map((l, i) => (
          <span key={l}>
            {i > 0 && " · "}
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: gh.text3, textDecoration: "none" }}>
              {l}
            </a>
          </span>
        ))}
      </p>
      <p style={{ marginTop: 16, marginBottom: 0 }}>&copy; 2026 GitHub, Inc.</p>
      <p style={{ marginTop: 4, fontSize: 11, color: "#484f58", marginBottom: 0 }}>
        This blog post was written by a human. The feature it describes was not. The feature was written by an AI,
        reviewed by a human who skimmed it, and shipped with{" "}
        <code
          style={{
            color: "#8b949e",
            background: "rgba(255,255,255,0.05)",
            padding: "1px 5px",
            borderRadius: 3,
            fontSize: 11,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          --pray=manifest
        </code>
        .
      </p>
    </div>
  );
}
