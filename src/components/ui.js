import React from 'react';
import Link from '@docusaurus/Link';
import { STATUSES, THEMES, LINK_LABELS, versionStatusKey } from '@site/src/lib/labels';

export function Breadcrumb({ items }) {
  return (
    <nav role="navigation" className="fr-breadcrumb" aria-label="vous êtes ici :">
      <ol className="fr-breadcrumb__list">
        {[{ label: 'Accueil', to: '/' }, ...items].map((item, i, all) => {
          const last = i === all.length - 1;
          return (
            <li key={item.label}>
              {last ? (
                <a className="fr-breadcrumb__link" aria-current="page">{item.label}</a>
              ) : (
                <Link className="fr-breadcrumb__link" to={item.to}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Lien vers une source externe : ouvre un nouvel onglet et le dit aux lecteurs d'écran. */
export function ExtLink({ href, children, className }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children} <span className="fr-sr-only">(nouvelle fenêtre)</span>
    </a>
  );
}

export function StatusPill({ status }) {
  const s = STATUSES[status];
  if (!s) return null;
  return (
    <span className={`statut ${s.cls}`} title={s.hint}>
      <span aria-hidden="true">{s.icon}</span> {s.label}
    </span>
  );
}

export function ThemeBadge({ theme }) {
  const t = THEMES[theme];
  return <p className={`fr-badge fr-badge--sm ${t.badge}`}>{t.label}</p>;
}

/** Version « principale » d'un service : la recommandée, sinon la première ligne. */
export function mainVersion(rows) {
  if (!rows || rows.length === 0) return null;
  return rows.find((r) => r.status === 'recommended') || rows[0];
}

export function ServiceCard({ service, versions, level }) {
  const row = mainVersion(versions);
  const key = versionStatusKey(row);
  const features = [];
  if (service.links.sandbox || service.sandbox) features.push('Bac à sable');
  if (service.links.specification) features.push('Spécification');
  return (
    <div className="fr-card fr-enlarge-link">
      <div className="fr-card__body">
        <div className="fr-card__content">
          <h3 className="fr-card__title">
            <Link to={`/services/${service.id}/`}>{service.name}</Link>
          </h3>
          <p className="fr-card__desc">{service.summary}</p>
          <div className="fr-card__start">
            <ul className="fr-badges-group">
              <li><ThemeBadge theme={service.theme} /></li>
              {key && <li><StatusPill status={key} /></li>}
              {level === 'maybe' && <li><p className="fr-badge fr-badge--sm fr-badge--info">À confirmer</p></li>}
            </ul>
          </div>
          {features.length > 0 && (
            <div className="fr-card__end"><p className="fr-card__detail">{features.join(' · ')}</p></div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ResourceBlock({ title, children }) {
  return (
    <div className="fr-col-12 fr-col-md-6">
      <div className="res-bloc">
        <h3 className="fr-h6">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export function linkLabel(key) {
  return LINK_LABELS[key] || key;
}
