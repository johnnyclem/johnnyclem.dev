import { useState, type ReactNode } from "react";

export function LinearApp({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#0d0d0d] text-[#eee] rounded-lg border border-[#2a2a2a] overflow-hidden font-sans text-[13px] leading-[1.5]" style={{ fontFamily: "'Inter', -apple-system, sans-serif", WebkitFontSmoothing: "antialiased" }}>
      {children}
    </div>
  );
}

export function SbBrand({ name, initial }: { name: string; initial: string }) {
  return (
    <div className="flex items-center gap-2 px-2 py-1.5 mb-4 font-semibold text-[14px]">
      <div className="w-[22px] h-[22px] rounded-[5px] flex items-center justify-center text-[11px] font-bold text-white" style={{ background: "linear-gradient(135deg,#5e6ad2,#8b5cf6)" }}>{initial}</div>
      {name}
    </div>
  );
}

export function SbSection({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="mb-4">
      {label && <div className="text-[11px] font-semibold text-[#555] uppercase tracking-[0.5px] px-2 mb-1">{label}</div>}
      {children}
    </div>
  );
}

interface SbItemProps {
  icon: string;
  label: string;
  count?: string;
  countColor?: string;
  active?: boolean;
  struck?: boolean;
  ghost?: boolean;
  urgentStyle?: boolean;
  mutedStyle?: boolean;
}

export function SbItem({ icon, label, count, countColor, active, struck, ghost, urgentStyle, mutedStyle }: SbItemProps) {
  return (
    <div className={`flex items-center gap-2 px-2 py-[5px] rounded-[5px] cursor-pointer transition-all duration-100 text-[13px]
      ${active ? "bg-[rgba(94,106,210,0.12)] text-[#eee]" : "text-[#888] hover:bg-[#1c1c1c] hover:text-[#eee]"}
      ${struck ? "text-[#3a3a3a] line-through" : ""}
      ${ghost ? "opacity-35" : ""}
      ${urgentStyle ? "text-[#e5484d]" : ""}
      ${mutedStyle ? "text-[#555]" : ""}
    `}>
      <span className={`text-[15px] w-[18px] text-center flex-shrink-0 ${struck ? "opacity-30" : ""}`}>{icon}</span>
      <span className="flex-1 truncate">{label}</span>
      {count && <span className={`ml-auto text-[11px] font-mono ${countColor || "text-[#555]"}`}>{count}</span>}
    </div>
  );
}

export function SbUser({ name, title, initial, color }: { name: string; title: string; initial: string; color: string }) {
  return (
    <div className="mt-auto flex items-center gap-2 px-2 pt-2 border-t border-[#2a2a2a]">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold text-white`} style={{ background: color }}>{initial}</div>
      <div>
        <div className="text-[12px] font-medium">{name}</div>
        <div className="text-[11px] text-[#555]">{title}</div>
      </div>
    </div>
  );
}

export function LinearHeader({ path, current }: { path: string; current: string }) {
  return (
    <div className="flex items-center px-5 py-3 border-b border-[#2a2a2a] gap-3 flex-shrink-0">
      <div className="flex items-center gap-1.5 text-[13px] text-[#888]">
        {path} <span className="text-[#555]">/</span> <span className="text-[#eee] font-medium">{current}</span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="flex border border-[#2a2a2a] rounded-[5px] overflow-hidden">
          <div className="px-3 py-[5px] text-[12px] font-medium text-[#eee] bg-[#222] cursor-pointer">List</div>
          <div className="px-3 py-[5px] text-[12px] font-medium text-[#888] cursor-pointer border-l border-[#2a2a2a] hover:text-[#eee]">Board</div>
          <div className="px-3 py-[5px] text-[12px] font-medium text-[#888] cursor-pointer border-l border-[#2a2a2a] hover:text-[#eee]">Timeline</div>
        </div>
      </div>
    </div>
  );
}

interface CycleHeaderProps {
  name: string;
  dateRange: string;
  overdue?: string;
  done: number;
  total: number;
  progressDone: number;
  progressInProgress: number;
  progressTodo: number;
}

export function CycleHeader({ name, dateRange, overdue, done, total, progressDone, progressInProgress, progressTodo }: CycleHeaderProps) {
  return (
    <div className="flex items-center px-5 py-2.5 border-b border-[#2a2a2a] gap-3 flex-shrink-0">
      <div className="text-[14px] font-semibold">{name}</div>
      <div className="text-[12px] text-[#555] flex items-center gap-3">
        <span>{dateRange}</span>
        {overdue && <span className="text-[10px] font-semibold bg-[rgba(229,72,77,0.15)] text-[#e5484d] px-2 py-0.5 rounded-[3px] uppercase tracking-[0.3px]">{overdue}</span>}
      </div>
      <div className="flex items-center gap-1.5 ml-2">
        <div className="w-[120px] h-1 bg-[#2a2a2a] rounded-sm overflow-hidden flex">
          <div className="h-full bg-[#46a758]" style={{ width: `${progressDone}%` }} />
          <div className="h-full bg-[#e5934b]" style={{ width: `${progressInProgress}%` }} />
          <div className="h-full bg-[#5e6ad2]" style={{ width: `${progressTodo}%` }} />
        </div>
        <span className="text-[12px] text-[#555]">{done} / {total}</span>
      </div>
    </div>
  );
}

interface StatusGroupProps {
  status: string;
  color: string;
  count: number;
  note?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function StatusGroup({ status, color, count, note, children, defaultOpen = true }: StatusGroupProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#1f1f1f]">
      <div
        className="flex items-center gap-2 px-5 py-2 text-[12px] font-semibold text-[#888] cursor-pointer sticky top-0 bg-[#0d0d0d] z-[2] select-none"
        onClick={() => setOpen(!open)}
      >
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
        {status}
        <span className="font-normal text-[#555] font-mono text-[11px]">{count}</span>
        {note && <span className="text-[11px] text-[#3a3a3a] font-normal ml-1">{note}</span>}
      </div>
      {open && children}
    </div>
  );
}

const priorityStyles: Record<string, string> = {
  urgent: "h-3 bg-[#e5484d] shadow-[0_0_6px_rgba(229,72,77,0.4)]",
  high: "h-2.5 bg-[#e5934b]",
  medium: "h-2 bg-[#d4a72c]",
  low: "h-1.5 bg-[#6e7781]",
  none: "h-1 bg-[#444]",
};

const avatarStyles: Record<string, { bg: string; opacity?: string; border?: string }> = {
  priya: { bg: "#46a758" },
  kevin: { bg: "#5e6ad2" },
  jake: { bg: "#e5934b", opacity: "0.35" },
  marcus: { bg: "#e5484d" },
  darian: { bg: "#555", opacity: "0.25", border: "1px dashed #666" },
  none: { bg: "transparent", border: "1px dashed #555" },
};

interface IssueRowProps {
  id: string;
  title: string;
  priority: "urgent" | "high" | "medium" | "low" | "none";
  labels: { text: string; cls: string }[];
  assignee: string;
  assigneeInitial: string;
  date: string;
  overdue?: boolean;
  stale?: boolean;
  cancelled?: boolean;
  onClick?: () => void;
}

export function IssueRow({ id, title, priority, labels, assignee, assigneeInitial, date, overdue, stale, cancelled, onClick }: IssueRowProps) {
  const av = avatarStyles[assignee] || avatarStyles.none;
  return (
    <div className={`flex items-center px-5 py-1.5 gap-2.5 transition-colors duration-75 ${onClick ? "cursor-pointer hover:bg-[#1c1c1c]" : ""} group`} onClick={onClick}>
      <div className="w-3.5 flex-shrink-0 flex items-center justify-center">
        <div className={`w-[3px] rounded-sm ${priorityStyles[priority]}`} />
      </div>
      <span className="font-mono text-[11px] text-[#555] w-14 flex-shrink-0">{id}</span>
      <span className={`flex-1 text-[13px] truncate ${cancelled ? "text-[#555] line-through" : stale ? "text-[#888]" : "text-[#eee]"}`}>{title}</span>
      <div className="flex gap-1 flex-shrink-0 flex-nowrap">
        {labels.map((l, i) => (
          <span key={i} className={`text-[10px] font-medium px-[7px] py-[2px] rounded-[3px] whitespace-nowrap ${l.cls}`}>{l.text}</span>
        ))}
      </div>
      <div
        className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-semibold text-white"
        style={{ background: av.bg, opacity: av.opacity ? Number(av.opacity) : 1, border: av.border }}
      >
        {assigneeInitial}
      </div>
      <span className={`text-[11px] font-mono w-16 text-right flex-shrink-0 ${overdue ? "text-[#e5484d]" : "text-[#3a3a3a]"}`}>{date}</span>
    </div>
  );
}

interface DetailPanelProps {
  open: boolean;
  onClose: () => void;
  issueId: string;
  title: string;
  meta: [string, string][];
  children: ReactNode;
}

export function DetailPanel({ open, onClose, issueId, title, meta, children }: DetailPanelProps) {
  if (!open) return null;
  return (
    <>
      <div className="absolute inset-0 bg-black/50 z-[15]" onClick={onClose} />
      <div className="absolute top-0 right-0 bottom-0 w-full max-w-[500px] bg-[#161616] border-l border-[#2a2a2a] z-[20] overflow-y-auto">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#2a2a2a]">
          <button className="bg-transparent border-0 text-[#888] text-[18px] cursor-pointer p-1 rounded hover:bg-[#1c1c1c]" onClick={onClose}>✕</button>
          <span className="font-mono text-[12px] text-[#555]">{issueId}</span>
        </div>
        <div className="px-5 py-5">
          <div className="text-[18px] font-semibold mb-4 leading-[1.4]">{title}</div>
          <div className="grid grid-cols-[100px_1fr] gap-y-2 gap-x-3 text-[13px] mb-5">
            {meta.map(([label, value], i) => (
              <div key={i} className="contents">
                <div className="text-[#555]">{label}</div>
                <div className="text-[#888]">{value}</div>
              </div>
            ))}
          </div>
          <div className="text-[14px] leading-[1.7] text-[#888] border-t border-[#2a2a2a] pt-4 [&>p]:mb-3 [&>ul]:mb-2 [&>ul]:pl-[18px] [&>li]:mb-1">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export function Comment({ author, date, text, emoji }: { author: string; date: string; text: string; emoji?: string }) {
  return (
    <div className="mt-4 p-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-md text-[13px]">
      <div className="font-semibold text-[#eee] text-[12px] mb-1">{author} <span className="text-[#3a3a3a] font-normal ml-2">{date}</span></div>
      <div className="text-[#888]">{text}</div>
      {emoji && <div className="text-[20px] mt-1.5">{emoji}</div>}
    </div>
  );
}

export const L = {
  marcus: "bg-[rgba(229,72,77,0.2)] text-[#ff6b6b] border border-[rgba(229,72,77,0.25)] font-semibold",
  pivotV4: "bg-[rgba(229,72,77,0.12)] text-[#e5484d]",
  pivotV3: "bg-[rgba(229,72,77,0.12)] text-[#e5484d]",
  pivotV2: "bg-[rgba(229,72,77,0.12)] text-[#e5484d]",
  pivotV1: "bg-[rgba(229,72,77,0.12)] text-[#e5484d]",
  spike: "bg-[rgba(228,169,44,0.15)] text-[#d4a72c] border border-[rgba(228,169,44,0.2)]",
  peopleOps: "bg-[rgba(171,120,234,0.12)] text-[#b07ce8]",
  refactorV3: "bg-[rgba(94,106,210,0.12)] text-[#7c8aec]",
  techDebt: "bg-[rgba(228,169,44,0.12)] text-[#d4a72c]",
  blocked: "bg-[rgba(229,72,77,0.1)] text-[#e5484d]",
  question: "bg-[rgba(94,106,210,0.08)] text-[#888]",
  design: "bg-[rgba(171,120,234,0.12)] text-[#b07ce8]",
  infra: "bg-[rgba(46,167,85,0.1)] text-[#46a758]",
  bug: "bg-[rgba(229,72,77,0.1)] text-[#e5484d]",
  legacy: "bg-[rgba(100,100,100,0.15)] text-[#777]",
  morale: "bg-[rgba(46,167,85,0.1)] text-[#46a758]",
  P0: "bg-[rgba(229,72,77,0.15)] text-[#e5484d] font-semibold",
  onboarding: "bg-[rgba(94,106,210,0.1)] text-[#5e6ad2]",
  scopeTbd: "bg-[rgba(171,120,234,0.08)] text-[#a78bfa]",
};
