import Link from "next/link";
import { notFound } from "next/navigation";
import { NotesViewerClient } from "@/components/NotesViewerClient";
import { classMap } from "@/lib/content";

type Props = {
  params: { grade: string; noteId: string };
};

export default function NotesPage({ params }: Props) {
  const content = classMap[params.grade];
  const note = content?.notes.find((item) => item.id === params.noteId);

  if (!content || !note) {
    notFound();
  }

  return (
    <main className="app-shell">
      <section className="glass detail-head">
        <Link href={`/class/${params.grade}`} className="back-link">
          ← Back to class
        </Link>
        <h1>{note.title}</h1>
        <p>{note.topic}</p>
      </section>

      <section className="glass panel">
        <NotesViewerClient noteTitle={note.title} />
      </section>
    </main>
  );
}
