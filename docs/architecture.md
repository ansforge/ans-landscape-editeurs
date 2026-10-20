# Architecture — Portail développeurs du numérique en santé

Document d'architecture volontairement simple : un site statique, généré depuis des données versionnées dans Git, hébergé sur GitHub Pages. Il décline les principes du [PRD](prd.md) (§5 et §8).

## 1. Décision sur le code du dépôt actuel

> **Mise à jour phase 0 :** le code Landscape2 et le landscape des outils ANS ont été supprimés du dépôt. Un éventuel « Carte de l'écosystème » repartirait de l'outil amont, sans reprendre ce code. L'analyse ci-dessous justifie la décision.

Le dépôt contenait **Landscape2** (générateur de landscapes en Rust + application web) et le landscape des outils ANS (`landscape/`).

| Besoin du PRD | Landscape2 | Verdict |
|---|---|---|
| Fiche service au gabarit unique (usage, versions, prérequis, support) | Une « carte » avec logo, description, quelques champs | Insuffisant |
| Parcours en 10 étapes, questionnaire d'orientation | Un guide en markdown et un quiz wasm orienté jeu | Inadapté |
| Version Center (statuts, fin de support) | Aucune notion de version métier | Absent |
| Documentation, exemples, API | Aucune | Absent |
| Vue visuelle de tout l'écosystème, filtres, regroupements | Oui, c'est son point fort | **Pertinent** |

**Décision :**

- Le portail est un **projet distinct**, construit sur un générateur de documentation standard (cf. PRD §3, non-objectifs : pas de logiciel métier spécifique).
- Landscape2 reste une **option de vue complémentaire** : « Carte de l'écosystème », générée depuis le même `services.yml` par un script de conversion. Elle est livrée après le MVP, si elle apporte de la valeur.
- Le `landscape/` actuel (outils internes ANS) reste un site séparé et n'est pas mélangé au portail.

## 2. Vue d'ensemble

```text
 Propriétaires de services (équipes ANS)
        │  Pull Request
        ▼
┌─────────────────────── Dépôt GitHub ───────────────────────┐
│  data/*.yml      docs/**/*.md      examples/**               │
│  schemas/*.json  (validation)                                │
└──────────────┬──────────────────────────────────────────────┘
               │ push / PR
               ▼
┌──────────────── GitHub Actions ─────────────────┐
│ 1. Valider  : schémas, liens, orthographe       │
│ 2. Générer  : pages catalogue + JSON publics    │
│ 3. Construire le site statique                  │
│ 4. Déployer sur GitHub Pages (main uniquement)  │
└──────────────┬──────────────────────────────────┘
               ▼
        Site statique GitHub Pages
        (HTML + JS léger, aucune base de données, aucun serveur)
               │ liens sortants
               ▼
  G_NIUS · esante.gouv.fr · Doctrine · docs produits · sandbox
```

Principe : **le portail renvoie vers les sources officielles et ne les copie pas**. Chaque fiche contient des liens et des métadonnées, pas le contenu de la source.

## 3. Choix techniques

| Sujet | Choix recommandé | Raison |
|---|---|---|
| Générateur de site | **Docusaurus** (décidé) | Le questionnaire et le Version Center demandent des composants interactifs. React le permet, MkDocs seul serait limité. |
| Données | YAML dans `data/`, validé par JSON Schema | Fiable à maintenir, relisible en PR, testable en CI |
| Style | Système de Design de l'État (DSFR) (décidé) | Cohérence avec les sites publics |
| Recherche | Recherche locale côté client (plugin) | Pas de serveur ; suffisant pour quelques centaines de pages |
| Questionnaire | Règles en JSON, exécutées dans le navigateur | Pas de collecte de données, pas de backend, conforme RGPD par construction |
| Hébergement | GitHub Pages, dépôt de l'organisation | Contrainte du projet |
| Automatisation | GitHub Actions | Natif à GitHub |

Le choix Docusaurus et DSFR est acté en phase 0 du [plan](plan.md).

## 4. Modèle de données

Quatre fichiers, la source de vérité pour toutes les vues.

```text
data/
├── services.yml    # catalogue des briques (une entrée par service)
├── versions.yml    # versions et statuts par service
├── standards.yml   # référentiels et règles (PGSSI-S, HDS, CI-SIS…)
├── roadmaps.yml    # prochaines évolutions par service
└── journeys.yml    # questionnaire, règles et parcours pilotes
schemas/            # JSON Schema de chaque fichier
```

### `services.yml` (extrait)

```yaml
- id: prosante-connect
  name: Pro Santé Connect
  theme: identite            # identite | interop | securite | donnees | tests
  summary: Authentifier un professionnel de santé (OpenID Connect).
  audience: [editeur, integrateur]
  use_when: Votre logiciel doit identifier un professionnel de santé.
  owner: equipe-psc          # référent de la fiche
  links:
    documentation: https://…
    specification: https://…
    sandbox: https://…
    test_data: https://…
    source_code: https://…
    support: https://…
    status_page: https://…
  prerequisites: [homologation, hds]
  referencement: true
  examples: [java, javascript, curl]
```

### `versions.yml` (extrait)

```yaml
- service: prosante-connect
  version: "x.y"
  status: recommended        # recommended | supported | deprecated | eol | experimental
  end_of_support: 2027-06-30
  release_notes: https://…
  breaking_changes: false
```

### Règles de cohérence vérifiées en CI

- Chaque `service` de `versions.yml`, `roadmaps.yml` et `journeys.yml` existe dans `services.yml`.
- Chaque service a au plus une version `recommended`.
- Chaque service a un `owner`, une `documentation` et une `summary`.
- Les statuts appartiennent à la liste normalisée.
- Les URLs répondent (vérification planifiée, non bloquante pour les PR).

## 5. Génération des vues

| Vue (PRD) | Source | Génération |
|---|---|---|
| Fiche service (§6.4) | `services.yml` + `versions.yml` + `roadmaps.yml` | Une page par service, produite au build depuis un gabarit unique |
| Catalogue par thème (§6.3) | `services.yml` | Page de liste filtrée par `theme` |
| Catalogue complet (§6.4) | `services.yml` | Liste avec filtres (thème, public, statut) |
| Version Center (§6.5) | `versions.yml` | Tableau trié et filtrable |
| Questionnaire (§6.2) | `journeys.yml` | Composant client, résultat = liste de services + roadmap |
| Parcours en 10 étapes (§6.6) | `journeys.yml` + `docs/journeys/` | Pages éditoriales courtes qui pointent vers les fiches |

Les pages éditoriales (`docs/`) restent courtes. Elles expliquent le chemin et renvoient vers les sources, elles ne dupliquent pas la doctrine.

## 6. Organisation du dépôt

Structure cible, conforme au PRD §8 avec les ajouts nécessaires au build :

```text
ans-developer-portal/
├── docs/                  # contenu éditorial (start, journeys, standards, support…)
├── data/                  # source de vérité
├── schemas/               # JSON Schema
├── examples/              # java, javascript, python, curl
├── src/                   # composants du site (questionnaire, tableau de versions, fiche)
├── scripts/               # génération des pages, validation, export Landscape2
├── .github/workflows/     # validate.yml, deploy.yml, links.yml
├── CHANGELOG.md
└── README.md
```

## 7. Pipeline CI/CD

| Workflow | Déclencheur | Rôle |
|---|---|---|
| `validate.yml` | PR | Schémas, cohérence des données, liens internes, build à blanc |
| `deploy.yml` | push sur `main` | Build et publication GitHub Pages |
| `links.yml` | planifié (hebdomadaire) | Vérifie les liens sortants, ouvre une issue en cas d'échec |
| `upstream.yml` (plus tard) | planifié | Compare les versions publiées en amont avec `versions.yml` et ouvre une issue |

Les aperçus de PR sont possibles (artefact de build ou déploiement de prévisualisation) pour relire une fiche avant fusion.

## 8. Gouvernance et contribution

- **Une fiche = un référent** (`owner`), qui valide les PR touchant son service. Utiliser `CODEOWNERS`.
- Les contributions passent par PR avec un gabarit qui rappelle le schéma et la règle « lier, ne pas recopier ».
- Les évolutions de version sont des PR sur `versions.yml`, tracées dans le `CHANGELOG.md`.
- Un retour utilisateur passe par un gabarit d'issue (erreur, information manquante, nouveau service).

## 9. Contraintes liées à GitHub Pages

- **Site 100 % statique.** Pas de backend ni de base. Aucune donnée utilisateur n'est collectée côté serveur.
- **Sous-chemin** si le site est un « project site » (`/nom-du-depot`). À prévoir dans la configuration (base URL), comme pour le landscape actuel. Un domaine personnalisé supprime cette contrainte.
- **Dépôt public** requis pour un site public avec une offre GitHub standard : aucun secret ni donnée interne dans le dépôt.
- **Mesure d'audience** : à décider (outil respectueux de la vie privée, voire aucune au démarrage).
- **Accessibilité** : le site doit viser le RGAA. Voir [UX design](ux-design.md).

## 10. Évolutions possibles (hors MVP)

- Vue « Carte de l'écosystème » avec Landscape2, alimentée depuis `services.yml`.
- Génération automatique du `versions.yml` à partir des releases amont.
- Export public des données (`/data/services.json`) pour réutilisation par G_NIUS ou esante.gouv.fr.
- Recherche externe si le volume de contenu le justifie.
