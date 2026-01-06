import { Question } from "@/types";

export const newQuestions: Question[] = [
  // --- NİZAMLAYICI (Traffic Controller) ---
  {
    id: "q121",
    text: "Nizamlayıcı qolları yana uzadıbsa və ya aşağı salıbsa, onun sağı və solu tərəfindən gələn nəqliyyat vasitələri hansı istiqamətdə hərəkət edə bilər?",
    options: [
      { id: "a", text: "Yalnız düzünə" },
      { id: "b", text: "Düzünə və sağa" },
      { id: "c", text: "Bütün istiqamətlərdə" },
      { id: "d", text: "Yalnız sağa" },
    ],
    correctOptionId: "b",
    category: "Rules",
    explanation: "Nizamlayıcının qolları yana uzadıldıqda və ya aşağı salındıqda (bu eyni siqnaldır), onun sağı və solu tərəfindən gələn tramvaysız nəqliyyat vasitələri DÜZÜNƏ və SAĞA hərəkət edə bilər. (Maddə 6.10)"
  },
  {
    id: "q122",
    text: "Nizamlayıcı sağ əlini önə uzadıbsa, onun sol tərəfindən gələn nəqliyyat vasitəsi hara gedə bilər?",
    options: [
      { id: "a", text: "Yalnız sola" },
      { id: "b", text: "Düzünə və sola" },
      { id: "c", text: "Bütün istiqamətlərdə (Düzünə, Sağa, Sola və Geriyə)" },
      { id: "d", text: "Hərəkət qadağandır" },
    ],
    correctOptionId: "c",
    category: "Rules",
    explanation: "Nizamlayıcı sağ əlini önə uzadıbsa, sol böyrü tərəfdən gələn nəqliyyat vasitələri BÜTÜN İSTİQAMƏTLƏRDƏ hərəkət edə bilər."
  },
  {
    id: "q123",
    text: "Nizamlayıcı sağ əlini yuxarı qaldırıbsa, sürücülər nə etməlidir?",
    options: [
      { id: "a", text: "Diqqətli olub keçməlidir" },
      { id: "b", text: "Bütün nəqliyyat vasitələri dayanmalıdır (yolayrıcında olanlar istisna)" },
      { id: "c", text: "Yalnız yük avtomobilləri dayanmalıdır" },
      { id: "d", text: "Sürəti artırıb tez keçməlidir" },
    ],
    correctOptionId: "b",
    category: "Rules",
    explanation: "Sağ əlin yuxarı qaldırılması 'Diqqət, hərəkət qadağandır' deməkdir. Bu zaman bütün istiqamətlərdən gələn nəqliyyat vasitələri və piyadalar dayanmalıdır."
  },

  // --- MƏSAFƏ VƏ DAYANMA (Distances) ---
  {
    id: "q124",
    text: "Piyada keçidinə (zebra) ən azı neçə metr qalmış dayanmaq və durmaq qadağandır?",
    options: [
      { id: "a", text: "5 metr" },
      { id: "b", text: "10 metr" },
      { id: "c", text: "15 metr" },
      { id: "d", text: "Məsafə məhdudiyyəti yoxdur" },
    ],
    correctOptionId: "a",
    category: "Rules",
    explanation: "Piyada keçidlərində və onlara 5 metrdən az məsafə qalmış dayanmaq və durmaq QADAĞANDIR. (Keçidi keçdikdən dərhal sonra dayanmaq olar)."
  },
  {
    id: "q125",
    text: "Dayanacaq nişanı olan yerlərdə (avtobus dayanacağı) başqa nəqliyyat vasitələri nişandan neçə metr məsafədə dayana bilər?",
    options: [
      { id: "a", text: "10 metr" },
      { id: "b", text: "15 metr" },
      { id: "c", text: "20 metr" },
      { id: "d", text: "30 metr" },
    ],
    correctOptionId: "b",
    category: "Rules",
    explanation: "Ümumi istifadədə olan nəqliyyat vasitələrinin dayanacaq meydançalarına və ya 5.12/5.13 nişanlarına 15 metrdən az məsafədə digər nəqliyyat vasitələrinin dayanması və durması qadağandır."
  },
  {
    id: "q126",
    text: "Dəmiryol keçidinə neçə metr qalmış dayanmaq və durmaq qadağandır?",
    options: [
      { id: "a", text: "Keçidlərdə və onlara 50 metr qalmış" },
      { id: "b", text: "Yalnız keçidin üstündə" },
      { id: "c", text: "Keçidlərdə və onlara 100 metr qalmış" },
      { id: "d", text: "50 metr keçdikdən sonra" },
    ],
    correctOptionId: "a",
    category: "Rules",
    explanation: "Dəmiryol keçidlərində və onlara 50 metrdən az məsafə qalmış (hər iki tərəfdən) dayanmaq və durmaq qadağandır. (Maddə 52)"
  },

  // --- İŞIQ CİHAZLARI (Lights) ---
  {
    id: "q127",
    text: "Yedəyə alan (dartan) avtomobildə günün işıqlı vaxtı hansı işıqlar yanmalıdır?",
    options: [
      { id: "a", text: "Yalnız qabarit işıqları" },
      { id: "b", text: "Yaxın vuran faralar" },
      { id: "c", text: "Qəza işıq siqnalı" },
      { id: "d", text: "Uzaq vuran faralar" },
    ],
    correctOptionId: "b",
    category: "General",
    explanation: "Yedəyə alma zamanı: Yedəyə ALAN (qabaqdakı) avtomobildə Yaxın vuran faralar, yedəyə ALINAN (arxadakı) avtomobildə isə Qəza işıq siqnalı yandırılmalıdır."
  },
  {
    id: "q128",
    text: "Yedəyə alınan (arxadakı) avtomobildə qəza işıq siqnalı (avariya) işləmirsə nə etmək lazımdır?",
    options: [
      { id: "a", text: "Arxa şüşəyə qəza durma nişanı bərkidilməlidir" },
      { id: "b", text: "Yedəyə almaq olmaz" },
      { id: "c", text: "Sol əli pəncərədən çıxarmaq lazımdır" },
      { id: "d", text: "Yalnız sutkanın işıqlı vaxtı sürmək olar" },
    ],
    correctOptionId: "a",
    category: "General",
    explanation: "Yedəyə alınan nəqliyyat vasitəsində qəza işıq siqnalı nasazdırsa, onun arxa hissəsində (görünən yerdə) Qəza Durma Nişanı (üçbucaq) bərkidilməlidir."
  },
  
  // --- SÜRƏT (Speed) ---
  {
    id: "q129",
    text: "Yük avtomobilləri (kütləsi 3.5 tondan çox) magistral yolda maksimum hansı sürətlə hərəkət edə bilər?",
    options: [
      { id: "a", text: "70 km/saat" },
      { id: "b", text: "80 km/saat" },
      { id: "c", text: "90 km/saat" },
      { id: "d", text: "110 km/saat" },
    ],
    correctOptionId: "b",
    category: "Rules",
    explanation: "Avtomagistrallarda icazə verilən maksimum kütləsi 3.5 tondan çox olan yük avtomobilləri üçün sürət həddi 80 km/saatdır. (Minik avtomobilləri üçün 110)."
  },
  {
    id: "q130",
    text: "Şəhərlərarası avtobusların yaşayış məntəqəsindən kənarda (magistral olmayan) yolda maksimal sürəti nə qədərdir?",
    options: [
      { id: "a", text: "70 km/saat" },
      { id: "b", text: "90 km/saat" },
      { id: "c", text: "100 km/saat" },
      { id: "d", text: "60 km/saat" },
    ],
    correctOptionId: "b",
    category: "Rules",
    explanation: "Şəhərlərarası avtobuslar və motosikletlər yaşayış məntəqələrindən kənarda 90 km/saat sürətlə hərəkət edə bilər. (Digər avtobuslar 70)."
  },
  {
    id: "q131",
    text: "Yedəyə alma zamanı (bütün yollarda) maksimal sürət nə qədər ola bilər?",
    options: [
      { id: "a", text: "40 km/saat" },
      { id: "b", text: "50 km/saat" },
      { id: "c", text: "60 km/saat" },
      { id: "d", text: "70 km/saat" },
    ],
    correctOptionId: "b",
    category: "Rules",
    explanation: "Mexaniki nəqliyyat vasitələrini yedəyəalma zamanı sürət 50 km/saatdan artıq olmamalıdır."
  },

  // --- ÖTMƏ (Overtaking) ---
  {
    id: "q132",
    text: "Ötmə əməliyyatını harada etmək olar?",
    options: [
      { id: "a", text: "Piyada keçidlərində (piyada yoxdursa)" },
      { id: "b", text: "Nizamlanan yolayrıclarında (yaşıl işıqda)" },
      { id: "c", text: "Tunellərdə" },
      { id: "d", text: "Dəmiryol keçidlərində" },
    ],
    correctOptionId: "b",
    category: "Rules",
    explanation: "Ötmə qadağandır: nizamlanmayan yolayrıclarında (baş yol istisna), piyada keçidlərində, dəmiryol keçidlərində, tunellərdə. Lakin NİZAMLANAN yolayrıcında (svetofor varsa) əks zolağa çıxmamaq şərti ilə ötmək olar."
  },
  {
    id: "q133",
    text: "Sürücü ötməyə başlamazdan əvvəl nəyə əmin olmalıdır?",
    options: [
      { id: "a", text: "Ötmə zolağının boş olmasına" },
      { id: "b", text: "Qarşıdan gələnin olmadığına" },
      { id: "c", text: "Arxadakının ötməyə başlamadığına" },
      { id: "d", text: "Hamısına" },
    ],
    correctOptionId: "d",
    category: "Rules",
    explanation: "Sürücü, ötmə zolağının kifayət qədər məsafədə boş olmasına, qarşıdan gələnə mane olmayacağına və arxadan gələnin ötməyə başlamadığına əmin olmalıdır."
  },

  // --- TEXNİKİ (Technical) ---
  {
    id: "q134",
    text: "Avtomobilin hansı şüşələrinə pərdə və ya jalüz çəkməyə icazə verilir?",
    options: [
      { id: "a", text: "Yalnız arxa şüşəyə (hər iki tərəfdə xarici güzgü varsa)" },
      { id: "b", text: "Bütün şüşələrə" },
      { id: "c", text: "Ön yan şüşələrə" },
      { id: "d", text: "Heç birinə" },
    ],
    correctOptionId: "a",
    category: "General",
    explanation: "Hər iki tərəfdə xarici arxanı göstərən güzgülər olduqda, minik avtomobillərinin arxa şüşələrinə pərdə və ya jalüz çəkməyə icazə verilir (II qrup plyonka)."
  },
  {
    id: "q135",
    text: "Hansı halda səslə xəbərdarlıq siqnalından istifadə etmək qadağan deyil?",
    options: [
      { id: "a", text: "Yalnız yol-nəqliyyat hadisəsinin qarşısını almaq üçün" },
      { id: "b", text: "Yaşayış məntəqəsindən kənarda ötmə niyyətini bildirmək üçün" },
      { id: "c", text: "Başqa sürücünü salamlamaq üçün" },
      { id: "d", text: "A və B variantları" },
    ],
    correctOptionId: "d",
    category: "Rules",
    explanation: "Səs siqnalı yalnız 2 halda icazəlidir: 1) Qəzanın qarşısını almaq üçün (hər yerdə), 2) Ötmə niyyətini bildirmək üçün (yalnız yaşayış məntəqəsindən KƏNARDA)."
  },

  // --- NİŞANLAR (Signs - New) ---
  {
    id: "q136",
    text: "Yol nişanları qruplarından hansı dairəvi formada və qırmızı haşiyəli olur?",
    options: [
      { id: "a", text: "Xəbərdarlıq nişanları (üçbucaq)" },
      { id: "b", text: "Qadağan nişanları" },
      { id: "c", text: "Məlumatverici nişanlar (düzbucaqlı)" },
      { id: "d", text: "Servis nişanları" },
    ],
    correctOptionId: "b",
    category: "Signs",
    explanation: "Qadağan nişanları əsasən dairəvi formada, ağ fonlu və qırmızı haşiyəli olurlar."
  },
  {
    id: "q137",
    text: "Üçbucaqlı formada, ucu aşağı olan nişan (2.4 'Yol verin') hansı qrupa aiddir?",
    options: [
      { id: "a", text: "Xəbərdarlıq" },
      { id: "b", text: "Üstünlük nişanları" },
      { id: "c", text: "Qadağan" },
      { id: "d", text: "Məcburi hərəkət" },
    ],
    correctOptionId: "b",
    category: "Signs",
    explanation: "2.4 'Yol verin' və 2.1 'Baş yol' nişanları Üstünlük nişanları qrupuna aiddir (yolayrıclarını keçmə növbəliliyini müəyyən edir)."
  },
  
  // --- YOLAYRICI (Intersections - Complex) ---
  {
    id: "q138",
    text: "Sola dönərkən sürücü kimə yol verməlidir? (Svetofor yoxdur, eyni əhəmiyyətli yol)",
    options: [
      { id: "a", text: "Yalnız sağdan gələnə" },
      { id: "b", text: "Qarşıdan düzünə və ya sağa gedən nəqliyyat vasitələrinə" },
      { id: "c", text: "Soldan gələnə" },
      { id: "d", text: "Heç kimə" },
    ],
    correctOptionId: "b",
    category: "Intersections",
    explanation: "Eyni əhəmiyyətli yolda sola və ya geriyə dönərkən, sürücü qarşıdan gəlib düzünə və ya sağa hərəkət edən nəqliyyat vasitələrinə yol verməlidir (Maddə 13.12)."
  },
  {
    id: "q139",
    text: "Svetoforun yaşıl işığı yanır, amma sürücü sola dönmək istəyir. Qarşıdan gələn avtomobil düz gedir. Kim keçməlidir?",
    options: [
      { id: "a", text: "Sola dönən (mən)" },
      { id: "b", text: "Qarşıdan gələn (düz gedən)" },
      { id: "c", text: "Kim daha sürətlidirsə" },
      { id: "d", text: "Razılaşma yolu ilə" },
    ],
    correctOptionId: "b",
    category: "Intersections",
    explanation: "Svetoforun yaşıl işığında sola dönən sürücü, qarşıdan gəlib düzünə və ya sağa gedən nəqliyyat vasitələrinə YOL VERMƏLİDİR (Maddə 13.4)."
  },

  // --- SƏRNİŞİN DAŞIMA ---
  {
    id: "q140",
    text: "Motosikletdə sərnişin daşımaq üçün sürücünün stajı neçə il olmalıdır?",
    options: [
      { id: "a", text: "Musiqili staj vacib deyil" },
      { id: "b", text: "2 ildən çox" },
      { id: "c", text: "1 il" },
      { id: "d", text: "5 il" },
    ],
    correctOptionId: "b",
    category: "General",
    explanation: "Motosikletdə və ya mopeddə sərnişin daşımaq üçün sürücünün həmin kateqoriya üzrə 2 ildən çox sürücülük stajı olmalıdır."
  },
  {
    id: "q141",
    text: "Uşaqların qrup halında daşınması zamanı avtobusun üzərində hansı tanınma nişanı olmalıdır?",
    options: [
      { id: "a", text: "Təhlükəli yük" },
      { id: "b", text: "'Uşaqların daşınması' (sarı kvadrat içində uşaqlar)" },
      { id: "c", text: "Sürücü əlaçı" },
      { id: "d", text: "Heç bir nişan" },
    ],
    correctOptionId: "b",
    category: "General",
    explanation: "Uşaqların mütəşəkkil daşınması zamanı avtobusun ön və arxa hissəsində 'Uşaqların daşınması' tanınma nişanı quraşdırılmalıdır."
  },

  // --- QARIŞIQ (Misc) ---
  {
    id: "q142",
    text: "Sürücü yorğunluq hiss edərsə nə etməlidir?",
    options: [
      { id: "a", text: "Musiqiyə səs verib sürməlidir" },
      { id: "b", text: "Kofe içib davam etməlidir" },
      { id: "c", text: "Hərəkəti dayandırıb dincəlməlidir" },
      { id: "d", text: "Pəncərəni açmalıdır" },
    ],
    correctOptionId: "c",
    category: "General",
    explanation: "Sürücünün reaksiyasını azaldacaq dərəcədə yorğun və xəstə halda nəqliyyat vasitəsini idarə etməsi QADAĞANDIR. Dərhal dincəlmək lazımdır."
  },
  {
    id: "q143",
    text: "Nəqliyyat vasitəsini idarə edərkən telefondan istifadə etmək olarmı?",
    options: [
      { id: "a", text: "Bəli, ehtiyatla" },
      { id: "b", text: "Xeyr, əldə tutmaqla istifadə qadağandır" },
      { id: "c", text: "Yalnız qırmızı işıqda olar" },
      { id: "d", text: "Mesaj yazmaq olmaz, danışmaq olar" },
    ],
    correctOptionId: "b",
    category: "Rules",
    explanation: "Hərəkət zamanı telefonu əldə saxlamaqla ondan istifadə etmək qadağandır (Qulaqlıq və ya hands-free qurğuları istisnadır)."
  },
  {
    id: "q144",
    text: "Birtərəfli hərəkət yolunda (3 zolaqlı) sol zolaqda kimlər dayana bilər?",
    options: [
      { id: "a", text: "Heç kim" },
      { id: "b", text: "Yalnız minik avtomobilləri (dayanma və durma üçün)" },
      { id: "c", text: "Yük avtomobilləri (kütləsi 3.5 tondan çox) yalnız yük yükləmək/boşaltmaq üçün" },
      { id: "d", text: "B və C variantları düzgündür" },
    ],
    correctOptionId: "d",
    category: "Rules",
    explanation: "Yaşayış məntəqəsində birtərəfli yollarda sol tərəfdə dayanmaq və durmaq icazəlidir. Lakin kütləsi 3.5 tondan çox olan yük avtomobilləri sol tərəfdə YALNIZ yük yükləmək və ya boşaltmaq üçün dayana bilər."
  },
  {
    id: "q145",
    text: "Avtomobildə tibbi qutunun (apteçka) tərkibi kim tərəfindən müəyyən edilir?",
    options: [
      { id: "a", text: "Sürücü tərəfindən" },
      { id: "b", text: "Aptek tərəfindən" },
      { id: "c", text: "Səhiyyə Nazirliyi tərəfindən" },
      { id: "d", text: "DYP tərəfindən" },
    ],
    correctOptionId: "c",
    category: "General",
    explanation: "Nəqliyyat vasitələrindəki tibbi qutunun dərman və ləvazimat komplekti Səhiyyə Nazirliyi tərəfindən təsdiq olunmuş siyahı üzrə olmalıdır."
  },
  {
    id: "q146",
    text: "Məcburi hərəkət istiqaməti nişanı (məs: Yalnız düzünə) hansı nəqliyyat vasitəsinə şamil edilmir?",
    options: [
      { id: "a", text: "Taksi" },
      { id: "b", text: "Yük avtomobili" },
      { id: "c", text: "Marşrut nəqliyyat vasitələri (Avtobus)" },
      { id: "d", text: "Əlil sürücülər" },
    ],
    correctOptionId: "c",
    category: "Signs",
    explanation: "Məcburi hərəkət istiqaməti nişanları (4.1.1-4.1.6) marşrut üzrə hərəkət edən nəqliyyat vasitələrinə şamil edilmir."
  },
  {
    id: "q147",
    text: "Yaşayış məntəqəsindən kənarda yolun kənarında (çiyində) durmaq olarmı?",
    options: [
      { id: "a", text: "Xeyr, yalnız xüsusi dayanacaqda" },
      { id: "b", text: "Bəli, yolun hərəkət hissəsindən tam çıxmaq şərtilə" },
      { id: "c", text: "Yalnız qəza zamanı" },
      { id: "d", text: "Gecə vaxtı olmaz" },
    ],
    correctOptionId: "b",
    category: "Rules",
    explanation: "Yaşayış məntəqəsindən kənarda dayanmaq və durmaq yalnız yolun sağ tərəfində, yol çiynində, çiyin olmadıqda isə hərəkət hissəsinin kənarında (mümkün qədər sağda) icazəlidir."
  },
  {
    id: "q148",
    text: "Sürüşkən yolda sürəti azaltmaq üçün nə etmək lazımdır?",
    options: [
      { id: "a", text: "Kəskin tormoz vermək" },
      { id: "b", text: "Sükanı kəskin döndərmək" },
      { id: "c", text: "Mühərriklə tormozlamaq (ötürücünü aşağı salmaq)" },
      { id: "d", text: "İlişmə pedalını (mufta) sıxmaq" },
    ],
    correctOptionId: "c",
    category: "General",
    explanation: "Sürüşkən yolda kəskin tormozlamaq və ya muftanı sıxmaq 'zanos'a (sürüşməyə) səbəb olar. Ən yaxşısı mühərriklə tormozlamaqdır (qazı buraxmaq və pilləni azaltmaq)."
  },
  {
    id: "q149",
    text: "Birtərəfli yolda geriyə hərəkət etmək olarmı?",
    options: [
      { id: "a", text: "Xeyr, qəti qadağandır" },
      { id: "b", text: "Bəli, manevr təhlükəsizdirsə və başqalarına mane olmursa" },
      { id: "c", text: "Yalnız yolayrıcında olar" },
      { id: "d", text: "Yalnız səki ilə" },
    ],
    correctOptionId: "b",
    category: "Rules",
    explanation: "Birtərəfli hərəkət yollarında geriyə hərəkət qadağan deyil (əgər yolayrıcına daxil olmursa və maneə yaratmırsa). (Maddə 42)"
  },
  {
    id: "q150",
    text: "Hansı hava şəraitində arxa duman fənərlərini yandırmaq MƏCBURİDİR?",
    options: [
      { id: "a", text: "Yağışlı havada" },
      { id: "b", text: "Qaranlıqda" },
      { id: "c", text: "Yalnız dumanlı və görünmə məhdud olan şəraitdə" },
      { id: "d", text: "Tuneldə" },
    ],
    correctOptionId: "c",
    category: "General",
    explanation: "Arxa duman fənərləri yalnız görünmənin qeyri-kafi olduğu (duman, güclü qar, yağış) şəraitdə yandırılmalıdır. Aydın havada yandırılması sürücüləri çaşdıra bilər və qadağandır."
  },
  {
    id: "q151",
    text: "Sükan arxasında narkotik vasitə qəbul etmiş şəxsin cəzası nədir?",
    options: [
      { id: "a", text: "Yalnız pul cəriməsi" },
      { id: "b", text: "Sürücülük hüququnun məhdudlaşdırılması və inzibati həbs" },
      { id: "c", text: "Xəbərdarlıq" },
      { id: "d", text: "Maşının müsadirəsi" },
    ],
    correctOptionId: "b",
    category: "Rules",
    explanation: "Narkotik vasitələrin təsiri altında avtomobil idarə etmək sürücülük hüququndan məhrum etmə və inzibati həbs (və ya ağır cərimə) ilə cəzalandırılır."
  },
  {
    id: "q152",
    text: "Yol nişanlanma xətti (qırıq-qırıq) nəyi bildirir?",
    options: [
      { id: "a", text: "Ötmə qadağandır" },
      { id: "b", text: "Zolaqları ayırır, kəsib keçmək olar" },
      { id: "c", text: "Yolun qırağını bildirir" },
      { id: "d", text: "Dayanmaq qadağandır" },
    ],
    correctOptionId: "b",
    category: "Signs",
    explanation: "1.5 nişanlanma xətti (qırıq-qırıq) hərəkət zolaqlarını ayırır və onu hər iki tərəfdən kəsib keçməyə icazə verilir."
  },
  {
    id: "q153",
    text: "Avtomagistralda geriyə dönmək (razvorot) olarmı?",
    options: [
      { id: "a", text: "Bəli, ehtiyatla" },
      { id: "b", text: "Xeyr, qadağandır (texnoloji aralıqlar istisna)" },
      { id: "c", text: "Yalnız gecə vaxtı" },
      { id: "d", text: "Yalnız sol zolaqdan" },
    ],
    correctOptionId: "b",
    category: "Rules",
    explanation: "Avtomagistrallarda geriyə dönmək və geriyə hərəkət etmək qadağandır. Dönmə yalnız xüsusi yolayrıcılarında mümkündür."
  },
  {
    id: "q154",
    text: "Nəqliyyat vasitəsindən çölə zibil atmağın cəriməsi varmı?",
    options: [
      { id: "a", text: "Xeyr" },
      { id: "b", text: "Bəli, inzibati xətadır" },
      { id: "c", text: "Yalnız siqaret atdıqda" },
      { id: "d", text: "Yalnız şüşə atdıqda" },
    ],
    correctOptionId: "b",
    category: "General",
    explanation: "Yola və ya çölə zibil, əşya atmaq hərəkət iştirakçılarına təhlükə yaradır və ətraf mühiti çirkləndirir, buna görə cərimə nəzərdə tutulur."
  },
  {
    id: "q155",
    text: "Dayanma və durma qaydasını pozan sürücünün avtomobili evakuasiya edilə bilərmi?",
    options: [
      { id: "a", text: "Xeyr, yalnız nömrəsi yazılır" },
      { id: "b", text: "Bəli, əgər hərəkətə mane olursa və sürücü yanında deyilsə" },
      { id: "c", text: "Bəli, həmişə" },
      { id: "d", text: "Yalnız polis şöbəsinin qarşısında" },
    ],
    correctOptionId: "b",
    category: "Rules",
    explanation: "Əgər dayanma qaydasını pozmuş avtomobil digər nəqliyyat vasitələrinin və ya piyadaların hərəkətinə maneə yaradırsa və sürücü orada deyilsə, avtomobil evakuatorla cərimə meydançasına aparıla bilər."
  }
];
