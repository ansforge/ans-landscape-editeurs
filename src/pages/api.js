import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { useData } from '@site/src/lib/useData';
import { EXAMPLE_LABELS } from '@site/src/lib/labels';
import { Breadcrumb, ExtLink } from '@site/src/components/ui';

const DATA_FILES = ['services', 'versions', 'roadmaps', 'standards', 'journeys'];

export default function Api() {
  const data = useData();
  const base = useBaseUrl('/');
  return (
    <Layout title="API et spécifications" description="Index des API et des spécifications officielles de chaque service.">
      <div className="fr-container fr-my-6w">
        <Breadcrumb items={[{ label: 'API et spécifications' }]} />
        <h1>API et spécifications</h1>
        <p className="fr-text--lead">L'index des documentations, spécifications, exemples et codes sources officiels. Les contenus restent chez leur propriétaire.</p>

        <div className="fr-table">
          <div className="fr-table__wrapper"><div className="fr-table__container"><div className="fr-table__content">
            <table>
              <caption className="fr-sr-only">Documentation et spécifications par service</caption>
              <thead>
                <tr>
                  <th scope="col">Service</th>
                  <th scope="col">Documentation</th>
                  <th scope="col">Spécification</th>
                  <th scope="col">Exemples</th>
                  <th scope="col">Code source</th>
                </tr>
              </thead>
              <tbody>
                {data.services.map((s) => (
                  <tr key={s.id}>
                    <th scope="row"><Link to={`/services/${s.id}/`}>{s.name}</Link></th>
                    <td><ExtLink href={s.links.documentation}>Documentation</ExtLink></td>
                    <td>{s.links.specification ? <ExtLink href={s.links.specification}>Spécification</ExtLink> : '—'}</td>
                    <td>{s.examples && s.examples.length ? s.examples.map((e) => EXAMPLE_LABELS[e]).join(', ') : 'À venir'}</td>
                    <td>{s.links.source_code ? <ExtLink href={s.links.source_code}>Code source</ExtLink> : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div></div></div>
        </div>

        <h2 className="fr-mt-4w">Données en JSON</h2>
        <p>
          Les données de ce portail sont publiées en JSON pour être réutilisées :{' '}
          {DATA_FILES.map((n, i) => (
            <React.Fragment key={n}>{i ? ', ' : ''}<a href={`${base}data/${n}.json`}>{n}</a></React.Fragment>
          ))}.
        </p>
      </div>
    </Layout>
  );
}
