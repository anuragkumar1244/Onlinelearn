import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonDetailClient } from "@/components/LessonDetailClient";
import { classMap } from "@/lib/content";

type Props = {
  params: { grade: string; lessonId: string };
};

export default function LessonDetailPage({ params }: Props) {
  const content = classMap[params.grade];
  const lesson = content?.videos.find((item) => item.id === params.lessonId);

  if (!content || !lesson) {
    notFound();
  }

  const lessonKey = `${params.grade}:${lesson.id}`;

  return (
    <main className="app-shell">
      <section className="glass detail-head">
        <Link href={`/class/${params.grade}`} className="back-link">
          ← Back to class
        </Link>
        <h1>{lesson.title}</h1>
        <p>
          {lesson.topic} · {lesson.duration}
        </p>
      </section>

      <section className="glass panel stack-gap">
        <p>This is the lesson detail screen in the end-to-end student flow.</p>
        <LessonDetailClient lessonKey={lessonKey} />
      </section>
    </main>
  );
}
