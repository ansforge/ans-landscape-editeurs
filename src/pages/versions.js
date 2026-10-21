import React, { useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { useData } from '@site/src/lib/useData';
import { THEMES, STATUSES, formatDate, versionStatusKey } from '@site/src/lib/labels';
import { Breadcrumb, ExtLink, StatusPill } from '@site/src/components/ui';

export default function Versions() {
  const data = useData();
  const [status, setStatus] = useState('all');
  const [theme, setTheme] = useState('all');

  const rows = useMemo(
    () =>
      data.versions
        .map((v) => ({ ...v, key: versionStatusKey(v), service: data.servicesById.get(v.service) }))
        .sort((a, b) => STATUSES[a.key].rank - STATUSES[b.key].rank || a.service.name.localeCompare(b.service.name)),
    [data]
  );
  const shown = rows.filter((r) => (status === 'all' || r.key === status) && (theme === 'all' || r.service.theme === theme));

  const urgent = rows.filter((r) => r.key === 'deprecated' || r.key === 'eol');
  const unverified = rows.filter((r) => r.key === 'unverified');

  return (
    <Layout title="Versions et roadmaps" description="Quelle version utiliser, jusqu'à quand elle est supportée, ce qui arrive ensuite.">
      <div className="fr-container fr-my-6w">
        <Breadcrumb items={[{ label: 'Versions' }]} />
        <h1>Versions et roadmaps</h1>
        <p className="fr-text--lead">Quelle version utiliser, jusqu'à quand elle est supportée, ce qui arrive ensuite.</p>

        {urgent.length > 0 && (
          <div className="fr-callout fr-callout--yellow-moutarde">
            <h2 className="fr-callout__title fr-h5">À traiter : {urgent.length} {urgent.length > 1 ? 'versions demandent' : 'version demande'} une action</h2>
            <p className="fr-callout__text">Les versions dépréciées ou en fin de vie sont affichées en premier dans le tableau.</p>
          </div>
        )}
        {unverified.length > 0 && (
          <div className="fr-alert fr-alert--info fr-mt-2w">
            <h2 className="fr-alert__title">{unverified.length} {unverified.length > 1 ? 'versions' : 'version'} à vérifier</h2>
            <p>Les versions et statuts ci-dessous sont en cours de validation par le référent. Consultez la documentation officielle de chaque service pour la version à jour.</p>
          </div>
        )}

        <h2 className="fr-h4 fr-mt-4w">Légende des statuts</h2>
        <ul className="plain-list">
          {Object.entries(STATUSES).map(([id]) => <li key={id}><StatusPill status={id} /></li>)}
        </ul>
        <p className="meta fr-mt-1w">
          {Object.values(STATUSES).map((s) => `${s.label} : ${s.hint.toLowerCase()}.`).join(' ')}
        </p>

        <div className="fr-grid-row fr-grid-row--gutters fr-mt-2w">
          <div className="fr-col-12 fr-col-md-4">
            <div className="fr-select-group">
              <label className="fr-label" htmlFor="v-status">Statut</label>
              <select className="fr-select" id="v-status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="all">Tous</option>
                {Object.entries(STATUSES).map(([id, s]) => <option key={id} value={id}>{s.label}</option>)}
              </select>
            </div>
          </div>
          <div className="fr-col-12 fr-col-md-4">
            <div className="fr-select-group">
              <label className="fr-label" htmlFor="v-theme">Thème</label>
              <select className="fr-select" id="v-theme" value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="all">Tous</option>
                {Object.entries(THEMES).map(([id, t]) => <option key={id} value={id}>{t.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        <p role="status" aria-live="polite"><strong>{shown.length} {shown.length > 1 ? 'lignes' : 'ligne'}</strong></p>
        <div className="fr-table fr-table--layout-fixed">
          <div className="fr-table__wrapper"><div className="fr-table__container"><div className="fr-table__content">
            <table>
              <caption>Versions par service <span className="fr-sr-only">, triées par urgence</span></caption>
              <thead>
                <tr>
                  <th scope="col">Service</th>
                  <th scope="col">Version</th>
                  <th scope="col">Statut</th>
                  <th scope="col">Fin de support</th>
                  <th scope="col">Notes de version</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((r) => (
                  <tr key={`${r.service.id}-${r.version}`}>
                    <th scope="row"><Link to={`/services/${r.service.id}/`}>{r.service.name}</Link></th>
                    <td>{r.version}</td>
                    <td className="status-cell"><StatusPill status={r.key} /></td>
                    <td>{r.end_of_support ? formatDate(r.end_of_support) : '—'}</td>
                    <td>{r.release_notes ? <ExtLink href={r.release_notes}>Notes</ExtLink> : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div></div></div>
        </div>
        <p className="meta">Source : <code>data/versions.yml</code>. Une modification passe par une pull request.</p>

        <h2 className="fr-mt-6w">Roadmaps</h2>
        {data.roadmaps.length === 0 ? (
          <p>Aucune évolution annoncée dans les données du portail pour le moment.</p>
        ) : (
          <div className="fr-table">
            <div className="fr-table__wrapper"><div className="fr-table__container"><div className="fr-table__content">
              <table>
                <caption className="fr-sr-only">Prochaines évolutions annoncées</caption>
                <thead><tr><th scope="col">Service</th><th scope="col">Évolution prévue</th><th scope="col">Breaking changes</th><th scope="col">Détail</th></tr></thead>
                <tbody>
                  {data.roadmaps.map((r) => (
                    <tr key={`${r.service}-${r.planned}`}>
                      <th scope="row"><Link to={`/services/${r.service}/`}>{data.servicesById.get(r.service).name}</Link></th>
                      <td>{r.planned}{!r.verified && <span className="meta"> (à vérifier)</span>}</td>
                      <td>{r.breaking_changes == null ? '—' : r.breaking_changes ? 'Oui' : 'Aucun annoncé'}</td>
                      <td>{r.link ? <ExtLink href={r.link}>Détail</ExtLink> : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div></div></div>
          </div>
        )}
      </div>
    </Layout>
  );
}
