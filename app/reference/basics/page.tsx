import { Car, Settings, Gauge, Disc, Zap, CircleDashed, Info, PenTool } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Metadata } from "next";

import { basicsContent } from "@/data/basics-content";

export const metadata: Metadata = {
  title: "Avtomobil İlkin Biliklər - Başlayanlar üçün",
  description: "Avtomobilin hissələri, işləmə prinsipləri, texniki qulluq və sürücülük haqqında əsas məlumatlar.",
};

export default function BasicsPage() {
  const topics = Object.values(basicsContent);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumbs items={[
        { label: "Ana Səhifə", href: "/" },
        { label: "Məlumat Mərkəzi", href: "/reference" },
        { label: "İlkin Biliklər" }
      ]} />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-foreground mb-4">Avtomobil və Sürücülük Dünyasına Xoş Gəlmisiniz</h1>
        <p className="text-lg text-secondary">
          Heç vaxt sükan arxasında oturmamısınız? Narahat olmayın. Bu bölmə sizin üçün avtomobilin dilini başa düşülən və sadə şəkildə izah edir.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <Link href={`/reference/basics/${topic.id}`} key={topic.id} className="block h-full">
            <div 
              className="group bg-card rounded-xl p-6 shadow-sm border border-border hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer flex flex-col items-start h-full"
            >
              <div className={`w-14 h-14 ${topic.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <topic.icon className={`w-7 h-7 ${topic.color}`} />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {topic.title}
              </h3>
              
              <p className="text-secondary leading-relaxed">
                {topic.description}
              </p>

              <div className="mt-auto pt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                Daha ətraflı oxu →
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-3">Hələ suallarınız var?</h3>
            <p className="text-secondary text-lg">
              Avtomobil hissələri və iş prinsipləri haqqında daha dərindən öyrənmək istəyirsinizsə, "Mühərrik Necə İşləyir?" bölməsindən başlamağı tövsiyə edirik.
            </p>
          </div>
          <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
            Bələdçiyə Başla
          </button>
        </div>
      </div>
    </div>
  );
}
