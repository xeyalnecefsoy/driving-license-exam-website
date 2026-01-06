"use client";

import { TrendingUp, Award, CarFront, CheckCircle2, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative w-full py-16">
      {/* Background with gradient - using inline styles for cross-browser consistency */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom right, #2563eb, #1d4ed8, #3730a3)',
        }}
      ></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(99, 102, 241, 0.2)' }}></div>
      
      {/* Animated road lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-white transform -skew-y-2"></div>
        <div className="absolute top-2/4 left-0 right-0 h-1 bg-white transform skew-y-2"></div>
        <div className="absolute top-3/4 left-0 right-0 h-1 bg-white transform -skew-y-2"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Icon with glow effect */}
        <div className="inline-flex items-center justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
            <div className="relative w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CarFront className="w-12 h-12 text-white drop-shadow-lg" />
            </div>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          Sürücülük İmtahanına
          <br />
          <span className="text-yellow-300">Hazır Olun</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Azərbaycan DYP imtahanını ilk cəhdinizdə keçin. 
          Peşəkar hazırlıq, real suallar, uğurlu nəticə.
        </p>

        {/* Stats badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span className="text-white font-semibold text-sm">95% Uğur Nisbəti</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
            <CheckCircle2 className="w-5 h-5 text-blue-300" />
            <span className="text-white font-semibold text-sm">120+ Real Sual</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
            <Zap className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-semibold text-sm">Pulsuz Təlim</span>
          </div>
        </div>
      </div>

      {/* Bottom curved edge */}
      <div className="absolute -bottom-1 left-0 right-0 h-8 bg-background rounded-t-[50%]"></div>
    </div>
  );
}
