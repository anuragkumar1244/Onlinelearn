import Link from "next/link";

export default function HomePage() {
  return (
    <main className="app-shell">
      <section className="hero glass">
        <span className="pill">OnlineLearn onboarding</span>
        <h1>Your learning journey starts in one tap.</h1>
        <p>
          Pick your class, watch a lesson, attempt quizzes, and build momentum
          through notes + flashcards.
        </p>
        <div className="action-row">
          <Link href="/class" className="primary-btn">
            Enter learning app
          </Link>
        </div>
      </section>
    </main>
  );
}
