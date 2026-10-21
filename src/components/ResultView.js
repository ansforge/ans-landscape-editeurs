import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { useData } from '@site/src/lib/useData';
import { computeResult } from '@site/src/lib/rules.mjs';
import { ExtLink, ServiceCard } from '@site/src/components/ui';

function CopyLinkButton() {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setDone(true);
      setTimeout(() => setDone(false), 3000);
    } catch {
      window.prompt('Copiez ce lien :', window.location.href);
    }
  };
  return (
    <>
      <button type="button" className="fr-btn fr-btn--secondary" onClick={copy}>
        Copier le lien de ce résultat
      </button>
      <span role="status" className="fr-ml-1w meta">{done ? 'Lien copié.' : ''}</span>
    </>
  );
}

/** Résultat d'un jeu de réponses : étapes du parcours et briques concernées. */
export default function ResultView({ answers, showAnswers = true }) {
  const data = useData();
  const result = computeResult(data, answers);
  const certain = result.services.filter((s) => s.level === 'certain');
  const maybe = result.services.filter((s) => s.level === 'maybe');

  const answerLines = data.journeys.questions.map((q) => {
    const opt = q.options.find((o) => o.id === answers[q.id]);
    return { question: q.label, answer: opt ? opt.label : '' };
  });

  const renderItems = (items) => (
    <ul className="fr-raw-list" style={{ listStyle: 'none', padding: 0, margin: '.5rem 0 0' }}>
      {items.map((it) =>
        it.type === 'service' ? (
          <li key={`s-${it.id}`}>
            <Link to={`/services/${it.id}/`}>{data.servicesById.get(it.id).name}</Link>
            {it.level === 'maybe' && <span className="meta"> (à confirmer)</span>}
          </li>
        ) : (
          <li key={`r-${it.id}`}>
            <ExtLink href={data.standardsById.get(it.id).link}>{data.standardsById.get(it.id).name}</ExtLink>
          </li>
        )
      )}
    </ul>
  );

  const grid = (list) => (
    <div className="fr-grid-row fr-grid-row--gutters card-grid-equal">
      {list.map((m) => (
        <div className="fr-col-12 fr-col-md-6 fr-col-lg-4" key={m.id}>
          <ServiceCard service={data.servicesById.get(m.id)} versions={data.versionsByService.get(m.id)} level={m.level} />
        </div>
      ))}
    </div>
  );

  return (
    <>
      {showAnswers && (
        <div className="fr-callout">
          <h2 className="fr-callout__title fr-h5">Vos réponses</h2>
          <ul className="fr-callout__text">
            {answerLines.map((l) => (
              <li key={l.question}>{l.question} <strong>{l.answer}</strong></li>
            ))}
          </ul>
        </div>
      )}

      <ul className="fr-btns-group fr-btns-group--inline-md fr-btns-group--sm no-print">
        <li>
          <button type="button" className="fr-btn fr-btn--secondary" onClick={() => window.print()}>
            Imprimer
          </button>
        </li>
        <li><CopyLinkButton /></li>
        <li><Link className="fr-btn fr-btn--tertiary" to="/demarrer/">Refaire le questionnaire</Link></li>
      </ul>

      <h2 className="fr-mt-4w">Les 10 étapes pour votre solution</h2>
      <ol className="frise fr-raw-list">
        {result.steps.map((step) => (
          <li key={step.id} className={step.applicable ? '' : 'is-off'}>
            <strong><Link to={`/parcours/etapes/${step.id}/`}>{step.title}</Link></strong>
            {step.applicable ? (
              step.items.length > 0 && renderItems(step.items)
            ) : (
              <p className="meta fr-mt-1w">Non concerné d'après vos réponses.</p>
            )}
          </li>
        ))}
      </ol>

      <h2 className="fr-mt-6w">Les briques qui vous concernent</h2>
      {certain.length === 0 && maybe.length === 0 && <p>Aucune brique ne ressort de ces réponses. Explorez le <Link to="/services/">catalogue complet</Link>.</p>}
      {certain.length > 0 && (
        <>
          <h3 className="fr-h5">S'applique à votre cas</h3>
          {grid(certain)}
        </>
      )}
      {maybe.length > 0 && (
        <>
          <h3 className="fr-h5 fr-mt-4w">À confirmer</h3>
          <p className="meta">Ces briques dépendent de réponses « Je ne sais pas » ou de précisions sur votre solution.</p>
          {grid(maybe)}
        </>
      )}
    </>
  );
}
