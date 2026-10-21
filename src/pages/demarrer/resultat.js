import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { useData, useQueryParam } from '@site/src/lib/useData';
import { parseAnswers } from '@site/src/lib/rules.mjs';
import { Breadcrumb } from '@site/src/components/ui';
import ResultView from '@site/src/components/ResultView';

export default function Resultat() {
  const { journeys } = useData();
  const raw = useQueryParam('r');
  const answers = raw === undefined ? undefined : parseAnswers(journeys.questions, raw);

  return (
    <Layout title="Votre parcours éditeur">
      <div className="fr-container fr-my-6w">
        <Breadcrumb items={[{ label: 'Je démarre', to: '/demarrer/' }, { label: 'Votre parcours' }]} />
        <h1>Votre parcours éditeur</h1>
        {answers === undefined && <p role="status">Chargement de votre parcours…</p>}
        {answers === null && (
          <div className="fr-alert fr-alert--warning">
            <h2 className="fr-alert__title">Aucun résultat à afficher</h2>
            <p>Le lien est incomplet ou invalide. <Link to="/demarrer/">Répondez au questionnaire</Link> pour obtenir votre parcours.</p>
          </div>
        )}
        {answers && <ResultView answers={answers} />}
      </div>
    </Layout>
  );
}
