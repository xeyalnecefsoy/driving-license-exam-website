"use client";

import { WifiOff, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function OfflineView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center animate-pulse">
        <WifiOff className="w-12 h-12 text-red-500" />
      </div>
      
      <div className="max-w-md space-y-2">
        <h1 className="text-2xl font-bold text-foreground">İnternet Bağlantısı Yoxdur</h1>
        <p className="text-secondary">
          Təəssüf ki, internetə qoşulu deyilsiniz. Bu səhifə yalnız onlayn rejimdə işləyir.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <Button 
          onClick={() => window.location.reload()} 
          className="w-full flex items-center justify-center gap-2"
        >
          <RefreshCcw className="w-5 h-5" />
          Yenilə
        </Button>
        
        <Link href="/" className="w-full">
          <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
            <Home className="w-5 h-5" />
            Ana Səhifə
          </Button>
        </Link>
      </div>
    </div>
  );
}
