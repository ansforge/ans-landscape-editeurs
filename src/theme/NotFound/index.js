import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

export default function NotFound() {
  return (
    <Layout title="Page introuvable">
      <div className="fr-container fr-my-6w">
        <h1>Page introuvable</h1>
        <p>Erreur 404. La page que vous cherchez n'existe pas ou a été déplacée.</p>
        <ul className="fr-btns-group fr-btns-group--inline-md">
          <li><Link className="fr-btn" to="/">Retour à l'accueil</Link></li>
          <li><Link className="fr-btn fr-btn--secondary" to="/services/">Voir le catalogue des services</Link></li>
        </ul>
      </div>
    </Layout>
  );
}
