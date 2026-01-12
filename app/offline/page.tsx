import { WifiOff, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İnternet Bağlantısı Yoxdur - Surol.az",
  description: "Zəhmət olmasa internet bağlantınızı yoxlayın.",
};

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center space-y-6">
      <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center animate-pulse">
        <WifiOff className="w-12 h-12 text-red-500" />
      </div>
      
      <div className="max-w-md space-y-2">
        <h1 className="text-2xl font-bold text-foreground">İnternet Bağlantısı Yoxdur</h1>
        <p className="text-secondary">
          Təəssüf ki, internetə qoşulu deyilsiniz. Bəzi səhifələrə daxil olmaq üçün internet tələb olunur.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <button 
          onClick={() => window.location.reload()} 
          className="flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all active:scale-95"
        >
          <RefreshCcw className="w-5 h-5" />
          Yenilə
        </button>
        
        <Link 
          href="/"
          className="flex items-center justify-center gap-2 px-5 py-3 bg-card border border-border text-foreground rounded-xl font-medium hover:bg-muted transition-all active:scale-95"
        >
          <Home className="w-5 h-5" />
          Ana Səhifə
        </Link>
      </div>
    </div>
  );
}
