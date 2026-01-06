export function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden shadow-inner">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out rounded-full shadow-sm"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
