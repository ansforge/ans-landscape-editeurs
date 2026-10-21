import React, { useMemo } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { useData, useQueryParam } from '@site/src/lib/useData';
import { normalize } from '@site/src/lib/labels';
import { Breadcrumb, ExtLink } from '@site/src/components/ui';

/** Recherche plein texte côté navigateur sur les services, les étapes et les référentiels. */
function search(data, query) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const score = (fields) => {
    const text = normalize(fields.join(' '));
    if (!terms.every((t) => text.includes(t))) return 0;
    const title = normalize(fields[0]);
    return terms.reduce((n, t) => n + (title.includes(t) ? 5 : 1), 0);
  };
  const results = [];
  for (const s of data.services) {
    const n = score([s.name, s.summary, s.use_when, s.id]);
    if (n) results.push({ n, kind: 'Service', title: s.name, text: s.summary, to: `/services/${s.id}/` });
  }
  for (const st of data.journeys.steps) {
    const n = score([st.title, st.objective, ...st.actions]);
    if (n) results.push({ n, kind: 'Étape du parcours', title: st.title, text: st.objective, to: `/parcours/etapes/${st.id}/` });
  }
  for (const r of data.standards) {
    const n = score([r.name, r.summary]);
    if (n) results.push({ n, kind: 'Référentiel', title: r.name, text: r.summary, href: r.link });
  }
  return results.sort((a, b) => b.n - a.n || a.title.localeCompare(b.title));
}

export default function Recherche() {
  const data = useData();
  const q = useQueryParam('q');
  const results = useMemo(() => (q ? search(data, q) : []), [data, q]);

  return (
    <Layout title="Recherche">
      <div className="fr-container fr-my-6w">
        <Breadcrumb items={[{ label: 'Recherche' }]} />
        <h1>Recherche</h1>
        {q === undefined && <p role="status">Chargement…</p>}
        {q === null && <p>Saisissez un mot dans le champ de recherche, par exemple « authentifier », « FHIR » ou « sandbox ».</p>}
        {q === '' && <p>Saisissez un mot dans le champ de recherche.</p>}
        {q && (
          <>
            <p role="status" aria-live="polite">
              <strong>{results.length} {results.length > 1 ? 'résultats' : 'résultat'}</strong> pour « {q} »
            </p>
            {results.length === 0 && (
              <p>Aucun résultat. Essayez un autre mot, parcourez le <Link to="/services/">catalogue</Link> ou <Link to="/demarrer/">répondez au questionnaire</Link>.</p>
            )}
            <ul className="fr-raw-list" style={{ listStyle: 'none', padding: 0 }}>
              {results.map((r) => (
                <li key={`${r.kind}-${r.title}`} className="fr-mb-3w">
                  <p className="meta fr-mb-0">{r.kind}</p>
                  <h2 className="fr-h5 fr-mb-1v">
                    {r.to ? <Link to={r.to}>{r.title}</Link> : <ExtLink href={r.href}>{r.title}</ExtLink>}
                  </h2>
                  <p className="fr-mb-0">{r.text}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Layout>
  );
}
