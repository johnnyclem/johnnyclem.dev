import { cn } from "@/lib/utils";

interface SyntaxCodeBlockProps {
  lang: string;
  filename: string;
  children: React.ReactNode;
  className?: string;
}

export function SyntaxCodeBlock({ lang, filename, children, className }: SyntaxCodeBlockProps) {
  return (
    <div className={cn("my-5 rounded-[10px] border border-border overflow-hidden reveal", className)}>
      <div className="flex items-center justify-between px-4 py-2 bg-code-bg border-b border-border text-[12px] text-text-tertiary font-medium">
        <span className="font-mono text-[11px] uppercase tracking-[0.5px]">{lang}</span>
        <span>{filename}</span>
      </div>
      <div className="bg-[#fafafa] px-5 py-5 font-mono text-[13.5px] leading-[1.65] overflow-x-auto whitespace-pre text-text-primary">
        {children}
      </div>
    </div>
  );
}

export const Kw = ({ children }: { children: React.ReactNode }) => <span className="text-[#8b5cf6]">{children}</span>;
export const Str = ({ children }: { children: React.ReactNode }) => <span className="text-[#059669]">{children}</span>;
export const Cmt = ({ children }: { children: React.ReactNode }) => <span className="text-[#a1a1aa] italic">{children}</span>;
export const Fn = ({ children }: { children: React.ReactNode }) => <span className="text-[#2563eb]">{children}</span>;
export const Typ = ({ children }: { children: React.ReactNode }) => <span className="text-[#c026d3]">{children}</span>;
export const Num = ({ children }: { children: React.ReactNode }) => <span className="text-[#ea580c]">{children}</span>;
export const Prop = ({ children }: { children: React.ReactNode }) => <span className="text-[#0891b2]">{children}</span>;
