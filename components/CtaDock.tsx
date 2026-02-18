import Link from "next/link";
import type { Route } from "next";

type Action = {
  label: string;
  hint: string;
  href: Route;
};

type Props = {
  title: string;
  actions: Action[];
};

export function CtaDock({ title, actions }: Props) {
  return (
    <section className="surface-card panel-stack">
      <div className="section-head compact-head">
        <h2>{title}</h2>
      </div>
      <div className="cta-dock" role="list">
        {actions.map((action) => (
          <Link key={action.label} href={action.href} className="cta-dock__item" role="listitem">
            <strong>{action.label}</strong>
            <span>{action.hint}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
