import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { useData } from '@site/src/lib/useData';
import { encodeAnswers } from '@site/src/lib/rules.mjs';
import { Breadcrumb } from '@site/src/components/ui';

export default function Demarrer() {
  const { journeys } = useData();
  const history = useHistory();
  const resultUrl = useBaseUrl('/demarrer/resultat/');
  const questions = journeys.questions;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const q = questions[index];
  const last = index === questions.length - 1;
  const next = questions[index + 1];
  const selected = answers[q.id];

  const go = (e) => {
    e.preventDefault();
    if (!selected) return;
    if (last) history.push(`${resultUrl}?r=${encodeAnswers(questions, answers)}`);
    else setIndex(index + 1);
  };

  return (
    <Layout title="Je démarre" description="Six questions pour obtenir la liste des briques qui s'appliquent à votre solution.">
      <div className="fr-container fr-my-6w">
        <Breadcrumb items={[{ label: 'Je démarre' }]} />
        <div className="fr-grid-row">
          <div className="fr-col-12 fr-col-md-8">
            <h1>Je démarre</h1>
            <p>
              Répondez à six questions. Vous obtenez la liste des briques qui s'appliquent à votre produit.{' '}
              <strong>Aucune donnée n'est enregistrée.</strong>
            </p>

            <div className="fr-stepper">
              <h2 className="fr-stepper__title">
                <span className="fr-stepper__state">Question {index + 1} sur {questions.length}</span>
                {q.label}
              </h2>
              <div className="fr-stepper__steps" data-fr-current-step={index + 1} data-fr-steps={questions.length} />
              {next && <p className="fr-stepper__details"><span className="fr-text--bold">Question suivante :</span> {next.label}</p>}
            </div>

            <form onSubmit={go}>
              <fieldset className="fr-fieldset" id={`fieldset-${q.id}`} aria-labelledby={`legend-${q.id}`}>
                <legend className="fr-fieldset__legend--regular fr-fieldset__legend" id={`legend-${q.id}`}>
                  Choisissez la réponse qui correspond le mieux à votre solution.
                </legend>
                {q.options.map((o) => (
                  <div className="fr-fieldset__element" key={o.id}>
                    <div className="fr-radio-group">
                      <input
                        type="radio"
                        id={`${q.id}-${o.id}`}
                        name={q.id}
                        value={o.id}
                        checked={selected === o.id}
                        onChange={() => setAnswers({ ...answers, [q.id]: o.id })}
                      />
                      <label className="fr-label" htmlFor={`${q.id}-${o.id}`}>
                        {o.label}
                        {o.hint && <span className="fr-hint-text">{o.hint}</span>}
                      </label>
                    </div>
                  </div>
                ))}
              </fieldset>
              <ul className="fr-btns-group fr-btns-group--inline-md fr-btns-group--space-between">
                <li>
                  {index > 0 ? (
                    <button type="button" className="fr-btn fr-btn--secondary" onClick={() => setIndex(index - 1)}>Précédent</button>
                  ) : (
                    <Link className="fr-btn fr-btn--secondary" to="/">Annuler</Link>
                  )}
                </li>
                <li>
                  <button type="submit" className="fr-btn" disabled={!selected}>{last ? 'Voir mon parcours' : 'Suivant'}</button>
                </li>
              </ul>
            </form>
          </div>
        </div>

        <h2 className="fr-h4 fr-mt-6w">Les six questions</h2>
        <ol>{questions.map((x) => <li key={x.id}>{x.label}</li>)}</ol>
      </div>
    </Layout>
  );
}
