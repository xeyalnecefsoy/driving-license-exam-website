"use client";

import { QuizProvider } from "@/context/QuizContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AchievementsProvider } from "@/context/AchievementsContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AchievementsProvider>
        <QuizProvider>{children}</QuizProvider>
      </AchievementsProvider>
    </ThemeProvider>
  );
}
