import React from 'react';
import Layout from '@theme/Layout';
import { Breadcrumb, ExtLink } from '@site/src/components/ui';
import { REPO_URL } from '@site/src/lib/labels';

export default function MentionsLegales() {
  return (
    <Layout title="Mentions légales">
      <div className="fr-container fr-my-6w">
        <Breadcrumb items={[{ label: 'Mentions légales' }]} />
        <h1>Mentions légales</h1>
        <div className="fr-alert fr-alert--warning">
          <h2 className="fr-alert__title">À compléter avant l'ouverture publique</h2>
          <p>L'éditeur, le directeur de la publication, l'hébergeur et la politique de confidentialité doivent être renseignés par l'ANS.</p>
        </div>

        <h2 className="fr-mt-4w">Éditeur</h2>
        <p>Agence du Numérique en Santé (ANS). Coordonnées à compléter.</p>

        <h2>Hébergement</h2>
        <p>Site statique hébergé par GitHub Pages (GitHub, Inc.). Le code source et les données sont publiés sur <ExtLink href={REPO_URL}>GitHub</ExtLink>.</p>

        <h2>Données personnelles</h2>
        <p>
          Ce site ne dépose aucun cookie et ne mesure pas son audience. Le questionnaire « Je démarre » s'exécute dans votre navigateur :
          vos réponses ne sont ni envoyées ni enregistrées. Elles sont seulement encodées dans le lien de résultat que vous choisissez de partager.
        </p>

        <h2>Accessibilité</h2>
        <p>Le niveau de conformité d'accessibilité de ce site n'a pas encore été évalué.</p>
      </div>
    </Layout>
  );
}
