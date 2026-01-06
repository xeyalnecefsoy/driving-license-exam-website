"use client";

import { QuestionCard } from "@/components/ui/QuestionCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Timer } from "@/components/ui/Timer";
import { Button } from "@/components/ui/Button";
import { useQuiz } from "@/context/QuizContext";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { ResultModal } from "./ResultModal";

export function QuizView() {
  const {
    mode,
    questions,
    currentQuestionIndex,
    currentQuestion,
    answers,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    exitMode,
    timeLeft,
    isFinished,
    score,
    bookmarks,
    toggleBookmark,
  } = useQuiz();

  if (!mode || !currentQuestion) return null;

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const selectedOptionId = answers[currentQuestion.id];
  const isExam = mode === "exam";
  const canProceed = !isExam || !!selectedOptionId;

  // Calculate stats for non-exam mode
  const answeredCount = Object.keys(answers).length;
  const wrongCount = answeredCount - score;

  return (
    <div className="w-full max-w-2xl mx-auto pb-24">
      {/* Compact Header */}
      <div className="sticky top-14 bg-background/95 backdrop-blur-sm border-b border-border z-40 -mx-4 px-4 py-3 mb-16">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={exitMode}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
            <div className="text-sm">
              <span className="font-semibold text-foreground">
                Sual {currentQuestionIndex + 1}
              </span>
              <span className="text-secondary"> / {questions.length}</span>
            </div>
          </div>
          {isExam ? (
            <Timer seconds={timeLeft} />
          ) : (
            <div className="flex items-center gap-3 text-sm font-medium">
              <span className="text-green-600 dark:text-green-400">
                {score} Doğru
              </span>
              <span className="text-red-600 dark:text-red-400">
                 {wrongCount} Səhv
              </span>
            </div>
          )}
        </div>
        <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
      </div>

      <QuestionCard
        question={currentQuestion}
        selectedOptionId={selectedOptionId}
        onOptionSelect={(optionId) => answerQuestion(currentQuestion.id, optionId)}
        showFeedback={!isExam || !!selectedOptionId}
        isBookmarked={bookmarks.includes(currentQuestion.id)}
        onBookmark={() => toggleBookmark(currentQuestion.id)}
      />

      {/* Floating Navigation Buttons */}
      <div className="fixed bottom-6 left-0 right-0 px-6 z-40 flex justify-between max-w-screen-xl mx-auto pointer-events-none">
        <div className="pointer-events-auto">
          {!isExam && (
            <Button
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
              size="lg"
              variant="outline"
              className={`h-14 px-6 shadow-lg bg-background ${currentQuestionIndex === 0 ? 'opacity-50' : ''}`}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Geriyə
            </Button>
          )}
        </div>

        <div className="pointer-events-auto">
          {canProceed && (
            <Button
              onClick={nextQuestion}
              size="lg"
              className="h-14 px-6 shadow-lg"
            >
              {isLastQuestion ? "Bitir" : "Növbəti"}
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          )}
        </div>
      </div>

      {isFinished && <ResultModal />}
    </div>
  );
}
