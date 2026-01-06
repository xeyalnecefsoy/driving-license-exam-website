"use client";

import { Category } from "@/types";
import { questions } from "@/data/questions";
import { TrafficCone, FileText, GitFork, HelpCircle } from "lucide-react";

interface CategorySelectorProps {
  onSelectCategory: (category: Category) => void;
}

const categoryConfig: Record<Category, { 
  name: string; 
  icon: React.ElementType; 
  iconClass: string;
  bgClass: string;
  count: number;
}> = {
  Signs: {
    name: "Nişanlar",
    icon: TrafficCone,
    iconClass: "text-white",
    bgClass: "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30",
    count: questions.filter(q => q.category === "Signs").length
  },
  Rules: {
    name: "Qaydalar",
    icon: FileText,
    iconClass: "text-white",
    bgClass: "bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30",
    count: questions.filter(q => q.category === "Rules").length
  },
  Intersections: {
    name: "Yolayrıcları",
    icon: GitFork,
    iconClass: "text-white",
    bgClass: "bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30",
    count: questions.filter(q => q.category === "Intersections").length
  },
  General: {
    name: "Ümumi",
    icon: HelpCircle,
    iconClass: "text-white",
    bgClass: "bg-gradient-to-br from-violet-500 to-violet-600 shadow-lg shadow-violet-500/30",
    count: questions.filter(q => q.category === "General").length
  }
};

const categories: Category[] = ["Signs", "Rules", "Intersections", "General"];

export function CategorySelector({ onSelectCategory }: CategorySelectorProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <h2 className="text-sm font-semibold text-foreground mb-3">
        Kateqoriya üzrə öyrən
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.map((category) => {
          const config = categoryConfig[category];
          const Icon = config.icon;
          
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className="flex flex-col items-center justify-center p-4 bg-card hover:bg-muted border border-border hover:border-primary rounded-lg transition-all text-center h-28 group"
            >
              <div className={`w-10 h-10 mb-2 rounded-lg ${config.bgClass} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className={`w-5 h-5 ${config.iconClass}`} />
              </div>
              <span className="text-sm font-medium text-foreground">{config.name}</span>
              <span className="text-xs text-secondary">{config.count} sual</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
