# UX design — Portail développeurs du numérique en santé

Ce document décrit l'expérience cible pour le MVP défini dans le [PRD](prd.md) (§6 et §7). Il sert de base aux maquettes. Les écrans ci-dessous sont des schémas de structure, pas des maquettes graphiques.

**Maquettes HTML (DSFR) :** [design/index.html](design/index.html), [questionnaire](design/demarrer.html), [résultat](design/resultat.html), [fiche service](design/service-psc.html), [catalogue](design/services.html), [versions](design/versions.html), [tests](design/tests.html), [parcours](design/parcours.html). Pour les voir, lancer `python -m http.server` dans `docs/design/`. Les pages sont régénérées par `bash docs/design/_build.sh` à partir de `docs/design/pages/*.body`.

## 1. Principes UX

1. **Partir du besoin.** Les libellés sont des phrases d'éditeur (« J'authentifie un professionnel »), pas des noms de directions ou de produits.
2. **Trois clics maximum** de la home à la ressource utile (spécification, sandbox, contact).
3. **Même gabarit partout.** Toutes les fiches service ont les mêmes blocs dans le même ordre.
4. **Le test d'abord.** Les bacs à sable et identités de test sont visibles depuis la home et sur chaque fiche.
5. **Un statut lisible d'un coup d'œil.** Les statuts de version utilisent couleur, icône et texte, jamais la couleur seule.
6. **Sortir proprement.** Les liens vers les sources officielles disent où ils mènent (« G_NIUS », « esante.gouv.fr ») et s'ouvrent de façon prévisible.
7. **Accessible par défaut.** Cible RGAA, navigation clavier complète, contrastes conformes.

## 2. Personas et scénarios

| Persona | Scénario type | Point d'entrée |
|---|---|---|
| Éditeur qui découvre l'écosystème | « Je ne sais pas ce qui s'applique à mon logiciel » | Je démarre |
| Développeur qui sait ce qu'il cherche | « Je dois intégrer Pro Santé Connect » | Je connais mon besoin |
| Intégrateur en maintenance | « Quelle version est supportée, que change la prochaine ? » | Version Center |
| Responsable produit éditeur | « Où en est mon référencement, que reste-t-il à faire ? » | Parcours en 10 étapes |

## 3. Architecture de l'information

```text
Accueil
├── Je démarre                      (questionnaire → mon parcours)
├── Je connais mon besoin           (catalogue par thème)
│   ├── Identité
│   ├── Interopérabilité
│   ├── Sécurité et confiance
│   ├── Services et données
│   └── Tests
├── Tous les services               (catalogue complet filtrable)
│   └── Fiche service
├── Versions et roadmaps            (Version Center)
├── Je construis ma solution        (parcours en 10 étapes)
│   └── Parcours pilotes (3)
├── Environnements de test
├── API et spécifications
├── Conformité
└── Support et contacts
```

Navigation principale (en-tête) : **Démarrer · Services · Versions · Parcours · Tests · Support**, avec la recherche toujours visible. Le fil d'Ariane est présent sur toutes les pages hors accueil.

## 4. Écrans clés

### 4.1 Accueil

```text
┌──────────────────────────────────────────────────────────┐
│ [Logo]  Démarrer  Services  Versions  Parcours  Tests  Support   [🔍] │
├──────────────────────────────────────────────────────────┤
│  Je développe un service numérique en santé               │
│  Tout ce dont j'ai besoin pour construire et intégrer     │
│  ma solution dans l'écosystème français.                  │
│                                                           │
│  [ 🔍 Que voulez-vous faire ? ex. authentifier un pro ]   │
├──────────────────────────────────────────────────────────┤
│ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐    │
│ │ 🧭 Je démarre │ │ 🧩 Je connais │ │ 🔎 Je veux    │    │
│ │ Je ne sais pas│ │ mon besoin    │ │ tout voir     │    │
│ │ ce qui s'ap-  │ │ Catalogue par │ │ Catalogue des │    │
│ │ plique        │ │ thème         │ │ services      │    │
│ │ [Commencer]   │ │ [Explorer]    │ │ [Parcourir]   │    │
│ └───────────────┘ └───────────────┘ └───────────────┘    │
├──────────────────────────────────────────────────────────┤
│ Parcours les plus demandés                                │
│  → J'authentifie un professionnel                         │
│  → J'échange des données de santé                         │
│  → Je prépare le référencement de mon logiciel            │
├──────────────────────────────────────────────────────────┤
│ Tester maintenant : Sandbox PSC · Identités de test · EDIT│
│ Dernières évolutions : (3 dernières entrées du changelog) │
└──────────────────────────────────────────────────────────┘
```

Décisions :
- Le champ de recherche en langage naturel reste de la recherche plein texte (pas d'IA), avec des suggestions basées sur les intitulés de parcours.
- Le bloc « Tester maintenant » rend les bacs à sable visibles dès la home (PRD objectif 3).
- Les deux blocs du bas sont alimentés par les données, sans saisie éditoriale.

### 4.2 Questionnaire « Je démarre »

Un écran par question, barre de progression, retour possible, réponse « Je ne sais pas » toujours disponible.

```text
Question 2 sur 6                              ▓▓░░░░
┌──────────────────────────────────────────────────┐
│ Pour quel utilisateur ?                          │
│  ( ) Professionnels de santé                     │
│  ( ) Usagers / patients                          │
│  ( ) Les deux                                    │
│  ( ) Je ne sais pas                              │
└──────────────────────────────────────────────────┘
 [← Précédent]                         [Suivant →]
```

| # | Question | Effet sur les briques |
|---|---|---|
| 1 | Type de solution | Oriente le thème principal |
| 2 | Utilisateur | Identité pro (PSC) ou usager |
| 3 | Données de santé ? | Sécurité : HDS, PGSSI-S |
| 4 | Authentifier un professionnel ? | Pro Santé Connect, e-CPS |
| 5 | Échanges avec d'autres SI ? | CI-SIS, FHIR, MSSanté |
| 6 | Concerné par un référencement ? | Étapes référencement et conformité |

**Résultat : « Votre parcours éditeur »**

```text
Votre parcours éditeur                         [Imprimer] [Copier le lien]
Vous développez un logiciel pour des professionnels de santé qui
héberge des données de santé et doit les authentifier.

 1 ✔ Comprendre l'écosystème                         → page
 2 ● Règles applicables : PGSSI-S, HDS               → 2 fiches
 3 ● Services socles : Pro Santé Connect, MSSanté    → 2 fiches
 4 ● Spécifications et API                           → liens
 5 ○ Développer      6 ○ Tester (sandbox PSC)        → liens
 7 ○ Conformité      8 ○ Référencement   9 ○ Production   10 ○ Suivre
```

Décisions :
- Les réponses sont encodées dans l'URL (`?r=…`) pour partager ou sauvegarder un résultat sans compte ni stockage de données personnelles.
- Le résultat s'inspire du modèle de roadmap de G_NIUS (questions, embranchements, étapes), sans le copier.
- Mention claire : « Aucune donnée n'est enregistrée ».

### 4.3 Fiche service (gabarit unique)

```text
Accueil › Services › Identité › Pro Santé Connect

Pro Santé Connect                          🟢 Version x.y recommandée
Authentifier un professionnel de santé (OpenID Connect).
[Documentation officielle ↗]  [Accéder à la sandbox ↗]

┌ Sommaire (ancres) ──┐   À quoi ça sert ? / Qui est concerné ? / Quand ?
│ Présentation        │
│ Ressources          │   RESSOURCES
│ Versions            │   Documentation · Spécification · Sandbox
│ Prérequis           │   Identités et données de test · Exemples
│ Suivi               │   SDK · Code source
└─────────────────────┘
                          VERSIONS
                          Version   Statut          Fin de support
                          x.y       🟢 Recommandée  —
                          x.(y-1)   🟡 Dépréciée    30/06/2027
                          Prochaine : x.(y+1) prévue … · Breaking changes : …

                          PRÉREQUIS   Sécurité · Conformité · Référencement
                          SUIVI       Support · Statut du service · Roadmap
                          Référent de la fiche : équipe PSC · Dernière mise à jour : …
```

Décisions :
- Deux actions principales en tête : la documentation et la sandbox.
- Un bloc vide n'est pas masqué : il affiche « Non applicable » ou « À venir », pour garder le gabarit stable et signaler les manques.
- La date de dernière mise à jour et le référent sont visibles, car ils rassurent sur la fiabilité.

### 4.4 Catalogue complet

Liste de cartes ou tableau (bascule), filtres à gauche (thème, public, présence d'une sandbox, statut), compteur de résultats, tri par nom ou thème. Chaque carte montre le nom, une phrase, le thème, la pastille de version et les icônes « Sandbox », « API », « Référencement ».

### 4.5 Version Center

| Service | Version recommandée | Statut | Fin de support | Prochaine version |
|---|---|---|---|---|
| Pro Santé Connect | x.y | 🟢 Recommandée | — | x.z (prévue …) |
| CI-SIS | … | 🔵 Supportée | … | … |

Filtres par statut et thème. Le tri par défaut met en tête les statuts **Dépréciée** et **Fin de vie**, car ce sont ceux qui demandent une action. Chaque ligne renvoie à la fiche et aux notes de version.

Légende des statuts toujours visible : icône + libellé + couleur.

### 4.6 Parcours en 10 étapes

Une page de synthèse avec la frise des 10 étapes, puis une page par étape : objectif, ce qu'il faut faire, services concernés, liens, étape suivante. Les trois parcours pilotes sont des variantes pré-remplies de cette frise.

### 4.7 Environnements de test

Tableau des sandbox : service, ce qu'on peut tester, comment obtenir des identités de test, limites connues, lien. C'est une page de premier niveau (PRD objectif 3).

## 5. Composants à concevoir

| Composant | Usage |
|---|---|
| Carte service | Catalogue, résultats du questionnaire |
| Pastille de statut | Version Center, fiches |
| Bloc ressource (icône, titre, lien externe) | Fiches |
| Frise d'étapes | Parcours, résultat du questionnaire |
| Question de questionnaire | Je démarre |
| Tableau filtrable | Catalogue, Version Center |
| Bandeau « dernière mise à jour / référent » | Fiches |
| Lien externe | Tous (icône, mention de la destination) |

## 6. Design visuel

- **Charte** : cohérence avec les sites ANS / État. Utilisation du DSFR (composants, typographie, grille) à confirmer en phase 0.
- **Statuts** : jeu d'icônes dédié (rond plein, rond contour, triangle, croix, fiole) pour ne pas dépendre de la couleur.
- **Thème sombre** : hors MVP.
- **Ton éditorial** : phrases courtes, vocabulaire d'éditeur, sigles développés à la première occurrence.

## 7. Accessibilité

- Cible **RGAA** niveau AA.
- Navigation clavier complète, focus visible, lien d'évitement.
- Le questionnaire est un formulaire natif (fieldset / legend), annoncé correctement aux lecteurs d'écran.
- Les tableaux ont des en-têtes associés ; les filtres annoncent le nombre de résultats.
- Contrastes vérifiés pour les pastilles de statut.
- Audit automatisé en CI (par exemple axe) et audit manuel avant ouverture publique.

## 8. Responsive

Priorité au bureau, car les développeurs consultent surtout sur poste de travail, mais le site reste utilisable sur mobile : navigation en menu, cartes empilées, tableaux avec défilement horizontal contrôlé, sommaire de fiche replié.

## 9. Contenu et microcopie

- Titres d'action : « J'authentifie un professionnel », « Je prépare mon référencement ».
- États vides explicites : « Aucune sandbox à ce jour pour ce service » plutôt qu'une section absente.
- Lien externe : « Documentation officielle (esante.gouv.fr) ↗ ».
- Erreur de lien ou information manquante : lien « Signaler un problème » vers le gabarit d'issue GitHub.

## 10. Validation UX

1. Maquettes basse fidélité de l'accueil, du questionnaire, de la fiche et du Version Center.
2. Test avec 5 éditeurs ou développeurs sur les trois parcours pilotes. Tâches : trouver la sandbox PSC ; savoir quelle version utiliser ; savoir ce qu'il faut pour se référencer.
3. Mesures : taux de réussite de la tâche, nombre de clics, temps, commentaires libres.
4. Ajustements, puis test de contrôle sur la version intégrée.
5. Retour continu via un lien « Cette page vous a-t-elle aidé ? » vers une issue GitHub.
