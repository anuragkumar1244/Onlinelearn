"use client";

import { useState } from "react";
import type { Flashcard } from "@/lib/content";

type Props = {
  cards: Flashcard[];
};

export function FlashcardStack({ cards }: Props) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="flashcard-grid">
      {cards.map((card, idx) => {
        const isFlipped = active === idx;

        return (
          <button
            key={card.question}
            className={`flashcard ${isFlipped ? "is-flipped" : ""}`}
            onClick={() => setActive(isFlipped ? null : idx)}
            type="button"
          >
            <span className="flashcard-face flashcard-front">
              <small>Tap to reveal</small>
              <p>{card.question}</p>
            </span>
            <span className="flashcard-face flashcard-back">
              <small>Answer</small>
              <p>{card.answer}</p>
            </span>
          </button>
        );
      })}
    </div>
  );
}
