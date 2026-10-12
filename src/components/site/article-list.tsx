"use client";

import { useState } from "react";
import type { Article } from "@/content/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArticleRow } from "./article-row";

type Filter = "all" | "local" | "external";

export function ArticleList({ articles }: { articles: Article[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = articles.filter((a) =>
    filter === "all" ? true : filter === "local" ? !a.external : a.external,
  );

  return (
    <>
      <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All ({articles.length})</TabsTrigger>
          <TabsTrigger value="local">On this site</TabsTrigger>
          <TabsTrigger value="external">Elsewhere</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="-mx-4 space-y-1">
        {visible.map((article) => (
          <ArticleRow key={article.href} article={article} />
        ))}
        {visible.length === 0 && <p className="px-4 text-muted-foreground">Nothing here yet.</p>}
      </div>
    </>
  );
}
