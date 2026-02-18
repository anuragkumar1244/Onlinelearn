"use client";

import { useState } from "react";
import { saveQuizAttempt } from "@/lib/progress-store";

type Props = {
  quizKey: string;
  totalQuestions: number;
};

export function QuizAttemptClient({ quizKey, totalQuestions }: Props) {
  const [score, setScore] = useState(Math.ceil(totalQuestions / 2));
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="stack-gap">
      <label htmlFor="score">Mock score</label>
      <input
        id="score"
        type="range"
        min={0}
        max={totalQuestions}
        value={score}
        onChange={(event) => setScore(Number(event.target.value))}
      />
      <p>
        Score preview: {score}/{totalQuestions}
      </p>
      <button
        type="button"
        className="primary-btn"
        onClick={() => {
          saveQuizAttempt(quizKey, score, totalQuestions);
          setSubmitted(true);
        }}
      >
        Submit attempt
      </button>
      {submitted && <p>Quiz completion saved to progress.</p>}
    </div>
  );
}
