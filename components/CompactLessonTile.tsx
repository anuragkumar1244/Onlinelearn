type Props = {
  title: string;
  topic: string;
  duration: string;
  mentor: string;
  icon?: string;
};

export function CompactLessonTile({
  title,
  topic,
  duration,
  mentor,
  icon = "▶"
}: Props) {
  return (
    <article className="compact-lesson-tile">
      <span className="compact-lesson-tile__icon" aria-hidden>
        {icon}
      </span>
      <div className="compact-lesson-tile__body">
        <strong>{title}</strong>
        <span>{topic}</span>
        <div className="compact-lesson-tile__meta">
          <em>{duration}</em>
          <i>{mentor}</i>
        </div>
      </div>
    </article>
  );
}
