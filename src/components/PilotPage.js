import React from 'react';
import Layout from '@theme/Layout';
import { Breadcrumb } from '@site/src/components/ui';
import ResultView from '@site/src/components/ResultView';

export default function PilotPage({ pilot }) {
  return (
    <Layout title={pilot.title} description={pilot.summary}>
      <div className="fr-container fr-my-6w">
        <Breadcrumb items={[{ label: 'Je construis ma solution', to: '/parcours/' }, { label: pilot.title }]} />
        <h1>{pilot.title}</h1>
        <p className="fr-text--lead">{pilot.summary}</p>
        <p className="meta">Parcours pilote : un cas courant, pré-rempli. Pour obtenir votre propre parcours, répondez au questionnaire.</p>
        <ResultView answers={pilot.answers} showAnswers={false} />
      </div>
    </Layout>
  );
}
