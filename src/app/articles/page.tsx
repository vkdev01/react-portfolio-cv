import type { Metadata } from "next";
import { getAllArticles } from "@/lib/content";
import { PageHeader } from "@/components/site/headings";
import { ArticleList } from "@/components/site/article-list";

export const metadata: Metadata = {
  title: "Articles",
  description: "Writing on programming, machine learning, data structures and more.",
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <>
      <PageHeader
        eyebrow="Articles"
        title="Writing & notes"
        description="A chronological collection of my writing on programming, machine learning, data structures and more."
      />
      <ArticleList articles={articles} />
    </>
  );
}
