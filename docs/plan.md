# Plan de réalisation — Portail développeurs du numérique en santé

Ce plan suit le [PRD](prd.md). Les choix techniques sont dans l'[architecture](architecture.md) et l'expérience cible dans l'[UX design](ux-design.md). Les phases sont ordonnées et livrables ; les durées sont à fixer avec l'équipe.

## Vue d'ensemble

```text
Phase 0  Cadrage et décisions
Phase 1  Fondations (dépôt, CI, déploiement)
Phase 2  Modèle de données
Phase 3  UX et maquettes
Phase 4  Socle du site (composants et gabarits)
Phase 5  Contenu MVP (catalogue, versions, tests, conformité, support)
Phase 6  Parcours pilotes et questionnaire
Phase 7  Recette et mise en ligne
Phase 8  Enrichissement continu
```

Les phases 2 et 3 peuvent se dérouler en parallèle après la phase 1. La phase 4 démarre quand les schémas (phase 2) et les maquettes principales (phase 3) sont validés.

## Phase 0 — Cadrage et décisions

**Objectif :** trancher les questions ouvertes du PRD §11 qui bloquent la suite.

| Tâche | Livrable |
|---|---|
| Choisir Docusaurus ou MkDocs Material (recommandation : Docusaurus) | Décision tracée dans `docs/adr/` |
| Confirmer le DSFR ou la charte ANS | Décision tracée |
| Choisir le nom définitif | Nom et accroche validés |
| Lister les 10 à 15 briques du MVP | Liste validée par la direction produit |
| Nommer un référent par brique | Table brique / référent |
| Décider de l'organisation GitHub, du nom du dépôt, de la visibilité (public) et du domaine | Dépôt créé |
| Définir l'articulation avec G_NIUS et esante.gouv.fr (liens, vocabulaire, éventuelle reprise du questionnaire) | Note d'alignement |
| Confirmer que le dépôt actuel sert de vue complémentaire (Landscape2) et non de base | Entrée dans l'ADR |

**Critère de sortie :** décisions validées, liste des briques et référents connue.

## Phase 1 — Fondations

**Objectif :** un site vide qui se déploie automatiquement.

| Tâche | Livrable |
|---|---|
| Initialiser le dépôt avec la structure d'architecture §6 | Dépôt prêt |
| Fichiers de gouvernance : `README`, `CONTRIBUTING`, `CODEOWNERS`, gabarits de PR et d'issues | Fichiers présents |
| Générateur de site installé, page d'accueil de test | Site local fonctionnel |
| Workflows `validate.yml` et `deploy.yml` | Publication sur GitHub Pages à chaque fusion sur `main` |
| Configuration de la base URL | Liens fonctionnels sur le site publié |
| Protection de la branche `main`, relecture obligatoire | Règles actives |

**Critère de sortie :** une PR fusionnée change le site publié sans action manuelle.

## Phase 2 — Modèle de données

**Objectif :** la source de vérité est définie et validée automatiquement.

| Tâche | Livrable |
|---|---|
| Schémas JSON de `services`, `versions`, `standards`, `roadmaps`, `journeys` | `schemas/*.json` |
| Script de validation et de cohérence (références croisées, une seule version recommandée, référent obligatoire) | Étape CI bloquante |
| Saisie de la fiche **Pro Santé Connect** comme référence | Fiche complète servant d'exemple |
| Documentation « comment ajouter ou modifier un service » | Guide de contribution |

**Critère de sortie :** une donnée invalide fait échouer la CI avec un message clair.

## Phase 3 — UX et maquettes

**Objectif :** valider l'expérience avant de coder les composants.

| Tâche | Livrable |
|---|---|
| Maquettes basse fidélité : accueil, questionnaire, résultat, fiche, catalogue, Version Center, parcours | Maquettes |
| Test avec 5 éditeurs ou développeurs sur les trois parcours pilotes | Synthèse des constats |
| Maquettes haute fidélité des écrans principaux | Maquettes validées |
| Bibliothèque de composants (cartes, pastilles de statut, frise, bloc ressource) | Composants spécifiés |
| Revue d'accessibilité des maquettes | Liste d'exigences RGAA |

**Critère de sortie :** les maquettes principales sont validées par le porteur du PRD.

## Phase 4 — Socle du site

**Objectif :** les gabarits et composants fonctionnent avec les données.

| Tâche | Livrable |
|---|---|
| Thème, en-tête, pied de page, navigation, fil d'Ariane | Squelette |
| Génération des pages service depuis le gabarit unique | Une page par service du fichier |
| Catalogue par thème et catalogue complet, avec filtres | Pages de liste |
| Version Center (tableau, filtres, légende des statuts) | Page versions |
| Recherche locale | Recherche active |
| Contrôles d'accessibilité automatisés en CI | Étape CI |

**Critère de sortie :** ajouter un service dans `services.yml` crée sa fiche et l'affiche dans le catalogue sans autre action.

## Phase 5 — Contenu MVP

**Objectif :** les 8 pages du PRD §7 sont publiées avec du vrai contenu.

| # | Page | Livrable |
|---|---|---|
| 1 | « Je suis éditeur » | Page d'accueil éditeur |
| 2 | « Construire ma solution » | Frise des 10 étapes, une page par étape |
| 3 | Catalogue de 10 à 15 briques | Fiches complètes, chacune relue par son référent |
| 4 | Versions et roadmaps | `versions.yml` et `roadmaps.yml` renseignés |
| 5 | Environnements de test | Tableau des sandbox, accès aux identités de test |
| 6 | API et spécifications | Index des API et spécifications avec liens officiels |
| 7 | Conformité | Synthèse PGSSI-S, HDS, homologation, avec renvois |
| 8 | Support et contacts | Contacts par service, gabarit « signaler un problème » |

Règle de rédaction appliquée à toutes les pages : lier vers la source officielle, ne pas recopier.

**Critère de sortie :** les 10 à 15 fiches sont complètes, les liens sont valides, chaque fiche a un référent qui l'a relue.

## Phase 6 — Parcours pilotes et questionnaire

**Objectif :** les trois parcours pilotes fonctionnent de bout en bout.

| Tâche | Livrable |
|---|---|
| Règles du questionnaire dans `journeys.yml` (6 questions, correspondance réponses / briques) | Règles testées |
| Composant questionnaire et page de résultat « Votre parcours éditeur » | Composant, URL partageable |
| Parcours pilote 1 : J'authentifie un professionnel | Parcours publié |
| Parcours pilote 2 : J'échange des données de santé | Parcours publié |
| Parcours pilote 3 : Je prépare le référencement de mon logiciel | Parcours publié |
| Tests unitaires des règles (chaque combinaison de réponses donne un résultat cohérent) | Suite de tests en CI |

**Critère de sortie :** un éditeur de test atteint la bonne sandbox et la bonne documentation depuis chacun des trois parcours.

## Phase 7 — Recette et mise en ligne

| Tâche | Livrable |
|---|---|
| Test utilisateur sur la version intégrée (mêmes tâches qu'en phase 3) | Rapport et corrections |
| Audit d'accessibilité manuel | Rapport RGAA et corrections |
| Vérification des liens sortants et de l'exactitude des versions par chaque référent | Validation écrite des référents |
| Revue sécurité et conformité du dépôt (aucun secret, pas de donnée interne, mentions légales, politique de confidentialité) | Check-list signée |
| Décision sur la mesure d'audience | Décision tracée |
| Annonce et canal de retour (issues, contact) | Communication prête |
| Passage en GATE | Dossier GATE |

**Critère de sortie :** GATE franchie, site ouvert au public.

## Phase 8 — Enrichissement continu

- Ajouter les services restants, service par service, sur le même gabarit.
- Mettre en place `links.yml` (contrôle hebdomadaire) puis `upstream.yml` (écart avec les versions amont).
- Évaluer la vue « Carte de l'écosystème » avec Landscape2, alimentée depuis `services.yml`.
- Évaluer l'export public des données en JSON pour réutilisation par G_NIUS et esante.gouv.fr.
- Suivre les indicateurs du PRD §9 et ajuster.

## Dépendances et risques de planification

| Dépendance / risque | Impact | Action |
|---|---|---|
| Disponibilité des référents de fiche | Bloque la phase 5 | Les nommer en phase 0, prévoir un suppléant |
| Décision DSFR / charte tardive | Retarde les phases 3 et 4 | La trancher en phase 0 |
| Accord sur l'articulation avec G_NIUS | Risque de doublon | Note d'alignement en phase 0, revue en phase 7 |
| Exactitude des versions et dates de fin de support | Perte de confiance | Validation écrite du référent avant publication |
| Dépôt public et contenu sensible | Fuite d'information interne | Revue du contenu en phase 7, aucune donnée interne |

## Jalons

| Jalon | Condition |
|---|---|
| J0 | Phase 0 terminée : décisions et liste des briques |
| J1 | Site vide déployé automatiquement |
| J2 | Schémas validés et fiche PSC de référence |
| J3 | Maquettes validées après test utilisateur |
| J4 | Site avec catalogue et Version Center alimentés par les données |
| J5 | Contenu MVP complet, relu par les référents |
| J6 | Trois parcours pilotes et questionnaire opérationnels |
| J7 | Recette passée, GATE, ouverture publique |
