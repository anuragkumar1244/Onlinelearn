import Link from "next/link";
import { notFound } from "next/navigation";
import { FlashcardStack } from "@/components/FlashcardStack";
import { classContent, classMap, type LearningResource } from "@/lib/content";

type Props = {
  params: { grade: string };
};

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
          <h2>Continue Learning</h2>
          <ul>
            {content.groupings.continueLearning.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </ul>
        </article>

        <article className="glass panel">
          <h2>Today&apos;s Plan</h2>
          <ul>
            {content.groupings.todaysPlan.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </ul>
        </article>
      </section>

      <section className="content-grid">
        <article className="glass panel">
          <h2>Upcoming Live</h2>
          <ul>
            {content.groupings.upcomingLive.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </ul>
        </article>

        <article className="glass panel">
          <h2>By Subject</h2>
          <ul>
            {Object.entries(content.groupings.bySubject).map(([subject, resources]) => (
              <li key={subject}>
                <div>
                  <strong>{subject}</strong>
                  <span>{resources.map((resource) => resource.title).join(" • ")}</span>
                </div>
                <em>{resources.length} items</em>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="content-grid">
        <article className="glass panel">
          <h2>Video Lessons</h2>
          <ul>
            {content.videos.map((video) => (
              <ResourceCard key={video.id} resource={video} />
            ))}
          </ul>
        </article>

        <article className="glass panel">
          <h2>Study Notes</h2>
          <ul>
            {content.notes.map((note) => (
              <ResourceCard key={note.id} resource={note} />
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
