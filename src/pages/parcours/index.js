import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { useData } from '@site/src/lib/useData';
import { Breadcrumb } from '@site/src/components/ui';

export default function Parcours() {
  const { journeys } = useData();
  return (
    <Layout title="Je construis ma solution" description="Les 10 étapes, de la compréhension de l'écosystème au suivi des évolutions.">
      <div className="fr-container fr-my-6w">
        <Breadcrumb items={[{ label: 'Je construis ma solution' }]} />
        <h1>Je construis ma solution</h1>
        <p className="fr-text--lead">Les 10 étapes, de la compréhension de l'écosystème au suivi des évolutions.</p>

        <ol className="frise fr-raw-list">
          {journeys.steps.map((step) => (
            <li key={step.id}>
              <strong><Link to={`/parcours/etapes/${step.id}/`}>{step.title}</Link></strong>
              <p className="meta fr-mt-1w">{step.objective}</p>
            </li>
          ))}
        </ol>

        <h2 className="fr-mt-6w">Parcours pilotes</h2>
        <p>Des cas courants, pré-remplis. Pour votre propre parcours, <Link to="/demarrer/">répondez au questionnaire</Link>.</p>
        <div className="fr-grid-row fr-grid-row--gutters card-grid-equal">
          {journeys.pilots.map((p) => (
            <div className="fr-col-12 fr-col-md-4" key={p.id}>
              <div className="fr-tile fr-enlarge-link">
                <div className="fr-tile__body"><div className="fr-tile__content">
                  <h3 className="fr-tile__title"><Link to={`/parcours/pilotes/${p.id}/`}>{p.title}</Link></h3>
                  <p className="fr-tile__detail">{p.summary}</p>
                </div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
