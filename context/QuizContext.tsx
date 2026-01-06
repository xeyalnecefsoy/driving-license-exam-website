"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Question, QuizMode, ExamHistory } from "@/types";
import { questions as allQuestions } from "@/data/questions";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useQuestionStats } from "@/hooks/useQuestionStats";
import { useExamHistory } from "@/hooks/useExamHistory";
import { useAchievements } from "@/context/AchievementsContext";

interface QuizContextType {
  mode: QuizMode | null;
  currentQuestionIndex: number;
  currentQuestion: Question | null;
  questions: Question[];
  answers: Record<string, string>; // questionId -> optionId
  score: number;
  timeLeft: number;
  isFinished: boolean;
  mistakes: string[]; // List of mistake Question IDs
  seenQuestions: string[]; // Track all questions user has seen
  examMistakeCount: number; // Track mistakes in current exam session
  bookmarks: string[];
  examHistory: ExamHistory[];
  
  clearExamHistory: () => void;
  startLearning: (category?: string) => void;
  startCustomLearning: (customQuestions: Question[]) => void;
  startExam: () => void;
  startMistakeReview: () => void;
  startBookmarkReview: () => void;
  startMarathon: () => void;
  startHardMode: () => void;
  toggleBookmark: (questionId: string) => void;
  answerQuestion: (questionId: string, optionId: string) => void;
  nextQuestion: () => void;

  previousQuestion: () => void;
  finishQuiz: () => void;
  resetQuiz: () => void;
  exitMode: () => void;
  searchQuestions: (query: string) => Question[];
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<QuizMode | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [examMistakeCount, setExamMistakeCount] = useState(0);

  // Persist mistakes and seen questions
  // Persist mistakes and seen questions
  const [mistakes, setMistakes] = useLocalStorage<string[]>("dyp_mistakes", []);
  const [seenQuestions, setSeenQuestions] = useLocalStorage<string[]>("dyp_seen_questions", []);
  
  // Bookmarks state
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>("dyp_bookmarks", []);
  
  // Track question stats
  const { updateQuestionStats } = useQuestionStats();
  
  // Track exam history
  const { addExamResult, history: examHistory, clearHistory: clearExamHistory } = useExamHistory();

  // Achievement stats
  const { incrementStats } = useAchievements();

  // Timer effect for Exam mode
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (mode === "exam" && !isFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Time's up - auto fail
            finishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mode, isFinished, timeLeft]);

  const startLearning = (category?: string) => {
    let filtered = allQuestions;
    if (category) {
      filtered = allQuestions.filter((q) => q.category === category);
    }
    setQuestions(filtered.sort(() => Math.random() - 0.5));
    setMode("learning");
    resetState();
  };

  const startCustomLearning = (customQuestions: Question[]) => {
    setQuestions(customQuestions.sort(() => Math.random() - 0.5));
    setMode("learning");
    resetState();
  };

  const startExam = () => {
    // Realistic Exam Logic: Selected distribution
    // 3 Signs, 4 Rules, 2 Intersections, 1 General = 10 questions
    // Adjust these ratios as per real exam logic if needed
    
    const getQuestionsByCategory = (category: string, count: number) => {
      return allQuestions
        .filter((q) => q.category === category)
        .sort(() => Math.random() - 0.5)
        .slice(0, count);
    };

    const signs = getQuestionsByCategory('Signs', 3);
    const rules = getQuestionsByCategory('Rules', 4);
    const intersections = getQuestionsByCategory('Intersections', 2);
    const general = getQuestionsByCategory('General', 1);

    const selected = [...signs, ...rules, ...intersections, ...general]
      .sort(() => Math.random() - 0.5); // Shuffle final mix
      
    // Fallback if we don't have enough questions in a category (e.g. beta data)
    // just fill the rest with random unique questions
    if (selected.length < 10) {
      const existingIds = new Set(selected.map(q => q.id));
      const remaining = allQuestions
        .filter(q => !existingIds.has(q.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, 10 - selected.length);
      selected.push(...remaining);
    }

    setQuestions(selected);
    setMode("exam");
    setTimeLeft(15 * 60); // 15 minutes for 10 questions (standard is slightly tighter)
    setExamMistakeCount(0); // Reset exam mistake counter
    resetState();
  };

  const startMistakeReview = () => {
    const mistakeQuestions = allQuestions.filter((q) => mistakes.includes(q.id));
    setQuestions(mistakeQuestions);
    setMode("mistakes");
    resetState();
  };

  const startBookmarkReview = () => {
    const bookmarkedQuestions = allQuestions.filter((q) => bookmarks.includes(q.id));
    setQuestions(bookmarkedQuestions);
    setMode("learning");
    resetState();
  };

  const startMarathon = () => {
    // Marathon: All questions, shuffled
    setQuestions(allQuestions.slice().sort(() => Math.random() - 0.5));
    setMode("marathon");
    resetState();
  };

  const startHardMode = () => {
    // Hard Mode:
    // 1. Prioritize questions the user has mistaken before (if any)
    // 2. Add questions from "Intersections" and "Rules" which are typically harder
    // 3. Limit to 30 difficult questions
    
    // Get all historically mistaken questions
    const historyMistakes = allQuestions.filter(q => mistakes.includes(q.id));
    
    // Get hard categories
    const hardCategories = allQuestions.filter(q => 
        (q.category === 'Intersections' || q.category === 'Rules') && 
        !mistakes.includes(q.id)
    );
    
    // Combine: Mistakes first, then random hard questions
    const combined = [
        ...historyMistakes,
        ...hardCategories.sort(() => Math.random() - 0.5)
    ];
    
    // Slice to 30
    const finalSet = combined.slice(0, 30);
    
    setQuestions(finalSet);
    setMode("hard");
    resetState();
  };

  const searchQuestions = (query: string): Question[] => {
    if (!query || query.length < 2) return [];
    
    const lowerQuery = query.toLowerCase();
    return allQuestions.filter(q => 
      q.text.toLowerCase().includes(lowerQuery) || 
      q.explanation.toLowerCase().includes(lowerQuery) ||
      (q.category && q.category.toLowerCase().includes(lowerQuery))
    );
  };

  const toggleBookmark = (questionId: string) => {
    if (bookmarks.includes(questionId)) {
      setBookmarks(bookmarks.filter((id) => id !== questionId));
    } else {
      setBookmarks([...bookmarks, questionId]);
    }
  };

  const resetState = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setScore(0);
    setIsFinished(false);
  };

  const answerQuestion = (questionId: string, optionId: string) => {
    if (answers[questionId]) return; // Already answered

    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);

    // Track seen questions
    if (!seenQuestions.includes(questionId)) {
      setSeenQuestions([...seenQuestions, questionId]);
    }

    const question = questions.find((q) => q.id === questionId);
    if (question) {
      const isCorrect = question.correctOptionId === optionId;
      
      // Update question stats
      updateQuestionStats(questionId, isCorrect);
      
      // Increment total questions answered
      incrementStats({ questions: 1 });
      
      if (isCorrect) {
        setScore((prev) => prev + 1);
        if (mistakes.includes(questionId)) {
           setMistakes(mistakes.filter((id) => id !== questionId));
        }
      } else {
        // Wrong answer
        if (!mistakes.includes(questionId)) {
          setMistakes([...mistakes, questionId]);
        }
        
        // HARDCORE EXAM LOGIC: Immediate fail on 2nd mistake
        if (mode === "exam") {
          const newMistakeCount = examMistakeCount + 1;
          setExamMistakeCount(newMistakeCount);
          
          if (newMistakeCount >= 2) {
            // Immediate fail - terminate exam
            setTimeout(() => {
              finishQuiz();
            }, 1500); // Small delay to show the red feedback
          }
        }
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const finishQuiz = () => {
    if (isFinished) return; // Prevent multiple calls
    setIsFinished(true);
    
    // Save exam history if in exam mode
    if (mode === "exam") {
      addExamResult(score, questions.length, examMistakeCount);
      
      // Update achievements
      incrementStats({
        exams: 1,
        perfect: examMistakeCount === 0 ? 1 : 0
      });
    }
  };

  const resetQuiz = () => {
    setMode(null);
    setExamMistakeCount(0);
    resetState();
  };

  const exitMode = () => {
    setMode(null);
    setExamMistakeCount(0);
    resetState();
  };

  const value = {
    mode,
    questions,
    currentQuestionIndex,
    currentQuestion: questions[currentQuestionIndex] || null,
    answers,
    score,
    timeLeft,
    isFinished,
    mistakes,
    seenQuestions,
    examMistakeCount,
    startLearning,
    startCustomLearning,
    startExam,
    startMistakeReview,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    finishQuiz,
    resetQuiz,
    exitMode,
    bookmarks,
    examHistory,
    clearExamHistory,
    toggleBookmark,
    startBookmarkReview,
    startMarathon,
    startHardMode,
    searchQuestions,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
