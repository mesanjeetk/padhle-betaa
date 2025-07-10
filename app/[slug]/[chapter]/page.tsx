import { subjects } from "@/data/chapters.generated"
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string, chapter: string }>
}): Promise<Metadata> {

  const { slug, chapter } = await params;

  const subject = subjects.find((s) => s.slug === slug);
  const chapterData = subject?.chapters.find((c) => c.chapter === chapter);

  if (!chapterData) {
    return {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist.',
      robots: 'noindex',
    };
  }
  const baseUrl = "http://localhost:3000"
  const url = `${baseUrl}/${slug}/${chapter}`;


  return {
    title: chapterData.title,
    description: chapterData.description,
    keywords: chapterData.keywords,
    alternates: {
      canonical: `${slug}/${chapter}`,
    },
    openGraph: {
      title: chapterData.title,
      description: chapterData.description,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: chapterData.title,
      description: chapterData.description,
    },
  };

}
export async function generateStaticParams() {
  return subjects.flatMap(subject =>
    subject.chapters.map(chapter => ({
      slug: subject.slug,
      chapter: chapter.chapter,
    }))
  );
}


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string, chapter: string }>
}) {
  const { slug, chapter } = await params
  const { default: Post } = await import(`@/content/${slug}/${chapter}/index.mdx`)


  return <Post />
}