import Link from "next/link";
import { CtaDock } from "@/components/CtaDock";
import { CompactLessonTile } from "@/components/CompactLessonTile";
import { ProfilePillHeader } from "@/components/ProfilePillHeader";
import { ProgressChipRail } from "@/components/ProgressChipRail";
import { classContent } from "@/lib/content";

const mentorPool = ["Aarya", "Raman", "Meera", "Kabir"];

export default function HomePage() {
  const featuredClass = classContent[5];

  return (
    <main className="mobile-canvas">
      <section className="mobile-column">
        <div className="utility-bar">
          <span>OnlineLearn</span>
          <span>21 day streak 🔥</span>
        </div>

        <ProfilePillHeader
          title="Welcome back, Riya"
          subtitle="Continue your board-prep sprint with bite-sized lessons."
          badge="Premium"
        />

        <section className="surface-card panel-stack featured-class">
          <p className="eyebrow">Featured class</p>
          <h2>Class {featuredClass.grade}</h2>
          <p>{featuredClass.tagline}</p>
          <Link href={`/class/${featuredClass.grade.toLowerCase()}`} className="featured-class__cta">
            Resume learning →
          </Link>
        </section>

        <ProgressChipRail
          title="Quick progress"
          chips={[
            { label: "Weekly target", value: "4/6 lessons" },
            { label: "Math mastery", value: "82%" },
            { label: "Science streak", value: "7 days" },
            { label: "Recall score", value: "91%" }
          ]}
        />

        <section className="surface-card panel-stack">
          <div className="section-head compact-head">
            <h2>Class lineup</h2>
            <p>Compact plans tuned for your daily session flow.</p>
          </div>
          <div className="compact-list">
            {classContent.map((item, index) => (
              <Link
                href={`/class/${item.grade.toLowerCase()}`}
                key={item.grade}
                className="compact-link"
              >
                <CompactLessonTile
                  title={`Class ${item.grade} · Focus plan`}
                  topic={item.tagline}
                  duration={`${14 + (index % 5)} min`}
                  mentor={mentorPool[index % mentorPool.length]}
                  icon="📘"
                />
              </Link>
            ))}
          </div>
        </section>

        <CtaDock
          title="Quick actions"
          actions={[
            { label: "Practice Zone", hint: "Daily mixed quiz", href: "/class/10th" },
            { label: "Doubt Clinic", hint: "Ask your mentor", href: "/class/9th" },
            { label: "Exam Sprint", hint: "15 min revision", href: "/class/12th" }
          ]}
        />
      </section>
    </main>
  );
}
