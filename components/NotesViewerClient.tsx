"use client";

import { useState } from "react";
import { trackDailyStreak } from "@/lib/progress-store";

type Props = {
  noteTitle: string;
};

export function NotesViewerClient({ noteTitle }: Props) {
  const [downloaded, setDownloaded] = useState(false);

  return (
    <div className="stack-gap">
      <p>
        Previewing: <strong>{noteTitle}</strong>
      </p>
      <button
        type="button"
        className="primary-btn"
        onClick={() => {
          trackDailyStreak();
          setDownloaded(true);
        }}
      >
        {downloaded ? "Download triggered ✓" : "Download notes PDF"}
      </button>
    </div>
  );
}
