import { basicsContent } from "@/data/basics-content";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { notFound } from "next/navigation";
import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
  params: Promise<{ topicId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topicId } = await params;
  const topic = basicsContent[topicId];
  if (!topic) return { title: "Mövzu tapılmadı" };
  
  return {
    title: `${topic.title} - Avtomobil İlkin Biliklər`,
    description: topic.description,
  };
}

export default async function BasicTopicPage({ params }: Props) {
  const { topicId } = await params;
  const topic = basicsContent[topicId];

  if (!topic) {
    notFound();
  }

  // Find next topic for navigation
  const topicIds = Object.keys(basicsContent);
  const currentIndex = topicIds.indexOf(topic.id);
  const nextTopicId = topicIds[currentIndex + 1];
  const nextTopic = nextTopicId ? basicsContent[nextTopicId] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumbs items={[
        { label: "Ana Səhifə", href: "/" },
        { label: "Məlumat", href: "/reference" },
        { label: "İlkin Biliklər", href: "/reference/basics" },
        { label: topic.title }
      ]} />

      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/10">
        <div className="flex items-start gap-6">
          <div className="hidden sm:flex w-16 h-16 bg-background rounded-2xl items-center justify-center shadow-sm shrink-0">
            <topic.icon className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-3">{topic.title}</h1>
            <p className="text-lg text-secondary leading-relaxed">
              {topic.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="grid gap-8">
        {topic.sections.map((section, index) => (
          <div key={index} className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-sm font-bold text-muted-foreground">
                {index + 1}
              </span>
              {section.title}
            </h2>
            
            {section.content && (
              <p className="text-foreground/80 leading-relaxed mb-4 text-lg">
                {section.content}
              </p>
            )}

            {section.list && (
              <ul className="space-y-3 mb-4">
                {section.list.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-secondary">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.warning && (
              <div className="mt-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/20 rounded-lg p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <p className="text-red-800 dark:text-red-300 text-sm font-medium">
                  {section.warning}
                </p>
              </div>
            )}

            {section.tip && (
              <div className="mt-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/20 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <p className="text-green-800 dark:text-green-300 text-sm font-medium">
                  {section.tip}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Next Topic Navigation */}
      {nextTopic && (
        <div className="flex justify-end pt-8">
          <Link 
            href={`/reference/basics/${nextTopic.id}`}
            className="group flex flex-col items-end gap-1 text-right"
          >
            <span className="text-sm text-secondary font-medium">Növbəti Mövzu</span>
            <div className="flex items-center gap-2 text-primary text-lg font-bold group-hover:gap-3 transition-all">
              {nextTopic.title}
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
