type ProgressChip = {
  label: string;
  value: string;
};

type Props = {
  title: string;
  chips: ProgressChip[];
};

export function ProgressChipRail({ title, chips }: Props) {
  return (
    <section className="surface-card panel-stack">
      <div className="section-head compact-head">
        <h2>{title}</h2>
      </div>
      <div className="chip-rail" role="list">
        {chips.map((chip) => (
          <article className="progress-chip" key={chip.label} role="listitem">
            <small>{chip.label}</small>
            <strong>{chip.value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
