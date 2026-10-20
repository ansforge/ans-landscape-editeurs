# PRD — Portail développeurs du numérique en santé

| | |
|---|---|
| **Nom provisoire** | ANS Developer — *Construire des services numériques en santé* (variante institutionnelle : *Portail développeurs du numérique en santé*) |
| **Statut** | Brouillon pour passage en GATE |
| **Porteur** | ANS |
| **Support technique** | GitHub + GitHub Pages |

---

## 1. Contexte et problème

L'éditeur de logiciel de santé se pose une question simple :

> « Je suis éditeur de logiciel de santé. Que dois-je faire pour construire, tester, intégrer, faire référencer et maintenir ma solution dans l'écosystème numérique en santé ? »

L'information existe déjà, mais elle est dispersée :

- **la Doctrine du numérique en santé** définit le cadre d'urbanisation, les référentiels et les services socles, et s'adresse explicitement aux éditeurs et intégrateurs ;
- **G_NIUS** est un guichet destiné notamment aux éditeurs, startups et concepteurs, avec une logique transverse qui renvoie vers les services d'autres acteurs institutionnels ;
- **esante.gouv.fr** est une plateforme servicielle proposant des parcours par public vers les produits, services et ressources.

Le travail ANS existant sur le parcours éditeur a identifié deux difficultés : l'enchaînement complexe des étapes et les interdépendances entre guichets. Les objectifs étaient des parcours-types, la simplification et la réduction des allers-retours.

**Problème :** l'éditeur doit connaître l'organigramme de l'ANS pour savoir qui gère quoi (par exemple PSC), où se trouve le CI-SIS, quel portail héberge le bac à sable, où est le formulaire et quelle version utiliser.

## 2. Vision et positionnement

Passer d'une ANS qui publie des services à une ANS qui expose une plateforme aux éditeurs. Cette évolution est cohérente avec le repositionnement serviciel de l'Agence (COP) : usages, qualité de service, satisfaction et accompagnement des acteurs.

L'éditeur exprime un besoin (« Je souhaite authentifier un professionnel de santé ») et la plateforme lui donne le chemin complet.

**Le portail n'est pas un quatrième portail.** C'est la **couche « développeur »** de l'écosystème existant :

```text
Doctrine numérique en santé
        ↓
esante.gouv.fr / G_NIUS
        ↓
┌──────────────────────────────────────┐
│ ESPACE DÉVELOPPEURS ANS              │
│ GitHub Pages                         │
│ « Je développe une solution          │
│   numérique en santé »               │
└──────────────────────────────────────┘
   Comprendre · Concevoir · Développer · Intégrer
   Tester · Être conforme · Se référencer · Maintenir
```

**Accroche proposée :** *Un point d'entrée unique pour comprendre les règles, découvrir les services, intégrer les API, tester sa solution et suivre les évolutions de l'écosystème du numérique en santé.*

## 3. Objectifs et non-objectifs

### Objectifs

1. Partir du besoin de l'éditeur, pas de l'organisation de l'ANS.
2. Donner un parcours de bout en bout, de la compréhension à la mise en production et au suivi des évolutions.
3. Rendre immédiatement visibles les capacités de test (bacs à sable, identités et jeux de données de test).
4. Fournir une vision unique et fiable des versions de chaque service (supportées, dépréciées, à venir).
5. Réduire les allers-retours entre guichets.

### Non-objectifs

- **Ne pas répliquer** les contenus de G_NIUS, d'esante.gouv.fr, de la Doctrine, des référentiels, des documentations produits ni des spécifications API. Le portail les agrège, les relie et les rend actionnables.
- Ne pas remplacer les guichets de référencement ou d'homologation : le portail prépare et oriente.
- Ne pas développer de logiciel métier spécifique si une solution de documentation standard suffit.

## 4. Utilisateurs cibles

| Persona | Besoin principal |
|---|---|
| Éditeur de logiciel de santé | Savoir ce qui s'applique à son produit et comment s'y conformer |
| Startup / concepteur de solution | Démarrer vite et éviter les erreurs d'architecture |
| Intégrateur | Intégrer les services socles, tester, suivre les versions |
| Développeur | Accéder aux spécifications, exemples, SDK, sandbox |

## 5. Principes directeurs

1. **Orchestrer, ne pas recopier.** Les contenus réglementaires restent chez leur propriétaire, les documentations techniques avec leurs produits. GitHub orchestre le parcours.
2. **Données avant éditorial.** Services, versions, standards et roadmaps sont des données versionnées dans Git. GitHub Pages génère automatiquement les vues, ce qui est plus fiable à maintenir.
3. **Un gabarit unique** pour toutes les fiches service.
4. **Réutiliser les bons modèles UX existants**, notamment les parcours guidés de G_NIUS (questions, embranchements, roadmap), plutôt que repartir de zéro.
5. **Technologie standard** : Docusaurus, MkDocs Material ou équivalent, généré par GitHub Actions.

## 6. Fonctionnalités

### 6.1 Page d'accueil

Message : *« Je développe un service numérique en santé. Tout ce dont j'ai besoin pour construire et intégrer ma solution dans l'écosystème français du numérique en santé. »*

Trois points d'entrée : **Je démarre**, **Je connais mon besoin**, **Je veux tout voir**.

### 6.2 Entrée 1 — « Je démarre » (questionnaire d'orientation)

Pour l'éditeur qui ne sait pas encore ce qui s'applique à son produit. Questionnaire court :

- Quel type de solution développez-vous ?
- Pour quel utilisateur ?
- Manipulez-vous des données de santé ?
- Devez-vous authentifier un professionnel ?
- Échangez-vous des données avec d'autres SI ?
- Êtes-vous concerné par un référencement ?

**Résultat :** « Votre parcours éditeur », avec les briques nécessaires, sous forme de roadmap d'étapes.

### 6.3 Entrée 2 — « Je connais mon besoin » (catalogue de briques par thème)

| Thème | Briques |
|---|---|
| Identité | Pro Santé Connect, e-CPS / CPx, Pro Santé Identité, Industriels Santé Connect |
| Interopérabilité | CI-SIS, FHIR, terminologies, API |
| Sécurité et confiance | PGSSI-S, HDS, homologation, règles d'authentification |
| Services / données | RPPS, FINESS, ROR, MSSanté, autres services de l'écosystème |
| Tests | Sandbox, identités de test, jeux de données, tests d'interopérabilité, tests de conformité |

Exemple à mettre en avant : le SI-Cœur dispose d'un bac à sable Pro Santé Connect et d'EDIT, qui permettent de créer des identités de test, de tester la connexion et de vérifier les règles métier.

### 6.4 Entrée 3 — « Je veux tout voir » (catalogue des services pour développeurs)

Chaque service suit **le même gabarit de fiche** :

| Bloc | Contenu |
|---|---|
| Présentation | À quoi ça sert ? Qui est concerné ? Quand l'utiliser ? |
| Ressources techniques | Documentation, API / spécifications, environnement de test, données / identités de test, exemples, SDK / librairies, code source |
| Versions | Version actuelle, versions supportées, prochaine évolution, breaking changes |
| Prérequis | Sécurité, conformité, référencement |
| Suivi | Support, statut du service, roadmap |

### 6.5 Version Center (vue transversale des versions)

Tableau des versions supportées par service : version recommandée, statut, fin de support, prochaine version.

**Statuts normalisés :**

| Statut | Signification |
|---|---|
| 🟢 Recommandée | Version à utiliser pour tout nouveau développement |
| 🔵 Supportée | Version maintenue |
| 🟡 Dépréciée | Migration à prévoir |
| 🔴 Fin de vie | Plus de support |
| 🧪 Expérimentale | Non stabilisée |

Les données sont versionnées dans Git, par exemple :

```yaml
service: prosante-connect
version: x.y
status: supported
documentation: ...
sandbox: ...
release-notes: ...
```

### 6.6 Parcours de bout en bout (navigation principale)

« Je construis ma solution » :

1. Comprendre l'écosystème
2. Identifier les règles applicables
3. Choisir les services socles
4. Accéder aux spécifications / API
5. Développer
6. Tester dans les sandbox
7. Vérifier ma conformité
8. Me référencer / homologuer
9. Passer en production
10. Suivre les évolutions

Le portail est la matérialisation technique de ce parcours simplifié.

### 6.7 Exemple de bout en bout : « Je veux authentifier un professionnel de santé »

Le parcours mène à **Pro Santé Connect** et présente : pourquoi, prérequis, documentation officielle, spécification OIDC, sandbox, identités de test, exemples d'intégration, tests, référencement, support, versions / changelog.

## 7. Périmètre du MVP (GATE)

L'objectif n'est pas de référencer toute l'ANS immédiatement. Le MVP couvre :

| # | Page |
|---|---|
| 1 | « Je suis éditeur » |
| 2 | « Construire ma solution » |
| 3 | Catalogue de 10 à 15 briques majeures |
| 4 | Versions et roadmaps |
| 5 | Environnements de test |
| 6 | API et spécifications |
| 7 | Conformité |
| 8 | Support / contacts |

**Trois parcours pilotes :**

1. J'authentifie un professionnel
2. J'échange des données de santé
3. Je prépare le référencement de mon logiciel

Ensuite, enrichissement service par service.

## 8. Architecture et structure du dépôt

```text
ans-developer-portal/
├── docs/
│   ├── start/
│   ├── journeys/
│   ├── services/
│   ├── standards/
│   ├── api/
│   ├── sandbox/
│   ├── compliance/
│   └── support/
├── data/
│   ├── services.yml
│   ├── versions.yml
│   ├── standards.yml
│   └── roadmaps.yml
├── examples/
│   ├── java/
│   ├── javascript/
│   ├── python/
│   └── curl/
├── CHANGELOG.md
└── README.md
```

Le site est généré par GitHub Actions à partir de `docs/` et `data/` et publié sur GitHub Pages.

## 9. Indicateurs de succès (à valider)

- Part des éditeurs qui terminent le questionnaire d'orientation.
- Nombre d'allers-retours entre guichets avant référencement.
- Fraîcheur des données de version (délai entre une release et sa publication sur le portail).
- Part des briques du catalogue avec une fiche complète au gabarit.
- Satisfaction des éditeurs (enquête).

## 10. Risques

| Risque | Mitigation |
|---|---|
| Duplication avec G_NIUS ou esante.gouv.fr | Principe « orchestrer, ne pas recopier » ; liens vers les sources officielles |
| Données obsolètes | Données versionnées dans Git, propriétaires désignés par service, contrôles en CI |
| Gouvernance floue entre équipes produit | Un référent par fiche service, défini dans les données |
| Périmètre trop large | MVP limité à 10-15 briques et 3 parcours pilotes |

## 11. Décisions prises et questions ouvertes

**Décisions (phase 0) :**

- Nom : **Portail développeurs du numérique en santé**.
- Technologie : **Docusaurus**, avec le **DSFR**.
- Hébergement : GitHub Pages, `ansforge.github.io/<nom-du-depot>` (domaine personnalisé possible plus tard).
- Briques du MVP (12) : Pro Santé Connect, e-CPS/CPx, Pro Santé Identité, CI-SIS, FHIR et terminologies, PGSSI-S, HDS, RPPS, FINESS, ROR, MSSanté, SI-Cœur (bac à sable PSC et EDIT).
- Le code Landscape2 et le landscape des outils ANS sont retirés du dépôt (sauvegarde locale faite).
- Dépôt : nom actuel conservé (`ans-landscape-editeurs`), donc URL `ansforge.github.io/ans-landscape-editeurs`. Public, avec uniquement des liens vers des sources publiques.
- Articulation : le questionnaire s'inspire de la logique de G_NIUS (questions, embranchements, roadmap) avec un contenu propre au portail. Le référencement renvoie vers G_NIUS.
- Mesure d'audience : un outil respectueux de la vie privée, à préciser avant la mise en ligne. Aucune au démarrage.
- Gouvernance : un seul référent pour toutes les fiches au démarrage.

**Questions ouvertes :**


- Propriétaire et processus de mise à jour de chaque fiche service (aujourd'hui, un seul référent).
- Articulation précise avec G_NIUS (liens, parcours partagés, éventuelle intégration du questionnaire).
- ~~Rôle du dépôt actuel (fork de Landscape2)~~ : tranché dans l'[architecture](architecture.md), le portail est un projet distinct et Landscape2 reste une vue complémentaire optionnelle.

## 12. Documents associés

- [Architecture](architecture.md)
- [UX design](ux-design.md)
- [Plan de réalisation](plan.md)
