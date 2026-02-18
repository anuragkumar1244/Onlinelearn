"use client";

import { useEffect, useState } from "react";
import { getProgressState, type ProgressState } from "@/lib/progress-store";

export function ProgressDashboardClient() {
  const [progress, setProgress] = useState<ProgressState | null>(null);

  useEffect(() => {
    setProgress(getProgressState());
  }, []);

  if (!progress) {
    return <p>Loading saved progress...</p>;
  }

  return (
    <div className="content-grid">
      <article className="glass panel">
        <h2>Streak</h2>
        <p>{progress.streak} day(s)</p>
        <p>Last active: {progress.lastActiveDate ?? "No activity yet"}</p>
      </article>

      <article className="glass panel">
        <h2>Watched lessons</h2>
        <p>{progress.watchedLessons.length} lessons completed.</p>
      </article>

      <article className="glass panel">
        <h2>Completed quizzes</h2>
        <p>{Object.keys(progress.completedQuizzes).length} quiz attempts saved.</p>
      </article>

      <article className="glass panel">
        <h2>Flashcard sessions</h2>
        <p>{Object.keys(progress.flashcardProgress).length} session summaries logged.</p>
      </article>
    </div>
  );
}
