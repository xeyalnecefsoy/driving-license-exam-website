"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { BookOpen, Home, Trophy, CarFront } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isActive = (path: string) => pathname === path;
  const isDark = mounted && theme === "dark";
  
  // Explicit colors for cross-browser consistency
  const headerBg = isDark ? "#0f172a" : "#ffffff";
  const borderColor = isDark ? "#1e293b" : "#e5e7eb";
  const textColor = isDark ? "#f8fafc" : "#111827";
  const mutedTextColor = isDark ? "#94a3b8" : "#6b7280";
  const activeButtonBg = isDark ? "#1e3a5f" : "#dbeafe";
  const activeButtonText = isDark ? "#93c5fd" : "#1d4ed8";
  const hoverBg = isDark ? "#1e293b" : "#f3f4f6";
  
  return (
    <header 
      className="sticky top-0 z-50 w-full shadow-sm"
      style={{ 
        backgroundColor: headerBg,
        borderBottom: `1px solid ${borderColor}`
      }}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div 
            className="flex h-10 w-10 items-center justify-center rounded-xl shadow-lg transition-shadow duration-300"
            style={{ background: "linear-gradient(to bottom right, #2563eb, #4f46e5)" }}
          >
            <CarFront className="w-6 h-6 text-white" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span 
              className="font-bold text-lg leading-tight"
              style={{ color: textColor }}
            >
              Surol.az
            </span>
            <span 
              className="text-[10px] uppercase tracking-wider"
              style={{ color: mutedTextColor }}
            >
              Sürücülük İmtahanı
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 md:gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 md:px-4 rounded-lg text-sm font-medium transition-all duration-200"
            style={{ 
              backgroundColor: isActive("/") ? activeButtonBg : "transparent",
              color: isActive("/") ? activeButtonText : mutedTextColor
            }}
            onMouseEnter={(e) => {
              if (!isActive("/")) {
                e.currentTarget.style.backgroundColor = hoverBg;
                e.currentTarget.style.color = textColor;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive("/")) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = mutedTextColor;
              }
            }}
          >
            <Home className="h-4 w-4" />
            <span className="hidden md:inline">Ana Səhifə</span>
          </Link>
          
          <Link
            href="/reference"
            className="flex items-center gap-2 px-3 py-2 md:px-4 rounded-lg text-sm font-medium transition-all duration-200"
            style={{ 
              backgroundColor: isActive("/reference") ? activeButtonBg : "transparent",
              color: isActive("/reference") ? activeButtonText : mutedTextColor
            }}
            onMouseEnter={(e) => {
              if (!isActive("/reference")) {
                e.currentTarget.style.backgroundColor = hoverBg;
                e.currentTarget.style.color = textColor;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive("/reference")) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = mutedTextColor;
              }
            }}
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden md:inline">Məlumat</span>
          </Link>
          
          <div 
            className="ml-2 pl-2"
            style={{ borderLeft: `1px solid ${borderColor}` }}
          >
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
