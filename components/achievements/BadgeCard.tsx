import { Badge } from "@/types";
import { LucideIcon, Flag, TrendingUp, Trophy, Star, BookOpen, Target, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Flag, TrendingUp, Trophy, Star, BookOpen, Target
};

interface BadgeCardProps {
  badge: Badge;
  earnedAt?: number;
}

export function BadgeCard({ badge, earnedAt }: BadgeCardProps) {
  const Icon = iconMap[badge.icon] || Flag;
  const isEarned = !!earnedAt;

  return (
    <div className={cn(
      "relative group flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300",
      isEarned
        ? "bg-gradient-to-br from-background to-secondary/10 border-primary/20 shadow-lg shadow-primary/5 hover:border-primary/40 hover:shadow-primary/10 hover:-translate-y-1"
        : "bg-secondary/5 border-border/40 hover:bg-secondary/10"
    )}>
      <div className={cn(
        "w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors duration-300",
        isEarned 
          ? "bg-primary/10 text-primary ring-1 ring-primary/20 group-hover:bg-primary/20 group-hover:scale-110 transition-transform" 
          : "bg-secondary/20 text-muted-foreground/40"
      )}>
        {isEarned ? <Icon className="w-7 h-7" /> : <Lock className="w-6 h-6" />}
      </div>
      
      <h3 className={cn(
        "font-bold text-sm text-center mb-1.5",
        isEarned ? "text-foreground" : "text-muted-foreground"
      )}>
        {badge.name}
      </h3>
      
      <p className="text-[11px] text-muted-foreground/70 text-center line-clamp-2 leading-relaxed px-1">
        {badge.description}
      </p>

      {isEarned && (
        <div className="absolute top-3 right-3">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        </div>
      )}
    </div>
  );
}
