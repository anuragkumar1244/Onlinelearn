"use client";

import { useState } from "react";
import type { Flashcard } from "@/lib/content";

type Props = {
  cards: Flashcard[];
};

export function FlashcardStack({ cards }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (cards.length === 0) {
    return <p>No flashcards available right now.</p>;
  }

  const activeCard = cards[activeIndex];

  const goToCard = (index: number) => {
    setActiveIndex(index);
    setIsFlipped(false);
  };

  const goToPrevious = () => {
    const previous = activeIndex === 0 ? cards.length - 1 : activeIndex - 1;
    goToCard(previous);
  };

  const goToNext = () => {
    const next = activeIndex === cards.length - 1 ? 0 : activeIndex + 1;
    goToCard(next);
  };

  return (
    <div className="flashcard-stack" aria-label="Flashcard practice area">
      <p className="flashcard-help" id="flashcard-instructions">
        Press the flip button to hear the answer. Use Previous and Next to move cards.
      </p>

      <div
        className={`flashcard ${isFlipped ? "is-flipped" : ""}`}
        role="group"
        aria-roledescription="flashcard"
        aria-labelledby="flashcard-position"
        aria-describedby="flashcard-instructions"
      >
        <div className="flashcard-face flashcard-front" aria-hidden={isFlipped}>
          <small>Question</small>
          <p>{activeCard.question}</p>
        </div>
        <div className="flashcard-face flashcard-back" aria-hidden={!isFlipped}>
          <small>Answer</small>
          <p>{activeCard.answer}</p>
        </div>
      </div>

      <p id="flashcard-position" className="flashcard-position" aria-live="polite">
        Card {activeIndex + 1} of {cards.length}
      </p>

      <div className="flashcard-actions">
        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Go to previous flashcard"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => setIsFlipped((current) => !current)}
          aria-label={isFlipped ? "Show question side" : "Flip card to show answer"}
          aria-pressed={isFlipped}
        >
          {isFlipped ? "Show question" : "Flip for answer"}
        </button>
        <button
          type="button"
          onClick={goToNext}
          aria-label="Go to next flashcard"
        >
          Next
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {isFlipped
          ? `Answer: ${activeCard.answer}`
          : `Question: ${activeCard.question}`}
      </p>
    </div>
  );
}
