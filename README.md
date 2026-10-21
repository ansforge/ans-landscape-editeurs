# Portail développeurs du numérique en santé

Point d'entrée unique pour les éditeurs et développeurs de solutions numériques en santé : comprendre les règles, découvrir les services, intégrer les API, tester sa solution et suivre les évolutions de l'écosystème.

Le site est statique (Docusaurus et DSFR), hébergé sur GitHub Pages et généré à partir de données versionnées dans `data/`. Il renvoie vers les sources officielles sans les recopier.

URL de publication : <https://ansforge.github.io/ans-landscape-editeurs/>

## Développer en local

Prérequis : Node.js 20 ou plus (22 recommandé).

```sh
npm ci
npm start          # site local sur http://localhost:3000/ans-landscape-editeurs/
npm run validate   # schémas et cohérence des données
npm test           # règles du questionnaire
npm run build      # construit le site dans build/
npm run check-links
```

## Organisation du dépôt

| Dossier | Contenu |
|---|---|
| `data/` | Source de vérité : services, versions, roadmaps, référentiels, parcours et règles du questionnaire |
| `schemas/` | JSON Schema de chaque fichier de `data/` |
| `src/` | Pages, composants et thème DSFR du site |
| `plugins/` | Plugin Docusaurus qui crée les pages depuis `data/` |
| `scripts/` | Validation des données, contrôle des liens |
| `tests/` | Tests des règles du questionnaire |
| `examples/` | Exemples d'intégration par langage (à venir) |
| `docs/` | Documentation du projet : PRD, architecture, UX, plan, maquettes |

## Documentation du projet

- [PRD](docs/prd.md) : besoin, périmètre et MVP
- [Architecture](docs/architecture.md)
- [UX design](docs/ux-design.md)
- [Plan de réalisation](docs/plan.md)
- [Contribuer](CONTRIBUTING.md)

## Statut

MVP codé. Les données de départ sont à relire : fiches `validated: false`, versions `verified: false`. Voir le [CHANGELOG](CHANGELOG.md).

## Licence

Apache 2.0, voir [LICENSE](LICENSE).
