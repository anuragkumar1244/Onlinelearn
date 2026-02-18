import Link from "next/link";
import { notFound } from "next/navigation";
import { ProgressDashboardClient } from "@/components/ProgressDashboardClient";
import { classMap } from "@/lib/content";

type Props = {
  params: { grade: string };
};

export default function ProgressPage({ params }: Props) {
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
        <h1>Progress dashboard</h1>
        <p>All local student progress signals are persisted per browser.</p>
      </section>

      <ProgressDashboardClient />
    </main>
  );
}
