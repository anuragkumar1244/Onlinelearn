import Link from "next/link";
import { notFound } from "next/navigation";
import { FlashcardStack } from "@/components/FlashcardStack";
import { ResourceCard } from "@/components/sections/ResourceCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ClassContent, Resource } from "@/lib/content";
import { classContent, classMap } from "@/lib/content";

type Props = {
  params: { grade: string };
};

type ResourcePanel = {
  label: string;
  value: "videos" | "notes";
  items: Resource[];
};

export function generateStaticParams() {
  return classContent.map((item) => ({ grade: item.grade.toLowerCase() }));
}

function toResourcePanels(content: ClassContent): ResourcePanel[] {
  return [
    { label: "Video Lessons", value: "videos", items: content.videos },
    { label: "Study Notes", value: "notes", items: content.notes }
  ];
}

export default function ClassPage({ params }: Props) {
  const content = classMap[params.grade];

  if (!content) {
    notFound();
  }

  const panels = toResourcePanels(content);

  return (
    <main className="app-shell">
      <Card>
        <CardHeader>
          <Badge variant="secondary" className="fit">Class {content.grade}</Badge>
          <CardTitle>Learning hub</CardTitle>
          <CardDescription>{content.tagline}</CardDescription>
        </CardHeader>
        <CardContent className="top-actions">
          <Link href="/">
            <Button variant="outline" size="sm">← Back</Button>
          </Link>
          <Badge variant="outline">{content.flashcards.length} flashcards</Badge>
        </CardContent>
      </Card>

      <Tabs defaultValue="videos">
        <TabsList>
          {panels.map((panel) => (
            <TabsTrigger key={panel.value} value={panel.value}>
              {panel.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {panels.map((panel) => (
          <TabsContent key={panel.value} value={panel.value}>
            <ScrollArea className="resource-scroll">
              <div className="content-grid-ui">
                {panel.items.map((item) => (
                  <ResourceCard key={item.title} resource={item} kind={panel.value === "videos" ? "video" : "note"} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>

      <Separator />

      <section>
        <div className="section-head">
          <h2>Flashcards</h2>
          <p>Tap a card to flip and test your memory quickly.</p>
        </div>
        <FlashcardStack cards={content.flashcards} />
      </section>
    </main>
  );
}
