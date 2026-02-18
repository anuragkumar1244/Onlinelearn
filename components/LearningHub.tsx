"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { FlashcardStack } from "@/components/FlashcardStack";
import type { ClassContent } from "@/lib/content";

type Props = {
  content: ClassContent;
};

const TAB_KEYS = ["ArrowRight", "ArrowLeft", "Home", "End"] as const;

export function LearningHub({ content }: Props) {
  const id = useId();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: "Video Lessons",
      panel: (
        <ul>
          {content.videos.map((video) => (
            <li key={video.title}>
              <div>
                <strong>{video.title}</strong>
                <span>{video.topic}</span>
              </div>
              <em>{video.duration}</em>
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: "Study Notes",
      panel: (
        <ul>
          {content.notes.map((note) => (
            <li key={note.title}>
              <div>
                <strong>{note.title}</strong>
                <span>{note.topic}</span>
              </div>
              <em>PDF</em>
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: "Flashcards",
      panel: (
        <>
          <p className="tab-intro">Use the controls to flip cards and move between questions.</p>
          <FlashcardStack cards={content.flashcards} />
        </>
      ),
    },
  ];

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!TAB_KEYS.includes(event.key as (typeof TAB_KEYS)[number])) {
      return;
    }

    event.preventDefault();

    const last = tabs.length - 1;
    let next = index;

    if (event.key === "ArrowRight") {
      next = index === last ? 0 : index + 1;
    }

    if (event.key === "ArrowLeft") {
      next = index === 0 ? last : index - 1;
    }

    if (event.key === "Home") {
      next = 0;
    }

    if (event.key === "End") {
      next = last;
    }

    setActiveTab(next);
    const nextTab = document.getElementById(`${id}-tab-${next}`);
    nextTab?.focus();
  };

  return (
    <section className="glass panel" aria-labelledby={`${id}-title`}>
      <div className="section-head">
        <h2 id={`${id}-title`}>Learning Hub</h2>
        <p>Switch between lessons, notes, and flashcards with keyboard-friendly tabs.</p>
      </div>

      <div className="tab-list" role="tablist" aria-label="Learning resources">
        {tabs.map((tab, index) => {
          const selected = activeTab === index;
          const tabId = `${id}-tab-${index}`;
          const panelId = `${id}-panel-${index}`;

          return (
            <button
              key={tab.label}
              id={tabId}
              className="tab-button"
              type="button"
              role="tab"
              tabIndex={selected ? 0 : -1}
              aria-selected={selected}
              aria-controls={panelId}
              onClick={() => setActiveTab(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab, index) => {
        const selected = activeTab === index;
        const tabId = `${id}-tab-${index}`;
        const panelId = `${id}-panel-${index}`;

        return (
          <div
            key={tab.label}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            className="tab-panel"
            hidden={!selected}
          >
            {tab.panel}
          </div>
        );
      })}
    </section>
  );
}
