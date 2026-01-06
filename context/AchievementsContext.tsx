"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserStats, Badge } from "@/types";
import { badges } from "@/data/badges";

const INITIAL_STATS: UserStats = {
  totalExams: 0,
  perfectExams: 0,
  totalQuestionsAnswered: 0,
  earnedBadges: [],
};

interface AchievementsContextType {
  stats: UserStats;
  newBadges: Badge[];
  incrementStats: (updates: { exams?: number; perfect?: number; questions?: number }) => void;
  clearNewBadges: () => void;
  getEarnedBadgesDetail: () => Badge[];
}

const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

export function AchievementsProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("userStats");
    if (stored) {
      try {
        setStats(JSON.parse(stored));
      } catch {
        setStats(INITIAL_STATS);
      }
    }
    setMounted(true);
  }, []);

  const saveStats = (newStats: UserStats) => {
    setStats(newStats);
    localStorage.setItem("userStats", JSON.stringify(newStats));
  };

  const checkBadges = (currentStats: UserStats): Badge[] => {
    const newlyEarned: Badge[] = [];
    const earnedIds = new Set(currentStats.earnedBadges.map((b) => b.id));

    badges.forEach((badge) => {
      if (earnedIds.has(badge.id)) return;

      let earned = false;
      switch (badge.type) {
        case "exam_count":
          earned = currentStats.totalExams >= badge.requirement;
          break;
        case "perfect_exam":
          earned = currentStats.perfectExams >= badge.requirement;
          break;
        case "question_count":
          earned = currentStats.totalQuestionsAnswered >= badge.requirement;
          break;
      }

      if (earned) {
        newlyEarned.push(badge);
      }
    });

    return newlyEarned;
  };

  const incrementStats = (updates: { exams?: number; perfect?: number; questions?: number }) => {
    const nextStats = { ...stats };
    if (updates.exams) nextStats.totalExams += updates.exams;
    if (updates.perfect) nextStats.perfectExams += updates.perfect;
    if (updates.questions) nextStats.totalQuestionsAnswered += updates.questions;

    const newlyEarned = checkBadges(nextStats);
    if (newlyEarned.length > 0) {
      const newBadgeEntries = newlyEarned.map((b) => ({ id: b.id, earnedAt: Date.now() }));
      nextStats.earnedBadges = [...nextStats.earnedBadges, ...newBadgeEntries];
      setNewBadges(newlyEarned);
    }

    saveStats(nextStats);
  };

  const clearNewBadges = () => setNewBadges([]);

  const getEarnedBadgesDetail = () => {
    const earnedIds = new Set(stats.earnedBadges.map((b) => b.id));
    return badges.filter((b) => earnedIds.has(b.id));
  };

  if (!mounted) {
    return null; // or loading spinner, avoid hydration mismatch
  }

  return (
    <AchievementsContext.Provider
      value={{ stats, newBadges, incrementStats, clearNewBadges, getEarnedBadgesDetail }}
    >
      {children}
    </AchievementsContext.Provider>
  );
}

export function useAchievements() {
  const context = useContext(AchievementsContext);
  if (context === undefined) {
    throw new Error("useAchievements must be used within an AchievementsProvider");
  }
  return context;
}
