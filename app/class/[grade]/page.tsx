import Link from "next/link";
import { notFound } from "next/navigation";
import { FlashcardStack } from "@/components/FlashcardStack";
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
    <main className="app-shell">
      <header className="glass detail-head">
        <Link href="/" className="back-link">
          ← Back
        </Link>
        <h1>Class {content.grade}</h1>
        <p>{content.tagline}</p>
      </header>

      <section className="content-grid">
        <article className="glass panel">
          <h2>Video Lessons</h2>
          <ul>
            {content.videos.map((video) => (
              <li key={video.title}>
                <div>
                  <strong>{video.title}</strong>
                  <span>{video.topic}</span>
                </div>
                <em>{video.duration}</em>
              </li>
            ))}
          </ul>
        </article>

        <article className="glass panel">
          <h2>Study Notes</h2>
          <ul>
            {content.notes.map((note) => (
              <li key={note.title}>
                <div>
                  <strong>{note.title}</strong>
                  <span>{note.topic}</span>
                </div>
                <em>PDF</em>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="glass panel">
        <div className="section-head">
          <h2>Flashcards</h2>
          <p>Tap a card to flip and test your memory quickly.</p>
        </div>
        <FlashcardStack cards={content.flashcards} />
      </section>
    </main>
  );
}
