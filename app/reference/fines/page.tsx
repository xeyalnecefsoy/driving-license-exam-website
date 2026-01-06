import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cərimələr Cədvəli - Yol Hərəkəti Pozuntuları",
  description: "Azərbaycan yol hərəkəti qaydalarının pozulmasına görə cərimələr cədvəli. Sürət aşımı, qırmızı işıq, kəmər və digər pozuntular üçün cərimə məbləğləri.",
  openGraph: {
    title: "Cərimələr Cədvəli | DYP İmtahan Hazırlığı",
    description: "Yol hərəkəti pozuntularına görə cərimələr - tam siyahı.",
  },
};

export default function FinesPage() {
  const fines = [
    { code: "327.1", crime: "Sürət həddini 10-20 km/s aşmaq", price: "10 ₼" },
    { code: "327.2", crime: "Sürət həddini 21-40 km/s aşmaq", price: "50 ₼ (2 bal)" },
    { code: "327.3", crime: "Sürət həddini 41-60 km/s aşmaq", price: "150 ₼ (5 bal)" },
    { code: "327.4", crime: "Sürət həddini 61+ km/s aşmaq", price: "250 ₼ (5 bal)" },
    { code: "329.1", crime: "Kəmər taxmamaq", price: "40 ₼" },
    { code: "338.1", crime: "Piyadaya yol verməmək", price: "50 ₼" },
    { code: "327.6", crime: "Svetoforun qırmızı işığında keçmək", price: "60 ₼ (3 bal)" },
    { code: "333.1", crime: "Sərxoş halda idarə etmək (yüngül)", price: "400 ₼ (5 bal)" },
    { code: "342.1.2", crime: "Texniki baxışdan keçməmək", price: "50 ₼" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumbs
        items={[
          { label: "Ana Səhifə", href: "/" },
          { label: "Məlumat", href: "/reference" },
          { label: "Cərimələr" },
        ]}
      />

      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Cərimələr Cədvəli</h1>
        <p className="text-sm text-secondary">Yol hərəkəti qaydalarının pozulmasına görə cərimələr</p>
      </div>

      <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="p-4 font-semibold text-foreground">Xəta</th>
                <th className="p-4 font-semibold text-foreground text-right w-32">Cərimə</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {fines.map((fine, idx) => (
                <tr key={idx} className="hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-foreground">{fine.crime}</div>
                    <div className="text-xs text-secondary mt-1">Maddə {fine.code}</div>
                  </td>
                  <td className="p-4 text-right font-bold text-foreground whitespace-nowrap">
                    {fine.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
