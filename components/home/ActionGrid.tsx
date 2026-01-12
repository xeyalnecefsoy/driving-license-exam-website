"use client";

import { BookOpen, PlayCircle, AlertTriangle, Info, Bookmark, Zap, BrainCircuit } from "lucide-react";
import Link from "next/link";

interface ActionGridProps {
  onStartLearning: () => void;
  onStartExam: () => void;
  onStartMistakeReview: () => void;
  onStartBookmarkReview: () => void;
  onStartMarathon: () => void;
  onStartHardMode: () => void;
  mistakeCount: number;
  bookmarkCount: number;
  isReady: boolean;
}

export function ActionGrid({
  onStartLearning,
  onStartExam,
  onStartMistakeReview,
  onStartBookmarkReview,
  onStartMarathon,
  onStartHardMode,
  mistakeCount,
  bookmarkCount,
  isReady,
}: ActionGridProps) {
  const hasMistakes = mistakeCount > 0;
  const hasBookmarks = bookmarkCount > 0;

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <h2 className="text-sm font-semibold text-foreground mb-3">Əlavə Seçimlər</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Learning Mode */}
        {/* ... (keep existing buttons, just verifying layout) */}
        
        <button
          onClick={onStartLearning}
          className="flex flex-col items-center justify-center p-4 bg-card hover:bg-muted border border-border hover:border-primary rounded-lg transition-all text-center h-28"
        >
          <div className="w-10 h-10 mb-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-medium text-foreground">Təlim</span>
          <span className="text-xs text-secondary">Sualları öyrən</span>
        </button>

        {/* Exam Mode */}
        <button
          onClick={onStartExam}
          className="flex flex-col items-center justify-center p-4 bg-card hover:bg-muted border border-border hover:border-success rounded-lg transition-all text-center h-28"
        >
          <div className="w-10 h-10 mb-2 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30 flex items-center justify-center">
            <PlayCircle className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-medium text-foreground">İmtahan</span>
          <span className="text-xs text-secondary">10 sual, 20 dəq</span>
        </button>

        {/* Mistakes Review */}
        <button
          onClick={onStartMistakeReview}
          disabled={!hasMistakes}
          className={`flex flex-col items-center justify-center p-4 bg-card border rounded-lg transition-all text-center h-28 ${
            hasMistakes
              ? 'hover:bg-muted hover:border-danger border-border'
              : 'opacity-50 cursor-not-allowed border-border'
          }`}
        >
          <div className="w-10 h-10 mb-2 rounded-lg bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-medium text-foreground">Səhvlər</span>
          <span className="text-xs text-secondary">
            {hasMistakes ? `${mistakeCount} səhv` : 'Səhv yoxdur'}
          </span>
        </button>

        {/* Bookmarks Review */}
        <button
          onClick={onStartBookmarkReview}
          disabled={!hasBookmarks}
          className={`flex flex-col items-center justify-center p-4 bg-card border rounded-lg transition-all text-center h-28 ${
            hasBookmarks
              ? 'hover:bg-muted hover:border-yellow-500 border-border'
              : 'opacity-50 cursor-not-allowed border-border'
          }`}
        >
          <div className="w-10 h-10 mb-2 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/30 flex items-center justify-center">
            <Bookmark className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-medium text-foreground">Seçilmişlər</span>
          <span className="text-xs text-secondary">
            {hasBookmarks ? `${bookmarkCount} sual` : 'Boşdur'}
          </span>
        </button>

      <button
          onClick={onStartMarathon}
          className="flex flex-col items-center justify-center p-4 bg-card hover:bg-muted border border-border hover:border-orange-500 rounded-lg transition-all text-center h-28"
        >
          <div className="w-10 h-10 mb-2 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/30 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-medium text-foreground">Marafon</span>
          <span className="text-xs text-secondary">Bütün suallar</span>
        </button>

        {/* Hard Mode */}
        <button
          onClick={onStartHardMode}
          className="flex flex-col items-center justify-center p-4 bg-card hover:bg-muted border border-border hover:border-purple-500 rounded-lg transition-all text-center h-28"
        >
          <div className="w-10 h-10 mb-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg shadow-purple-500/30 flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-medium text-foreground">Çətin Sınaq</span>
          <span className="text-xs text-secondary">Qarışıq 30 sual</span>
        </button>

        {/* Reference */}
        <Link
          href="/reference"
          className="flex flex-col items-center justify-center p-4 bg-card hover:bg-muted border border-border hover:border-primary rounded-lg transition-all text-center h-28 col-span-2 lg:col-span-1"
        >
          <div className="w-10 h-10 mb-2 rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 shadow-lg shadow-violet-500/30 flex items-center justify-center">
            <Info className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-medium text-foreground">Məlumat</span>
          <span className="text-xs text-secondary">Nişan, cərimə və bilik</span>
        </Link>
      </div>
    </div>
  );
}
