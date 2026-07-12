import type { ReactNode } from "react";

const serif = "'Newsreader', Georgia, serif";
const sans = "'Inter', sans-serif";
const mono = "'JetBrains Mono', monospace";

const colors = {
  bg: "#fff",
  bgWarm: "#faf8f4",
  bgAlt: "#f7f5f0",
  text: "#111",
  text2: "#444",
  text3: "#888",
  text4: "#bbb",
  accent: "#d35400",
  accentSoft: "#fdf0e6",
  accentBorder: "#e8c3a0",
  blue: "#2471a3",
  blueSoft: "#eaf2f8",
  border: "#e5e0d8",
  borderLight: "#f0ece5",
};

export function EssayCover({
  brand,
  title,
  subtitle,
  author,
}: {
  brand: string;
  title: string;
  subtitle: string;
  author: string;
}) {
  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-12 -mt-10 lg:-mt-12 mb-0">
      <section className="text-center py-20 px-6" style={{ background: colors.bgWarm, borderBottom: `1px solid ${colors.border}` }}>
        <div className="mb-4" style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: colors.accent }}>
          A Book by {brand}
        </div>
        <h1 className="mx-auto mb-3" style={{ fontFamily: serif, fontSize: 52, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1, maxWidth: 600 }}>
          {title}
        </h1>
        <p className="mx-auto mb-6" style={{ fontFamily: serif, fontSize: 22, fontWeight: 300, color: colors.text2, fontStyle: "italic", lineHeight: 1.5, maxWidth: 500 }}>
          {subtitle}
        </p>
        <p className="mb-8" style={{ fontFamily: sans, fontSize: 14, color: colors.text3, fontWeight: 500 }}>
          by {author}
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <a href="#foreword" className="inline-block no-underline" style={{ padding: "12px 32px", background: colors.accent, color: "#fff", fontFamily: sans, fontSize: 14, fontWeight: 600, borderRadius: 6 }}>
            Start reading &darr;
          </a>
          <button type="button" className="inline-block" style={{ padding: "12px 32px", fontFamily: sans, fontSize: 14, fontWeight: 500, borderRadius: 6, border: `1px solid ${colors.border}`, color: colors.text2, background: "transparent", cursor: "pointer" }}>
            Buy the letterpress edition
          </button>
        </div>
      </section>
    </div>
  );
}

export function EssayTOC({ children }: { children: ReactNode }) {
  return (
    <div className="py-12 reveal" style={{ borderBottom: `1px solid ${colors.border}` }}>
      {children}
    </div>
  );
}

export function TOCPart({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-8">
      <div className="mb-3" style={{ fontFamily: sans, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: colors.text3 }}>
        {label}
      </div>
      {children}
    </div>
  );
}

export function TOCItem({ label, name, href }: { label: string; name: string; href: string }) {
  return (
    <a href={href} className="flex items-baseline gap-3 py-2 no-underline transition-colors" style={{ borderBottom: `1px solid ${colors.borderLight}`, color: colors.text }}>
      <span className="flex-shrink-0" style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: colors.text4, minWidth: 70 }}>
        {label}
      </span>
      <span style={{ fontFamily: serif, fontSize: 20, fontWeight: 500 }}>{name}</span>
    </a>
  );
}

export function EssayChapter({ label, title, id }: { label: string; title: string; id: string }) {
  return (
    <div id={id} className="mt-16 mb-8 reveal">
      <div className="mb-2" style={{ fontFamily: sans, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: colors.accent }}>
        {label}
      </div>
      <h2 className="mb-0" style={{ fontFamily: serif, fontSize: 40, fontWeight: 700, lineHeight: 1.15, letterSpacing: -0.5 }}>
        {title}
      </h2>
    </div>
  );
}

export function EP({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5" style={{ fontFamily: serif, fontSize: 18, lineHeight: 1.8, color: "#111" }}>
      {children}
    </p>
  );
}

export function EssayH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-12 mb-4" style={{ fontFamily: serif, fontSize: 28, fontWeight: 600, letterSpacing: -0.3 }}>
      {children}
    </h2>
  );
}

export function EssayH3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-9 mb-3" style={{ fontFamily: sans, fontSize: 16, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: colors.text2 }}>
      {children}
    </h3>
  );
}

export function EssayQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-7 reveal" style={{ padding: "20px 24px", fontFamily: serif, fontSize: 22, fontWeight: 500, fontStyle: "italic", lineHeight: 1.5, borderLeft: `3px solid ${colors.accent}`, color: colors.text, letterSpacing: -0.2 }}>
      {children}
    </blockquote>
  );
}

export function EssayNote({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="my-7 reveal" style={{ padding: "20px 24px", background: colors.accentSoft, border: `1px solid ${colors.accentBorder}`, borderRadius: 8, fontSize: 16, lineHeight: 1.7 }}>
      <div className="mb-1.5" style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: colors.accent }}>
        {label}
      </div>
      {children}
    </div>
  );
}

export function EssayInfo({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="my-7 reveal" style={{ padding: "20px 24px", background: colors.blueSoft, border: "1px solid #c5d9ea", borderRadius: 8, fontSize: 16, lineHeight: 1.7 }}>
      <div className="mb-1.5" style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: colors.blue }}>
        {label}
      </div>
      {children}
    </div>
  );
}

export function EssayList({ ordered, children }: { ordered?: boolean; children: ReactNode }) {
  const Tag = ordered ? "ol" : "ul";
  return <Tag className="mb-5 pl-6" style={{ fontFamily: serif }}>{children}</Tag>;
}

export function EssayLI({ children }: { children: ReactNode }) {
  return <li className="mb-2" style={{ fontSize: 18, lineHeight: 1.7 }}>{children}</li>;
}

export function FlowDiagram({ children, caption }: { children: ReactNode; caption?: string }) {
  return (
    <div className="my-7 text-center reveal" style={{ padding: "32px 24px", background: colors.bgAlt, border: `1px solid ${colors.border}`, borderRadius: 10, fontFamily: sans, fontSize: 13, color: colors.text2, lineHeight: 2.4 }}>
      {children}
      {caption && <div className="mt-2" style={{ fontSize: 12, color: colors.text3, fontStyle: "italic" }}>{caption}</div>}
    </div>
  );
}

export function FlowBox({ children, primary, struck, dark }: { children: ReactNode; primary?: boolean; struck?: boolean; dark?: boolean }) {
  let bg = colors.bg;
  let color = colors.text;
  let border = colors.border;
  if (primary) { bg = colors.accent; color = "#fff"; border = colors.accent; }
  if (dark) { bg = "#2c3e50"; color = "#ecf0f1"; border = "#2c3e50"; }
  return (
    <span className="inline-block mx-1" style={{ padding: "8px 18px", background: bg, border: `1px solid ${border}`, borderRadius: 6, fontWeight: primary ? 700 : 500, color, textDecoration: struck ? "line-through" : "none", opacity: struck ? 0.5 : 1 }}>
      {children}
    </span>
  );
}

export function FlowArrow() {
  return <span className="mx-1.5" style={{ color: colors.text4 }}>&rarr;</span>;
}

export function FlowDown() {
  return <><br /><span style={{ color: colors.text4 }}>&darr;</span><br /></>;
}

export function GlossaryTable({ rows }: { rows: { term: string; definition: ReactNode }[] }) {
  return (
    <div className="overflow-x-auto my-5 reveal">
      <table className="w-full" style={{ borderCollapse: "collapse", fontSize: 16 }}>
        <thead>
          <tr>
            <th className="text-left" style={{ fontFamily: sans, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, padding: "10px 14px", borderBottom: `2px solid ${colors.border}`, color: colors.text3 }}>Term</th>
            <th className="text-left" style={{ fontFamily: sans, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, padding: "10px 14px", borderBottom: `2px solid ${colors.border}`, color: colors.text3 }}>Definition</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={{ padding: "12px 14px", borderBottom: `1px solid ${colors.borderLight}`, verticalAlign: "top", fontWeight: 600, whiteSpace: "nowrap", width: 200, fontFamily: sans, fontSize: 14 }}>{r.term}</td>
              <td style={{ padding: "12px 14px", borderBottom: `1px solid ${colors.borderLight}`, verticalAlign: "top", lineHeight: 1.6, fontFamily: serif }}>{r.definition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ConventionTable({ rows }: { rows: { quarter: string; activity: ReactNode; shipped: ReactNode }[] }) {
  return (
    <div className="overflow-x-auto my-5 reveal">
      <table className="w-full" style={{ borderCollapse: "collapse", fontSize: 16 }}>
        <thead>
          <tr>
            {["Quarter", "Convention Activity", "Software Shipped"].map((h) => (
              <th key={h} className="text-left" style={{ fontFamily: sans, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, padding: "10px 14px", borderBottom: `2px solid ${colors.border}`, color: colors.text3 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={{ padding: "12px 14px", borderBottom: `1px solid ${colors.borderLight}`, verticalAlign: "top", fontWeight: 700, fontFamily: sans, fontSize: 14 }}>{r.quarter}</td>
              <td style={{ padding: "12px 14px", borderBottom: `1px solid ${colors.borderLight}`, verticalAlign: "top", lineHeight: 1.6, fontFamily: serif }}>{r.activity}</td>
              <td style={{ padding: "12px 14px", borderBottom: `1px solid ${colors.borderLight}`, verticalAlign: "top", lineHeight: 1.6, fontFamily: serif }}>{r.shipped}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EssayCode({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 reveal" style={{ padding: 20, background: "#1a1a2e", borderRadius: 8, fontFamily: mono, fontSize: 13, lineHeight: 1.6, color: "#e2e8f0", overflowX: "auto", whiteSpace: "pre" }}>
      {children}
    </div>
  );
}

export function CK({ children }: { children: ReactNode }) {
  return <span style={{ color: "#cba6f7" }}>{children}</span>;
}
export function CS({ children }: { children: ReactNode }) {
  return <span style={{ color: "#a6e3a1" }}>{children}</span>;
}
export function CC({ children }: { children: ReactNode }) {
  return <span style={{ color: "#6c7086", fontStyle: "italic" }}>{children}</span>;
}
export function CF({ children }: { children: ReactNode }) {
  return <span style={{ color: "#89b4fa" }}>{children}</span>;
}

export function EssayFooter({ children }: { children: ReactNode }) {
  return (
    <div className="mt-10 pt-6 reveal" style={{ borderTop: `1px solid ${colors.border}`, fontFamily: sans, fontSize: 12, color: colors.text4, lineHeight: 1.7 }}>
      {children}
    </div>
  );
}

export function EssayAttribution({ name, detail }: { name: string; detail: string }) {
  return (
    <p className="mt-8" style={{ fontFamily: sans, fontSize: 14, color: colors.text3 }}>
      &mdash; {name}<br />{detail}
    </p>
  );
}

export function HillChart() {
  return (
    <FlowDiagram caption="Fig. 2 — A healthy hill chart. Three scopes are downhill (green). One is stuck at the top (blue). One hasn't started (orange). This is the hill chart of a team that is both making progress and quietly panicking about one scope, which is accurate.">
      <div className="mb-3" style={{ fontSize: 16, fontWeight: 600, color: colors.text }}>The Hill Chart</div>
      <div className="mb-1" style={{ fontFamily: serif, fontStyle: "italic", fontSize: 15, color: colors.text2 }}>
        &larr; Figuring things out &nbsp;&nbsp;|&nbsp;&nbsp; Making it happen &rarr;
      </div>
      <div style={{ fontSize: 40, letterSpacing: -2, lineHeight: 1.2, margin: "8px 0" }}>
        <span style={{ color: colors.accent }}>&bull;</span>
        <span style={{ color: colors.text4 }}>&middot;</span>
        <span style={{ color: colors.blue }}>&bull;</span>
        <span style={{ color: colors.text4 }}>&middot;</span>
        <span>/\</span>
        <span style={{ color: colors.text4 }}>&middot;</span>
        <span style={{ color: "#1e8449" }}>&bull;</span>
        <span style={{ color: colors.text4 }}>&middot;</span>
        <span style={{ color: "#1e8449" }}>&bull;</span>
        <span style={{ color: "#1e8449" }}>&bull;</span>
      </div>
    </FlowDiagram>
  );
}
