import Link from "next/link";
import { notFound } from "next/navigation";
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
        <Link href="/class" className="back-link">
          ← Change class
        </Link>
        <h1>Class {content.grade}</h1>
        <p>{content.tagline}</p>
      </header>

      <section className="content-grid">
        <article className="glass panel">
          <h2>Lessons</h2>
          <ul>
            {content.videos.map((lesson) => (
              <li key={lesson.id}>
                <div>
                  <strong>{lesson.title}</strong>
                  <span>{lesson.topic}</span>
                </div>
                <Link
                  href={`/class/${params.grade}/lessons/${lesson.id}`}
                  className="inline-link"
                >
                  Open
                </Link>
              </li>
            ))}
          </ul>
        </article>

        <article className="glass panel">
          <h2>Quizzes</h2>
          <ul>
            {content.quizzes.map((quiz) => (
              <li key={quiz.id}>
                <div>
                  <strong>{quiz.title}</strong>
                  <span>{quiz.questionCount} questions</span>
                </div>
                <Link
                  href={`/class/${params.grade}/quizzes/${quiz.id}`}
                  className="inline-link"
                >
                  Attempt
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="content-grid">
        <article className="glass panel">
          <h2>Notes</h2>
          <ul>
            {content.notes.map((note) => (
              <li key={note.id}>
                <div>
                  <strong>{note.title}</strong>
                  <span>{note.topic}</span>
                </div>
                <Link
                  href={`/class/${params.grade}/notes/${note.id}`}
                  className="inline-link"
                >
                  View
                </Link>
              </li>
            ))}
          </ul>
        </article>

        <article className="glass panel">
          <h2>Flashcards + Progress</h2>
          <div className="quick-links">
            <Link href={`/class/${params.grade}/flashcards`} className="primary-btn">
              Start flashcards
            </Link>
            <Link href={`/class/${params.grade}/progress`} className="inline-link">
              Open progress dashboard
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
