import { Question } from "@/types";
import { Check, X, BookOpen, Bookmark } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  selectedOptionId?: string;
  onOptionSelect: (optionId: string) => void;
  showFeedback?: boolean;
  isBookmarked?: boolean;
  onBookmark?: () => void;
}

export function QuestionCard({
  question,
  selectedOptionId,
  onOptionSelect,
  showFeedback,
  isBookmarked,
  onBookmark,
}: QuestionCardProps) {
  const isCorrect = selectedOptionId === question.correctOptionId;

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      <div className="bg-card rounded-2xl p-6 shadow-lg border border-border relative">
        <div className="flex justify-between items-start gap-4 mb-6">
           <h2 className="text-xl font-semibold text-foreground leading-relaxed flex-1">
             {question.text}
           </h2>
           {onBookmark && (
             <button 
               onClick={onBookmark}
               className={cn(
                 "p-2 rounded-full transition-colors",
                 isBookmarked 
                   ? "text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20" 
                   : "text-muted-foreground hover:bg-muted"
               )}
               title={isBookmarked ? "Yaddaşdan sil" : "Yadda saxla"}
             >
                <Bookmark className={cn("w-6 h-6", isBookmarked && "fill-current")} />
             </button>
           )}
        </div>

        {/* NEW: Media Support (Video/Image) */}
        {question.media && (
          <div className="relative w-full max-w-sm mx-auto mb-6 rounded-xl overflow-hidden bg-muted border-2 border-border">
             {question.media.type === 'video' ? (
                <video 
                  src={question.media.src} 
                  controls 
                  className="w-full h-auto"
                  playsInline
                />
             ) : (
                <div className="relative aspect-video">
                  <Image
                    src={question.media.src}
                    alt="Sual mediası"
                    fill
                    className="object-contain"
                  />
                </div>
             )}
          </div>
        )}

        {/* Legacy Signs Image (Only if no media) */}
        {!question.media && question.image && (
          <div className="relative w-full max-w-sm mx-auto mb-6 rounded-xl overflow-hidden bg-white border-2 border-gray-300 p-4">
            <Image
              src={`/signs/${question.image}.png`}
              alt={`Yol nişanı ${question.image}`}
              width={300}
              height={300}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        )}

        <div className="flex flex-col gap-3">
          {question.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const isThisCorrect = option.id === question.correctOptionId;

            let variantClass =
              "bg-muted border-border hover:bg-black/5 dark:hover:bg-white/5";
            let icon = null;
            let textColorClass = "text-gray-900 dark:text-foreground";

            if (showFeedback && selectedOptionId) {
              if (isThisCorrect) {
                variantClass =
                  "bg-emerald-100 border-emerald-500 dark:bg-emerald-900 dark:border-emerald-400";
                textColorClass = "text-emerald-800 font-semibold dark:text-emerald-100";
                icon = <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-300 flex-shrink-0" />;
              } else if (isSelected) {
                variantClass =
                  "bg-red-100 border-red-500 dark:bg-red-900 dark:border-red-400";
                textColorClass = "text-red-800 font-semibold dark:text-red-100";
                icon = <X className="w-5 h-5 text-red-600 dark:text-red-300 flex-shrink-0" />;
              } else {
                variantClass =
                  "opacity-50 bg-muted border-border";
                textColorClass = "text-gray-500 dark:text-gray-400";
              }
            } else if (isSelected) {
              variantClass =
                "bg-blue-100 border-blue-500 ring-2 ring-blue-500 dark:bg-blue-900 dark:border-blue-400 dark:ring-blue-400";
              textColorClass = "text-blue-800 font-medium dark:text-blue-100";
            }

            return (
              <button
                key={option.id}
                onClick={() => (!selectedOptionId ? onOptionSelect(option.id) : null)}
                disabled={showFeedback && !!selectedOptionId}
                className={`relative flex items-center justify-between gap-3 w-full p-4 rounded-xl border-2 text-left transition-all disabled:cursor-not-allowed ${variantClass}`}
              >
                <span className={`flex-1 text-base ${textColorClass}`}>
                  {option.text}
                </span>
                {icon}
              </button>
            );
          })}
        </div>
      </div>

      {showFeedback && selectedOptionId && (
        <div
          className={`p-5 rounded-xl border-2 animate-in fade-in slide-in-from-top-2 shadow-md ${
            isCorrect
              ? "bg-emerald-50 border-emerald-400 text-emerald-800 dark:bg-emerald-900 dark:border-emerald-500 dark:text-emerald-100"
              : "bg-red-50 border-red-400 text-red-800 dark:bg-red-900 dark:border-red-500 dark:text-red-100"
          }`}
        >
          <p className="font-bold mb-2 text-lg">{isCorrect ? "✓ Doğrudur!" : "✗ Səhvdir!"}</p>
          <div className="mt-4 p-4 bg-white/90 border border-gray-200 rounded-xl dark:bg-slate-800 dark:border-slate-600">
            <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
              {question.explanation}
            </p>
            {question.ruleSource && (
              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="font-medium">Mənbə:</span>
                  <span className="opacity-90">{question.ruleSource}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
