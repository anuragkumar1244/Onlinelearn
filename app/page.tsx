import Link from "next/link";
import { classContent } from "@/lib/content";

export default function HomePage() {
  return (
    <main className="app-shell" aria-labelledby="homepage-title">
      <header className="hero glass">
        <span className="pill">OnlineLearn</span>
        <h1 id="homepage-title">Learn smarter from Class 5th to 12th.</h1>
        <p>
          A premium, iOS-inspired learning experience with videos, notes and
          flashcards designed for students.
        </p>
      </header>

      <section aria-labelledby="class-list-title">
        <div className="section-head">
          <h2 id="class-list-title">Choose your class</h2>
          <p>Pick your grade and continue your daily learning streak.</p>
        </div>

        <nav className="class-grid" aria-label="Class selection">
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
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
