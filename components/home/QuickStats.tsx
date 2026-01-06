"use client";

import { BookOpen, Target, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface QuickStatsProps {
  totalQuestions: number;
  seenQuestions: number;
  mistakes: number;
  progressPercentage: number;
}

export function QuickStats({
  totalQuestions,
  seenQuestions,
  mistakes,
  progressPercentage,
}: QuickStatsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-secondary">Ümumi tərəqqi</span>
            <span className="text-xs font-bold text-foreground">{mounted ? progressPercentage : 0}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-blue-600 h-full transition-all duration-500 ease-out"
              style={{ width: `${mounted ? progressPercentage : 0}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <div className="flex items-center justify-center gap-1 text-secondary mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span className="text-xs">Görülüb</span>
            </div>
            <p className="text-lg font-bold text-foreground text-center">{mounted ? seenQuestions : 0}</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-secondary mb-1">
              <Target className="w-3.5 h-3.5" />
              <span className="text-xs">Cəmi</span>
            </div>
            <p className="text-lg font-bold text-foreground text-center">{totalQuestions}</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-secondary mb-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span className="text-xs">Səhv</span>
            </div>
            <p className={`text-lg font-bold text-center ${mounted && mistakes > 0 ? 'text-red-600 dark:text-danger' : 'text-green-600 dark:text-success'}`}>
              {mounted ? mistakes : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
