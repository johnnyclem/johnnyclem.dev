import type { ReactNode } from "react";

const verdana = "Verdana, Geneva, sans-serif";
const mono = "Menlo, Consolas, monospace";

const c = {
  bg: "#f9f9f7",
  text: "#4a525a",
  title: "#333",
  link: "#0066cc",
  muted: "#999",
  muted2: "#888",
  muted3: "#bbb",
  muted4: "#ccc",
  border: "#ddd",
  borderLight: "#e0e0e0",
  star: "#fc0",
  codeBg: "#f0f0ee",
  sponsorBg: "transparent",
};

export function BlogHeader() {
  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-12 -mt-10 lg:-mt-12 reveal" style={{ background: c.bg }}>
      <div className="mx-auto" style={{ maxWidth: 550, padding: "40px 20px 0" }}>
        <a href="#overview" className="block no-underline mb-6" style={{ fontFamily: verdana, fontSize: 18, fontWeight: "bold", color: c.title, letterSpacing: 0 }}>
          Daring Firewall
        </a>
        <div style={{ fontFamily: verdana, fontSize: 10, color: c.muted, letterSpacing: 1, textTransform: "uppercase", marginTop: -20, marginBottom: 32 }}>
          By John Goober · Proudly Handcrafted Since 2003
        </div>
        <div className="mb-9" style={{ fontFamily: verdana, fontSize: 10.5 }}>
          {["Archive", "RSS", "About", "The Syntax Deck", "Colophon"].map((l) => (
            <a key={l} href="#" className="no-underline mr-3.5" style={{ color: c.muted2, textTransform: "uppercase", letterSpacing: 0.5 }}>{l}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BlogWrap({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto" style={{ maxWidth: 550, fontFamily: verdana, fontSize: 11.5, lineHeight: 1.65, color: c.text, background: c.bg }}>
      {children}
    </div>
  );
}

export function BlogPost({ date, title, linked, id, children }: { date: string; title: string; linked?: boolean; id: string; children: ReactNode }) {
  return (
    <div id={id} className="mb-8 reveal">
      <div style={{ fontSize: 10, color: c.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{date}</div>
      <div className="mb-2" style={{ fontSize: 14, fontWeight: "bold", color: c.title, lineHeight: 1.4 }}>
        {linked && <span style={{ color: c.star, fontSize: 12 }}>★ </span>}
        <a href={`#${id}`} className="no-underline" style={{ color: c.title }}>{title}</a>
      </div>
      <div>{children}</div>
    </div>
  );
}

export function BP({ children }: { children: ReactNode }) {
  return <p className="mb-3" style={{ fontFamily: verdana, fontSize: 11.5, lineHeight: 1.65 }}>{children}</p>;
}

export function BlogCode({ children }: { children: ReactNode }) {
  return <code style={{ fontFamily: mono, fontSize: 10, background: c.codeBg, padding: "1px 4px", borderRadius: 2 }}>{children}</code>;
}

export function BlogQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-3" style={{ paddingLeft: 14, borderLeft: "2px solid #ccc", color: "#666", fontStyle: "italic" }}>
      {children}
    </blockquote>
  );
}

export function BlogFootnote({ num, children }: { num: number; children: ReactNode }) {
  return (
    <div className="mt-2" style={{ fontSize: 10, color: c.muted2, paddingLeft: 16, borderLeft: `2px solid ${c.borderLight}` }}>
      <sup style={{ fontSize: 8, color: c.muted }}>{num}</sup> {children}
    </div>
  );
}

export function BlogDivider() {
  return <hr className="my-7 border-0" style={{ borderTop: `1px solid ${c.border}` }} />;
}

export function BlogSponsor({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <div className="my-7 py-4 reveal" style={{ borderTop: `1px solid ${c.borderLight}`, borderBottom: `1px solid ${c.borderLight}` }}>
      <div style={{ fontSize: 9, color: c.muted3, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 }}>{label}</div>
      <div className="mb-1" style={{ fontSize: 12, fontWeight: "bold", color: c.title }}>
        <a href="#" className="no-underline" style={{ color: c.title }}>{title}</a>
      </div>
      <div style={{ fontSize: 11, color: "#666", lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

export function BlogLink({ children }: { children: ReactNode }) {
  return <a href="#" className="no-underline" style={{ color: c.link }}>{children}</a>;
}

export function BlogFooter() {
  return (
    <div className="mt-12 pt-4 reveal" style={{ borderTop: `1px solid ${c.border}`, fontSize: 10, color: c.muted3, lineHeight: 1.7 }}>
      <p><strong style={{ color: c.muted2 }}>Daring Firewall</strong> is written by <strong style={{ color: c.muted2 }}>John Goober</strong>.</p>
      <p className="mt-2">John is the creator of <a href="#" style={{ color: c.muted }}>Markdown</a>, the lightweight markup language now used by every AI model, developer documentation site, and README on earth. He considers this his second most important contribution to computing. His first is <a href="#" style={{ color: c.muted }}>this post about scrollbars</a>.</p>
      <p className="mt-2">This site is powered by <a href="#" style={{ color: c.muted }}>Movable Type</a>, which still exists, which surprises everyone including the author. It has looked exactly like this since 2003 and will continue to look exactly like this until the heat death of the universe, because the design is correct and there is nothing to change.</p>
      <p className="mt-3" style={{ color: c.muted4 }}>&copy; 2003&ndash;2026 John Goober. Markdown&trade; is his. Everything else is up for debate, and he will debate it.</p>
    </div>
  );
}
