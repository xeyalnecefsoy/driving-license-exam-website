"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Question, Category } from "@/types";
import { questions as defaultQuestions } from "@/data/questions";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Search, 
  CheckCircle,
  X,
  Save,
  ArrowLeft,
  RotateCcw,
  Upload,
  Link,
  Image as ImageIcon
} from "lucide-react";

type ViewMode = "list" | "add" | "edit";

const CATEGORY_LABELS: Record<Category, string> = {
  Signs: "Yol Nişanları",
  Rules: "Yol Qaydaları",
  Intersections: "Kəsişmələr",
  General: "Ümumi"
};

export default function AdminPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    text: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctIndex: 0,
    category: "General" as Category,
    explanation: "",
    ruleSource: "",
    image: ""
  });

  // Load questions on mount
  useEffect(() => {
    loadQuestions();
  }, []);

  // Filter questions when search or category changes
  useEffect(() => {
    let filtered = allQuestions;
    
    if (searchTerm) {
      filtered = filtered.filter(q => 
        q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.explanation?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter !== "all") {
      filtered = filtered.filter(q => q.category === categoryFilter);
    }
    
    setFilteredQuestions(filtered);
  }, [allQuestions, searchTerm, categoryFilter]);

  const loadQuestions = () => {
    // Get deleted question IDs
    const deletedIds: string[] = JSON.parse(localStorage.getItem("deletedQuestions") || "[]");
    
    // Combine default questions with custom (localStorage) questions
    const customQuestions = JSON.parse(localStorage.getItem("customQuestions") || "[]");
    
    // Filter out deleted questions
    const filteredDefaults = defaultQuestions.filter(q => !deletedIds.includes(q.id));
    const filteredCustom = customQuestions.filter((q: Question) => !deletedIds.includes(q.id));
    
    const combined = [...filteredDefaults, ...filteredCustom];
    setAllQuestions(combined);
    setFilteredQuestions(combined);
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const resetForm = () => {
    setFormData({
      text: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctIndex: 0,
      category: "General",
      explanation: "",
      ruleSource: "",
      image: ""
    });
    setSelectedQuestion(null);
  };

  const handleAdd = () => {
    resetForm();
    setViewMode("add");
  };

  const handleEdit = (question: Question) => {
    setSelectedQuestion(question);
    const optionTexts = question.options.map(o => o.text);
    const correctIdx = question.options.findIndex(o => o.id === question.correctOptionId);
    
    setFormData({
      text: question.text,
      option1: optionTexts[0] || "",
      option2: optionTexts[1] || "",
      option3: optionTexts[2] || "",
      option4: optionTexts[3] || "",
      correctIndex: correctIdx >= 0 ? correctIdx : 0,
      category: question.category,
      explanation: question.explanation || "",
      ruleSource: question.ruleSource || "",
      image: question.image || ""
    });
    setViewMode("edit");
  };

  const handleDelete = (questionId: string) => {
    const isDefault = defaultQuestions.some(q => q.id === questionId);
    
    if (isDefault) {
      // For default questions, add to deleted list
      const deletedIds: string[] = JSON.parse(localStorage.getItem("deletedQuestions") || "[]");
      if (!deletedIds.includes(questionId)) {
        deletedIds.push(questionId);
        localStorage.setItem("deletedQuestions", JSON.stringify(deletedIds));
      }
    } else {
      // For custom questions, remove from the list
      const customQuestions = JSON.parse(localStorage.getItem("customQuestions") || "[]");
      const updated = customQuestions.filter((q: Question) => q.id !== questionId);
      localStorage.setItem("customQuestions", JSON.stringify(updated));
    }
    
    loadQuestions();
    showSuccess("Sual uğurla silindi!");
    setDeleteConfirm(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const optionIds = ["a", "b", "c", "d"];
    const newQuestion: Question = {
      id: selectedQuestion?.id || `custom_q${Date.now()}`,
      text: formData.text,
      options: [
        { id: "a", text: formData.option1 },
        { id: "b", text: formData.option2 },
        { id: "c", text: formData.option3 },
        { id: "d", text: formData.option4 },
      ],
      correctOptionId: optionIds[formData.correctIndex],
      category: formData.category,
      explanation: formData.explanation,
      ruleSource: formData.ruleSource || undefined,
      // Don't store base64 images - they're too large for localStorage
      image: formData.image?.startsWith('data:') ? undefined : (formData.image || undefined)
    };

    try {
      const customQuestions = JSON.parse(localStorage.getItem("customQuestions") || "[]");
      
      if (viewMode === "edit" && selectedQuestion) {
        // Check if editing a default question
        const isDefault = defaultQuestions.some(q => q.id === selectedQuestion.id);
        
        if (isDefault) {
          // For default questions, we save a "modified" version in localStorage
          const modifiedQuestions = JSON.parse(localStorage.getItem("modifiedQuestions") || "{}");
          modifiedQuestions[selectedQuestion.id] = newQuestion;
          localStorage.setItem("modifiedQuestions", JSON.stringify(modifiedQuestions));
          showSuccess("Sual uğurla yeniləndi!");
        } else {
          // Update custom question
          const idx = customQuestions.findIndex((q: Question) => q.id === selectedQuestion.id);
          if (idx >= 0) {
            customQuestions[idx] = newQuestion;
            localStorage.setItem("customQuestions", JSON.stringify(customQuestions));
            showSuccess("Sual uğurla yeniləndi!");
          }
        }
      } else {
        // Add new question
        customQuestions.push(newQuestion);
        localStorage.setItem("customQuestions", JSON.stringify(customQuestions));
        showSuccess("Sual uğurla əlavə edildi!");
      }

      loadQuestions();
      resetForm();
      setViewMode("list");
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        alert("Xəta: Yaddaş limiti aşıldı! Çox böyük şəkil yükləmisiniz. Zəhmət olmasa şəkil əvəzinə URL və ya şəkil ID istifadə edin.");
      } else {
        alert("Xəta baş verdi: " + (error as Error).message);
      }
    }
  };

  const getCategoryStats = () => {
    const stats: Record<string, number> = { all: allQuestions.length };
    (["Signs", "Rules", "Intersections", "General"] as Category[]).forEach(cat => {
      stats[cat] = allQuestions.filter(q => q.category === cat).length;
    });
    return stats;
  };

  const stats = getCategoryStats();

  const deletedCount = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem("deletedQuestions") || "[]").length 
    : 0;

  const handleRestoreAll = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("deletedQuestions", "[]");
      loadQuestions();
      showSuccess("Bütün silinmiş suallar bərpa edildi!");
    }
  };

  // List View
  if (viewMode === "list") {
    return (
      <div className="min-h-screen p-4 md:p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-secondary">Sualları idarə et</p>
            </div>
            <div className="flex gap-2">
              {deletedCount > 0 && (
                <Button onClick={handleRestoreAll} variant="outline" className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Bərpa Et ({deletedCount})
                </Button>
              )}
              <Button onClick={handleAdd} variant="primary" className="gap-2">
                <Plus className="w-5 h-5" />
                Yeni Sual
              </Button>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="bg-emerald-50 border border-emerald-500 rounded-xl p-4 flex items-center gap-3 dark:bg-emerald-900/20 dark:border-emerald-400">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <p className="text-emerald-700 font-medium dark:text-emerald-300">{successMessage}</p>
            </div>
          )}

          {/* Search and Filter Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Sual axtar..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategoryFilter("all")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  categoryFilter === "all" 
                    ? "bg-primary text-white" 
                    : "bg-muted text-secondary hover:bg-muted/80"
                }`}
              >
                Hamısı ({stats.all})
              </button>
              {(["Signs", "Rules", "Intersections", "General"] as Category[]).map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    categoryFilter === cat 
                      ? "bg-primary text-white" 
                      : "bg-muted text-secondary hover:bg-muted/80"
                  }`}
                >
                  {CATEGORY_LABELS[cat]} ({stats[cat]})
                </button>
              ))}
            </div>
          </div>

          {/* Questions List */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 bg-muted text-sm font-medium text-secondary border-b border-border">
              <div className="col-span-6 md:col-span-7">Sual</div>
              <div className="col-span-3 md:col-span-3">Kateqoriya</div>
              <div className="col-span-3 md:col-span-2 text-right">Əməliyyatlar</div>
            </div>
            
            <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
              {filteredQuestions.length === 0 ? (
                <div className="p-8 text-center text-secondary">
                  Heç bir sual tapılmadı
                </div>
              ) : (
                filteredQuestions.map((question) => {
                  const isDefault = defaultQuestions.some(q => q.id === question.id);
                  return (
                    <div key={question.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/50 transition-colors">
                      <div className="col-span-6 md:col-span-7">
                        <p className="text-foreground line-clamp-2">{question.text}</p>
                        <p className="text-xs text-secondary mt-1">ID: {question.id}</p>
                      </div>
                      <div className="col-span-3 md:col-span-3">
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {CATEGORY_LABELS[question.category]}
                        </span>
                      </div>
                      <div className="col-span-3 md:col-span-2 flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(question)}
                          className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 dark:hover:bg-blue-900/30 dark:text-blue-400 transition-colors"
                          title="Düzəliş et"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        {deleteConfirm === question.id ? (
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleDelete(question.id)}
                              className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                              title="Sil"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="p-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 transition-colors"
                              title="Ləğv et"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(question.id)}
                            className="p-2 rounded-lg hover:bg-red-100 text-red-600 dark:hover:bg-red-900/30 dark:text-red-400 transition-colors"
                            title="Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Info */}
          <div className="bg-amber-50 border border-amber-400 rounded-xl p-4 dark:bg-amber-900/20 dark:border-amber-500">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Qeyd:</strong> Admin panelinə yalnız <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">/admin</code> URL-i ilə daxil olmaq mümkündür. 
              Əlavə edilən suallar LocalStorage-də saxlanılır.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Add/Edit Form View
  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => { resetForm(); setViewMode("list"); }}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {viewMode === "add" ? "Yeni Sual Əlavə Et" : "Sualı Düzəlt"}
            </h1>
            <p className="text-secondary">
              {viewMode === "add" ? "Yeni sual yarad" : `ID: ${selectedQuestion?.id}`}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 shadow-xl border border-border space-y-6">
          {/* Question Text */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Sual Mətni *
            </label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData({...formData, text: e.target.value})}
              required
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Sualı daxil edin..."
            />
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Variant A", key: "option1" },
              { label: "Variant B", key: "option2" },
              { label: "Variant C", key: "option3" },
              { label: "Variant D", key: "option4" },
            ].map((opt, idx) => (
              <div key={opt.key}>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {opt.label} *
                </label>
                <input
                  type="text"
                  value={formData[opt.key as keyof typeof formData] as string}
                  onChange={(e) => setFormData({...formData, [opt.key]: e.target.value})}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder={`${opt.label} mətni...`}
                />
              </div>
            ))}
          </div>

          {/* Correct Answer & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Düzgün Cavab *
              </label>
              <select
                value={formData.correctIndex}
                onChange={(e) => setFormData({...formData, correctIndex: Number(e.target.value)})}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value={0}>Variant A</option>
                <option value={1}>Variant B</option>
                <option value={2}>Variant C</option>
                <option value={3}>Variant D</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Kateqoriya *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="Signs">Yol Nişanları</option>
                <option value="Rules">Yol Qaydaları</option>
                <option value="Intersections">Kəsişmələr</option>
                <option value="General">Ümumi</option>
              </select>
            </div>
          </div>

          {/* Explanation */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              İzah *
            </label>
            <textarea
              value={formData.explanation}
              onChange={(e) => setFormData({...formData, explanation: e.target.value})}
              required
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Cavabın izahını daxil edin..."
            />
          </div>

          {/* Optional Fields */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Mənbə (İsteğe bağlı)
            </label>
            <input
              type="text"
              value={formData.ruleSource}
              onChange={(e) => setFormData({...formData, ruleSource: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Məs: Maddə 10.3"
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Şəkil (İsteğe bağlı)
              </div>
            </label>
            
            <div className="space-y-3">
              {/* Image Preview */}
              {formData.image && (
                <div className="relative w-full max-w-xs p-3 bg-muted rounded-xl border border-border">
                  {formData.image.startsWith('data:') ? (
                    <img 
                      src={formData.image}
                      alt="Preview" 
                      className="w-full h-32 object-contain rounded-lg bg-white"
                    />
                  ) : (
                    <div className="w-full h-32 flex items-center justify-center rounded-lg bg-white text-secondary text-sm">
                      <div className="text-center">
                        <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                        <span>{formData.image}</span>
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, image: ''})}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              
              {/* Upload Options */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* File Upload */}
                <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-muted hover:bg-muted/80 border border-dashed border-border rounded-xl cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 text-secondary" />
                  <span className="text-sm text-secondary">Cihazdan yüklə</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setFormData({...formData, image: ev.target?.result as string});
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
                
                {/* URL Input */}
                <div className="flex-1 relative">
                  <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                  <input
                    type="text"
                    placeholder="URL və ya şəkil ID daxil edin..."
                    value={formData.image.startsWith('data:') ? '' : formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              <p className="text-xs text-secondary">
                Şəkil ID (məs: sign_1-1) və ya tam URL daxil edə bilərsiniz. Cihazdan yüklənən şəkillər base64 formatında saxlanılır.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => { resetForm(); setViewMode("list"); }}
              className="flex-1 h-14"
            >
              <X className="w-5 h-5 mr-2" />
              Ləğv Et
            </Button>
            <Button type="submit" variant="primary" className="flex-1 h-14 text-lg font-semibold">
              <Save className="w-5 h-5 mr-2" />
              {viewMode === "add" ? "Əlavə Et" : "Yadda Saxla"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
