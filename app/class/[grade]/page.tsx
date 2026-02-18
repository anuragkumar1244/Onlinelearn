import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaDock } from "@/components/CtaDock";
import { CompactLessonTile } from "@/components/CompactLessonTile";
import { FlashcardStack } from "@/components/FlashcardStack";
import { ProfilePillHeader } from "@/components/ProfilePillHeader";
import { ProgressChipRail } from "@/components/ProgressChipRail";
import { classContent, classMap } from "@/lib/content";

type Props = {
  params: { grade: string };
};

const mentorPool = ["Aarya", "Raman", "Meera", "Kabir"];

export function generateStaticParams() {
  return classContent.map((item) => ({ grade: item.grade.toLowerCase() }));
}

export default function ClassPage({ params }: Props) {
  const content = classMap[params.grade];

  if (!content) {
    notFound();
  }

  return (
    <main className="mobile-canvas">
      <section className="mobile-column">
        <div className="utility-bar">
          <Link href="/" className="utility-bar__link">
            ← Home
          </Link>
          <span>{content.grade} dashboard</span>
        </div>

        <ProfilePillHeader
          title={`Class ${content.grade}`}
          subtitle={content.tagline}
          badge="Today"
          backHref="/"
          backLabel="All classes"
        />

        <section className="surface-card panel-stack featured-class">
          <p className="eyebrow">Now playing</p>
          <h2>{content.videos[0].title}</h2>
          <p>{content.videos[0].topic}</p>
          <span className="featured-class__meta">{content.videos[0].duration} · Mentor Raman</span>
        </section>

        <ProgressChipRail
          title="Session pulse"
          chips={[
            { label: "Lessons done", value: "2/4" },
            { label: "Note review", value: "68%" },
            { label: "Focus timer", value: "29 min" },
            { label: "Mock score", value: "88%" }
          ]}
        />

        <section className="surface-card panel-stack">
          <div className="section-head compact-head">
            <h2>Video lessons</h2>
          </div>
          <div className="compact-list">
            {content.videos.map((video, index) => (
              <CompactLessonTile
                key={video.title}
                title={video.title}
                topic={video.topic}
                duration={video.duration ?? "12 min"}
                mentor={mentorPool[index % mentorPool.length]}
              />
            ))}
          </div>
        </section>

        <section className="surface-card panel-stack">
          <div className="section-head compact-head">
            <h2>Study notes</h2>
          </div>
          <div className="compact-list">
            {content.notes.map((note, index) => (
              <CompactLessonTile
                key={note.title}
                title={note.title}
                topic={note.topic}
                duration="PDF brief"
                mentor={`Mentor ${mentorPool[(index + 1) % mentorPool.length]}`}
                icon="📝"
              />
            ))}
          </div>
        </section>

        <section className="surface-card panel-stack">
          <div className="section-head compact-head">
            <h2>Flashcards</h2>
            <p>Tap cards to rehearse high-retention recall.</p>
          </div>
          <FlashcardStack cards={content.flashcards} />
        </section>

        <CtaDock
          title="Action dock"
          actions={[
            { label: "Start quiz", hint: "10 rapid questions", href: `/class/${params.grade}` },
            { label: "Download notes", hint: "Offline revision", href: `/class/${params.grade}` },
            { label: "Book mentor", hint: "Live doubt session", href: `/class/${params.grade}` }
          ]}
        />
      </section>
    </main>
  );
}
