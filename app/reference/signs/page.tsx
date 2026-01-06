import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yol Nişanları - Azərbaycan Yol Nişanları Kataloqu",
  description: "Azərbaycan yol nişanları: xəbərdarlıq, qadağan, məcburi və məlumat nişanları. Hər nişanın izahı və şəkli ilə tam kataloq.",
  openGraph: {
    title: "Yol Nişanları | DYP İmtahan Hazırlığı",
    description: "Azərbaycan yol nişanları kataloqu - şəkil və izahlarla.",
  },
};

export default function SignsPage() {
  const signs = [
    { code: "2.1", name: "Baş yol", desc: "Sürücüyə nizamlanmayan yolayrıclarını keçməkdə üstünlük verir.", type: "warning" },
    { code: "2.4", name: "Yol verin", desc: "Sürücü kəsişən yoldan gələn nəqliyyat vasitəsinə yol verməlidir.", type: "warning" },
    { code: "2.5", name: "Dayanmadan keçmək qadağandır (STOP)", desc: "Dayanma xəttinin qarşısında dayanmaq məcburidir.", type: "danger" },
    { code: "3.1", name: "Giriş qadağandır (Kərpic)", desc: "Bütün nəqliyyat vasitələrinin (marşrut istisna) girişi qadağandır.", type: "danger" },
    { code: "3.27", name: "Dayanmaq qadağandır", desc: "Nəqliyyat vasitələrinin dayanması və durması qadağandır.", type: "danger" },
    { code: "5.1", name: "Avtomagistral", desc: "Yüksək sürətli yol. Piyada, velosiped, moped qadağandır. Maks sürət 110.", type: "info" },
    { code: "5.29", name: "Birtərəfli hərəkətli yol", desc: "Nəqliyyat vasitələri bütün eni boyu bir istiqamətdə hərəkət edir.", type: "info" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumbs
        items={[
          { label: "Ana Səhifə", href: "/" },
          { label: "Məlumat", href: "/reference" },
          { label: "Yol Nişanları" },
        ]}
      />

      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Yol Nişanları</h1>
        <p className="text-sm text-secondary">Azərbaycan yol nişanları kataloqu</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {signs.map((sign) => (
          <div key={sign.code} className="flex items-start gap-4 p-4 bg-card rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
            {/* Sign Image */}
            <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg border-2 border-gray-300 p-2 flex items-center justify-center">
              <Image
                src={`/signs/${sign.code}.png`}
                alt={sign.name}
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Sign Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`font-mono text-xs px-2 py-1 rounded font-semibold ${
                  sign.type === 'danger' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' : 
                  sign.type === 'warning' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' :
                  'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                }`}>
                  {sign.code}
                </span>
                <h3 className="font-bold text-foreground text-lg">{sign.name}</h3>
              </div>
              <p className="text-sm text-secondary leading-relaxed">{sign.desc}</p>
            </div>
          </div>
        ))}
        <p className="text-center text-sm text-secondary mt-4">Siyahı natamamdır, nümunə üçün əlavə edilib.</p>
      </div>
    </div>
  );
}
