import { useState, useEffect } from "react";
import { QuestionStats } from "@/types";

// Helper to get question stats from LocalStorage
export function useQuestionStats() {
  const [stats, setStats] = useState<Record<string, QuestionStats>>({});

  useEffect(() => {
    const stored = localStorage.getItem("questionStats");
    if (stored) {
      try {
        setStats(JSON.parse(stored));
      } catch {
        setStats({});
      }
    }
  }, []);

  const updateQuestionStats = (
    questionId: string,
    wasCorrect: boolean
  ) => {
    setStats((prev) => {
      const existing = prev[questionId] || {
        questionId,
        lastSeen: 0,
        correctCount: 0,
        incorrectCount: 0,
      };

      const updated = {
        ...existing,
        lastSeen: Date.now(),
        correctCount: wasCorrect ? existing.correctCount + 1 : existing.correctCount,
        incorrectCount: !wasCorrect ? existing.incorrectCount + 1 : existing.incorrectCount,
      };

      const newStats = { ...prev, [questionId]: updated };
      localStorage.setItem("questionStats", JSON.stringify(newStats));
      return newStats;
    });
  };

  const getQuestionStat = (questionId: string): QuestionStats | null => {
    return stats[questionId] || null;
  };

  const getAllStats = (): Record<string, QuestionStats> => {
    return stats;
  };

  return { updateQuestionStats, getQuestionStat, getAllStats };
}
