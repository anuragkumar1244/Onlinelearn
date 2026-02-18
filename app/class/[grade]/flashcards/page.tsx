import Link from "next/link";
import { notFound } from "next/navigation";
import { FlashcardSessionClient } from "@/components/FlashcardSessionClient";
import { classMap } from "@/lib/content";

type Props = {
  params: { grade: string };
};

export default function FlashcardsPage({ params }: Props) {
  const content = classMap[params.grade];

  if (!content) {
    notFound();
  }

  return (
    <main className="app-shell">
      <section className="glass detail-head">
        <Link href={`/class/${params.grade}`} className="back-link">
          ← Back to class
        </Link>
        <h1>Flashcard session</h1>
        <p>Run through quick recall and save a summary to progress.</p>
      </section>

      <section className="glass panel">
        <FlashcardSessionClient
          sessionKey={`${params.grade}:flashcards`}
          cards={content.flashcards}
        />
      </section>
    </main>
  );
}
