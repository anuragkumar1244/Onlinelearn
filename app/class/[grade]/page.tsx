import Link from "next/link";
import { notFound } from "next/navigation";
import { LearningHub } from "@/components/LearningHub";
import { classContent, classMap } from "@/lib/content";

type Props = {
  params: { grade: string };
};

export function generateStaticParams() {
  return classContent.map((item) => ({ grade: item.grade.toLowerCase() }));
}

export default function ClassPage({ params }: Props) {
  const content = classMap[params.grade];

  if (!content) {
    notFound();
  }

  return (
    <main className="app-shell" aria-labelledby="class-page-title">
      <header className="glass detail-head">
        <nav aria-label="Breadcrumb">
          <Link href="/" className="back-link">
            ← Back to classes
          </Link>
        </nav>
        <h1 id="class-page-title">Class {content.grade}</h1>
        <p>{content.tagline}</p>
      </header>

      <LearningHub content={content} />
    </main>
  );
}
