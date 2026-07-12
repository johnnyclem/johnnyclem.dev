import { cn } from "@/lib/utils";

interface ArchBoxProps {
  children: React.ReactNode;
  primary?: boolean;
}

function ArchBox({ children, primary }: ArchBoxProps) {
  return (
    <span
      className={cn(
        "inline-block px-4 py-1.5 border rounded-md mx-1 font-mono text-[13px] font-medium",
        primary
          ? "bg-[#7c5cfc] text-white border-[#7c5cfc] font-bold shadow-[0_2px_12px_rgba(124,92,252,0.3)]"
          : "bg-white text-text-primary border-border"
      )}
    >
      {children}
    </span>
  );
}

function ArchArrow() {
  return <span className="text-text-tertiary text-[16px] mx-1">{" → "}</span>;
}

interface ArchDiagramProps {
  caption: string;
  children: React.ReactNode;
}

export function ArchDiagram({ caption, children }: ArchDiagramProps) {
  return (
    <div className="my-6 p-8 bg-code-bg border border-border rounded-[10px] text-center font-mono text-[13px] text-text-secondary leading-[2.2] reveal">
      {children}
      <br />
      <span className="text-[11px] text-text-tertiary">{caption}</span>
    </div>
  );
}

ArchDiagram.Box = ArchBox;
ArchDiagram.Arrow = ArchArrow;
