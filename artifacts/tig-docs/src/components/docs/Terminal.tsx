import React from "react";
import { cn } from "@/lib/utils";

interface TerminalProps {
  title: string;
  dimensions: string;
  badge: "correct" | "incorrect" | "catastrophic";
  badgeLabel: string;
  badgeText: string;
  children: React.ReactNode;
}

export function TerminalWindow({ title, dimensions, badge, badgeLabel, badgeText, children }: TerminalProps) {
  const badgeColors = {
    correct: "bg-[#d4edda] text-[#155724]",
    incorrect: "bg-[#f8d7da] text-[#721c24]",
    catastrophic: "bg-[#721c24] text-white",
  };

  return (
    <div className="my-7 rounded-xl overflow-hidden border border-border shadow-sm group hover:shadow-md hover:shadow-apple-blue/5 transition-shadow duration-300 reveal">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-code-bg border-b border-border text-xs font-medium text-text-secondary">
        <span className={cn("text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-[0.3px]", badgeColors[badge])}>
          {badgeLabel}
        </span>
        {badgeText}
      </div>
      
      <div className="bg-terminal-bg font-mono text-[13px] leading-[1.45] text-terminal-text relative overflow-hidden group/terminal">
        {/* Terminal Title Bar */}
        <div className="bg-terminal-bar px-3.5 py-2 flex items-center gap-2 text-xs text-terminal-dim select-none">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-terminal-red"></span>
            <span className="w-3 h-3 rounded-full bg-terminal-yellow"></span>
            <span className="w-3 h-3 rounded-full bg-terminal-green"></span>
          </div>
          <span className="ml-1 opacity-80">{title}</span>
        </div>
        
        {/* Terminal Body */}
        <div className="p-4 overflow-x-auto terminal-scroll relative z-10 whitespace-pre pb-8 transition-transform duration-500 ease-out group-hover/terminal:scale-[1.01]">
          {children}
          <span className="terminal-cursor text-terminal-text ml-[1px]">▊</span>
        </div>
        
        {/* Dimension Tag */}
        <div className="absolute bottom-2 right-3 bg-[#45475a]/80 text-terminal-dim text-[10px] px-2 py-0.5 rounded backdrop-blur-sm z-20 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-300">
          {dimensions}
        </div>
      </div>
    </div>
  );
}

// Helper components for terminal formatting
export const TDim = ({ children }: { children: React.ReactNode }) => <span className="text-terminal-dim">{children}</span>;
export const TBlue = ({ children, bold }: { children: React.ReactNode, bold?: boolean }) => <span className={cn("text-terminal-blue", bold && "font-bold")}>{children}</span>;
export const TGreen = ({ children, bold }: { children: React.ReactNode, bold?: boolean }) => <span className={cn("text-terminal-green", bold && "font-bold")}>{children}</span>;
export const TYellow = ({ children, bold }: { children: React.ReactNode, bold?: boolean }) => <span className={cn("text-terminal-yellow", bold && "font-bold")}>{children}</span>;
export const TRed = ({ children, bold }: { children: React.ReactNode, bold?: boolean }) => <span className={cn("text-terminal-red", bold && "font-bold")}>{children}</span>;
export const TMauve = ({ children, bold }: { children: React.ReactNode, bold?: boolean }) => <span className={cn("text-terminal-mauve", bold && "font-bold")}>{children}</span>;
export const TBold = ({ children }: { children: React.ReactNode }) => <span className="font-bold">{children}</span>;
