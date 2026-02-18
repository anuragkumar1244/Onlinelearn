import Link from "next/link";
import type { Route } from "next";

type Props = {
  title: string;
  subtitle: string;
  badge: string;
  backHref?: Route;
  backLabel?: string;
};

export function ProfilePillHeader({
  title,
  subtitle,
  badge,
  backHref,
  backLabel = "Back"
}: Props) {
  return (
    <header className="profile-pill-header surface-card">
      <div className="profile-pill-header__top">
        {backHref ? (
          <Link href={backHref} className="profile-pill-header__utility">
            ← {backLabel}
          </Link>
        ) : (
          <span className="profile-pill-header__utility">Daily Focus</span>
        )}
        <span className="profile-pill-header__badge">{badge}</span>
      </div>

      <div className="profile-pill-header__content">
        <div className="avatar-pill" aria-hidden>
          🎓
        </div>
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
    </header>
  );
}
