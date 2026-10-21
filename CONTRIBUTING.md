# Contribuer

Le portail est généré à partir des fichiers de `data/`. Pour changer le contenu, on modifie les données, pas les pages.

## Règle d'or

**Lier, ne pas recopier.** Le portail renvoie vers les sources officielles (Doctrine, G_NIUS, esante.gouv.fr, documentations produits). Une fiche contient un résumé court et des liens.

## Modifier une fiche ou une version

1. Créez une branche et modifiez le fichier concerné :

   | Fichier | Contenu |
   |---|---|
   | `data/services.yml` | Fiches des services |
   | `data/versions.yml` | Versions et statuts |
   | `data/roadmaps.yml` | Prochaines évolutions |
   | `data/standards.yml` | Référentiels et démarches |
   | `data/journeys.yml` | Étapes, questionnaire, règles, parcours pilotes |

2. Lancez les contrôles :

   ```sh
   npm ci
   npm run validate   # schémas et cohérence des données
   npm test           # règles du questionnaire
   npm start          # site local sur http://localhost:3000
   ```

3. Ouvrez une pull request. La CI valide les données et construit le site.

## Conventions

- `validated: true` dans `services.yml` seulement après relecture par le référent. Sinon le site affiche un bandeau « Fiche en cours de validation ».
- `verified: true` dans `versions.yml` et `roadmaps.yml` seulement quand la version, le statut et les dates sont confirmés. Sinon le site affiche « À vérifier ».
- Une seule version `recommended` par service.
- Une version `deprecated` ou `eol` vérifiée doit avoir une `end_of_support`.
- Mettez à jour `updated` à chaque relecture d'une fiche.

## Ajouter un service

Ajoutez une entrée dans `data/services.yml` (voir `schemas/services.schema.json` pour les champs). La page `/services/<id>/` et le catalogue sont créés automatiquement. Si le service doit apparaître dans le questionnaire, ajoutez-le dans les `rules` de `data/journeys.yml`.

## Vérifier les liens

```sh
npm run check-links
```

Limite connue : `esante.gouv.fr` répond 200 même pour une page inexistante. Vérifiez à la main les liens de ce domaine.

## Signaler un problème

Ouvrez une issue avec le gabarit « Erreur ou information manquante ».
