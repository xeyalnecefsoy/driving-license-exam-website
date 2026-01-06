"use client";

import { useQuiz } from "@/context/QuizContext";
import { useExamHistory } from "@/hooks/useExamHistory";
import { questions as allQuestions } from "@/data/questions";
import { CheckCircle, XCircle, TrendingUp, Target, Award } from "lucide-react";

export function ReadinessWidget() {
  const { seenQuestions, mistakes } = useQuiz();
  const { calculateErrorRate, getLastNExams } = useExamHistory();

  const totalQuestions = allQuestions.length;
  const seenPercentage = (seenQuestions.length / totalQuestions) * 100;
  const lastTenExams = getLastNExams(10);
  const errorRate = calculateErrorRate(10);
  const hasMistakes = mistakes.length > 0;

  // Criteria
  const criterion1 = seenPercentage >= 90; // 90% of questions seen
  const criterion2 = lastTenExams.length >= 10 && errorRate < 10; // <10% error rate in last 10 exams
  const criterion3 = !hasMistakes; // Zero remaining mistakes

  const isReady = criterion1 && criterion2 && criterion3;

  return (
    <div className={`w-full rounded-xl p-5 shadow-sm border transition-all ${
      isReady 
        ? 'bg-green-50 border-green-500 dark:bg-success/5 dark:border-success' 
        : 'bg-card border-border'
    }`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          isReady ? 'bg-success' : 'bg-primary'
        }`}>
          {isReady ? (
            <Award className="w-5 h-5 text-white" />
          ) : (
            <Target className="w-5 h-5 text-white" />
          )}
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">Hazırlıq Statusu</h3>
          <p className="text-xs text-secondary">İmtahana hazırlıq səviyyəniz</p>
        </div>
      </div>

      {/* Criteria Checklist */}
      <div className="space-y-2.5 mb-4">
        <div className="flex items-center gap-2.5">
          {criterion1 ? (
            <CheckCircle className="w-4.5 h-4.5 text-green-600 dark:text-success flex-shrink-0" />
          ) : (
            <XCircle className="w-4.5 h-4.5 text-secondary flex-shrink-0" />
          )}
          <div className="flex-1">
            <p className={`text-sm ${criterion1 ? 'text-green-700 font-medium dark:text-success' : 'text-foreground'}`}>
              Sualların 90%-i görülüb
            </p>
            <p className="text-xs text-secondary">
              {seenQuestions.length} / {totalQuestions} ({Math.round(seenPercentage)}%)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {criterion2 ? (
            <CheckCircle className="w-4.5 h-4.5 text-green-600 dark:text-success flex-shrink-0" />
          ) : (
            <XCircle className="w-4.5 h-4.5 text-secondary flex-shrink-0" />
          )}
          <div className="flex-1">
            <p className={`text-sm ${criterion2 ? 'text-green-700 font-medium dark:text-success' : 'text-foreground'}`}>
              Son 10 imtahanda &lt;10% səhv
            </p>
            <p className="text-xs text-secondary">
              {lastTenExams.length < 10 
                ? `${lastTenExams.length} / 10 imtahan keçirilib` 
                : `Səhv dərəcəsi: ${errorRate.toFixed(1)}%`
              }
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {criterion3 ? (
            <CheckCircle className="w-4.5 h-4.5 text-green-600 dark:text-success flex-shrink-0" />
          ) : (
            <XCircle className="w-4.5 h-4.5 text-secondary flex-shrink-0" />
          )}
          <div className="flex-1">
            <p className={`text-sm ${criterion3 ? 'text-green-700 font-medium dark:text-success' : 'text-foreground'}`}>
              Səhv qeydləri təmizlənib
            </p>
            <p className="text-xs text-secondary">
              {mistakes.length} səhv qalıb
            </p>
          </div>
        </div>
      </div>

      {/* Readiness Message */}
      {isReady ? (
        <div className="bg-success text-white rounded-lg p-3.5 text-center">
          <div className="flex items-center justify-center gap-2 mb-0.5">
            <Award className="w-5 h-5" />
            <p className="text-base font-semibold">İMTAHANA HAZIRSINIZ!</p>
          </div>
          <p className="text-xs opacity-90">Bütün meyarlar yerinə yetirilib. Uğurlar!</p>
        </div>
      ) : (

        <div className="bg-muted rounded-lg p-3.5">
          <div className="flex items-center gap-2 mb-0.5">
            <TrendingUp className="w-4 h-4 text-primary" />
            <p className="text-sm font-medium text-foreground">Hazırlığa davam edin</p>
          </div>
          <p className="text-xs text-secondary">
            Bütün meyarları yerinə yetirin və imtahana tam hazır olun.
          </p>
        </div>
      )}
    </div>
  );
}
