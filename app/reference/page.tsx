import { Info, AlertCircle, FileText, BookOpen } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Məlumat Mərkəzi - Yol Nişanları və Cərimələr",
  description: "Azərbaycan yol nişanları kataloqu, cərimələr cədvəli və sürücülər üçün faydalı məlumatlar. DYP imtahanına hazırlıq üçün vacib resurslar.",
  openGraph: {
    title: "Məlumat Mərkəzi | DYP İmtahan Hazırlığı",
    description: "Yol nişanları, cərimələr və sürücülər üçün faydalı məlumatlar.",
  },
};

export default function ReferencePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumbs items={[{ label: "Ana Səhifə", href: "/" }, { label: "Məlumat Mərkəzi" }]} />

      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Məlumat Mərkəzi</h1>
        <p className="text-secondary">Sürücülər üçün faydalı məlumatlar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/reference/signs" className="group">
          <div className="bg-card p-6 rounded-xl shadow-sm border border-border hover:border-primary transition-all group-hover:shadow-md h-full">
             <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4 text-primary">
               <AlertCircle className="w-6 h-6" />
             </div>
             <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Yol Nişanları</h2>
             <p className="text-secondary text-sm">Bütün yol nişanlarının kataloqu və onların izahı.</p>
          </div>
        </Link>

        <Link href="/reference/fines" className="group">
          <div className="bg-card p-6 rounded-xl shadow-sm border border-border hover:border-primary transition-all group-hover:shadow-md h-full">
             <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center mb-4">
               <FileText className="w-6 h-6 text-red-600 dark:text-danger" />
             </div>
             <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Cərimələr Cədvəli</h2>
             <p className="text-secondary text-sm">Yol hərəkəti qaydalarının pozulmasına görə cərimələr.</p>
          </div>
        </Link>

        <Link href="/reference/rules" className="group">
          <div className="bg-card p-6 rounded-xl shadow-sm border border-border hover:border-primary transition-all group-hover:shadow-md h-full">
             <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
               <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
             </div>
             <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Qaydalar Xülasəsi</h2>
             <p className="text-secondary text-sm">Yol hərəkəti qaydalarının qısa və aydın izahı.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
