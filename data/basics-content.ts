import { Car, Settings, Gauge, Disc, Zap, CircleDashed, Info, PenTool, LucideIcon } from "lucide-react";

export interface BasicTopicSection {
  title: string;
  content: string;
  list?: string[];
  warning?: string;
  tip?: string;
}

export interface BasicTopic {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  sections: BasicTopicSection[];
}

export const basicsContent: Record<string, BasicTopic> = {
  structure: {
    id: "structure",
    title: "Avtomobilin Ümumi Quruluşu",
    description: "Kuzov, şassi və avtomobilin əsas gövdə hissələri haqqında ümumi məlumat.",
    icon: Car,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    sections: [
      {
        title: "Avtomobilin 3 Əsas Hissəsi",
        content: "Avtomobil sadəcə metaldan ibarət deyil. O, üç əsas hissədən ibarətdir:",
        list: [
          "Mühərrik (Motor) - Avtomobilin 'ürəyi'.",
          "Şassi (Yerimə hissəsi) - Təkərlər, əyləclər və sükan sistemi.",
          "Kuzov (Gövdə) - Sürücünün və sərnişinlərin oturduğu hissə."
        ]
      },
      {
        title: "Kuzov Növləri",
        content: "Yəqin ki, 'Sedan' və ya 'Cip' sözlərini eşitmisiniz. Bunlar kuzov növləridir:",
        list: [
          "Sedan: Ən geniş yayılmış, 4 qapılı, ayrı baqaj bölməsi olan minik avtomobili.",
          "Hetchbek (Hatchback): Baqaj qapısı arxa şüşə ilə birlikdə açılan yığcam avtomobil.",
          "SUV (Cip): Hündür, yolsuzluq üçün nəzərdə tutulmuş geniş avtomobil.",
          "Universal (Station Wagon): Sedana bənzəyən, lakin damı arxaya qədər uzanan və geniş baqajı olan avtomobil."
        ]
      }
    ]
  },
  engine: {
    id: "engine",
    title: "Mühərrik və İşləmə Prinsipi",
    description: "Daxili yanma mühərriyi necə işləyir? Porşenlər, silindrlər və yanacaq sistemi.",
    icon: Settings,
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    sections: [
      {
        title: "Mühərrik Necə İşləyir?",
        content: "Mühərrik, yanacağı (benzin və ya dizel) yandıraraq enerjiyə çevirən qurğudur. Bu proses silindrlərin içində baş verir.",
        tip: "Təsəvvür edin ki, velosiped sürürsünüz. Ayaqlarınız pedalı fırladır. Mühərrikdə isə 'ayaqlar' əvəzinə 'porşenlər' (pistonlar) hərəkət edir."
      },
      {
        title: "Dörd Taktlı İş Prinsipi",
        content: "Müasir avtomobillərin əksəriyyəti 4 mərhələdə işləyir:",
        list: [
          "1. Sovurma: Yanacaq və hava qarışığı silindrə daxil olur.",
          "2. Sıxılma: Porşen yuxarı qalxaraq qarışığı sıxır.",
          "3. İşçi gediş (Partlayış): Buçadan (sveça) qığılcım gəlir, qarışıq partlayır və porşeni aşağı itələyir. Bu, təkərlərin fırlanmasını təmin edən güc yaradır.",
          "4. Xaric etmə: Yanmış qazlar (tüstü) xaric edilir (tüstü borusundan çıxır)."
        ]
      }
    ]
  },
  transmission: {
    id: "transmission",
    title: "Transmissiya (Sürətlər Qutusu)",
    description: "Mexaniki və avtomat sürətlər qutusu, mufta (debriyaj) və sürət dəyişimi.",
    icon: CircleDashed,
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    sections: [
      {
        title: "Transmissiya Nədir?",
        content: "Mühərrik çox sürətli fırlanır, lakin təkərlər o qədər sürətli fırlanmamalıdır. Transmissiya (karobka), mühərrikdən gələn gücü təkərlərə ötürür və sürəti tənzimləyir."
      },
      {
        title: "Mexanika vs Avtomat",
        content: "İki əsas növ var:",
        list: [
          "Mexaniki (Mexanika): Sürücü ayağı ilə muftanı (debriyajı) basıb, əli ilə ötürməni dəyişir. Daha çətin öyrənilir, amma avtomobilə tam nəzarət verir.",
          "Avtomat: Avtomobil sürəti özü dəyişir. Sürücü yalnız qaz və əyləcə basır. Tıxaclarda çox rahatdır."
        ]
      },
      {
        title: "Mufta (Debriyaj) Nədir?",
        content: "Mufta, mühərrik ilə təkərlər arasındakı əlaqəni kəsən və birləşdirən disklər sistemidir. Sürəti dəyişmək üçün mühərriki təkərlərdən ayırmaq lazımdır, buna görə debriyajı basırıq.",
        warning: "Debriyaj pedalını yarımçıq saxlamaq (yarım mufta) sistemin tez sıradan çıxmasına səbəb olur."
      }
    ]
  },
  brakes: {
    id: "brakes",
    title: "Əyləc Sistemi",
    description: "Avtomobili necə dayandırırıq? Əyləc yastıqları, disklər və ABS sistemi.",
    icon: Disc,
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-900/20",
    sections: [
      {
        title: "Avtomobil Necə Dayanır?",
        content: "Əyləc pedalına basdıqda, əyləc yastıqları (nakladkalar) təkərə bağlı olan diski sıxır. Sürtünmə nəticəsində avtomobil yavaşlayır."
      },
      {
        title: "ABS Nədir?",
        content: "ABS (Anti-lock Braking System) – Təkərlərin sürüşməsinin qarşısını alan sistemdir. Qəfil tormozlama zamanı (məsələn buzlu yolda) təkərlərin kilidlənməsinə imkan vermir, beləliklə sürücü sükanı idarə edə bilir.",
        tip: "ABS işə düşdükdə pedalda titrəyiş hiss edə bilərsiniz. Bu normaldır, ayağınızı pedaldan çəkməyin!"
      },
      {
        title: "Əl Əyləci (Ruçnoy)",
        content: "Avtomobili park etdikdən sonra onun yerindən tərpənməməsi üçün istifadə olunur. Hərəkətə başlamazdan əvvəl onu endirməyi unutmayın!",
        warning: "Əl əyləci çəkili halda sürmək arxa əyləc sistemini yandırır və ciddi zərər verir."
      }
    ]
  },
  dashboard: {
    id: "dashboard",
    title: "İdarəetmə Paneli",
    description: "Spidometr, taxometr və paneldə yanan xəbərdarlıq işıqlarının mənası.",
    icon: Gauge,
    color: "text-cyan-500",
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
    sections: [
      {
        title: "Əsas Cihazlar",
        content: "Sükanın arxasında iki əsas dairəvi göstərici görəcəksiniz:",
        list: [
          "Spidometr: Avtomobilin sürətini göstərir (km/saat).",
          "Taxometr: Mühərrikin dövrlər sayını göstərir (x1000). Qırmızı zonaya keçmək mühərrik üçün zərərlidir."
        ]
      },
      {
        title: "Vacib İşıqlar (İndikatorlar)",
        content: "Paneldə yanan işıqlar avtomobilin dilidir:",
        list: [
          "🔴 Yağ Çırağı (Qırmızı): Mühərrikdə yağ təzyiqi düşüb. DƏRHAL SAXLAYIN! Mühərrik yana bilər.",
          "🔴 Akkumulyator (Qırmızı): Generator işləmir, maşın elektrik enerjisi almır.",
          "🔴 Nida (Qırmızı): Əl əyləci çəkilib və ya əyləc mayesi azalıb.",
          "🟡 Mühərrik (Check Engine - Sarı): Mühərrik sistemində problem var, ustaya göstərmək lazımdır."
        ]
      }
    ]
  },
  electronics: {
    id: "electronics",
    title: "Elektrik və İşıqlandırma",
    description: "Akkumulyator, generator, faralar və dönmə işıqları.",
    icon: Zap,
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    sections: [
      {
        title: "Enerji Mənbəyi",
        content: "Avtomobilin elektriki iki yerdən gəlir:",
        list: [
          "Akkumulyator: Mühərrik sönülü olanda enerjini təmin edir və işə salmaq üçün lazımdır.",
          "Generator: Mühərrik işləyərkən fırlanır və elektrik istehsal edir, həmçinin akkumulyatoru doldurur."
        ]
      },
      {
        title: "İşıqlar Nə Zaman İstifadə Olunur?",
        content: "",
        list: [
          "Yaxın vuran faralar (Blijni): Gecə vaxtı, tunellərdə və dumanlı havada həmişə yandırılmalıdır.",
          "Uzaq vuran faralar (Dalni): Yalnız boş yolda, qarşıdan avtomobil gəlmədikdə istifadə olunur.",
          "Dönmə işıqları (Povorotnik): Hərəkət istiqamətini dəyişməzdən ƏVVƏL mütləq yandırılmalıdır."
        ]
      }
    ]
  },
  maintenance: {
    id: "maintenance",
    title: "Texniki Qulluq",
    description: "Yağ dəyişmə, təkər təzyiqi və avtomobilin gündəlik yoxlanışı.",
    icon: PenTool,
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-900/20",
    sections: [
      {
        title: "Nələri Tez-tez Dəyişmək Lazımdır?",
        content: "Avtomobilin sağlam qalması üçün bunlar vaxtında dəyişilməlidir:",
        list: [
          "Mühərrik Yağı: Adətən hər 5,000 - 8,000 km-dən bir.",
          "Hava Filtri: Mühərrikin 'ciyəridir', çirkləndikdə dəyişilməlidir.",
          "Təkərlər: Protektor (naxış) silindikdə və ya çatlaqlar əmələ gəldikdə."
        ]
      },
      {
        title: "Gündəlik Yoxlama",
        content: "Sükan arxasına keçməzdən əvvəl:",
        list: [
          "Təkərlərin havasına göz gəzdirin.",
          "Avtomobilin altına baxın (yağ və ya su axıb-axmadığını yoxlayın).",
          "Bütün işıqların işlədiyinə əmin olun."
        ]
      }
    ]
  },
  terms: {
    id: "terms",
    title: "Sürücülük Terminləri",
    description: "Ötmə, qarşıdan gəlmə, distansiya və digər vacib terminlərin izahı.",
    icon: Info,
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    sections: [
      {
        title: "Hərəkət Terminləri",
        content: "",
        list: [
          "Ötmə: Sizinlə eyni istiqamətdə gedən avtomobili, qarşı hərəkət zolağına çıxaraq keçmək.",
          "Qabaqlama: Öz zolağınızda qalaraq (zolağı dəyişmədən və ya sağ/sol zolağa keçərək) digər avtomobildən irəli keçmək.",
          "Distansiya: Öndəki avtomobillə aranızdakı məsafə.",
          "İnterval: Yanınızdakı avtomobillə aranızdakı yan məsafə."
        ]
      },
      {
        title: "Texniki Terminlər",
        content: "",
        list: [
          "Karter: Mühərrik yağının yığıldığı alt qapaq.",
          "Radiator: Mühərriki soyudan suyun (antifrizin) soyudulduğu şəbəkə.",
          "Starter: Mühərriki ilk dəfə fırladan elektrik mühərriyi (açar çevriləndə işləyən səs)."
        ]
      }
    ]
  }
};
