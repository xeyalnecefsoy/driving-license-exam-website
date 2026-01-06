"use client";

import { HomeView } from "@/components/HomeView";
import { QuizView } from "@/components/QuizView";
import { useQuiz } from "@/context/QuizContext";

// Note: We might need to handle routing context if we move away from single page mode logic
// But for now, app structure with pages is better.
// Actually, since we are using nextjs app router, the layout wraps this page.
// The quiz context is inside layout. Let's make sure navigating away doesn't break things.
// Navigation will reset the quiz state unless we persist it. That's fine.

export default function Page() {
  const { mode } = useQuiz();

  return (
    <>
      <HomeView />
      {mode && (
        <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
             <div className="w-full max-w-md mx-auto p-4 md:max-w-2xl lg:max-w-4xl min-h-screen">
                <QuizView />
             </div>
        </div>
      )}
    </>
  );
}
