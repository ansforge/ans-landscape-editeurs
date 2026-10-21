import React, { useEffect, useState } from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useHistory, useLocation } from '@docusaurus/router';
import { OFFICIAL_LINKS, ISSUES_URL, SITE_NAME } from '@site/src/lib/labels';

const NAV = [
  { to: '/demarrer/', label: 'Démarrer' },
  { to: '/services/', label: 'Services' },
  { to: '/versions/', label: 'Versions' },
  { to: '/parcours/', label: 'Parcours' },
  { to: '/tests/', label: 'Tests' },
  { to: '/support/', label: 'Support' },
];

function SearchForm({ id }) {
  const history = useHistory();
  const target = useBaseUrl('/recherche/');
  const [q, setQ] = useState('');
  const submit = (e) => {
    e.preventDefault();
    history.push(`${target}?q=${encodeURIComponent(q.trim())}`);
  };
  return (
    <form className="fr-search-bar" role="search" onSubmit={submit}>
      <label className="fr-label" htmlFor={id}>Rechercher</label>
      <input className="fr-input" id={id} type="search" placeholder="Rechercher un service, une API…" value={q} onChange={(e) => setQ(e.target.value)} />
      <button className="fr-btn" type="submit" title="Rechercher">Rechercher</button>
    </form>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const base = useBaseUrl('/');
  const rel = '/' + pathname.slice(base.length);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header role="banner" className="fr-header">
      <div className="fr-header__body">
        <div className="fr-container">
          <div className="fr-header__body-row">
            <div className="fr-header__brand fr-enlarge-link">
              <div className="fr-header__brand-top">
                <div className="fr-header__logo">
                  <p className="fr-logo">République<br />Française</p>
                </div>
                <div className="fr-header__navbar">
                  <button
                    className="fr-btn--menu fr-btn"
                    type="button"
                    aria-controls="modal-menu"
                    aria-haspopup="menu"
                    aria-expanded={open}
                    title="Menu"
                    onClick={() => setOpen(true)}
                  >
                    Menu
                  </button>
                </div>
              </div>
              <div className="fr-header__service">
                <Link to="/" title={`Accueil – ${SITE_NAME}`}>
                  <p className="fr-header__service-title">{SITE_NAME}</p>
                </Link>
                <p className="fr-header__service-tagline">Construire, tester et intégrer des services numériques en santé</p>
              </div>
            </div>
            <div className="fr-header__tools">
              <div className="fr-header__search" style={{ display: 'block' }}>
                <SearchForm id="recherche-entete" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`fr-header__menu fr-modal${open ? ' fr-modal--opened' : ''}`} id="modal-menu" aria-label="Menu">
        <div className="fr-container">
          <button className="fr-btn--close fr-btn" type="button" aria-controls="modal-menu" onClick={() => setOpen(false)}>
            Fermer
          </button>
          <nav className="fr-nav" role="navigation" aria-label="Menu principal">
            <ul className="fr-nav__list">
              {NAV.map((item) => {
                const active = rel.startsWith(item.to);
                return (
                  <li className="fr-nav__item" key={item.to}>
                    <Link className="fr-nav__link" to={item.to} aria-current={active ? 'page' : undefined}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="fr-footer" role="contentinfo" id="footer">
      <div className="fr-container">
        <div className="fr-footer__body">
          <div className="fr-footer__brand fr-enlarge-link">
            <p className="fr-logo">République<br />Française</p>
          </div>
          <div className="fr-footer__content">
            <p className="fr-footer__content-desc">
              {SITE_NAME}. Les contenus réglementaires et les documentations restent publiés par leurs propriétaires : ce portail les relie et les rend actionnables.
            </p>
            <ul className="fr-footer__content-list">
              {OFFICIAL_LINKS.map((l) => (
                <li className="fr-footer__content-item" key={l.href}>
                  <a className="fr-footer__content-link" target="_blank" rel="noopener noreferrer" href={l.href}>
                    {l.label} <span className="fr-sr-only">(nouvelle fenêtre)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="fr-footer__bottom">
          <ul className="fr-footer__bottom-list">
            <li className="fr-footer__bottom-item"><span className="fr-footer__bottom-link">Accessibilité : non évaluée</span></li>
            <li className="fr-footer__bottom-item"><Link className="fr-footer__bottom-link" to="/mentions-legales/">Mentions légales</Link></li>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link" target="_blank" rel="noopener noreferrer" href={ISSUES_URL}>
                Signaler un problème <span className="fr-sr-only">(nouvelle fenêtre)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children, title, description }) {
  const fullTitle = title ? `${title} – ${SITE_NAME}` : SITE_NAME;
  return (
    <>
      <Head>
        <html lang="fr" data-fr-scheme="light" />
        <title>{fullTitle}</title>
        {description && <meta name="description" content={description} />}
        <meta property="og:title" content={fullTitle} />
      </Head>
      <div className="fr-skiplinks">
        <nav className="fr-container" role="navigation" aria-label="Accès rapide">
          <ul className="fr-skiplinks__list">
            <li><a className="fr-link" href="#contenu">Contenu</a></li>
            <li><a className="fr-link" href="#footer">Pied de page</a></li>
          </ul>
        </nav>
      </div>
      <Header />
      <main role="main" id="contenu">{children}</main>
      <Footer />
    </>
  );
}
