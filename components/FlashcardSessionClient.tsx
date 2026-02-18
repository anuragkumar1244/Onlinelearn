"use client";

import { useState } from "react";
import type { Flashcard } from "@/lib/content";
import { saveFlashcardProgress } from "@/lib/progress-store";

type Props = {
  sessionKey: string;
  cards: Flashcard[];
};

export function FlashcardSessionClient({ sessionKey, cards }: Props) {
  const [knownCount, setKnownCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="stack-gap">
      <div className="flashcard-grid">
        {cards.map((card) => (
          <article key={card.id} className="flashcard-summary glass">
            <small>{card.id}</small>
            <p>{card.question}</p>
          </article>
        ))}
      </div>

      <label htmlFor="known-cards">How many cards did you recall?</label>
      <input
        id="known-cards"
        type="number"
        min={0}
        max={cards.length}
        value={knownCount}
        onChange={(event) => setKnownCount(Number(event.target.value))}
      />

      <button
        type="button"
        className="primary-btn"
        onClick={() => {
          saveFlashcardProgress(sessionKey, knownCount, cards.length);
          setSubmitted(true);
        }}
      >
        Finish session
      </button>

      {submitted && (
        <div className="glass panel">
          <h3>Session summary</h3>
          <p>
            You marked {knownCount} of {cards.length} flashcards as known.
          </p>
        </div>
      )}
    </section>
  );
}
