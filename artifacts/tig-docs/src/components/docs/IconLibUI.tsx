import { type ReactNode, useState, useCallback } from "react";

const sans = "'Inter', -apple-system, sans-serif";
const mono = "'JetBrains Mono', monospace";

const c = {
  bg: "#fff",
  bgA: "#f8f9fa",
  bgD: "#183153",
  t: "#1a1a2e",
  t2: "#525f7f",
  t3: "#8898aa",
  t4: "#c0ccda",
  amb: "#f0ad4e",
  ambS: "#fef9f0",
  ambB: "#fce5b6",
  bdr: "#e6ebf1",
  bdrL: "#f0f3f7",
  code: "#f4f5f7",
};

export function FMNav() {
  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-12 -mt-10 lg:-mt-12">
      <nav className="flex items-center px-6 h-14 sticky top-0 z-50" style={{ background: c.bgD }}>
        <a href="#overview" className="flex items-center gap-2.5 no-underline" style={{ color: "#fff", fontWeight: 800, fontSize: 18, letterSpacing: -0.3 }}>
          <span className="flex items-center justify-center rounded-lg" style={{ width: 32, height: 32, background: c.amb }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={c.bgD} strokeWidth={2.5} strokeLinecap="round" width={18} height={18}><line x1="8" y1="12" x2="16" y2="12" /></svg>
          </span>
          FontMid
        </a>
        <div className="hidden md:flex gap-6 ml-10" style={{ fontSize: 14, fontWeight: 500 }}>
          {["Icons", "Docs", "Plans", "Blog", "Support"].map((l, i) => (
            <a key={l} href="#" className="no-underline transition-colors" style={{ color: i === 0 ? "#fff" : "rgba(255,255,255,.6)" }}>{l}</a>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden sm:inline" style={{ fontSize: 12, color: "rgba(255,255,255,.35)", fontFamily: mono }}>v4.0.2</span>
          <a href="#pro" className="no-underline" style={{ padding: "7px 18px", background: c.amb, color: c.bgD, fontWeight: 700, fontSize: 13, borderRadius: 6 }}>Go Mediocre →</a>
        </div>
      </nav>
    </div>
  );
}

export function FMHero({ onSearch }: { onSearch: (q: string) => void }) {
  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-12">
      <section className="relative overflow-hidden text-center" style={{ background: "linear-gradient(135deg,#1b2a4a,#243b5e)", padding: "80px 24px 72px" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 120%,rgba(240,173,78,.06),transparent 70%)" }} />
        <div className="relative z-10">
          <span className="inline-block mb-5" style={{ padding: "4px 14px", background: "rgba(240,173,78,.12)", color: c.amb, fontSize: 12, fontWeight: 700, borderRadius: 20, letterSpacing: 0.5, textTransform: "uppercase" }}>Just launched: FontMid 4.0</span>
          <h1 className="mb-3 text-[32px] sm:text-[52px]" style={{ fontFamily: sans, fontWeight: 900, color: "#fff", letterSpacing: -1.5, lineHeight: 1.1 }}>
            The Internet's <span style={{ color: c.amb }}>Okayest</span><br />Icon Library
          </h1>
          <p className="mx-auto mb-8" style={{ fontSize: 20, color: "rgba(255,255,255,.55)", fontWeight: 400, maxWidth: 540, lineHeight: 1.6 }}>
            2,847 icons that do the job. Not beautifully. Not poorly. Just… adequately. Used on websites that are also fine.
          </p>
          <div className="flex justify-center gap-12 mb-9 flex-wrap">
            {[["2,847", "Icon Names"], ["340", "Unique SVGs"], ["~3/5", "Avg. Rating"]].map(([n, l]) => (
              <div key={l} className="text-center">
                <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: -1 }}>{n}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </div>
          <div className="relative mx-auto" style={{ maxWidth: 520 }}>
            <span className="absolute" style={{ left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,.3)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={20} height={20}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            </span>
            <input
              type="text"
              placeholder="Search 2,847 icons that are just okay…"
              aria-label="Search icons"
              onChange={(e) => onSearch(e.target.value)}
              className="w-full outline-none transition-all"
              style={{ padding: "14px 20px 14px 48px", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, color: "#fff", fontSize: 16, fontFamily: sans }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export function FMSection({ emoji, title, count, id, description }: { emoji: string; title: string; count: number; id: string; description: string }) {
  return (
    <div id={id} className="reveal">
      <div className="flex items-center justify-between mt-14 mb-4 first:mt-6">
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.3 }}>{emoji} {title}</div>
        <div style={{ fontSize: 13, color: c.t3, fontFamily: mono }}>{count} icons</div>
      </div>
      <p className="mb-6" style={{ fontSize: 14, color: c.t2, maxWidth: 660, lineHeight: 1.7 }}>{description}</p>
    </div>
  );
}

function IconCard({ name, svg, searchTerms, query }: { name: string; svg: ReactNode; searchTerms: string; query: string }) {
  const [copied, setCopied] = useState(false);

  const match = !query || name.toLowerCase().includes(query) || searchTerms.toLowerCase().includes(query);
  if (!match) return null;

  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(name).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }, [name]);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Copy ${name}`}
      className="flex flex-col items-center justify-center relative cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      style={{ padding: "20px 8px 14px", background: c.bg, border: `1px solid ${copied ? c.amb : "transparent"}`, borderRadius: 8, gap: 8 }}
      onMouseEnter={(e) => { if (!copied) { e.currentTarget.style.borderColor = c.bdr; e.currentTarget.style.background = c.bgA; }}}
      onMouseLeave={(e) => { if (!copied) { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = c.bg; }}}
    >
      <span aria-hidden="true">{svg}</span>
      <span style={{ fontSize: 10.5, color: c.t3, textAlign: "center", fontWeight: 500, lineHeight: 1.3 }}>{name}</span>
      {copied && (
        <span role="status" className="absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: c.bgD, color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 4 }}>Copied</span>
      )}
    </button>
  );
}

const NeutralFace = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} width={28} height={28}>
    <circle cx="16" cy="16" r="12" /><circle cx="12" cy="14" r="1" fill="currentColor" stroke="none" /><circle cx="20" cy="14" r="1" fill="currentColor" stroke="none" /><line x1="11" y1="20" x2="21" y2="20" />
  </svg>
);

const AmberCircle = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="#f0ad4e" strokeWidth={2.5} width={28} height={28}>
    <circle cx="16" cy="16" r="10" /><line x1="12" y1="16" x2="20" y2="16" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} width={28} height={28}>
    <polyline points="6,8 9,8 13,22 25,22" /><circle cx="14" cy="26" r="2" /><ellipse cx="23" cy="26" rx="2" ry="1.7" /><polyline points="9,12 26,11 24,19 12,19" />
  </svg>
);

const CardIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} width={28} height={28}>
    <rect x="5" y="9" width="23" height="15" rx="2" /><line x1="5" y1="15" x2="28" y2="15" /><line x1="9" y1="20" x2="15" y2="20" />
  </svg>
);

const ReceiptIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} width={28} height={28}>
    <path d="M8 4v24l3-2 3 2 3-2 3 2V4z" /><line x1="11" y1="10" x2="19" y2="10" /><line x1="11" y1="14" x2="17" y2="14" /><line x1="11" y1="18" x2="15" y2="18" />
  </svg>
);

const CurrencyIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} width={28} height={28}>
    <circle cx="16" cy="16" r="10" /><line x1="16" y1="10" x2="16" y2="22" /><line x1="13" y1="13" x2="19" y2="13" /><line x1="13" y1="19" x2="19" y2="19" />
  </svg>
);

const MeetingIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} width={28} height={28}>
    <rect x="6" y="8" width="20" height="14" rx="2" /><line x1="6" y1="12" x2="26" y2="12" /><circle cx="16" cy="19" r="2" />
  </svg>
);

const PingIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} width={28} height={28}>
    <circle cx="16" cy="16" r="3" fill="currentColor" stroke="none" /><circle cx="16" cy="16" r="8" /><circle cx="16" cy="16" r="12" strokeDasharray="3 3" />
  </svg>
);

const CircleBackIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} width={28} height={28}>
    <circle cx="16" cy="16" r="10" strokeDasharray="5 3" /><polyline points="20,8 22,12 18,14" />
  </svg>
);

const SynergyIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} width={28} height={28}>
    <circle cx="11" cy="11" r="5" /><circle cx="21" cy="21" r="5" /><line x1="14" y1="14" x2="18" y2="18" />
  </svg>
);

const LunchIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} width={28} height={28}>
    <rect x="7" y="14" width="18" height="10" rx="2" /><line x1="10" y1="18" x2="22" y2="18" /><line x1="16" y1="8" x2="16" y2="14" />
  </svg>
);

const DeployIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={28} height={28}>
    <line x1="16" y1="6" x2="16" y2="22" /><polyline points="10,16 16,22 22,16" /><line x1="8" y1="26" x2="24" y2="26" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" width={28} height={28}>
    <polyline points="10,16 15,21 22,11" />
  </svg>
);

const DocIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} width={28} height={28}>
    <rect x="8" y="6" width="16" height="20" rx="2" /><line x1="12" y1="12" x2="20" y2="12" /><line x1="12" y1="16" x2="18" y2="16" /><line x1="12" y1="20" x2="16" y2="20" />
  </svg>
);

const BlameIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" width={28} height={28}>
    <line x1="16" y1="10" x2="16" y2="18" /><circle cx="16" cy="22" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const ArrowR = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" width={28} height={28}>
    <line x1="8" y1="16" x2="23" y2="15" /><polyline points="18,10 24,15 18,21" />
  </svg>
);
const ArrowL = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" width={28} height={28}>
    <line x1="24" y1="16" x2="9" y2="17" /><polyline points="14,11 8,17 14,22" />
  </svg>
);
const ArrowU = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" width={28} height={28}>
    <line x1="16" y1="24" x2="15" y2="9" /><polyline points="10,14 15,8 21,14" />
  </svg>
);
const ArrowD = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" width={28} height={28}>
    <line x1="16" y1="8" x2="17" y2="23" /><polyline points="11,18 17,24 22,18" />
  </svg>
);
const SortOfRight = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" width={28} height={28}>
    <line x1="8" y1="18" x2="22" y2="13" /><polyline points="17,8 23,13 18,19" />
  </svg>
);
const VaguelyUp = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" width={28} height={28}>
    <line x1="13" y1="24" x2="17" y2="9" /><polyline points="11,15 17,8 22,13" />
  </svg>
);
const Elsewhere = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" width={28} height={28}>
    <path d="M10 20 Q16 10 22 16" /><polyline points="18,12 22,16 18,20" />
  </svg>
);
const BackTo = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" width={28} height={28}>
    <path d="M22 12 Q10 8 10 20" /><polyline points="6,17 10,21 14,17" />
  </svg>
);
const ToLinkedin = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" width={28} height={28}>
    <line x1="8" y1="24" x2="24" y2="8" /><polyline points="14,8 24,8 24,18" />
  </svg>
);
const Shrug = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" width={28} height={28}>
    <line x1="8" y1="16" x2="24" y2="16" />
  </svg>
);

export function FMIconGrid({ query, children }: { query: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 reveal" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}>
      {children}
    </div>
  );
}

function makeSection(icons: { name: string; svg: ReactNode; terms: string }[]) {
  return function SectionIcons({ query }: { query: string }) {
    return (
      <FMIconGrid query={query}>
        {icons.map((ic) => <IconCard key={ic.name} name={ic.name} svg={ic.svg} searchTerms={ic.terms} query={query} />)}
      </FMIconGrid>
    );
  };
}

export const SentimentIcons = makeSection([
  { name: "fm-neutral", svg: <NeutralFace />, terms: "neutral" },
  { name: "fm-fine", svg: <NeutralFace />, terms: "fine" },
  { name: "fm-happy", svg: <NeutralFace />, terms: "happy" },
  { name: "fm-devastated", svg: <NeutralFace />, terms: "devastated sad" },
  { name: "fm-monday", svg: <NeutralFace />, terms: "monday" },
  { name: "fm-friday", svg: <NeutralFace />, terms: "friday" },
  { name: "fm-got-the-promotion", svg: <NeutralFace />, terms: "promotion happy" },
  { name: "fm-didnt-get-it", svg: <NeutralFace />, terms: "promotion denied" },
  { name: "fm-left-on-read", svg: <NeutralFace />, terms: "ignored read" },
  { name: "fm-wedding-day", svg: <NeutralFace />, terms: "wedding love" },
  { name: "fm-divorce-final", svg: <NeutralFace />, terms: "divorce" },
  { name: "fm-deployed-friday", svg: <NeutralFace />, terms: "deploy friday" },
  { name: "fm-pip-meeting", svg: <NeutralFace />, terms: "pip performance" },
  { name: "fm-survived-layoffs", svg: <NeutralFace />, terms: "layoff survivor" },
]);

export const StatusIcons = makeSection([
  { name: "fm-status-ok", svg: <AmberCircle />, terms: "status ok up" },
  { name: "fm-status-warn", svg: <AmberCircle />, terms: "status warning" },
  { name: "fm-status-error", svg: <AmberCircle />, terms: "status error" },
  { name: "fm-status-down", svg: <AmberCircle />, terms: "status down outage" },
  { name: "fm-works-on-mine", svg: <AmberCircle />, terms: "works machine" },
  { name: "fm-its-dns", svg: <AmberCircle />, terms: "dns" },
  { name: "fm-technically-up", svg: <AmberCircle />, terms: "technically up" },
  { name: "fm-nobody-paged", svg: <AmberCircle />, terms: "pager oncall" },
  { name: "fm-were-monitoring", svg: <AmberCircle />, terms: "monitoring" },
  { name: "fm-vibes-only", svg: <AmberCircle />, terms: "vibes" },
]);

export const CommerceIcons = makeSection([
  { name: "fm-cart", svg: <CartIcon />, terms: "cart shopping" },
  { name: "fm-cart-abandoned", svg: <CartIcon />, terms: "cart abandoned" },
  { name: "fm-cart-impulse-3am", svg: <CartIcon />, terms: "cart impulse buy" },
  { name: "fm-credit-card", svg: <CardIcon />, terms: "credit card payment" },
  { name: "fm-card-maxed", svg: <CardIcon />, terms: "maxed credit card" },
  { name: "fm-kohls-cash", svg: <CardIcon />, terms: "kohls cash" },
  { name: "fm-expired-groupon", svg: <CardIcon />, terms: "groupon expired coupon" },
  { name: "fm-venmo-request", svg: <CardIcon />, terms: "venmo payment request" },
  { name: "fm-wont-expense", svg: <ReceiptIcon />, terms: "receipt expense denied" },
  { name: "fm-forgot-to-cancel", svg: <CurrencyIcon />, terms: "subscription cancel forgot" },
  { name: "fm-free-trial-ending", svg: <CurrencyIcon />, terms: "free trial ending" },
  { name: "fm-nft-worthless", svg: <CurrencyIcon />, terms: "nft crypto" },
]);

export const NavigationIcons = makeSection([
  { name: "fm-arrow-right", svg: <ArrowR />, terms: "arrow right" },
  { name: "fm-arrow-left", svg: <ArrowL />, terms: "arrow left" },
  { name: "fm-arrow-up", svg: <ArrowU />, terms: "arrow up" },
  { name: "fm-arrow-down", svg: <ArrowD />, terms: "arrow down" },
  { name: "fm-sort-of-right", svg: <SortOfRight />, terms: "sort of right" },
  { name: "fm-vaguely-up", svg: <VaguelyUp />, terms: "vaguely up" },
  { name: "fm-elsewhere", svg: <Elsewhere />, terms: "elsewhere" },
  { name: "fm-back-to-meeting", svg: <BackTo />, terms: "back meeting" },
  { name: "fm-to-linkedin", svg: <ToLinkedin />, terms: "linkedin job" },
  { name: "fm-shrug", svg: <Shrug />, terms: "shrug meh" },
]);

export const WorkplaceIcons = makeSection([
  { name: "fm-meeting", svg: <MeetingIcon />, terms: "meeting" },
  { name: "fm-shouldve-emailed", svg: <MeetingIcon />, terms: "meeting email" },
  { name: "fm-standup", svg: <MeetingIcon />, terms: "standup daily" },
  { name: "fm-all-hands", svg: <MeetingIcon />, terms: "all hands" },
  { name: "fm-quick-sync", svg: <MeetingIcon />, terms: "sync quick" },
  { name: "fm-that-was-45-min", svg: <MeetingIcon />, terms: "long meeting" },
  { name: "fm-sad-desk-lunch", svg: <LunchIcon />, terms: "lunch desk" },
  { name: "fm-quick-ping", svg: <PingIcon />, terms: "ping slack" },
  { name: "fm-circle-back", svg: <CircleBackIcon />, terms: "circle back later" },
  { name: "fm-take-offline", svg: <CircleBackIcon />, terms: "offline take" },
  { name: "fm-synergy", svg: <SynergyIcon />, terms: "synergy" },
  { name: "fm-reply-all-regret", svg: <SynergyIcon />, terms: "reply all email" },
]);

export const DeveloperIcons = makeSection([
  { name: "fm-deploy", svg: <DeployIcon />, terms: "deploy ship" },
  { name: "fm-revert", svg: <DeployIcon />, terms: "revert rollback" },
  { name: "fm-lgtm", svg: <CheckIcon />, terms: "lgtm approve" },
  { name: "fm-lgtm-didnt-read", svg: <CheckIcon />, terms: "lgtm approve didnt read" },
  { name: "fm-todo-fix-later", svg: <DocIcon />, terms: "todo fix later" },
  { name: "fm-tech-debt", svg: <DocIcon />, terms: "tech debt" },
  { name: "fm-git-blame", svg: <BlameIcon />, terms: "git blame" },
  { name: "fm-copied-from-so", svg: <DocIcon />, terms: "stackoverflow copy paste" },
  { name: "fm-asked-claude", svg: <DocIcon />, terms: "ai claude chatgpt" },
  { name: "fm-force-push-yolo", svg: <DeployIcon />, terms: "force push git" },
]);

export function FMProBanner() {
  return (
    <div id="pro" className="my-14 flex flex-col md:flex-row items-center gap-6 reveal" style={{ padding: 32, background: "linear-gradient(135deg,#fef9f0,#fff)", border: `1px solid ${c.ambB}`, borderRadius: 12 }}>
      <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 56, height: 56, background: c.amb, borderRadius: 12 }}>
        <svg viewBox="0 0 32 32" fill="none" stroke={c.bgD} strokeWidth={2.5} width={28} height={28}><circle cx="16" cy="16" r="10" /><line x1="12" y1="16" x2="20" y2="16" /></svg>
      </div>
      <div className="flex-1 text-center md:text-left">
        <div className="mb-1" style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.2 }}>Go Mediocre with FontMid Pro</div>
        <div style={{ fontSize: 14, color: c.t2, lineHeight: 1.6 }}>
          Unlock 1,400+ additional icons that are slightly different from the free ones. Pro includes <strong>fm-budget-approved</strong> and <strong>fm-budget-denied</strong> (same icon), the full 16-icon "Passive-Aggressive Slack Reactions" pack, and <strong>fm-quietly-updating-resume</strong>. Priority support response time: "eventually."
        </div>
      </div>
      <a href="#" className="flex-shrink-0 no-underline whitespace-nowrap" style={{ padding: "10px 24px", background: c.amb, color: c.bgD, fontWeight: 700, fontSize: 14, borderRadius: 8 }}>$79/yr — It's Fine →</a>
    </div>
  );
}

export function FMUsage() {
  return (
    <div id="usage" className="my-14 reveal">
      <div className="mb-5" style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.3 }}>Getting Started</div>
      <p className="mb-5" style={{ color: c.t2, fontSize: 15, maxWidth: 600 }}>Add FontMid to your project. The setup process is unremarkable, which is consistent with the product.</p>

      <FMCodeBlock title="HTML" badge="CDN">{`<!-- Add to <head> — adds 847KB. Not great, not terrible. -->
<link rel="stylesheet" href="https://cdn.fontmid.com/v4/css/all.min.css">

<!-- Sentiment (all render the same face) -->
<i class="fm fm-happy"></i>                <!-- 😐 -->
<i class="fm fm-devastated"></i>           <!-- 😐 -->
<i class="fm fm-wedding-day"></i>          <!-- 😐 -->
<i class="fm fm-divorce-final"></i>        <!-- 😐 (same face for both life events) -->`}</FMCodeBlock>

      <FMCodeBlock title="React" badge="npm">{`import { FmIcon } from '@fontmid/react';

// These all render the same SVG. The prop name is for your benefit, not the user's.
<FmIcon name="fm-happy" />
<FmIcon name="fm-devastated" />
<FmIcon name="fm-survived-layoffs" />

// Status icons are always amber. Green and red are in Pro.
// (We have not actually implemented green or red.)
<FmIcon name="fm-status-ok" />       {/* 🟡 */}
<FmIcon name="fm-status-error" />    {/* 🟡 */}
<FmIcon name="fm-status-down" />     {/* 🟡 */}`}</FMCodeBlock>
    </div>
  );
}

function FMCodeBlock({ title, badge, children }: { title: string; badge: string; children: string }) {
  return (
    <div className="my-4 overflow-hidden" style={{ background: c.code, border: `1px solid ${c.bdr}`, borderRadius: 10 }}>
      <div className="flex items-center justify-between px-4 py-2.5" style={{ background: "rgba(0,0,0,.02)", borderBottom: `1px solid ${c.bdr}`, fontSize: 12, fontWeight: 600, color: c.t3 }}>
        <span>{title}</span>
        <span style={{ fontFamily: mono, fontSize: 11 }}>{badge}</span>
      </div>
      <pre className="overflow-x-auto" style={{ padding: "16px 20px", fontFamily: mono, fontSize: 13, lineHeight: 1.65, color: c.t, whiteSpace: "pre", margin: 0 }}>{children}</pre>
    </div>
  );
}

export function FMTestimonials() {
  const items = [
    { text: "FontMid is the only icon library that has accurately captured my emotional range as a senior engineer, which is to say: none. Every face is the same face. I have never felt so seen.", author: "Staff Engineer", role: "Series B Startup (acquired, then shut down)", stars: "★★★☆☆" },
    { text: "I switched from Font Awesome to FontMid and nobody noticed for four months. When they did notice, the feedback was 'huh.' That's the most positive product review we've ever received internally.", author: "Lead Designer", role: "Enterprise SaaS (logo on the website is a gradient circle)", stars: "★★★☆☆" },
    { text: "The fm-cart-abandoned and fm-cart icons are the same, which accurately reflects the user journey on our e-commerce platform. We added the fm-cart-impulse-3am variant and conversions went up 2%. Or down 2%. The icon for both metrics is the same.", author: "Head of Product", role: "D2C Brand (has pivoted 3 times)", stars: "★★★☆☆" },
  ];

  return (
    <div id="testimonials" className="my-14 py-10 reveal" style={{ borderTop: `1px solid ${c.bdr}`, borderBottom: `1px solid ${c.bdr}` }}>
      <div className="text-center mb-8" style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.3 }}>What People Are Saying (It's Fine)</div>
      <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {items.map((t, i) => (
          <div key={i} className="p-6" style={{ background: c.bgA, borderRadius: 10, border: `1px solid ${c.bdrL}` }}>
            <div className="mb-2" style={{ color: c.amb, fontSize: 14, letterSpacing: 2 }}>{t.stars}</div>
            <p className="mb-3" style={{ fontSize: 14, color: c.t2, lineHeight: 1.7, fontStyle: "italic" }}>"{t.text}"</p>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.t }}>{t.author}</div>
            <div style={{ fontSize: 12, color: c.t3 }}>{t.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FMFooter() {
  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-12 -mb-12 mt-10 reveal">
      <div className="text-center py-10 px-6" style={{ background: c.bgD, color: "rgba(255,255,255,.4)", fontSize: 13, lineHeight: 1.7 }}>
        <p><strong style={{ color: "rgba(255,255,255,.6)" }}>FontMid</strong> — The icon library that's fine. Est. 2019. Adequate since day one.</p>
        <p>Made with 😐 by a team that is also fine. <a href="#" className="no-underline" style={{ color: c.amb }}>GitHub</a> · <a href="#" className="no-underline" style={{ color: c.amb }}>Twitter</a> · <a href="#" className="no-underline" style={{ color: c.amb }}>Discord (low activity)</a></p>
        <p className="mt-2" style={{ fontSize: 11, color: "rgba(255,255,255,.2)" }}>FontMid is not affiliated with any icon library that tries harder than we do.</p>
      </div>
    </div>
  );
}
