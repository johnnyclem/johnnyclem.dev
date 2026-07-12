import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";

const serif = "'Source Serif 4', Georgia, serif";
const display = "'Playfair Display', serif";

export function BookCover({
  title,
  titleAccent,
  subtitle,
  author,
  tagline,
  bestsellerLabel,
  praise,
}: {
  title: string;
  titleAccent?: string;
  subtitle: string;
  author: string;
  tagline?: string;
  bestsellerLabel?: string;
  praise?: string;
}) {
  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-12 -mt-10 lg:-mt-12 mb-12">
      <section
        className="min-h-[85vh] flex items-center justify-center relative overflow-hidden px-5 py-10"
        style={{ background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)" }}
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(192,57,43,0.08), transparent 70%)" }} />
        <div className="flex flex-col items-center relative z-10">
          <div
            className="max-w-[420px] w-full relative overflow-hidden flex flex-col justify-center"
            style={{
              aspectRatio: "3/4.2",
              background: "linear-gradient(135deg, #f7f3ee 0%, #ede8e0 100%)",
              borderRadius: "4px 16px 16px 4px",
              boxShadow: "inset -2px 0 8px rgba(0,0,0,0.06), -30px 30px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.05)",
              padding: "48px 40px",
            }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-5" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.08), transparent)", borderRadius: "4px 0 0 4px" }} />
            <div className="absolute top-0 bottom-0 w-px" style={{ left: 18, background: "rgba(0,0,0,0.06)" }} />
            {bestsellerLabel && (
              <div className="text-center mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#b8860b" }}>
                {bestsellerLabel}
              </div>
            )}
            <div className="text-center mb-2" style={{ fontFamily: display, fontSize: 44, fontWeight: 900, lineHeight: 1.05, color: "#1a1a1a", letterSpacing: -1 }}>
              {title} {titleAccent && <em style={{ color: "#c0392b" }}>{titleAccent}</em>}
            </div>
            <div className="text-center mb-8" style={{ fontFamily: serif, fontSize: 17, fontWeight: 300, color: "#5a5a5a", lineHeight: 1.5, fontStyle: "italic" }}>
              {subtitle}
            </div>
            <div className="text-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#1a1a1a", letterSpacing: 1, textTransform: "uppercase" }}>
              {author}
            </div>
            {tagline && (
              <div className="text-center mt-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#999", letterSpacing: 0.5 }}>
                {tagline}
              </div>
            )}
          </div>
          {praise && (
            <div className="mt-8 max-w-[360px] text-center" style={{ fontFamily: serif, fontSize: 13, color: "rgba(255,255,255,0.35)", fontStyle: "italic", lineHeight: 1.6 }}>
              {praise}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export function ChapterHeading({ number, title, id, epigraph, epigraphCite }: { number?: number | string; title: string; id: string; epigraph?: string; epigraphCite?: string }) {
  return (
    <div id={id} className="mt-16 mb-8 reveal">
      <div className="mb-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "#c0392b" }}>
        {typeof number === "number" ? `Chapter ${number === 0 ? "" : number}` : number || ""}
      </div>
      <h2 className="mb-2" style={{ fontFamily: display, fontSize: 36, fontWeight: 800, lineHeight: 1.15, letterSpacing: -0.5, color: "#1a1a1a" }}>{title}</h2>
      {epigraph && (
        <div className="mt-4 mb-10 pl-5" style={{ borderLeft: "2px solid #e8e2d8", fontFamily: serif, fontSize: 15, fontStyle: "italic", color: "#5a5a5a", lineHeight: 1.7 }}>
          {epigraph}
          {epigraphCite && <cite className="block mt-1.5 not-italic" style={{ fontSize: 13, color: "#999" }}>{epigraphCite}</cite>}
        </div>
      )}
    </div>
  );
}

export function BookParagraph({ children, firstPara }: { children: ReactNode; firstPara?: boolean }) {
  return (
    <p
      className={`mb-5 ${firstPara ? "book-first-para" : ""}`}
      style={{ fontFamily: serif, fontSize: 17, lineHeight: 1.8, color: "#2a2a2a", maxWidth: 600 }}
    >
      {children}
    </p>
  );
}

export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-9 reveal" style={{ padding: "24px 28px", fontFamily: display, fontSize: 24, fontWeight: 600, fontStyle: "italic", lineHeight: 1.4, color: "#1a1a1a", borderLeft: "3px solid #c0392b", maxWidth: 560, letterSpacing: -0.2 }}>
      {children}
    </blockquote>
  );
}

export function SidebarNote({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="my-7 reveal" style={{ padding: "20px 24px", background: "#f5f1eb", borderRadius: 8, fontSize: 14, color: "#5a5a5a", lineHeight: 1.7, maxWidth: 560, border: "1px solid #e8e2d8" }}>
      <strong style={{ color: "#1a1a1a", display: "block", marginBottom: 4, fontFamily: "'Inter', sans-serif", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{title}</strong>
      {children}
    </div>
  );
}

export function BookList({ ordered, children }: { ordered?: boolean; children: ReactNode }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className="mb-5 pl-6" style={{ maxWidth: 600 }}>
      {children}
    </Tag>
  );
}

export function BookListItem({ children }: { children: ReactNode }) {
  return (
    <li className="mb-2" style={{ fontFamily: serif, fontSize: 16, lineHeight: 1.7, color: "#2a2a2a" }}>
      {children}
    </li>
  );
}

export function BookSubheading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-10 mb-4" style={{ fontFamily: display, fontSize: 22, fontWeight: 700, letterSpacing: -0.2, color: "#1a1a1a" }}>
      {children}
    </h3>
  );
}

export function BookLabel({ children }: { children: ReactNode }) {
  return (
    <h4 className="mt-8 mb-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#5a5a5a" }}>
      {children}
    </h4>
  );
}

export function CodeExample({ children }: { children: ReactNode }) {
  return (
    <div className="my-5 reveal" style={{ padding: "16px 20px", background: "#1a1a2e", borderRadius: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 1.6, color: "#e2e8f0", overflowX: "auto", whiteSpace: "pre", maxWidth: 580 }}>
      {children}
    </div>
  );
}

export function CodeComment({ children }: { children: ReactNode }) {
  return <span style={{ color: "#64748b", fontStyle: "italic" }}>{children}</span>;
}
export function CodeString({ children }: { children: ReactNode }) {
  return <span style={{ color: "#a6e3a1" }}>{children}</span>;
}
export function CodeFn({ children }: { children: ReactNode }) {
  return <span style={{ color: "#89b4fa" }}>{children}</span>;
}
export function CodeKw({ children }: { children: ReactNode }) {
  return <span style={{ color: "#cba6f7" }}>{children}</span>;
}

interface Scenario {
  question: string;
  speaker: string;
  answer: string;
  source: string;
  stall: string;
}

export function MeetingSimulator({ scenarios }: { scenarios: Scenario[] }) {
  const [active, setActive] = useState(false);
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [timeLeft, setTimeLeft] = useState(11.0);
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => () => clearTimer(), [clearTimer]);

  const start = () => {
    const s = scenarios[Math.floor(Math.random() * scenarios.length)];
    setScenario(s);
    setSearchValue("");
    setShowResult(false);
    setStatusMsg("");
    setTimeLeft(11.0);
    setActive(true);
    activeRef.current = true;
    clearTimer();

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 0.1;
        if (next <= 0) {
          clearTimer();
          activeRef.current = false;
          setActive(false);
          setStatusMsg("\u{1F62C} The silence has become a presence in the room. Rachel is looking at you. Everyone is looking at you. You say \"sorry, I was on mute\" even though this is an in-person meeting.");
          return 0;
        }
        return next;
      });
    }, 100);
  };

  const search = () => {
    if (!scenario || !activeRef.current) return;
    clearTimer();
    const elapsed = (11.0 - timeLeft).toFixed(1);
    setShowResult(true);
    activeRef.current = false;
    setActive(false);

    let msg: string;
    if (timeLeft > 7) {
      msg = `\u26A1 ${elapsed} seconds. Incredible. You answered before the silence even formed. Rachel thinks you prepared for this. You did not. This is the Glean In way.`;
    } else if (timeLeft > 4) {
      msg = `\u2705 ${elapsed} seconds. Well within the recovery window. You stalled with "${scenario.stall}" and delivered the answer like you'd been thinking about it all morning. Textbook.`;
    } else if (timeLeft > 0) {
      msg = `\u{1F605} ${elapsed} seconds. Cutting it close. The pause was noticeable. Rachel raised an eyebrow. But you delivered, and in the grand ledger of meeting performance, a late answer beats no answer by a wide margin.`;
    } else {
      msg = `\u{1F480} Too late. The silence won. But you now have the answer for the follow-up email, which \u2014 let's be honest \u2014 is where decisions actually get made anyway.`;
    }
    setStatusMsg(msg);
  };

  const timerColor = timeLeft > 7 ? "#c0392b" : timeLeft > 4 ? "#e5934b" : "#e5484d";

  return (
    <div className="my-8 reveal" style={{ maxWidth: 580, border: "1px solid #e8e2d8", borderRadius: 12, overflow: "hidden", background: "#fffdf9", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
      <div className="flex items-center gap-2" style={{ padding: "12px 16px", background: "#1a1a2e", color: "#fff", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600 }}>
        <span className="animate-pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "#e5484d", display: "inline-block" }} />
        Meeting in Progress — Q1 Business Review
      </div>
      <div className="p-5">
        <div className="mb-4" style={{ fontFamily: serif, fontSize: 16, color: "#1a1a1a", lineHeight: 1.6 }}>
          {scenario ? (
            <>
              <span className="block mb-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: "#c0392b" }}>{scenario.speaker}:</span>
              {scenario.question}
            </>
          ) : (
            "Press the button to start. Something terrible is about to happen to you in a meeting."
          )}
        </div>

        {(active || timeLeft === 0) && (
          <div className="text-center my-3" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, fontWeight: 700, color: timerColor }}>
            {timeLeft.toFixed(1)}
          </div>
        )}

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder={"\u{1F50D}  Search your company knowledge base..."}
            disabled={!active}
            className="flex-1 outline-none"
            style={{ padding: "10px 14px", border: "1px solid #e8e2d8", borderRadius: 8, fontFamily: "'Inter', sans-serif", fontSize: 14, background: active ? "#faf7f2" : "#f0ede8", color: "#1a1a1a", opacity: active ? 1 : 0.5 }}
          />
          <button
            onClick={search}
            disabled={!active}
            style={{ padding: "10px 20px", background: active ? "linear-gradient(135deg, #5e6ad2, #7c5cfc)" : "#ccc", color: "#fff", border: "none", borderRadius: 8, fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, cursor: active ? "pointer" : "default", whiteSpace: "nowrap" }}
          >
            Glean In
          </button>
        </div>

        {showResult && scenario && (
          <div className="mb-3" style={{ padding: "14px 16px", background: "#f5f1eb", borderRadius: 8, border: "1px solid #e8e2d8", fontSize: 14, lineHeight: 1.6 }}>
            <div className="flex items-center gap-1.5 mb-1.5" style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: "#5e6ad2", textTransform: "uppercase", letterSpacing: 0.5 }}>
              {"✨"} AI-Powered Answer
            </div>
            <div style={{ color: "#5a5a5a" }}>{scenario.answer}</div>
            <div className="mt-2" style={{ fontSize: 12, color: "#999", fontFamily: "'Inter', sans-serif" }}>{scenario.source}</div>
          </div>
        )}

        {statusMsg && (
          <div className="text-center mt-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#999" }}>
            {statusMsg}
          </div>
        )}

        <div className="text-center mt-4">
          <button
            onClick={start}
            style={{ padding: "8px 20px", background: "#c0392b", color: "#fff", border: "none", borderRadius: 6, fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, cursor: "pointer" }}
          >
            {scenario ? "Try another question" : "Uh oh, I wasn't listening"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function AuthorCard({ name, title, bio }: { name: string; title: string; bio: ReactNode }) {
  return (
    <div className="mt-16 pt-10 reveal" style={{ borderTop: "1px solid #e8e2d8" }}>
      <div className="flex gap-6 items-start" style={{ maxWidth: 560 }}>
        <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #e8e2d8, #d4cec4)", fontSize: 32 }}>
          {"\u{1F469}\u200D\u{1F4BC}"}
        </div>
        <div>
          <div style={{ fontFamily: display, fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{name}</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#999", marginBottom: 8 }}>{title}</div>
          <div style={{ fontSize: 14, lineHeight: 1.7, color: "#5a5a5a" }}>{bio}</div>
        </div>
      </div>
    </div>
  );
}

export function BookFooter({ children }: { children: ReactNode }) {
  return (
    <div className="mt-14 pt-6 reveal" style={{ borderTop: "1px solid #e8e2d8", fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#999", lineHeight: 1.7 }}>
      {children}
    </div>
  );
}
