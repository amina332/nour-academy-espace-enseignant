# nour-academy-espace-enseignant
Partie 3 - Espace enseignant Nour Academy

##  Présentation du projet

Nour Academy — Espace enseignant est une application web développée dans le cadre d'un projet individuel.

L'objectif est de faciliter le travail quotidien des enseignants en leur permettant de gérer les présences, les notes et le suivi des élèves de manière simple et rapide.

L'application remplace le suivi manuel sur papier par une interface interactive et accessible sur ordinateur et mobile.

##  Objectifs du projet

- Réaliser l'appel en moins de 2 minutes.
- Ajouter et gérer les notes des élèves.
- Calculer automatiquement les moyennes.
- Identifier les élèves ayant 3 absences ou plus.
- Ajouter de nouveaux élèves.
- Consulter le bilan de chaque groupe.

##  Fonctionnalités

### US1 — Afficher les élèves
- Affichage dynamique de la liste des élèves.
- Affichage du prénom, nom et nombre d'absences.
- Calcul et affichage de la moyenne de chaque élève.
- Affichage du nombre total d'élèves.

### US2 — Filtrer et rechercher
- Sélection d'un groupe depuis une liste déroulante.
- Recherche instantanée par prénom ou nom.
- Combinaison des filtres.
- Message lorsqu'aucun élève ne correspond à la recherche.

### US3 — Gérer les présences et les notes
- Marquer un élève comme absent.
- Ajouter une note à un élève.
- Vérifier que la note est comprise entre 0 et 20.
- Signaler les élèves ayant atteint 3 absences ou plus.
- Afficher une alerte « Prévenir les parents ».

### US4 — Ajouter un élève
- Formulaire d'ajout d'un nouvel élève.
- Validation des champs avec les expressions régulières (Regex).
- Vérification des doublons.
- Limitation à 15 élèves par groupe.
- Affichage des messages d'erreur et de succès.

### US5 — Bilan du groupe
- Calcul de la moyenne générale du groupe.
- Calcul du nombre total d'absences.
- Affichage du nombre d'élèves en alerte.
- Liste des parents à appeler.
- Mise à jour automatique du bilan après chaque modification.

## 🛠️ Technologies utilisées

- HTML5 : structure de la page.
- Tailwind CSS v4 : mise en forme et design responsive.
- JavaScript natif (Vanilla JS) : logique et interactions.
- DOM : manipulation dynamique des éléments HTML.
- Git et GitHub : gestion des versions.
- GitHub Pages : déploiement de l'application.

##  Structure du projet

```text
Nour-Academy/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── data.js
│   └── script.js
│
├── README.md
└── .gitignore
```

##  Méthodes JavaScript utilisées

| Besoin | Méthode | Utilisation |
|---|---|---|
| Afficher les élèves | `map()` | Créer les lignes des élèves |
| Filtrer les élèves | `filter()` | Filtrer par groupe et recherche |
| Retrouver un élève | `find()` | Trouver un élève par son ID |
| Vérifier un doublon | `some()` | Vérifier si un élève existe déjà |
| Vérifier le formulaire | `every()` | Vérifier que tous les champs sont valides |
| Calculer une somme | `reduce()` | Calculer les moyennes et les absences |
| Ajouter des éléments | `forEach()` | Ajouter les lignes dans le DOM |
| Trier les élèves | `sort()` | Trier par nom ou par moyenne |

##  Validation avec Regex

Les expressions régulières permettent de vérifier les informations saisies dans le formulaire.

| Champ | Règle de validation |
|---|---|
| Prénom | Lettres, espaces et tirets, minimum 2 caractères |
| Nom | Lettres, espaces et tirets, minimum 2 caractères |
| Email | Format d'adresse email valide |
| Téléphone | Numéro marocain 06/07 ou +212 6/7 |
| Code d'accès | Minimum 8 caractères, une majuscule, un chiffre et un caractère spécial |

### Tests de validation

Les tests doivent couvrir des cas valides et invalides pour chaque champ.

| Champ | Exemple valide | Exemple invalide |
|---|---|---|
| Prénom | Amina | A |
| Nom | Lahouel | L |
| Email | test@gmail.com | testgmail.com |
| Téléphone | 0612345678 | 0512345678 |
| Code d'accès | Amina@123 | amina123 |

##  Responsive Design

L'application est conçue selon une approche Mobile First.

- Compatible avec les écrans mobiles à partir de 360 px.
- Adaptée aux tablettes et ordinateurs.
- Interface responsive jusqu'à 1440 px.
- Zones tactiles d'au moins 44 px.
- Aucun défilement horizontal.

##  Tests réalisés

Les fonctionnalités sont vérifiées avec des tests manuels :

- Affichage correct des élèves.
- Recherche par prénom et nom.
- Filtrage par groupe.
- Combinaison des critères de recherche.
- Ajout d'une absence.
- Refus des notes invalides.
- Déclenchement des alertes après 3 absences.
- Validation des champs du formulaire.
- Blocage des doublons.
- Blocage lorsque le groupe contient 15 élèves.
- Mise à jour du bilan après modification.

##  Difficultés rencontrées et solutions

Cette partie présente les difficultés rencontrées pendant le développement et les solutions apportées.

| Difficulté | Solution |
|---|---|
| Affichage dynamique des élèves | Utilisation de `createElement()` et `append()` |
| Recherche et filtrage simultanés | Combinaison des conditions dans `filter()` |
| Gestion des clics sur les boutons des élèves | Utilisation de la délégation d'événements avec `closest()` et