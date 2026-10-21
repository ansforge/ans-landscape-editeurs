# Dossier de recette — phase 7

Check-list de mise en ligne. Les cases cochées sont vérifiées dans le dépôt ; les autres demandent une personne identifiée.

## Revue sécurité et conformité du dépôt

- [x] Aucun secret, jeton ou mot de passe dans `data/`, `src/`, `scripts/`, `.github/`, `docs/` (recherche faite le 2026-10-21).
- [x] Workflows en permissions minimales (`contents: read`, sauf `deploy.yml` pour Pages).
- [x] Aucun cookie, aucun traceur : le questionnaire s'exécute dans le navigateur.
- [ ] Aucune donnée interne ANS dans les fiches (relecture par le porteur).
- [ ] Mentions légales complétées : éditeur, directeur de la publication, coordonnées (`src/pages/mentions-legales.js`).
- [ ] Politique de confidentialité validée par le DPO.

## Décisions à tracer

| Décision | Porteur | État |
|---|---|---|
| Mesure d'audience (aucune pour l'instant) | Porteur du PRD | À décider |
| Évaluation d'accessibilité (RGAA) | Porteur du PRD | Écartée en phase 4, à reconsidérer avant la GATE |
| Nom de domaine définitif | ANS | À décider |

## Validation par les référents

Chaque fiche de `data/services.yml` passe à `validated: true` après relecture écrite du référent (versions, dates de fin de support, liens, prérequis).

| Brique | Référent | Relue |
|---|---|---|
| À renseigner depuis `data/services.yml` | | |

## Test utilisateur

- [ ] Test avec 5 éditeurs ou développeurs sur les trois parcours pilotes (même protocole qu'en phase 3).
- [ ] Synthèse des constats et corrections.

## Mise en ligne

- [ ] Pages activée (source « GitHub Actions ») et `main` protégée.
- [ ] Annonce et canal de retour (issues, contact).
- [ ] Dossier GATE.
