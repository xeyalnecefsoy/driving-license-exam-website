import { useAchievements } from "@/context/AchievementsContext";
import { BadgeCard } from "./BadgeCard";
import { badges } from "@/data/badges";

export function BadgesSection() {
  const { stats } = useAchievements();
  const earnedMap = new Map(stats.earnedBadges.map(b => [b.id, b.earnedAt]));

  // Sort badges: Earned first? Or just fixed order?
  // Let's keep fixed order but maybe highlight earned ones.
  // Actually, separating Earned vs Locked is nice, but keeping them together to show progress is better.
  
  return (
    <div className="w-full flex flex-col gap-6 my-12">
      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-foreground">
            Uğurlar
          </h2>
          <p className="text-xs text-muted-foreground">
            İmtahanları keçərək xüsusi badgelər qazan
          </p>
        </div>
        <div className="flex items-center gap-2 bg-secondary/30 px-3 py-1.5 rounded-full border border-border/50">
          <span className="text-sm font-bold text-primary">
             {stats.earnedBadges.length}
          </span>
          <span className="text-xs text-muted-foreground">
            / {badges.length}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {badges.map(badge => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            earnedAt={earnedMap.get(badge.id)}
          />
        ))}
      </div>
    </div>
  );
}
