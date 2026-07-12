import type { ReactNode } from "react";

export function ManifestoWrap({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundColor: "#c4b894",
        fontFamily: "Georgia, 'Times New Roman', Times, serif",
        fontSize: "12px",
        color: "#443d2e",
        lineHeight: 1.55,
        isolation: "isolate",
        overflowX: "hidden",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/vibe-manifesto-bg.jpeg')",
          backgroundSize: "100% auto",
          backgroundPosition: "left top",
          backgroundRepeat: "repeat-y",
          zIndex: 0,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(196,184,148,0.82)", zIndex: 1 }}
      />
      <div
        className="relative mx-auto"
        style={{
          zIndex: 2,
          maxWidth: "740px",
          padding: "20px 16px 40px",
          boxSizing: "border-box",
          width: "100%",
          overflowWrap: "break-word",
          wordBreak: "break-word",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function MTitle({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="text-center"
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "22px",
        fontWeight: "normal",
        color: "#2c2618",
        margin: "30px 0 16px",
        letterSpacing: "0.5px",
        lineHeight: 1.4,
      }}
    >
      {children}
    </h2>
  );
}

export function MPreamble({ children }: { children: ReactNode }) {
  return (
    <div
      className="text-center"
      style={{
        fontSize: "13px",
        lineHeight: 1.9,
        color: "#4a4232",
        margin: "0 auto 20px",
      }}
    >
      {children}
    </div>
  );
}

export function MValue({
  left,
  right,
}: {
  left: string;
  right: string;
}) {
  return (
    <div>
      <span
        style={{
          fontWeight: "bold",
          fontSize: "16px",
          color: "#1a1508",
        }}
      >
        {left}
      </span>{" "}
      <span
        style={{
          color: "#5a5242",
          fontSize: "12px",
          fontStyle: "italic",
        }}
      >
        over
      </span>{" "}
      <span
        style={{
          color: "#4a4232",
          fontSize: "14px",
          textDecoration: "line-through",
          textDecorationColor: "#6a6050",
        }}
      >
        {right}
      </span>
    </div>
  );
}

export function MValues({ children }: { children: ReactNode }) {
  return (
    <div
      className="text-center"
      style={{ margin: "24px auto", lineHeight: 2.4, fontSize: "13px" }}
    >
      {children}
    </div>
  );
}

export function MPostscript({ children }: { children: ReactNode }) {
  return (
    <div
      className="text-center"
      style={{
        fontSize: "12px",
        color: "#6a6252",
        lineHeight: 1.8,
        margin: "20px auto",
        fontStyle: "italic",
      }}
    >
      {children}
    </div>
  );
}

export function MHr() {
  return (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid #b8b0a0",
        margin: "16px auto",
        width: "60%",
      }}
    />
  );
}

export function MSigTable({ columns }: { columns: string[][] }) {
  return (
    <div
      style={{
        margin: "30px auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "4px 28px",
      }}
    >
      {columns.map((col, i) => (
        <div
          key={i}
          style={{
            fontSize: "11px",
            color: "#4a4232",
            lineHeight: 1.7,
          }}
        >
          {col.map((name, j) => (
            <span key={j}>
              {name}
              {j < col.length - 1 && <br />}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function MCopyright({ children }: { children: ReactNode }) {
  return (
    <div
      className="text-center"
      style={{
        fontSize: "10px",
        color: "#9a9080",
        margin: "24px auto",
        lineHeight: 1.9,
      }}
    >
      {children}
    </div>
  );
}

export function MLinks({ children }: { children: ReactNode }) {
  return (
    <div
      className="text-center"
      style={{
        margin: "16px auto 30px",
        lineHeight: 2.4,
        fontSize: "12px",
      }}
    >
      {children}
    </div>
  );
}

export function MLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      style={{ color: "#4a4232", textDecoration: "none" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.textDecoration = "underline")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.textDecoration = "none")
      }
    >
      {children}
    </a>
  );
}

export function MTranslations({
  labels,
}: {
  labels: string[];
}) {
  return (
    <div
      className="text-center"
      style={{
        margin: "16px auto 24px",
        fontSize: "10px",
        lineHeight: 2.2,
        color: "#8a8070",
      }}
    >
      {labels.map((label, i) => (
        <span key={i}>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{
              color: "#6a6252",
              textDecoration: "none",
              margin: "0 3px",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.textDecoration = "underline")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.textDecoration = "none")
            }
          >
            {label}
          </a>
          {i < labels.length - 1 && " "}
        </span>
      ))}
    </div>
  );
}

export function MCounter({ count }: { count: string }) {
  return (
    <div
      className="text-center"
      style={{
        margin: "20px auto 10px",
        fontFamily: "'Courier New', monospace",
        fontSize: "10px",
        color: "#9a9080",
      }}
    >
      You are visitor number{" "}
      <span
        style={{
          display: "inline-block",
          background: "#2c2618",
          color: "#a8e6a0",
          fontFamily: "'Courier New', monospace",
          fontSize: "11px",
          padding: "2px 8px",
          letterSpacing: "3px",
          border: "1px inset #888",
        }}
      >
        {count}
      </span>{" "}
      to this manifesto
    </div>
  );
}

export function MSiteCredit({ children }: { children: ReactNode }) {
  return (
    <div
      className="text-center"
      style={{
        fontSize: "9px",
        color: "#aaa498",
        margin: "16px auto 30px",
      }}
    >
      {children}
    </div>
  );
}

export function MPrinciple({ children }: { children: ReactNode }) {
  return (
    <div
      className="text-center"
      style={{
        fontSize: "12px",
        lineHeight: 1.85,
        color: "#4a4232",
        marginBottom: "18px",
      }}
    >
      {children}
    </div>
  );
}

export function MSigList({ names }: { names: string[] }) {
  return (
    <div
      style={{
        columnCount: 3,
        columnGap: "20px",
        fontSize: "11px",
        lineHeight: 1.9,
        color: "#4a4232",
        marginBottom: "30px",
      }}
    >
      {names.map((name, i) => (
        <span key={i}>
          {name}
          <br />
        </span>
      ))}
    </div>
  );
}

export function MSigNote({ children }: { children: ReactNode }) {
  return (
    <div
      className="text-center"
      style={{
        fontSize: "11px",
        color: "#6a6252",
        lineHeight: 1.8,
        fontStyle: "italic",
        marginTop: "16px",
      }}
    >
      {children}
    </div>
  );
}

export function MHistoryP({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontSize: "12px",
        lineHeight: 1.85,
        color: "#4a4232",
        marginBottom: "14px",
        textAlign: "left",
      }}
    >
      {children}
    </p>
  );
}

export function MSection({
  id,
  title,
  intro,
  children,
  maxWidth,
}: {
  id: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
  maxWidth?: string;
}) {
  return (
    <div style={{ maxWidth: maxWidth || "520px", margin: "0 auto" }}>
      <MHr />
      <h2
        id={id}
        className="text-center"
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: "20px",
          fontWeight: "normal",
          color: "#2c2618",
          margin: "30px 0 16px",
          lineHeight: 1.4,
        }}
      >
        {title}
      </h2>
      {intro && (
        <div
          className="text-center"
          style={{
            fontStyle: "italic",
            fontSize: intro.length > 60 ? "11px" : "12px",
            color: intro.length > 60 ? "#6a6252" : "#4a4232",
            marginBottom: "20px",
            lineHeight: 1.8,
          }}
        >
          {intro}
        </div>
      )}
      {children}
    </div>
  );
}

export function MBackLink({ href }: { href: string }) {
  return (
    <div
      className="text-center"
      style={{ margin: "30px auto 40px", fontSize: "11px" }}
    >
      <a
        href={href}
        style={{ color: "#4a4232", textDecoration: "none" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.textDecoration = "underline")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.textDecoration = "none")
        }
      >
        Return to Manifesto
      </a>
    </div>
  );
}
