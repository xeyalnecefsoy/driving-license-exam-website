"use client";

import { useQuiz } from "@/context/QuizContext";
import { Search, X, ChevronRight, Image as ImageIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Question } from "@/types";

export function SearchBar() {
  const { searchQuestions, startCustomLearning } = useQuiz();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Question[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Click outside to close
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length >= 2) {
      const hits = searchQuestions(val);
      setResults(hits);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (question: Question) => {
    startCustomLearning([question]);
    setIsOpen(false);
    setQuery("");
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-lg mb-8 z-30 group">
      <div className="relative transition-all duration-300 transform group-focus-within:scale-[1.02]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Axtarış (məs: nişanlar, svetofor, qayda)..."
          className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base"
        />
        {query && (
          <button 
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full text-muted-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-card border border-border rounded-xl shadow-2xl max-h-[60vh] overflow-y-auto z-50 ring-1 ring-black/5 animate-in fade-in zoom-in-50 duration-200">
          <div className="p-2 space-y-1">
            {results.map((q) => (
              <button
                key={q.id}
                onClick={() => handleSelect(q)}
                className="w-full text-left p-3 hover:bg-muted/50 rounded-lg transition-colors group/item flex items-start gap-3 border border-transparent hover:border-border/50"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground line-clamp-2 leading-relaxed group-hover/item:text-primary transition-colors">
                    {q.text}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] uppercase font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full tracking-wider">
                      {q.category === 'Signs' ? 'Nişan' : 
                       q.category === 'Rules' ? 'Qayda' :
                       q.category === 'Intersections' ? 'Yolayrıcı' : 'Digər'}
                    </span>
                    {(q.image || q.media) && (
                      <span className="flex items-center gap-1 text-[10px] text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                        <ImageIcon className="w-3 h-3" />
                        Media
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover/item:opacity-100 transition-all self-center" />
              </button>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-border bg-muted/30 text-xs text-center text-secondary">
             Cəmi {results.length} nəticə tapıldı
          </div>
        </div>
      )}
      
      {isOpen && results.length === 0 && query.length >= 2 && (
         <div className="absolute top-full left-0 right-0 mt-3 bg-card border border-border rounded-xl shadow-xl p-8 text-center z-50 animate-in fade-in zoom-in-50 duration-200">
           <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
             <Search className="w-6 h-6 text-muted-foreground opacity-50" />
           </div>
           <p className="text-foreground font-medium">Nəticə tapılmadı</p>
           <p className="text-sm text-secondary mt-1">Fərqli açar sözlər yoxlayın</p>
         </div>
      )}
    </div>
  );
}
