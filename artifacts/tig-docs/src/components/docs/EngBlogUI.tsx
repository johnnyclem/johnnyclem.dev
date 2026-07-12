import type { ReactNode, CSSProperties } from "react";

const V = {
  bg: "#fff", bga: "#f6f8fa", bgd: "#0f172a",
  t: "#1e293b", t2: "#475569", t3: "#94a3b8", t4: "#cbd5e1",
  bd: "#e2e8f0", bdl: "#f1f5f9",
  acc: "#6366f1", acc2: "#818cf8",
  green: "#10b981", red: "#ef4444", amber: "#f59e0b",
};

export function EngNav({ brand, links }: { brand: ReactNode; links: { label: string; active?: boolean }[] }) {
  return (
    <nav style={{
      background: V.bgd, padding: "0 24px", height: 56,
      display: "flex", alignItems: "center",
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      <span style={{
        display: "flex", alignItems: "center", gap: 10,
        color: "#fff", fontWeight: 800, fontSize: 17, letterSpacing: "-0.3px",
        textDecoration: "none",
      }}>
        <span style={{
          width: 28, height: 28, background: V.acc, borderRadius: 6,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
        }}>📊</span>
        {brand}
      </span>
      <div style={{ marginLeft: 32, display: "flex", gap: 20, fontSize: 13, fontWeight: 500 }}>
        {links.map(l => (
          <span key={l.label} style={{ color: l.active ? "#fff" : "rgba(255,255,255,0.5)", cursor: "default" }}>
            {l.label}
          </span>
        ))}
      </div>
    </nav>
  );
}

export function EngHero({ badge, title, subtitle }: { badge: ReactNode; title: ReactNode; subtitle: ReactNode }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, #0f172a 0%, #1e293b 100%)`,
      padding: "56px 24px 48px", borderBottom: "1px solid #1e293b",
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 12, fontWeight: 600, color: V.acc2,
          background: "rgba(99,102,241,0.12)", padding: "4px 12px",
          borderRadius: 20, marginBottom: 16,
        }}>{badge}</div>
        <h1 style={{
          fontSize: 36, fontWeight: 800, color: "#fff", lineHeight: 1.2,
          letterSpacing: "-0.5px", marginBottom: 12,
          fontFamily: "'Inter', -apple-system, sans-serif",
        }}>{title}</h1>
        <p style={{ fontSize: 17, color: V.t3, lineHeight: 1.6, maxWidth: 580, margin: 0 }}>{subtitle}</p>
      </div>
    </div>
  );
}

export function EngMeta({ avatar, name, date }: { avatar: string; name: string; date: string }) {
  return (
    <div style={{
      maxWidth: 720, margin: "0 auto", padding: "20px 24px",
      display: "flex", alignItems: "center", gap: 12,
      borderBottom: `1px solid ${V.bd}`,
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: "50%", background: V.acc,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 16, color: "#fff",
      }}>{avatar}</div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{name}</div>
        <div style={{ fontSize: 13, color: V.t3 }}>{date}</div>
      </div>
    </div>
  );
}

export function EngArticle({ children }: { children: ReactNode }) {
  return (
    <div style={{
      maxWidth: 720, margin: "0 auto", padding: "32px 24px 80px",
      fontFamily: "'Inter', -apple-system, sans-serif",
      fontSize: 16, lineHeight: 1.7, color: V.t,
    }}>
      {children}
    </div>
  );
}

export function EngH2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="reveal" style={{
      fontSize: 24, fontWeight: 800, marginTop: 44, marginBottom: 16,
      letterSpacing: "-0.3px", fontFamily: "'Inter', -apple-system, sans-serif",
    }}>{children}</h2>
  );
}

export function EngH3({ children }: { children: ReactNode }) {
  return (
    <h3 className="reveal" style={{
      fontSize: 18, fontWeight: 700, marginTop: 32, marginBottom: 12,
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>{children}</h3>
  );
}

export function EngP({ children }: { children: ReactNode }) {
  return <p className="reveal" style={{ marginBottom: 16, fontSize: 16, lineHeight: 1.7, color: V.t }}>{children}</p>;
}

export function EngCode({ children }: { children: ReactNode }) {
  return (
    <code style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85em",
      background: V.bga, padding: "2px 6px", borderRadius: 4,
    }}>{children}</code>
  );
}

export function EngBlockquote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="reveal" style={{
      margin: "20px 0", padding: "4px 0 4px 20px",
      borderLeft: `3px solid ${V.bd}`, color: V.t2,
    }}>{children}</blockquote>
  );
}

interface MetricCardProps {
  label: string; value: string; sub: string;
  delta: string; direction: "up" | "down" | "flat";
}

export function MetricGrid({ children }: { children: ReactNode }) {
  return (
    <div className="reveal eng-metric-grid" style={{
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
      gap: 12, margin: "24px 0",
    }}>
      {children}
      <style>{`@media(max-width:768px){.eng-metric-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </div>
  );
}

export function MetricCard({ label, value, sub, delta, direction }: MetricCardProps) {
  const dColor = direction === "up" ? V.green : direction === "down" ? V.red : V.t3;
  return (
    <div style={{
      padding: 16, border: `1px solid ${V.bd}`, borderRadius: 10, background: V.bg,
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.5px", color: V.t3, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -1, lineHeight: 1.2 }}>{value}</div>
      <div style={{ fontSize: 12, color: V.t3, marginTop: 2 }}>{sub}</div>
      <div style={{ fontSize: 12, fontWeight: 600, marginTop: 4, color: dColor }}>{delta}</div>
    </div>
  );
}

export function EngChart({ title, range, bars, labels }: {
  title: string; range: string;
  bars: { height: string; color: string }[];
  labels: string[];
}) {
  return (
    <div className="reveal" style={{ margin: "24px 0", border: `1px solid ${V.bd}`, borderRadius: 10, overflow: "hidden" }}>
      <div style={{
        padding: "12px 16px", background: V.bga, borderBottom: `1px solid ${V.bd}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 14, fontWeight: 700 }}>{title}</span>
        <span style={{ fontSize: 12, color: V.t3, fontFamily: "'JetBrains Mono', monospace" }}>{range}</span>
      </div>
      <div style={{
        padding: 20, background: V.bg, minHeight: 160,
        display: "flex", alignItems: "flex-end", gap: 3,
      }}>
        {bars.map((b, i) => (
          <div key={i} style={{
            flex: 1, borderRadius: "3px 3px 0 0", minWidth: 4,
            height: b.height, background: b.color, transition: "height 0.2s",
          }} />
        ))}
      </div>
      <div style={{
        padding: "8px 16px", borderTop: `1px solid ${V.bdl}`,
        fontSize: 11, color: V.t3, display: "flex", justifyContent: "space-between",
      }}>
        {labels.map((l, i) => <span key={i}>{l}</span>)}
      </div>
    </div>
  );
}

interface PTableRow {
  cells: ReactNode[];
}

export function EngTable({ headers, rows }: { headers: string[]; rows: PTableRow[] }) {
  return (
    <div className="reveal" style={{ overflowX: "auto" as const }}>
      <table style={{
        width: "100%", borderCollapse: "collapse" as const, margin: "20px 0",
        fontSize: 14, fontFamily: "'Inter', -apple-system, sans-serif",
      }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{
                textAlign: "left" as const, fontSize: 12, fontWeight: 700,
                textTransform: "uppercase" as const, letterSpacing: "0.3px",
                padding: "10px 12px", borderBottom: `2px solid ${V.bd}`, color: V.t3,
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              {r.cells.map((c, ci) => (
                <td key={ci} style={{
                  padding: "10px 12px", borderBottom: `1px solid ${V.bdl}`,
                  ...(ci === 0 ? { fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", fontSize: 13 } : {}),
                }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Slo({ status, children }: { status: "met" | "breached" | "warning"; children: ReactNode }) {
  const styles: Record<string, CSSProperties> = {
    met: { background: "rgba(16,185,129,0.08)", borderColor: "#6ee7b7" },
    breached: { background: "rgba(239,68,68,0.08)", borderColor: "#fca5a5" },
    warning: { background: "rgba(245,158,11,0.08)", borderColor: "#fcd34d" },
  };
  return (
    <div className="reveal" style={{
      margin: "24px 0", padding: "16px 20px", borderRadius: 10,
      border: "1px solid", fontSize: 14, lineHeight: 1.6,
      ...styles[status],
    }}>{children}</div>
  );
}

export function SloLabel({ children }: { children: ReactNode }) {
  return <div style={{ fontWeight: 700, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>{children}</div>;
}

export function Incident({ severity, title, children }: { severity: 1 | 2 | 3; title: string; children: ReactNode }) {
  const sevStyles: Record<number, CSSProperties> = {
    1: { background: "#fecaca", color: "#991b1b" },
    2: { background: "#fed7aa", color: "#9a3412" },
    3: { background: "#fef08a", color: "#854d0e" },
  };
  return (
    <div className="reveal" style={{
      margin: "24px 0", padding: 20, border: `1px solid ${V.bd}`,
      borderRadius: 10, background: V.bga, fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4,
          textTransform: "uppercase" as const, letterSpacing: "0.3px", ...sevStyles[severity],
        }}>SEV-{severity}</span>
        <span style={{ fontSize: 15, fontWeight: 700 }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

export function IncidentBody({ children }: { children: ReactNode }) {
  return <div style={{ fontSize: 14, color: V.t2, lineHeight: 1.7 }}>{children}</div>;
}

export function Timeline({ entries }: { entries: { time: string; text: string }[] }) {
  return (
    <div style={{
      fontSize: 13, color: V.t2, marginTop: 12, paddingTop: 12,
      borderTop: `1px solid ${V.bd}`,
    }}>
      <strong style={{ fontSize: 12, display: "block", marginBottom: 8 }}>Timeline</strong>
      {entries.map((e, i) => (
        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 6 }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
            color: V.t3, minWidth: 56, flexShrink: 0,
          }}>{e.time}</span>
          <span>{e.text}</span>
        </div>
      ))}
    </div>
  );
}

export function EngCallout({ type, children }: { type: "note" | "warn"; children: ReactNode }) {
  const styles: Record<string, CSSProperties> = {
    note: { background: "#eff6ff", borderColor: "#3b82f6" },
    warn: { background: "#fffbeb", borderColor: "#f59e0b" },
  };
  return (
    <div className="reveal" style={{
      margin: "24px 0", padding: "16px 20px", borderRadius: 8,
      borderLeft: "4px solid", fontSize: 14, lineHeight: 1.6,
      ...styles[type],
    }}>{children}</div>
  );
}

export function EngFooter({ children }: { children: ReactNode }) {
  return (
    <div style={{
      background: V.bgd, padding: "32px 24px", textAlign: "center" as const,
      fontSize: 12, color: V.t3, lineHeight: 1.8,
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>{children}</div>
  );
}

export const good: CSSProperties = { color: V.green };
export const warn: CSSProperties = { color: V.amber };
export const bad: CSSProperties = { color: V.red };
