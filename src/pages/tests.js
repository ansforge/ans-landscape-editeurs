import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { useData } from '@site/src/lib/useData';
import { Breadcrumb, ExtLink } from '@site/src/components/ui';

export default function Tests() {
  const data = useData();
  const withTests = data.services.filter((s) => s.links.sandbox || s.sandbox);
  const without = data.services.filter((s) => !(s.links.sandbox || s.sandbox));
  const coeur = data.servicesById.get('si-coeur');

  return (
    <Layout title="Environnements de test" description="Testez votre intégration avec des identités et des données fictives avant la production.">
      <div className="fr-container fr-my-6w">
        <Breadcrumb items={[{ label: 'Environnements de test' }]} />
        <h1>Environnements de test</h1>
        <p className="fr-text--lead">Testez votre intégration avec des identités et des données fictives, avant de demander un référencement.</p>

        {coeur && (
          <div className="fr-callout">
            <h2 className="fr-callout__title fr-h5">Exemple : {coeur.name}</h2>
            <p className="fr-callout__text">{coeur.sandbox ? coeur.sandbox.summary : coeur.summary}</p>
            <ExtLink className="fr-btn" href={coeur.links.sandbox || coeur.links.documentation}>Ouvrir le bac à sable</ExtLink>
          </div>
        )}

        <h2 className="fr-mt-4w">Services avec un environnement de test</h2>
        <div className="fr-table">
          <div className="fr-table__wrapper"><div className="fr-table__container"><div className="fr-table__content">
            <table>
              <caption className="fr-sr-only">Environnements de test disponibles</caption>
              <thead>
                <tr>
                  <th scope="col">Service</th>
                  <th scope="col">Ce que vous pouvez tester</th>
                  <th scope="col">Identités et données de test</th>
                  <th scope="col">Limites connues</th>
                  <th scope="col">Accès</th>
                </tr>
              </thead>
              <tbody>
                {withTests.map((s) => (
                  <tr key={s.id}>
                    <th scope="row"><Link to={`/services/${s.id}/`}>{s.name}</Link></th>
                    <td>{s.sandbox ? s.sandbox.summary : 'À préciser.'}</td>
                    <td>
                      {s.sandbox ? s.sandbox.access : 'À préciser.'}
                      {s.links.test_data && <> <ExtLink href={s.links.test_data}>Détail</ExtLink></>}
                    </td>
                    <td>{s.sandbox ? s.sandbox.limits : 'À préciser.'}</td>
                    <td>{s.links.sandbox ? <ExtLink href={s.links.sandbox}>Bac à sable</ExtLink> : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div></div></div>
        </div>

        <h2 className="fr-mt-4w">Sans environnement de test référencé</h2>
        <p>Aucun environnement de test n'est référencé à ce jour pour ces services :</p>
        <ul>{without.map((s) => <li key={s.id}><Link to={`/services/${s.id}/`}>{s.name}</Link></li>)}</ul>
        <p className="meta">Un environnement manque ? <Link to="/support/">Signalez-le</Link>.</p>
      </div>
    </Layout>
  );
}
