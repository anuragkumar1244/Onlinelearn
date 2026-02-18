import Link from "next/link";
import { classContent } from "@/lib/content";

export default function ClassSelectionPage() {
  return (
    <main className="app-shell">
      <section className="glass detail-head">
        <Link href="/" className="back-link">
          ← Onboarding
        </Link>
        <h1>Select your class</h1>
        <p>Navigation now mirrors a real app route flow for each class.</p>
      </section>

      <section>
        <div className="class-grid">
          {classContent.map((item, index) => (
            <Link
              href={`/class/${item.grade.toLowerCase()}`}
              key={item.grade}
              className="class-card glass"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div>
                <strong>Class {item.grade}</strong>
                <span>{item.tagline}</span>
              </div>
              <span className="arrow">→</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
