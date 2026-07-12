import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const methodColors: Record<string, { badge: string; border: string; bg: string }> = {
  get: {
    badge: "bg-[#ebf3fb] text-[#61affe] border border-[#c1dcf3]",
    border: "border-[#61affe]",
    bg: "bg-[#ebf3fb]",
  },
  post: {
    badge: "bg-[#e8f6f0] text-[#3a8c6d] border border-[#b8e5d0]",
    border: "border-[#49cc90]",
    bg: "bg-[#e8f6f0]",
  },
  put: {
    badge: "bg-[#fbf1e6] text-[#b57420] border border-[#f0d6a8]",
    border: "border-[#fca130]",
    bg: "bg-[#fbf1e6]",
  },
  delete: {
    badge: "bg-[#fde6e6] text-[#c23030] border border-[#f0bbbb]",
    border: "border-[#f93e3e]",
    bg: "bg-[#fde6e6]",
  },
  patch: {
    badge: "bg-[#e6fbf6] text-[#2aab8d] border border-[#ade8d8]",
    border: "border-[#50e3c2]",
    bg: "bg-[#e6fbf6]",
  },
};

interface TagSectionProps {
  name: string;
  description: string;
  children: ReactNode;
}

export function TagSection({ name, description, children }: TagSectionProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div id={name} className="mt-8 border border-[#e0e0e0] rounded bg-white overflow-hidden reveal">
      <div
        className="flex items-center px-5 py-4 border-b border-[#e0e0e0] cursor-pointer select-none hover:bg-[#f8f8f8]"
        onClick={() => setCollapsed(!collapsed)}
      >
        <span className="text-[18px] font-bold text-[#3b4151] font-[Source_Sans_3,sans-serif]">{name}</span>
        <span className="text-[14px] text-[#6b6b6b] ml-3">{description}</span>
        <span className={cn("ml-auto text-[18px] text-[#999] transition-transform duration-200", collapsed && "-rotate-90")}>▼</span>
      </div>
      {!collapsed && <div>{children}</div>}
    </div>
  );
}

interface EndpointProps {
  method: "get" | "post" | "put" | "delete" | "patch";
  path: ReactNode;
  description: string;
  deprecated?: boolean;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function Endpoint({ method, path, description, deprecated, defaultOpen, children }: EndpointProps) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const colors = methodColors[method];

  return (
    <div className="border-b border-[#ececec] last:border-b-0">
      <div
        className={cn(
          "flex items-center px-5 py-2.5 gap-3 cursor-pointer transition-colors",
          open ? cn(colors.bg, "border-l-[3px]", colors.border, "pl-[17px]") : "hover:bg-[#f9f9f9]"
        )}
        onClick={() => setOpen(!open)}
      >
        <span className={cn("text-[12px] font-bold uppercase w-[60px] text-center rounded py-1 shrink-0 font-[Source_Sans_3,sans-serif] tracking-[0.2px]", colors.badge)}>
          {method}
        </span>
        <span className={cn("font-mono text-[13px] font-medium shrink-0", deprecated ? "text-[#a1a1a1] line-through" : "text-[#3b4151]")}>
          {path}
        </span>
        <span className={cn("text-[13px] ml-auto text-right whitespace-nowrap overflow-hidden text-ellipsis max-w-[280px]", deprecated ? "text-[#a1a1a1] line-through" : "text-[#6b6b6b]")}>
          {description}
        </span>
        {deprecated && (
          <span className="text-[10px] font-bold bg-[#e8e8e8] text-[#999] px-2 py-0.5 rounded uppercase tracking-[0.3px] ml-2">deprecated</span>
        )}
        <span className={cn("text-[14px] text-[#999] ml-2 shrink-0 transition-transform duration-200", open && "rotate-90")}>▸</span>
      </div>
      {open && (
        <div className="border-t border-[#ececec] px-6 py-5 bg-[#fafafa] text-[14px]">
          {children}
        </div>
      )}
    </div>
  );
}

export function EndpointDescription({ children }: { children: ReactNode }) {
  return <div className="mb-5 leading-[1.7] text-[#3b4151] [&_p]:mb-2">{children}</div>;
}

export function DetailSectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="text-[13px] font-bold text-[#3b4151] uppercase tracking-[0.3px] mt-5 mb-2">
      {children}
    </div>
  );
}

export function RateLimitNote({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#fff8e1] border border-[#ffe082] rounded px-3.5 py-2.5 text-[13px] my-4 text-[#795548] [&_strong]:text-[#5d4037]">
      {children}
    </div>
  );
}

interface ParamTableSWProps {
  headers?: string[];
  children: ReactNode;
}

export function ParamTableSW({ headers = ["Name", "Located in", "Type", "Description"], children }: ParamTableSWProps) {
  return (
    <table className="w-full border-collapse mb-4 text-[13px]">
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} className="text-left font-semibold px-3 py-2 border-b border-[#e0e0e0] text-[#6b6b6b] text-[12px]">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export function ParamName({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <td className="px-3 py-2 border-b border-[#ececec] align-top text-[#3b4151]">
      <span className="font-mono text-[12px] font-medium">{children}</span>
      {required && <span className="text-[#f93e3e] text-[10px] font-bold align-super ml-0.5">*</span>}
    </td>
  );
}

export function ParamIn({ children }: { children: ReactNode }) {
  return <td className="px-3 py-2 border-b border-[#ececec] align-top text-[11px] text-[#999] italic">{children}</td>;
}

export function ParamType({ children }: { children: ReactNode }) {
  return <td className="px-3 py-2 border-b border-[#ececec] align-top font-mono text-[12px] text-[#6b6b6b]">{children}</td>;
}

export function ParamDesc({ children }: { children: ReactNode }) {
  return <td className="px-3 py-2 border-b border-[#ececec] align-top text-[#3b4151]">{children}</td>;
}

interface ResponseRowProps {
  code: string;
  type: "success" | "client-err" | "server-err";
  children: ReactNode;
}

export function ResponseRow({ code, type, children }: ResponseRowProps) {
  const colorMap = { success: "text-[#49cc90]", "client-err": "text-[#fca130]", "server-err": "text-[#f93e3e]" };
  return (
    <div className="flex items-start gap-3 py-2 border-b border-[#ececec] last:border-b-0">
      <span className={cn("font-mono text-[13px] font-bold shrink-0 w-12", colorMap[type])}>{code}</span>
      <span className="text-[13px] text-[#3b4151]">{children}</span>
    </div>
  );
}

export function ResponseBody({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#41444e] text-white rounded px-4 py-4 mt-3 font-mono text-[12px] leading-[1.6] overflow-x-auto whitespace-pre">
      {children}
    </div>
  );
}

export const RbKey = ({ children }: { children: ReactNode }) => <span className="text-[#89b4fa]">{children}</span>;
export const RbStr = ({ children }: { children: ReactNode }) => <span className="text-[#a6e3a1]">{children}</span>;
export const RbNum = ({ children }: { children: ReactNode }) => <span className="text-[#f9e2af]">{children}</span>;
export const RbBool = ({ children }: { children: ReactNode }) => <span className="text-[#cba6f7]">{children}</span>;
export const RbNull = ({ children }: { children: ReactNode }) => <span className="text-[#f38ba8]">{children}</span>;
export const RbCmt = ({ children }: { children: ReactNode }) => <span className="text-[#6c7086] italic">{children}</span>;

export function TryItButton() {
  return (
    <button className="inline-block px-4 py-1.5 text-[13px] font-bold text-white bg-[#4990e2] rounded mt-3 hover:bg-[#3a7bc8] transition-colors font-[Source_Sans_3,sans-serif] cursor-default">
      Try it out
    </button>
  );
}

interface SchemaBlockProps {
  name: string;
  children: ReactNode;
}

export function SchemaBlock({ name, children }: SchemaBlockProps) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-white border border-[#e0e0e0] rounded mb-3 overflow-hidden">
      <div
        className="px-4 py-3 font-bold text-[14px] bg-[#f5f5f5] border-b border-[#e0e0e0] cursor-pointer flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        {name}
        <span className="text-[12px] text-[#999] font-normal">object</span>
      </div>
      {open && (
        <div className="px-4 py-4 font-mono text-[12px] leading-[1.7] bg-[#fafafa]">
          {children}
        </div>
      )}
    </div>
  );
}

export function SchemaField({ name, type, desc }: { name: string; type: string; desc: string }) {
  return (
    <div className="flex gap-2 py-0.5">
      <span className="text-[#3b4151] font-medium">{name}</span>
      <span className="text-[#6b6b6b]">{type}</span>
      <span className="text-[#999] font-[Source_Sans_3,sans-serif] text-[12px]">— {desc}</span>
    </div>
  );
}

export function SwaggerIC({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono text-[12px] bg-[#e8e8e8] px-1.5 py-0.5 rounded text-[#3b4151]">
      {children}
    </code>
  );
}
