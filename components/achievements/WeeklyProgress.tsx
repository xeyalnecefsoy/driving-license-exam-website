import { useQuiz } from "@/context/QuizContext";
import { BarChart3, Trash2, AlertTriangle, X } from "lucide-react";
import { useState } from "react";

export function WeeklyProgress() {
  const { examHistory, clearExamHistory } = useQuiz();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Get last 10 exams in chronological order (history is reverse chrono usually)
  // Our hook puts new ones at start, so reverse to show oldest -> newest
  // Get last 10 exams in chronological order (history is reverse chrono usually)
  // Our hook puts new ones at start, so reverse to show oldest -> newest
  const recentExams = [...examHistory].reverse().slice(-10);
  const isEmpty = examHistory.length === 0;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('az-AZ', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  const confirmDelete = () => {
    clearExamHistory();
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="w-full max-w-2xl mt-6">
        <div className="flex flex-col gap-1 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <BarChart3 className="w-5 h-5 text-indigo-500" />
              </div>
              <div>
                 <h3 className="text-sm font-semibold text-foreground">İmtahan Tarixçəsi</h3>
                 <p className="text-xs text-secondary">Son 10 imtahanın nəticəsi</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!isEmpty && (
                <button 
                  onClick={() => setShowDeleteModal(true)}
                  className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md transition-colors"
                  title="Tarixçəni təmizlə"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                 Maks. 10 bal
              </span>
            </div>
          </div>
          <p className="text-xs text-secondary mt-2 leading-relaxed">
            Qrafikdə hər sütun bir imtahanı təmsil edir. Üzərindəki rəqəm <span className="font-medium text-foreground">topladığınız balı</span> göstərir (məs: 9/10).
          </p>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm relative overflow-hidden">
          {isEmpty && (
            <div className="absolute inset-0 z-20 bg-background/50 backdrop-blur-[1px] flex items-center justify-center">
              <div className="bg-background border border-border px-4 py-2 rounded-lg shadow-sm text-sm text-secondary">
                Hələ heç bir imtahan nəticəsi yoxdur
              </div>
            </div>
          )}

          {/* Decorative Grid Lines */}
          <div className="absolute inset-x-6 top-6 bottom-16 flex flex-col justify-between pointer-events-none opacity-20">
             <div className="w-full h-px border-t border-dashed border-foreground"></div>
             <div className="w-full h-px border-t border-dashed border-foreground"></div>
             <div className="w-full h-px border-t border-dashed border-foreground"></div>
          </div>

          <div className="flex items-end justify-between h-48 gap-2 relative z-10">
            {recentExams.map((exam, index) => {
              const percentage = Math.round((exam.score / exam.totalQuestions) * 100);
              const heightPercent = Math.max(15, percentage);
              
              // Fix: Calculate pass status based on score, not just mistake count.
              // In DYP, you need 9/10 to pass. 
              const isPassed = exam.score >= 9;
              
              return (
                <div key={exam.id} className="flex-1 flex flex-col items-center gap-2 group relative">
                  
                  {/* Score Badge */}
                  <div className={`
                    mb-1 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm transition-all whitespace-nowrap
                    ${isPassed 
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800" 
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800"}
                  `}>
                    {exam.score}/{exam.totalQuestions}
                  </div>

                  {/* Bar */}
                  <div 
                    className={`w-full max-w-[28px] rounded-lg transition-all duration-500 ease-out shadow-sm ${
                      isPassed 
                        ? "bg-gradient-to-t from-emerald-600 to-emerald-400" 
                        : "bg-gradient-to-t from-red-600 to-red-400"
                    } group-hover:scale-105 group-hover:brightness-110 cursor-pointer`}
                    style={{ height: `${heightPercent}%` }}
                  >
                  </div>
                  
                  {/* Date Label */}
                  <span className="text-[10px] text-secondary font-medium tracking-tight whitespace-nowrap">
                    {formatDate(exam.timestamp)}
                  </span>
                </div>
              );
            })}
            
             {/* Placeholders */}
             {Array.from({ length: Math.max(0, 10 - recentExams.length) }).map((_, i) => (
               <div key={`empty-${i}`} className="flex-1 flex flex-col items-center gap-2 opacity-10">
                 <div className="text-[10px] font-bold text-transparent">-</div>
                 <div className="w-full max-w-[28px] bg-muted h-full min-h-[10%] rounded-lg"></div>
                 <span className="text-[10px] text-transparent">--.--</span>
               </div>
             ))}
          </div>
          
          {/* Legend */}
          <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-dashed border-border/50">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
               <span className="text-xs text-secondary">Uğurlu (10-9 bal)</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-sm bg-red-500"></div>
               <span className="text-xs text-secondary">Uğursuz (8-0 bal)</span>
             </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card w-full max-w-sm rounded-2xl shadow-xl border border-border overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Tarixçəni Silmək?</h3>
              <p className="text-secondary text-sm mb-6">
                Bütün imtahan nəticələriniz birdəfəlik silinəcək. Bu əməliyyatı geri qaytarmaq mümkün deyil.
              </p>
              
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-colors"
                >
                  Ləğv et
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium shadow-md shadow-red-500/20 transition-colors"
                >
                  Bəli, Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
