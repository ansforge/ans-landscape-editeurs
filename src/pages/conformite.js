import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { useData } from '@site/src/lib/useData';
import { STANDARD_KINDS } from '@site/src/lib/labels';
import { Breadcrumb, ExtLink, ServiceCard } from '@site/src/components/ui';

export default function Conformite() {
  const data = useData();
  const securite = data.services.filter((s) => s.theme === 'securite');
  return (
    <Layout title="Conformité" description="Synthèse des règles de sécurité et de conformité, avec renvois vers les sources officielles.">
      <div className="fr-container fr-my-6w">
        <Breadcrumb items={[{ label: 'Conformité' }]} />
        <h1>Conformité</h1>
        <p className="fr-text--lead">Les règles de sécurité et de conformité à connaître. Le portail résume et renvoie vers les textes officiels, il ne les remplace pas.</p>

        <h2>Sécurité et confiance</h2>
        <div className="fr-grid-row fr-grid-row--gutters card-grid-equal">
          {securite.map((s) => (
            <div className="fr-col-12 fr-col-md-6" key={s.id}>
              <ServiceCard service={s} versions={data.versionsByService.get(s.id)} />
            </div>
          ))}
        </div>

        <h2 className="fr-mt-6w">Référentiels et démarches</h2>
        <div className="fr-table">
          <div className="fr-table__wrapper"><div className="fr-table__container"><div className="fr-table__content">
            <table>
              <caption className="fr-sr-only">Référentiels, doctrine et démarches</caption>
              <thead><tr><th scope="col">Nom</th><th scope="col">Type</th><th scope="col">Résumé</th><th scope="col">Lien officiel</th></tr></thead>
              <tbody>
                {data.standards.map((s) => (
                  <tr key={s.id}>
                    <th scope="row">{s.name}</th>
                    <td>{STANDARD_KINDS[s.kind]}</td>
                    <td>{s.summary}</td>
                    <td><ExtLink href={s.link}>Ouvrir</ExtLink></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div></div></div>
        </div>

        <h2 className="fr-mt-6w">Prérequis de conformité par service</h2>
        <div className="fr-table">
          <div className="fr-table__wrapper"><div className="fr-table__container"><div className="fr-table__content">
            <table>
              <caption className="fr-sr-only">Prérequis par service</caption>
              <thead><tr><th scope="col">Service</th><th scope="col">Sécurité</th><th scope="col">Conformité</th><th scope="col">Référencement</th></tr></thead>
              <tbody>
                {data.services.map((s) => (
                  <tr key={s.id}>
                    <th scope="row"><Link to={`/services/${s.id}/`}>{s.name}</Link></th>
                    <td>{s.prerequisites.security}</td>
                    <td>{s.prerequisites.compliance}</td>
                    <td>{s.prerequisites.referencing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div></div></div>
        </div>
      </div>
    </Layout>
  );
}
