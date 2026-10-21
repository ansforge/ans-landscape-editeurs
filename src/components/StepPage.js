import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { useData } from '@site/src/lib/useData';
import { Breadcrumb, ExtLink } from '@site/src/components/ui';

export default function StepPage({ step }) {
  const data = useData();
  const steps = data.journeys.steps;
  const index = steps.findIndex((s) => s.id === step.id);
  const prev = steps[index - 1];
  const next = steps[index + 1];

  let services = [];
  if (step.themes) services = data.services.filter((s) => step.themes.includes(s.theme));
  if (step.needs === 'sandbox') services = data.services.filter((s) => s.links.sandbox || s.sandbox);
  const standards = (step.standards || []).map((id) => data.standardsById.get(id)).filter(Boolean);

  return (
    <Layout title={`Étape ${index + 1} : ${step.title}`} description={step.objective}>
      <div className="fr-container fr-my-6w">
        <Breadcrumb items={[{ label: 'Je construis ma solution', to: '/parcours/' }, { label: `Étape ${index + 1}` }]} />
        <p className="meta fr-mb-1w">Étape {index + 1} sur {steps.length}</p>
        <h1>{step.title}</h1>
        <p className="fr-text--lead">{step.objective}</p>

        <h2 className="fr-h4">Ce qu'il faut faire</h2>
        <ul>{step.actions.map((a) => <li key={a}>{a}</li>)}</ul>

        {services.length > 0 && (
          <>
            <h2 className="fr-h4 fr-mt-4w">Services concernés</h2>
            <ul>{services.map((s) => <li key={s.id}><Link to={`/services/${s.id}/`}>{s.name}</Link> <span className="meta">– {s.summary}</span></li>)}</ul>
          </>
        )}

        {standards.length > 0 && (
          <>
            <h2 className="fr-h4 fr-mt-4w">Références officielles</h2>
            <ul>{standards.map((s) => <li key={s.id}><ExtLink href={s.link}>{s.name}</ExtLink> <span className="meta">– {s.summary}</span></li>)}</ul>
          </>
        )}

        <nav className="fr-mt-6w" aria-label="Navigation entre les étapes">
          <ul className="fr-btns-group fr-btns-group--inline-md fr-btns-group--space-between">
            <li>{prev ? <Link className="fr-btn fr-btn--secondary" to={`/parcours/etapes/${prev.id}/`}>Étape précédente : {prev.title}</Link> : <Link className="fr-btn fr-btn--secondary" to="/parcours/">Toutes les étapes</Link>}</li>
            <li>{next ? <Link className="fr-btn" to={`/parcours/etapes/${next.id}/`}>Étape suivante : {next.title}</Link> : <Link className="fr-btn" to="/versions/">Consulter les versions</Link>}</li>
          </ul>
        </nav>
      </div>
    </Layout>
  );
}
