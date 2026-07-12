interface ChangelogEntryProps {
  version: string;
  date: string;
  children: React.ReactNode;
}

export function ChangelogEntry({ version, date, children }: ChangelogEntryProps) {
  return (
    <div className="py-4 border-b border-border/50 last:border-b-0">
      <span className="font-mono text-[14px] font-semibold text-text-primary">{version}</span>
      <span className="text-[13px] text-text-tertiary ml-3">{date}</span>
      <div className="mt-1.5 text-[14px] text-text-secondary">{children}</div>
    </div>
  );
}
