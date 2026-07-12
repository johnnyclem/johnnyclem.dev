import React from "react";
import { cn } from "@/lib/utils";

interface CalloutProps {
  type: "standard" | "deprecated" | "note" | "warning" | "tip";
  label: string;
  children: React.ReactNode;
  className?: string;
}

const calloutStyles: Record<string, { bg: string; border: string; labelColor: string }> = {
  standard: { bg: "bg-callout-bg", border: "border-callout-border", labelColor: "text-callout-border" },
  deprecated: { bg: "bg-deprecated-bg", border: "border-deprecated-border", labelColor: "text-deprecated-border" },
  note: { bg: "bg-[#f3f0ff]", border: "border-[#7c5cfc]", labelColor: "text-[#7c5cfc]" },
  warning: { bg: "bg-[#fffbeb]", border: "border-[#f59e0b]", labelColor: "text-[#92400e]" },
  tip: { bg: "bg-[#f0fdf4]", border: "border-[#22c55e]", labelColor: "text-[#166534]" },
};

export function Callout({ type, label, children, className }: CalloutProps) {
  const style = calloutStyles[type] || calloutStyles.standard;
  
  return (
    <div 
      className={cn(
        "my-6 px-4.5 py-3.5 rounded-md text-[14px] leading-relaxed reveal-left",
        style.bg,
        "border-l-[3px]",
        style.border,
        className
      )}
    >
      <div 
        className={cn(
          "font-semibold text-[12px] uppercase tracking-[0.3px] mb-1",
          style.labelColor
        )}
      >
        {label}
      </div>
      <div className="text-text-primary">
        {children}
      </div>
    </div>
  );
}

export function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-code-bg border border-border rounded-[10px] p-5 font-mono text-[13px] leading-[1.6] overflow-x-auto my-5 whitespace-pre text-text-primary shadow-sm">
      {children}
    </pre>
  );
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[13px] bg-code-bg px-1.5 py-0.5 rounded text-[#c41a16] border border-border/50">
      {children}
    </code>
  );
}
