import Link from "next/link";
import { notFound } from "next/navigation";
import { LearningHub } from "@/components/LearningHub";
import { classContent, classMap } from "@/lib/content";

type Props = {
  params: { grade: string };
};

const mentorPool = ["Aarya", "Raman", "Meera", "Kabir"];

export function generateStaticParams() {
  return classContent.map((item) => ({ grade: item.grade.toLowerCase() }));
}

function ResourceCard({ resource }: { resource: LearningResource }) {
  return (
    <li key={resource.id}>
      <div>
        <strong>{resource.title}</strong>
        <span>
          {resource.subject} • {resource.chapter}
        </span>
        <span>
          {resource.unit} • {resource.week}
        </span>
        <span>
          Mentor: {resource.mentor.name} ({resource.mentor.role})
        </span>
        <span>
          Due {resource.dueDate} • {resource.completionState}
        </span>
        <span>Outcomes: {resource.topicOutcomes.join(" • ")}</span>
        <span>Tags: {resource.difficultyTags.join(", ")}</span>
      </div>
      <div className="resource-meta">
        <em>{resource.duration}</em>
        <small>{resource.kind.toUpperCase()}</small>
      </div>
    </li>
  );
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
