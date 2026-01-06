"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isPortable, setIsPortable] = useState(false);

  useEffect(() => {
    // Check if device is mobile-ish to show relevant UI
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsPortable(isMobile);

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  if (!deferredPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:bottom-6 md:left-auto md:right-6 md:w-80">
      <div className="bg-primary text-primary-foreground p-4 rounded-xl shadow-lg flex items-center justify-between gap-4 animate-in slide-in-from-bottom-5">
        <div className="flex-1">
          <h4 className="font-semibold text-sm">Tətbiqi Quraşdırın</h4>
          <p className="text-xs opacity-90">Daha sürətli giriş və oflayn rejim üçün.</p>
        </div>
        <Button 
            onClick={handleInstallClick} 
            variant="secondary" 
            size="sm"
            className="whitespace-nowrap bg-white text-primary hover:bg-white/90"
        >
          <Download className="w-4 h-4 mr-2" />
          Yüklə
        </Button>
      </div>
    </div>
  );
}
