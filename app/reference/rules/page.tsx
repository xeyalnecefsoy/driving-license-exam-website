import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yol Hərəkəti Qaydaları - Xülasə | DYP İmtahan",
  description: "Azərbaycan Respublikasının Yol Hərəkəti Qaydalarının qısa xülasəsi və əsas müddəalar.",
};

export default function RulesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <Breadcrumbs 
        items={[
          { label: "Ana Səhifə", href: "/" },
          { label: "Məlumat Mərkəzi", href: "/reference" },
          { label: "Qaydalar" }
        ]} 
      />

      <div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Yol Hərəkəti Qaydaları</h1>
        <p className="text-lg text-secondary border-b border-border pb-6">
          Əsas qaydaların qısa xülasəsi. İmtahan üçün vacib məqamlar.
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-8">
        
        {/* Section 1 */}
        <section className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            🚦 Ümumi Müddəalar
          </h2>
          <ul className="space-y-3 text-foreground/90 list-disc list-inside">
            <li><strong>Sağ tərəfli hərəkət:</strong> Azərbaycanda nəqliyyat vasitələrinin hərəkəti yolun sağ tərəfi ilə müəyyən edilmişdir.</li>
            <li><strong>Sürət həddi:</strong> Yaşayış məntəqələrində maksimum sürət 60 km/saat, yaşayış məntəqələrindən kənarda 90 km/saat, avtomagistrallarda isə 110 km/saatdır.</li>
            <li><strong>Təhlükəsizlik kəməri:</strong> Hərəkət zamanı sürücü və sərnişinlər təhlükəsizlik kəmərindən istifadə etməlidirlər.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
             🛑 Ötmə və Manevrlər
          </h2>
          <ul className="space-y-3 text-foreground/90 list-disc list-inside">
            <li><strong>Ötmə qadağandır:</strong> Dəmiryol keçidlərində, tunellərdə, körpülərdə, piyada keçidlərində və görmə məsafəsi məhdud olan yerlərdə.</li>
            <li><strong>Dönmə işıqları:</strong> Manevr etməzdən əvvəl mütləq müvafiq dönmə işığı yandırılmalıdır.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
             🚑 Xüsusi Nəqliyyat Vasitələri
          </h2>
          <p className="text-foreground/90 leading-relaxed">
            Göy və ya qırmızı sayrışan işıq və xüsusi səs siqnalı qoşulmuş nəqliyyat vasitələrinə (Polis, Təcili Yardım, Yanğınsöndürən) yol verilməlidir. Əgər belə avtomobil dayanmışdırsa, sürəti azaldıb ehtiyatla keçmək lazımdır.
          </p>
        </section>

        <div className="bg-muted/50 p-4 rounded-lg text-sm text-secondary text-center">
          Bu səhifə məlumat xarakterli xülasədir. Tam qanunvericilik üçün rəsmi mənbələrə müraciət edin.
        </div>
      </div>
    </div>
  );
}
