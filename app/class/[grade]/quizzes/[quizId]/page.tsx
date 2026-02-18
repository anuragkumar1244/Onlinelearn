import Link from "next/link";
import { notFound } from "next/navigation";
import { QuizAttemptClient } from "@/components/QuizAttemptClient";
import { classMap } from "@/lib/content";

type Props = {
  params: { grade: string; quizId: string };
};

export default function QuizPage({ params }: Props) {
  const content = classMap[params.grade];
  const quiz = content?.quizzes.find((item) => item.id === params.quizId);

  if (!content || !quiz) {
    notFound();
  }

  const quizKey = `${params.grade}:${quiz.id}`;

  return (
    <main className="app-shell">
      <section className="glass detail-head">
        <Link href={`/class/${params.grade}`} className="back-link">
          ← Back to class
        </Link>
        <h1>{quiz.title}</h1>
        <p>
          {quiz.topic} · {quiz.questionCount} questions
        </p>
      </section>

      <section className="glass panel">
        <QuizAttemptClient quizKey={quizKey} totalQuestions={quiz.questionCount} />
      </section>
    </main>
  );
}
