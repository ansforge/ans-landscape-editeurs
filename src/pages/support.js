import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { useData } from '@site/src/lib/useData';
import { ISSUES_URL, OFFICIAL_LINKS } from '@site/src/lib/labels';
import { Breadcrumb, ExtLink } from '@site/src/components/ui';

export default function Support() {
  const data = useData();
  return (
    <Layout title="Support et contacts" description="Où trouver de l'aide pour chaque service, et comment signaler un problème sur ce portail.">
      <div className="fr-container fr-my-6w">
        <Breadcrumb items={[{ label: 'Support et contacts' }]} />
        <h1>Support et contacts</h1>

        <div className="fr-callout">
          <h2 className="fr-callout__title fr-h5">Une erreur, une information manquante ?</h2>
          <p className="fr-callout__text">Ouvrez une demande sur GitHub : erreur sur une fiche, lien cassé, nouveau service à ajouter.</p>
          <ExtLink className="fr-btn" href={ISSUES_URL}>Signaler un problème</ExtLink>
        </div>

        <h2 className="fr-mt-4w">Support par service</h2>
        <div className="fr-table">
          <div className="fr-table__wrapper"><div className="fr-table__container"><div className="fr-table__content">
            <table>
              <caption className="fr-sr-only">Support par service</caption>
              <thead><tr><th scope="col">Service</th><th scope="col">Support</th><th scope="col">Statut du service</th></tr></thead>
              <tbody>
                {data.services.map((s) => (
                  <tr key={s.id}>
                    <th scope="row"><Link to={`/services/${s.id}/`}>{s.name}</Link></th>
                    <td>{s.links.support ? <ExtLink href={s.links.support}>Support</ExtLink> : <>Voir la <ExtLink href={s.links.documentation}>documentation officielle</ExtLink></>}</td>
                    <td>{s.links.status_page ? <ExtLink href={s.links.status_page}>Statut</ExtLink> : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div></div></div>
        </div>

        <h2 className="fr-mt-4w">Autres guichets</h2>
        <ul>
          {OFFICIAL_LINKS.map((l) => <li key={l.href}><ExtLink href={l.href}>{l.label}</ExtLink></li>)}
        </ul>
      </div>
    </Layout>
  );
}
