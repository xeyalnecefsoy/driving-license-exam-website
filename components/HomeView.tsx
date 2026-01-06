"use client";

import { useQuiz } from "@/context/QuizContext";
import { useState, useEffect } from "react";
import { Category } from "@/types";
import { questions as allQuestions } from "@/data/questions";
import { HeroSection } from "@/components/home/HeroSection";
import { PrimaryCTA } from "@/components/home/PrimaryCTA";
import { QuickStats } from "@/components/home/QuickStats";
import { ActionGrid } from "@/components/home/ActionGrid";
import { CategorySelector } from "@/components/home/CategorySelector";
import { ReadinessWidget } from "@/components/ReadinessWidget";
import { ChevronDown, ChevronUp } from "lucide-react";
import { BadgesSection } from "@/components/achievements/BadgesSection";
import { AchievementToast } from "@/components/achievements/AchievementToast";
import { WeeklyProgress } from "@/components/achievements/WeeklyProgress";
import { SearchBar } from "@/components/home/SearchBar";
import { TopicAnalysis } from "@/components/home/TopicAnalysis";
import { InstallPrompt } from "@/components/ui/InstallPrompt";

export function HomeView() {
  const { 
    startLearning, 
    startCustomLearning, 
    startExam, 
    startMistakeReview, 
    startMarathon,
    startHardMode,
    mistakes, 
    mode, 
    seenQuestions, 
    bookmarks, 
    startBookmarkReview 
} = useQuiz();
  const [mounted, setMounted] = useState(false);
  const [showReadiness, setShowReadiness] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mode) return null;

  const totalQuestions = allQuestions.length;
  const progressPercentage = mounted ? Math.round((seenQuestions.length / totalQuestions) * 100) : 0;
  const mistakeCount = mounted ? mistakes.length : 0;
  const bookmarkCount = mounted ? bookmarks.length : 0;

  // Simple readiness check
  const seenPercentage = (seenQuestions.length / totalQuestions) * 100;
  const isReady = seenPercentage >= 90;

  const handleStartLearning = () => {
    startLearning(undefined);
  };

  const handleCategorySelect = (category: Category) => {
    const categoryQuestions = allQuestions.filter(q => q.category === category);
    startCustomLearning(categoryQuestions);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <AchievementToast />
      {/* Hero Section - Full width */}
      <HeroSection />

      {/* Content wrapper with proper max-width and padding */}
      <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
        <SearchBar />

        <PrimaryCTA
          isReady={isReady}
          onStartLearning={handleStartLearning}
          onStartExam={startExam}
        />

        <QuickStats
          totalQuestions={totalQuestions}
          seenQuestions={seenQuestions.length}
          mistakes={mistakes.length}
          progressPercentage={progressPercentage}
        />

        {/* Category Selector */}
        <CategorySelector onSelectCategory={handleCategorySelect} />

        <ActionGrid
          onStartLearning={handleStartLearning}
          onStartExam={startExam}
          onStartMistakeReview={startMistakeReview}
          onStartBookmarkReview={startBookmarkReview}
          onStartMarathon={startMarathon}
          onStartHardMode={startHardMode}
          mistakeCount={mistakeCount}
          bookmarkCount={bookmarkCount}
          isReady={isReady}
        />

        <TopicAnalysis />

        <WeeklyProgress />

        <BadgesSection />

        {/* Collapsible Readiness Widget */}
        <div className="w-full max-w-2xl">
          <button
            onClick={() => setShowReadiness(!showReadiness)}
            className="w-full flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:bg-muted transition-colors mb-2"
          >
            <span className="text-sm font-medium text-foreground">
              Hazırlıq Statusu
            </span>
            {showReadiness ? (
              <ChevronUp className="w-4 h-4 text-secondary" />
            ) : (
              <ChevronDown className="w-4 h-4 text-secondary" />
            )}
          </button>
          {showReadiness && <ReadinessWidget />}
        </div>

        <p className="text-xs text-center text-secondary mt-8">
          © 2025 Surol.az. Beta versiya.
        </p>
      </div>
      <InstallPrompt />
    </div>
  );
}
