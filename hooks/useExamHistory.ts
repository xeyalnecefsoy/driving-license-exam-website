import { useState, useEffect } from "react";
import { ExamHistory } from "@/types";

export function useExamHistory() {
  const [history, setHistory] = useState<ExamHistory[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("examHistory");
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const addExamResult = (score: number, totalQuestions: number, mistakeCount: number) => {
    // START FIX: Calculate passed based on Score, not just mistakes.
    // Mistake count <= 1 is necessary BUT score must also be >= 9.
    // (If you skip 9 questions, you have 0 mistakes but score 1 -> FAIL)
    const passed = score >= (totalQuestions - 1); 
    // END FIX
    const newExam: ExamHistory = {
      id: `exam_${Date.now()}`,
      timestamp: Date.now(),
      score,
      totalQuestions,
      passed,
      mistakeCount,
    };

    const updated = [newExam, ...history].slice(0, 20); // Keep last 20 exams
    setHistory(updated);
    localStorage.setItem("examHistory", JSON.stringify(updated));
  };

  const getLastNExams = (n: number): ExamHistory[] => {
    return history.slice(0, n);
  };

  const calculateErrorRate = (lastN: number): number => {
    const recentExams = getLastNExams(lastN);
    if (recentExams.length === 0) return 100;

    const totalQuestions = recentExams.reduce((sum, exam) => sum + exam.totalQuestions, 0);
    const totalMistakes = recentExams.reduce((sum, exam) => sum + exam.mistakeCount, 0);

    return totalQuestions > 0 ? (totalMistakes / totalQuestions) * 100 : 100;
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("examHistory");
  };

  return {
    history,
    addExamResult,
    getLastNExams,
    calculateErrorRate,
    clearHistory,
  };
}
