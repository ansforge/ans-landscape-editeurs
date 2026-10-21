import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { useData } from '@site/src/lib/useData';
import { AUDIENCES, ISSUES_URL, EXAMPLE_LABELS, THEMES, formatDate, versionStatusKey } from '@site/src/lib/labels';
import { Breadcrumb, ExtLink, ResourceBlock, StatusPill, mainVersion, linkLabel } from '@site/src/components/ui';

const RESOURCE_KEYS = ['documentation', 'specification', 'sandbox', 'test_data', 'source_code'];
const TRACKING_KEYS = ['support', 'status_page', 'roadmap'];

function Resource({ title, href, label, empty = 'Non renseigné.' }) {
  return (
    <ResourceBlock title={title}>
      {href ? <p><ExtLink href={href}>{label}</ExtLink></p> : <p className="meta">{empty}</p>}
    </ResourceBlock>
  );
}

export default function ServicePage({ service }) {
  const data = useData();
  const versions = data.versionsByService.get(service.id) || [];
  const roadmap = data.roadmapsByService.get(service.id) || [];
  const main = mainVersion(versions);
  const mainKey = versionStatusKey(main);
  const related = (service.related || []).map((id) => data.servicesById.get(id)).filter(Boolean);
  const standards = data.standards.filter((s) => s.services.includes(service.id));
  const theme = THEMES[service.theme];

  return (
    <Layout title={service.name} description={service.summary}>
      <div className="fr-container fr-my-6w">
        <Breadcrumb items={[{ label: 'Services', to: '/services/' }, { label: service.name }]} />

        <div className="fr-grid-row fr-grid-row--middle fr-grid-row--gutters">
          <div className="fr-col">
            <h1 className="fr-mb-1w">{service.name}</h1>
            <p className="fr-text--lead fr-mb-0">{service.summary}</p>
          </div>
          {mainKey && (
            <div className="fr-col-auto">
              <StatusPill status={mainKey} />
              {main && main.verified && <span className="meta"> Version {main.version}</span>}
            </div>
          )}
        </div>

        {!service.validated && (
          <div className="fr-alert fr-alert--info fr-mt-3w">
            <h2 className="fr-alert__title">Fiche en cours de validation</h2>
            <p>Cette fiche n'a pas encore été relue par son référent. Vérifiez les informations dans la documentation officielle.</p>
          </div>
        )}

        <ul className="fr-btns-group fr-btns-group--inline-md fr-mt-2w">
          <li>
            <a className="fr-btn" target="_blank" rel="noopener noreferrer" href={service.links.documentation}>
              Documentation officielle <span className="fr-sr-only">(nouvelle fenêtre)</span>
            </a>
          </li>
          {service.links.sandbox && (
            <li>
              <a className="fr-btn fr-btn--secondary" target="_blank" rel="noopener noreferrer" href={service.links.sandbox}>
                Accéder au bac à sable <span className="fr-sr-only">(nouvelle fenêtre)</span>
              </a>
            </li>
          )}
        </ul>

        <div className="fr-grid-row fr-grid-row--gutters fr-mt-4w">
          <div className="fr-col-12 fr-col-md-3">
            <nav className="fr-summary sommaire-sticky" role="navigation" aria-labelledby="sommaire">
              <p className="fr-summary__title" id="sommaire">Sommaire</p>
              <ol className="fr-summary__list">
                {[['presentation', 'Présentation'], ['ressources', 'Ressources'], ['versions', 'Versions'], ['prerequis', 'Prérequis'], ['suivi', 'Suivi']].map(([id, label]) => (
                  <li key={id}><a className="fr-summary__link" href={`#${id}`}>{label}</a></li>
                ))}
              </ol>
            </nav>
          </div>

          <div className="fr-col-12 fr-col-md-9">
            <section id="presentation">
              <h2>Présentation</h2>
              <h3 className="fr-h5">À quoi ça sert ?</h3>
              <p>{service.summary}</p>
              <h3 className="fr-h5">Qui est concerné ?</h3>
              <p>{service.audience.map((a) => AUDIENCES[a]).join(', ')}</p>
              <h3 className="fr-h5">Quand l'utiliser ?</h3>
              <p>{service.use_when}</p>
              <p className="meta">Thème : {theme.label}</p>
            </section>

            <section id="ressources" className="fr-mt-4w">
              <h2>Ressources</h2>
              <div className="fr-grid-row fr-grid-row--gutters">
                {RESOURCE_KEYS.map((key) => (
                  <Resource key={key} title={linkLabel(key)} href={service.links[key]} label={linkLabel(key)} empty={key === 'source_code' ? 'Non applicable.' : 'Non renseigné.'} />
                ))}
                <ResourceBlock title="Exemples et SDK">
                  {service.examples && service.examples.length > 0 ? (
                    <p>{service.examples.map((e) => EXAMPLE_LABELS[e]).join(', ')}</p>
                  ) : (
                    <p><span className="fr-badge fr-badge--sm fr-badge--info">À venir</span></p>
                  )}
                </ResourceBlock>
              </div>
              {service.sandbox && (
                <div className="fr-callout fr-mt-3w">
                  <h3 className="fr-callout__title fr-h6">Environnement de test</h3>
                  <p className="fr-callout__text">{service.sandbox.summary}</p>
                  <p className="fr-callout__text"><strong>Accès :</strong> {service.sandbox.access}</p>
                  <p className="fr-callout__text"><strong>Limites connues :</strong> {service.sandbox.limits}</p>
                </div>
              )}
            </section>

            <section id="versions" className="fr-mt-4w">
              <h2>Versions</h2>
              {versions.length === 0 ? (
                <p className="meta">Aucune version suivie pour ce service.</p>
              ) : (
                <div className="fr-table">
                  <div className="fr-table__wrapper"><div className="fr-table__container"><div className="fr-table__content">
                    <table>
                      <caption className="fr-sr-only">Versions de {service.name}</caption>
                      <thead>
                        <tr><th scope="col">Version</th><th scope="col">Statut</th><th scope="col">Fin de support</th><th scope="col">Notes de version</th></tr>
                      </thead>
                      <tbody>
                        {versions.map((v) => (
                          <tr key={v.version}>
                            <td>{v.version}</td>
                            <td className="status-cell"><StatusPill status={versionStatusKey(v)} /></td>
                            <td>{v.end_of_support ? formatDate(v.end_of_support) : '—'}</td>
                            <td>{v.release_notes ? <ExtLink href={v.release_notes}>Notes</ExtLink> : '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div></div></div>
                </div>
              )}
              {roadmap.length > 0 ? (
                roadmap.map((r) => (
                  <p key={r.planned}>
                    <strong>Prochaine évolution :</strong> {r.planned}
                    {r.breaking_changes != null && <><br /><strong>Breaking changes :</strong> {r.breaking_changes ? 'oui, voir les notes de version' : 'aucun annoncé'}</>}
                    {r.link && <> · <ExtLink href={r.link}>Détail</ExtLink></>}
                  </p>
                ))
              ) : (
                <p className="meta">Aucune évolution annoncée dans les données du portail.</p>
              )}
              <p><Link to="/versions/">Voir toutes les versions</Link></p>
            </section>

            <section id="prerequis" className="fr-mt-4w">
              <h2>Prérequis</h2>
              <ul>
                <li><strong>Sécurité :</strong> {service.prerequisites.security}</li>
                <li><strong>Conformité :</strong> {service.prerequisites.compliance}</li>
                <li><strong>Référencement :</strong> {service.prerequisites.referencing}</li>
              </ul>
              {standards.length > 0 && (
                <>
                  <h3 className="fr-h6">Référentiels liés</h3>
                  <ul>{standards.map((s) => <li key={s.id}><ExtLink href={s.link}>{s.name}</ExtLink></li>)}</ul>
                </>
              )}
            </section>

            <section id="suivi" className="fr-mt-4w">
              <h2>Suivi</h2>
              <ul>
                {TRACKING_KEYS.map((key) => (
                  <li key={key}>
                    {service.links[key] ? <ExtLink href={service.links[key]}>{linkLabel(key)}</ExtLink> : <span>{linkLabel(key)} : <span className="meta">non renseigné</span></span>}
                  </li>
                ))}
              </ul>
              {related.length > 0 && (
                <>
                  <h3 className="fr-h6">Services liés</h3>
                  <ul>{related.map((r) => <li key={r.id}><Link to={`/services/${r.id}/`}>{r.name}</Link></li>)}</ul>
                </>
              )}
            </section>

            <hr />
            <p className="meta">
              Référent de la fiche : {service.owner} · Dernière mise à jour : {formatDate(service.updated)} ·{' '}
              <ExtLink href={ISSUES_URL}>Signaler une erreur sur cette fiche</ExtLink>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
