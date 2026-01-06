"use client";

import { useQuiz } from "@/context/QuizContext";
import { useQuestionStats } from "@/hooks/useQuestionStats";
import { questions as allQuestions } from "@/data/questions";
import { Category } from "@/types";
import { PieChart, List, TrendingUp } from "lucide-react";

export function TopicAnalysis() {
  const { getAllStats } = useQuestionStats();
  const stats = getAllStats();

  // Aggregate stats by category
  const categoryStats: Record<Category, { total: number; correct: number; incorrect: number }> = {
    'Signs': { total: 0, correct: 0, incorrect: 0 },
    'Rules': { total: 0, correct: 0, incorrect: 0 },
    'Intersections': { total: 0, correct: 0, incorrect: 0 },
    'General': { total: 0, correct: 0, incorrect: 0 },
  };

  allQuestions.forEach(q => {
    const qStats = stats[q.id];
    const cat = q.category;
    
    if (categoryStats[cat]) {
      categoryStats[cat].total++; // Count total available questions in category
      if (qStats) {
        categoryStats[cat].correct += qStats.correctCount;
        categoryStats[cat].incorrect += qStats.incorrectCount;
      }
    }
  });

  return (
    <div className="w-full max-w-2xl mx-auto my-6 p-4 bg-card border border-border rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <PieChart className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Mövzu Analizi</h3>
      </div>
      
      <div className="space-y-4">
        {(Object.keys(categoryStats) as Category[]).map((cat) => {
          const data = categoryStats[cat];
          const attempts = data.correct + data.incorrect;
          // Calculate success rate based on *attempts*, avoiding division by zero
          const successRate = attempts > 0 ? Math.round((data.correct / attempts) * 100) : 0;
          
          return (
            <div key={cat} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-foreground">{getCategoryName(cat)}</span>
                <span className={`font-mono ${
                    attempts === 0 ? 'text-secondary' : 
                    successRate >= 80 ? 'text-green-600 dark:text-green-400' :
                    successRate >= 50 ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-red-500'
                }`}>
                  {attempts > 0 ? `${successRate}%` : '---'}
                </span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    successRate >= 80 ? 'bg-green-500' :
                    successRate >= 50 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${attempts > 0 ? successRate : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-secondary px-1">
                <span>{attempts} cəhd</span>
                <span>{data.total} sual bazada</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getCategoryName(cat: Category): string {
    switch (cat) {
        case 'Signs': return 'Yol Nişanları';
        case 'Rules': return 'Hərəkət Qaydaları';
        case 'Intersections': return 'Yolayrıcları';
        case 'General': return 'Ümumi / Texniki';
        default: return cat;
    }
}
