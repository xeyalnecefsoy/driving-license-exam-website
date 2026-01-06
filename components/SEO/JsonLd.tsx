export function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dyp-imtahan.az";

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DYP İmtahan Hazırlığı",
    alternateName: "Sürücülük Vəsiqəsi İmtahanı",
    url: siteUrl,
    description:
      "Azərbaycan DYP sürücülük vəsiqəsi imtahanına pulsuz hazırlıq platforması",
    inLanguage: "az",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const educationalSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Sürücülük İmtahanına Hazırlıq Kursu",
    description:
      "Azərbaycan DYP sürücülük vəsiqəsi imtahanına hazırlıq. Yol nişanları, hərəkət qaydaları, 120+ test sualı.",
    provider: {
      "@type": "Organization",
      name: "DYP İmtahan Hazırlığı",
      url: siteUrl,
    },
    educationalCredentialAwarded: "Sürücülük vəsiqəsi imtahanına hazırlıq",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT2H",
    },
    isAccessibleForFree: true,
    inLanguage: "az",
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DYP İmtahan Hazırlığı",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: "Azərbaycan sürücülük imtahanına hazırlıq platforması",
    areaServed: {
      "@type": "Country",
      name: "Azerbaijan",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(educationalSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
    </>
  );
}
