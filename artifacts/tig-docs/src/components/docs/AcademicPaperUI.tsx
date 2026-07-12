import type { ReactNode } from "react";

const c = {
  text: "#1a1a1a",
  text2: "#444",
  text3: "#777",
  border: "#ddd",
  blue: "#1a5276",
  codeBg: "#f5f5f0",
};

const serif = "'STIX Two Text', 'Times New Roman', Times, serif";
const mathFont = "'STIX Two Math', 'STIX Two Text', 'Times New Roman', serif";

export function PaperWrap({ children }: { children: ReactNode }) {
  return (
    <div
      className="paper-wrap"
      style={{
        maxWidth: 680,
        margin: "0 auto",
        fontFamily: serif,
        fontSize: 17,
        lineHeight: 1.65,
        color: c.text,
        counterReset: "section",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=STIX+Two+Text:ital,wght@0,400;0,600;0,700;1,400&family=STIX+Two+Math&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .paper-wrap p { margin-bottom: 16px; }
        .paper-wrap a { color: ${c.blue}; }
        .paper-wrap h2 {
          font-size: 20px; font-weight: 700; margin-top: 36px; margin-bottom: 14px;
          counter-increment: section;
        }
        .paper-wrap h2::before { content: counter(section) ". "; color: ${c.text3}; }
        .paper-wrap h2.no-counter::before { content: ""; }
        .paper-wrap h3 {
          font-size: 17px; font-weight: 700; margin-top: 24px; margin-bottom: 10px;
          font-style: italic;
        }
        .paper-wrap ul, .paper-wrap ol { margin-bottom: 16px; padding-left: 24px; }
        .paper-wrap li { margin-bottom: 4px; }
        .paper-wrap code {
          font-family: 'JetBrains Mono', monospace; font-size: 0.82em;
          background: ${c.codeBg}; padding: 2px 6px; border-radius: 3px;
        }
      `}</style>
      {children}
    </div>
  );
}

export function PaperBadge({ children }: { children: ReactNode }) {
  return (
    <div
      className="reveal"
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 10,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 2,
        color: "#fff",
        background: c.blue,
        display: "inline-block",
        padding: "3px 12px",
        borderRadius: 2,
        marginBottom: 20,
      }}
    >
      {children}
    </div>
  );
}

export function PaperTitle({ children }: { children: ReactNode }) {
  return (
    <h1
      className="reveal"
      style={{
        fontFamily: serif,
        fontSize: 28,
        fontWeight: 700,
        lineHeight: 1.25,
        marginBottom: 12,
        letterSpacing: -0.3,
      }}
    >
      {children}
    </h1>
  );
}

export function PaperAuthors({ children }: { children: ReactNode }) {
  return (
    <div className="reveal" style={{ fontSize: 15, color: c.text2, marginBottom: 4 }}>
      {children}
    </div>
  );
}

export function PaperAffiliation({ children }: { children: ReactNode }) {
  return (
    <div className="reveal" style={{ fontSize: 13, color: c.text3, fontStyle: "italic", marginBottom: 24 }}>
      {children}
    </div>
  );
}

export function Abstract({ children }: { children: ReactNode }) {
  return (
    <div
      className="reveal"
      style={{
        margin: "0 0 32px",
        padding: "20px 24px",
        background: "#f8f7f4",
        border: "1px solid #e8e6e0",
        borderRadius: 4,
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 1,
          marginBottom: 8,
        }}
      >
        Abstract
      </div>
      <div style={{ fontSize: 15, lineHeight: 1.7, color: c.text2 }}>{children}</div>
    </div>
  );
}

export function M({ children }: { children: ReactNode }) {
  return (
    <span style={{ fontFamily: mathFont, fontStyle: "italic", letterSpacing: 0.5 }}>{children}</span>
  );
}

export function MathBlock({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div
      className="reveal"
      style={{
        margin: "24px 0",
        padding: "20px 24px",
        background: c.codeBg,
        border: "1px solid #e0dfd8",
        borderRadius: 4,
        textAlign: "center",
        fontFamily: mathFont,
        fontSize: 19,
        lineHeight: 2,
        overflowX: "auto",
      }}
    >
      {label && (
        <span style={{ float: "right", fontSize: 14, color: c.text3, fontFamily: serif }}>
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

export function Theorem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      className="reveal"
      style={{
        margin: "24px 0",
        padding: "16px 20px",
        border: `2px solid ${c.text}`,
        borderRadius: 4,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  );
}

export function Corollary({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      className="reveal"
      style={{
        margin: "20px 0",
        padding: "14px 20px",
        borderLeft: `4px solid ${c.blue}`,
        background: "#f0f4f8",
        borderRadius: "0 4px 4px 0",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 14, color: c.blue, marginBottom: 4 }}>{label}</div>
      {children}
    </div>
  );
}

export function PaperTable({ children }: { children: ReactNode }) {
  return (
    <div className="reveal" style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", margin: "20px 0", fontSize: 15 }}>
        {children}
      </table>
      <style>{`
        .paper-wrap th {
          text-align: left; font-weight: 700; padding: 8px 12px;
          border-bottom: 2px solid ${c.text}; font-size: 13px;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .paper-wrap td {
          padding: 8px 12px; border-bottom: 1px solid ${c.border};
          vertical-align: top;
        }
        .paper-wrap td:first-child {
          font-family: ${mathFont}; font-style: italic; font-size: 17px; width: 60px;
        }
      `}</style>
    </div>
  );
}

export function Figure({ caption, children }: { caption: ReactNode; children: ReactNode }) {
  return (
    <div className="reveal" style={{ margin: "28px 0", textAlign: "center" }}>
      <div
        style={{
          display: "inline-block",
          padding: "24px 32px",
          background: c.codeBg,
          border: "1px solid #e0dfd8",
          borderRadius: 4,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          lineHeight: 1.8,
          textAlign: "left",
          color: c.text2,
          overflowX: "auto",
          maxWidth: "100%",
        }}
      >
        {children}
      </div>
      <div style={{ fontSize: 13, color: c.text3, marginTop: 8, fontStyle: "italic" }}>{caption}</div>
    </div>
  );
}

export function Footnote({ children }: { children: ReactNode }) {
  return (
    <div
      className="reveal"
      style={{
        fontSize: 13,
        color: c.text3,
        borderTop: `1px solid ${c.border}`,
        marginTop: 8,
        paddingTop: 6,
        lineHeight: 1.6,
      }}
    >
      {children}
    </div>
  );
}

export function References({ children }: { children: ReactNode }) {
  return (
    <div
      className="reveal"
      style={{
        marginTop: 36,
        paddingTop: 16,
        borderTop: `2px solid ${c.text}`,
      }}
    >
      <h2 className="no-counter" style={{ fontFamily: serif }}>References</h2>
      {children}
    </div>
  );
}

export function RefEntry({ num, children }: { num: string; children: ReactNode }) {
  return (
    <div
      style={{
        fontSize: 14,
        color: c.text2,
        marginBottom: 8,
        paddingLeft: 28,
        textIndent: -28,
        lineHeight: 1.6,
      }}
    >
      <span style={{ color: c.text3 }}>{num}</span> {children}
    </div>
  );
}
