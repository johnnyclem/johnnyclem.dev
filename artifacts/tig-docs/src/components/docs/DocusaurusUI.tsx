import { useState, type ReactNode } from "react";

const admonitionStyles = {
  note: {
    bg: "bg-[#eef9fd]",
    border: "border-[#54c7ec]",
    heading: "text-[#1a8aaa]",
    icon: "\u{1F4DD}",
    label: "note",
  },
  tip: {
    bg: "bg-[#eefbf5]",
    border: "border-[#25c2a0]",
    heading: "text-[#1a8a6e]",
    icon: "\u{1F4A1}",
    label: "tip",
  },
  caution: {
    bg: "bg-[#fffaeb]",
    border: "border-[#ffba00]",
    heading: "text-[#b58105]",
    icon: "\u26A0\uFE0F",
    label: "caution",
  },
  danger: {
    bg: "bg-[#fff1f1]",
    border: "border-[#fa383e]",
    heading: "text-[#d63939]",
    icon: "\u{1F6A8}",
    label: "danger",
  },
};

interface AdmonitionProps {
  type: "note" | "tip" | "caution" | "danger";
  children: ReactNode;
}

export function Admonition({ type, children }: AdmonitionProps) {
  const s = admonitionStyles[type];
  return (
    <div className={`my-6 px-5 py-4 rounded-lg border-l-[5px] ${s.bg} ${s.border} text-[15px] reveal`}>
      <div className={`font-bold text-[14px] uppercase mb-1.5 flex items-center gap-1.5 ${s.heading}`}>
        {s.icon} {s.label}
      </div>
      <div className="text-[#1c1e21] leading-[1.7] [&>p]:mb-0 [&>p+p]:mt-2.5">{children}</div>
    </div>
  );
}

interface DocCodeBlockProps {
  title: string;
  lang: string;
  children: ReactNode;
}

export function DocCodeBlock({ title, lang, children }: DocCodeBlockProps) {
  return (
    <div className="my-4 mb-6 border border-[#ececec] rounded-lg overflow-hidden bg-[#f6f7f8] reveal">
      <div className="flex items-center px-4 py-2 bg-[rgba(0,0,0,0.02)] border-b border-[#ececec] text-[13px] font-semibold text-[#606770]">
        <span>{title}</span>
        <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.5px] text-[#999]">{lang}</span>
      </div>
      <pre className="px-5 py-4 font-mono text-[13.5px] leading-[1.6] overflow-x-auto whitespace-pre text-[#393a34]">
        {children}
      </pre>
    </div>
  );
}

export function DraftLine({ children }: { children: ReactNode }) {
  return <span className="text-[#999] italic">{children}</span>;
}

export function PyKw({ children }: { children: ReactNode }) {
  return <span className="text-[#569cd6]">{children}</span>;
}

export function PyFn({ children }: { children: ReactNode }) {
  return <span className="text-[#dcdcaa]">{children}</span>;
}

export function PyCmt({ children }: { children: ReactNode }) {
  return <span className="text-[#6a9955]">{children}</span>;
}

interface FlowchartProps {
  children: ReactNode;
}

export function Flowchart({ children }: FlowchartProps) {
  return (
    <div className="my-6 px-6 py-7 bg-[#f8f8f8] border border-[#ececec] rounded-[10px] font-mono text-[13px] text-[#606770] text-center leading-[2.4] overflow-x-auto reveal">
      {children}
    </div>
  );
}

interface FlowNodeProps {
  variant?: "normal" | "decision" | "terminal" | "result";
  children: ReactNode;
}

export function FlowNode({ variant = "normal", children }: FlowNodeProps) {
  const styles = {
    normal: "bg-white border-[#e3e3e3] text-[#1c1e21]",
    decision: "bg-[#fff8e1] border-[#ffe082] text-[#1c1e21]",
    terminal: "bg-[#25c2a0] border-[#25c2a0] text-white font-bold",
    result: "bg-[#fff1f1] border-[#f5c6c6] text-[#c0392b]",
  };
  return (
    <span className={`inline-block px-4 py-1.5 border rounded-md font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
}

export function FlowArrow({ children, hidden }: { children?: ReactNode; hidden?: boolean }) {
  return (
    <span className={`text-[#999] mx-1.5 ${hidden ? "invisible" : ""}`}>{children || "\u2192"}</span>
  );
}

export function BlankSection() {
  return (
    <div className="min-h-[200px] flex items-center justify-center flex-col text-[#999] italic border-2 border-dashed border-[#ececec] rounded-xl my-6 px-10 py-10 gap-3 reveal">
      <span className="text-2xl animate-[blink_1s_step-end_infinite]">{"\u258A"}</span>
      <span className="text-[14px]">[This space intentionally left blank, which is also what your documentation page looks like right now]</span>
    </div>
  );
}

interface DocPageNavProps {
  prev: { label: string; title: string };
  next: { label: string; title: string };
}

export function DocPageNav({ prev, next }: DocPageNavProps) {
  return (
    <div className="flex justify-between mt-14 pt-6 border-t border-[#e3e3e3] gap-4 reveal">
      <a href="#" onClick={e => e.preventDefault()} className="flex-1 px-5 py-4 border border-[#e3e3e3] rounded-lg no-underline transition-all hover:border-[#25c2a0] hover:shadow-[0_2px_12px_rgba(37,194,160,0.08)] group">
        <div className="text-[12px] font-semibold text-[#999] uppercase tracking-[0.5px]">{prev.label}</div>
        <div className="text-[15px] font-semibold text-[#25c2a0] mt-1 group-hover:underline">{prev.title}</div>
      </a>
      <a href="#" onClick={e => e.preventDefault()} className="flex-1 px-5 py-4 border border-[#e3e3e3] rounded-lg no-underline text-right transition-all hover:border-[#25c2a0] hover:shadow-[0_2px_12px_rgba(37,194,160,0.08)] group">
        <div className="text-[12px] font-semibold text-[#999] uppercase tracking-[0.5px]">{next.label}</div>
        <div className="text-[15px] font-semibold text-[#25c2a0] mt-1 group-hover:underline">{next.title}</div>
      </a>
    </div>
  );
}

export function LastUpdated({ date, author, footnote }: { date: string; author: string; footnote: string }) {
  return (
    <div className="text-[13px] text-[#999] mt-12 pt-4 border-t border-[#ececec] reveal">
      Last updated on <strong className="text-[#1c1e21]">{date}</strong> by <strong className="text-[#1c1e21]">{author}</strong> · <a href="#" onClick={e => e.preventDefault()} className="text-[#2e8555] no-underline hover:underline">Edit this page</a>
      <span className="block text-[12px] text-[#bbb] mt-1">{footnote}</span>
    </div>
  );
}

interface DocTableProps {
  headers: string[];
  rows: ReactNode[][];
  winnerCol?: number;
}

export function DocTable({ headers, rows, winnerCol }: DocTableProps) {
  return (
    <div className="overflow-x-auto my-5 reveal">
      <table className="w-full border-collapse text-[15px]">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="text-left font-semibold px-3.5 py-2.5 border-b-2 border-[#e3e3e3] bg-[#f8f8f8]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} className={`px-3.5 py-2.5 border-b border-[#ececec] align-top ${winnerCol === ci ? "font-bold text-[#25c2a0]" : ""}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface DocSearchBarProps {
  placeholder?: string;
}

export function DocSearchBar({ placeholder = "Search docs about docs..." }: DocSearchBarProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 border rounded-lg text-[13px] text-[#999] cursor-pointer transition-colors bg-[#f8f8f8] ${focused ? "border-[#25c2a0]" : "border-[#e3e3e3] hover:border-[#ccc]"}`}
      onClick={() => setFocused(!focused)}
    >
      <span>{"\u{1F50D}"}</span> {placeholder}
      <kbd className="text-[11px] bg-white border border-[#e3e3e3] rounded px-1.5 py-0.5 text-[#999] font-sans">{"\u2318"}</kbd>
      <kbd className="text-[11px] bg-white border border-[#e3e3e3] rounded px-1.5 py-0.5 text-[#999] font-sans">K</kbd>
    </div>
  );
}

export function SidebarBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block text-[10px] font-bold bg-[#25c2a0] text-white px-1.5 py-px rounded-sm ml-1.5 align-[1px] uppercase">
      {children}
    </span>
  );
}

export function IC({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono text-[0.85em] bg-[rgba(0,0,0,0.06)] px-1.5 py-0.5 rounded">
      {children}
    </code>
  );
}

export function DocLink({ children }: { children: ReactNode }) {
  return (
    <a href="#" onClick={e => e.preventDefault()} className="text-[#2e8555] no-underline hover:underline">{children}</a>
  );
}
