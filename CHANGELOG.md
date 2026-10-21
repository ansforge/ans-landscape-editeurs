# Changelog

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/).

## [Non publié]

### Ajouté

- Portail Docusaurus avec le DSFR : accueil, questionnaire « Je démarre », catalogue, fiches service, Version Center, parcours en 10 étapes, trois parcours pilotes, environnements de test, API et spécifications, conformité, support, recherche.
- Données de départ : 12 briques du MVP, référentiels, parcours et règles du questionnaire.
- Validation des données (schémas JSON et cohérence), tests des règles du questionnaire, contrôle des liens.
- Export public des données en JSON (`npm run export`, servi sous `/data/`), lien depuis la page API.
- Dossier de recette de la phase 7 (`docs/recette.md`).
- Workflows GitHub : validation des PR, déploiement GitHub Pages, contrôle hebdomadaire des liens.

### À compléter

- Versions, statuts et dates : les lignes de `data/versions.yml` sont à vérifier par le référent.
- Fiches : toutes les fiches sont marquées `validated: false` dans `data/services.yml`.
- Mentions légales, mesure d'audience et évaluation d'accessibilité.
