import { useEffect, useState } from "react";
import { useAchievements } from "@/context/AchievementsContext";
import { Badge } from "@/types";
import { LucideIcon, Flag, TrendingUp, Trophy, Star, BookOpen, Target } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Flag, TrendingUp, Trophy, Star, BookOpen, Target
};

export function AchievementToast() {
  const { newBadges, clearNewBadges } = useAchievements();
  const [visibleBadges, setVisibleBadges] = useState<Badge[]>([]);

  useEffect(() => {
    if (newBadges.length > 0) {
      setVisibleBadges(prev => [...prev, ...newBadges]);
      clearNewBadges();
    }
  }, [newBadges, clearNewBadges]);

  useEffect(() => {
    if (visibleBadges.length > 0) {
      const timer = setTimeout(() => {
        setVisibleBadges(prev => prev.slice(1));
      }, 4000); // Show for 4 seconds
      return () => clearTimeout(timer);
    }
  }, [visibleBadges]);

  if (visibleBadges.length === 0) return null;

  const currentBadge = visibleBadges[0];
  const Icon = iconMap[currentBadge.icon] || Flag;

  return (
    <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-top-full fade-in duration-500">
      <div className="bg-background border border-green-500/20 shadow-lg shadow-green-500/10 rounded-xl p-4 flex items-center gap-4 max-w-xs md:max-w-sm backdrop-blur-sm bg-white/90 dark:bg-black/90">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 text-green-600 flex items-center justify-center shrink-0 border border-green-500/20">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xs text-green-600 uppercase tracking-wider mb-0.5">Yeni Uğur Qazanıldı!</span>
          <p className="font-bold text-sm text-foreground">{currentBadge.name}</p>
          <p className="text-xs text-muted-foreground leading-tight mt-1">{currentBadge.description}</p>
        </div>
      </div>
    </div>
  );
}
