"use client";

import { useState } from "react";
import { markLessonWatched } from "@/lib/progress-store";

type Props = {
  lessonKey: string;
};

export function LessonDetailClient({ lessonKey }: Props) {
  const [done, setDone] = useState(false);

  return (
    <button
      type="button"
      className="primary-btn"
      onClick={() => {
        markLessonWatched(lessonKey);
        setDone(true);
      }}
    >
      {done ? "Watched saved ✓" : "Mark lesson as watched"}
    </button>
  );
}
