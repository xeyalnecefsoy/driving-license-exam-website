"use client";

import { Clock } from "lucide-react";

interface TimerProps {
  seconds: number;
}

export function Timer({ seconds }: TimerProps) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const isLow = seconds < 120; // Less than 2 minutes
  const isCritical = seconds < 30;

  return (
    <div className={`flex items-center gap-2 font-mono text-base font-bold px-3 py-1.5 rounded-lg transition-all ${
      isCritical 
        ? 'text-red-700 bg-red-100 animate-pulse border-2 border-red-600 dark:text-danger dark:bg-danger/10 dark:border-danger' 
        : isLow 
          ? 'text-orange-700 bg-orange-100 border-2 border-orange-500 dark:text-danger dark:bg-danger/5 dark:border-danger/50' 
          : 'text-foreground bg-muted border-2 border-border'
    }`}>
      <Clock className="w-4 h-4" />
      <span>
        {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
      </span>
    </div>
  );
}
