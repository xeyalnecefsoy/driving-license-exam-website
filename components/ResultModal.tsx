import { Button } from "@/components/ui/Button";
import { useQuiz } from "@/context/QuizContext";
import { CheckCircle2, XCircle, RotateCcw, Home, Trophy, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ResultModal() {
  const { score, questions, mistakes, resetQuiz, mode, exitMode, examMistakeCount, timeLeft } = useQuiz();
  const [showConfetti, setShowConfetti] = useState(false);

  if (mode === "learning") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="bg-card rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center space-y-6 animate-in zoom-in-50 duration-300 border-2 border-border">
           <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
             <CheckCircle2 className="w-10 h-10 text-white" />
           </div>
           <div>
             <h2 className="text-2xl font-bold text-foreground mb-2">Təlim Bitdi!</h2>
             <p className="text-secondary">
               Təlimi tamamladınız.
             </p>
           </div>
           
           <div className="flex gap-3">
             <Button variant="outline" fullWidth onClick={resetQuiz}>
               <RotateCcw className="w-4 h-4 mr-2" />
               Yenidən
             </Button>
             <Button variant="primary" fullWidth onClick={exitMode}>
               <Home className="w-4 h-4 mr-2" />
               Ana Səhifə
             </Button>
           </div>
        </div>
      </div>
    );
  }

  // EXAM MODE LOGIC
  const mistakeCount = mode === "exam" ? examMistakeCount : (questions.length - score);
  const isPass = mistakeCount <= 1;
  const percentage = Math.round((score / questions.length) * 100);
  const isTimeout = timeLeft === 0;

  // Trigger confetti on success
  useEffect(() => {
    if (isPass && mode === "exam") {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isPass, mode]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
       {/* Confetti Effect */}
       {showConfetti && (
         <div className="fixed inset-0 pointer-events-none overflow-hidden">
           {[...Array(50)].map((_, i) => (
             <div
               key={i}
               className="absolute w-2 h-2 animate-confetti"
               style={{
                 left: `${Math.random() * 100}%`,
                 top: '-10px',
                 backgroundColor: ['#fbbf24', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'][Math.floor(Math.random() * 5)],
                 animationDelay: `${Math.random() * 3}s`,
                 animationDuration: `${3 + Math.random() * 2}s`,
               }}
             />
           ))}
         </div>
       )}

       <div className="bg-card rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-6 animate-in zoom-in-50 duration-300 border-2 border-border relative">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-lg ${
            isPass 
              ? 'bg-gradient-to-br from-green-400 to-green-600' 
              : 'bg-gradient-to-br from-red-400 to-red-600'
          }`}>
             {isPass ? (
               <Trophy className="w-12 h-12 text-white" />
             ) : (
               <XCircle className="w-12 h-12 text-white" />
             )}
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {isPass ? "İmtahanı Keçdiniz!" : "İmtahan Uğursuz Oldu"}
            </h2>
            <p className="text-secondary text-base">
              {isPass 
                ? "Təbriklər! Yollarda uğurlar!" 
                : isTimeout
                  ? "Vaxt bitdi! Təəssüf ki, imtahandan kəsildiniz."
                  : `Səhvlərin sayı: ${mistakeCount}. Yol hərəkəti qaydalarını daha yaxşı öyrənməlisiniz.`}
            </p>
            
            {/* Score Circle */}
            <div className="mt-6 mb-4">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-border bg-muted">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${isPass ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {percentage}%
                  </div>
                  <div className="text-xs text-secondary">Nəticə</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-xl border border-border">
               <div>
                  <p className="text-sm text-secondary mb-1">Doğru</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{score}</p>
               </div>
               <div>
                  <p className="text-sm text-secondary mb-1">Səhv</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">{mistakeCount}</p>
               </div>
            </div>
          </div>
          
          <div className="flex gap-3">
             <Button variant="outline" fullWidth onClick={resetQuiz}>
               <RotateCcw className="w-4 h-4 mr-2" />
               Yenidən
             </Button>
             <Button variant="primary" fullWidth onClick={exitMode}>
               <Home className="w-4 h-4 mr-2" />
               Ana Səhifə
             </Button>
           </div>
       </div>
    </div>
  );
}
