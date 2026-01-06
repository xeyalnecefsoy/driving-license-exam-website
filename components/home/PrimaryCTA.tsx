"use client";

import { Button } from "@/components/ui/Button";
import { PlayCircle, BookOpen, CheckCircle } from "lucide-react";

interface PrimaryCTAProps {
  isReady: boolean;
  onStartLearning: () => void;
  onStartExam: () => void;
}

export function PrimaryCTA({ isReady, onStartLearning, onStartExam }: PrimaryCTAProps) {
  if (isReady) {
    return (
      <div className="w-full max-w-md mx-auto mb-6">
        <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 text-center mb-4 dark:bg-gradient-to-r dark:from-success/10 dark:to-success/5 dark:border-success">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-success" />
            <p className="font-semibold text-green-700 dark:text-success">İmtahana Hazırsınız!</p>
          </div>
          <p className="text-sm text-gray-700 dark:text-secondary mb-4">
            Bütün meyarlar yerinə yetirilib. İndi imtahan verə bilərsiniz.
          </p>
          <Button
            onClick={onStartExam}
            variant="primary"
            className="w-full h-12 text-base font-semibold"
          >
            <PlayCircle className="w-5 h-5 mr-2" />
            İmtahan Simulyasiyası
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <Button
        onClick={onStartLearning}
        variant="primary"
        className="w-full h-14 text-lg font-semibold"
      >
        <BookOpen className="w-5 h-5 mr-2" />
        Təlimə Başla
      </Button>
      <p className="text-xs text-center text-secondary mt-2">
        Sualları öyrənin və imtahana hazırlaşın
      </p>
    </div>
  );
}
