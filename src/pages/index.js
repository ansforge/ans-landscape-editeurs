import React from 'react';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { useData } from '@site/src/lib/useData';
import { formatDate, SITE_NAME } from '@site/src/lib/labels';
import { ExtLink } from '@site/src/components/ui';

function HeroSearch() {
  const history = useHistory();
  const target = useBaseUrl('/recherche/');
  const [q, setQ] = React.useState('');
  return (
    <form
      className="fr-search-bar fr-search-bar--lg"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        history.push(`${target}?q=${encodeURIComponent(q.trim())}`);
      }}
    >
      <label className="fr-label" htmlFor="besoin">Que voulez-vous faire ?</label>
      <input className="fr-input" id="besoin" type="search" placeholder="Que voulez-vous faire ? Ex. : authentifier un professionnel" value={q} onChange={(e) => setQ(e.target.value)} />
      <button className="fr-btn" type="submit" title="Rechercher">Rechercher</button>
    </form>
  );
}

const ENTRIES = [
  { to: '/demarrer/', title: 'Je démarre', desc: "Je ne sais pas encore ce qui s'applique à mon produit. Six questions pour obtenir mon parcours éditeur." },
  { to: '/services/', title: 'Je connais mon besoin', desc: 'Identité, interopérabilité, sécurité, services et données, tests : le catalogue des briques par thème.' },
  { to: '/services/', title: 'Je veux tout voir', desc: 'Le catalogue complet des services pour développeurs, avec filtres.' },
];

export default function Home() {
  const data = useData();
  const sandboxes = data.services.filter((s) => s.links.sandbox);
  const recent = [...data.services].sort((a, b) => b.updated.localeCompare(a.updated) || a.name.localeCompare(b.name)).slice(0, 3);

  return (
    <Layout description="Un point d'entrée unique pour comprendre les règles, découvrir les services, intégrer les API, tester sa solution et suivre les évolutions de l'écosystème du numérique en santé.">
      <section className="hero">
        <div className="fr-container">
          <h1>Je développe un service numérique en santé</h1>
          <p className="fr-text--lead">Tout ce dont j'ai besoin pour construire et intégrer ma solution dans l'écosystème français du numérique en santé.</p>
          <HeroSearch />
        </div>
      </section>

      <div className="fr-container fr-my-6w">
        <h2 className="fr-sr-only">Par où commencer ?</h2>
        <div className="fr-grid-row fr-grid-row--gutters card-grid-equal">
          {ENTRIES.map((e) => (
            <div className="fr-col-12 fr-col-md-4" key={e.title}>
              <div className="fr-card fr-enlarge-link">
                <div className="fr-card__body"><div className="fr-card__content">
                  <h3 className="fr-card__title"><Link to={e.to}>{e.title}</Link></h3>
                  <p className="fr-card__desc">{e.desc}</p>
                </div></div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="fr-mt-6w">Parcours les plus demandés</h2>
        <ul className="fr-links-group">
          {data.journeys.pilots.map((p) => (
            <li key={p.id}>
              <Link className="fr-link fr-icon-arrow-right-line fr-link--icon-right" to={`/parcours/pilotes/${p.id}/`}>{p.title}</Link>
            </li>
          ))}
        </ul>

        <div className="testnow fr-mt-6w">
          <h2 className="fr-h4">Tester maintenant</h2>
          <p>Les environnements de test sont accessibles dès l'accueil.</p>
          <ul className="fr-btns-group fr-btns-group--inline-md">
            {sandboxes.map((s, i) => (
              <li key={s.id}>
                <a className={`fr-btn${i > 0 ? ' fr-btn--secondary' : ''}`} target="_blank" rel="noopener noreferrer" href={s.links.sandbox}>
                  Bac à sable {s.name} <span className="fr-sr-only">(nouvelle fenêtre)</span>
                </a>
              </li>
            ))}
            <li><Link className="fr-btn fr-btn--tertiary" to="/tests/">Tous les environnements de test</Link></li>
          </ul>
        </div>

        <h2 className="fr-mt-6w">Dernières mises à jour</h2>
        <div className="fr-table">
          <div className="fr-table__wrapper"><div className="fr-table__container"><div className="fr-table__content">
            <table>
              <caption className="fr-sr-only">Dernières mises à jour des fiches</caption>
              <thead><tr><th scope="col">Date</th><th scope="col">Service</th><th scope="col">Description</th></tr></thead>
              <tbody>
                {recent.map((s) => (
                  <tr key={s.id}>
                    <td>{formatDate(s.updated)}</td>
                    <td><Link to={`/services/${s.id}/`}>{s.name}</Link></td>
                    <td>{s.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div></div></div>
        </div>
        <p className="meta">Liste alimentée automatiquement par les données du dépôt.</p>
      </div>
    </Layout>
  );
}
