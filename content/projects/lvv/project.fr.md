# Système d’expédition transfrontalière sur iPad pour LVV

> Statut : v0.1, version synchronisée  
> Source de référence : `project.zh-CN.md`  
> Dernière mise à jour : 2026-07-16

## Fiche projet

| Champ | Information actuelle |
| --- | --- |
| Nom complet | FTL × La Vallée Village B2C iPad Parcel Shipping System |
| Type de projet | Projet professionnel ; conception produit 0→1 et livraison au développement front-end |
| Statut | Prototype terminé et front-end développé, mais non déployé dans la boutique LVV |
| Raison de la non-adoption | Absence de responsabilité claire pour la maintenance et l’exploitation continue ; la boutique a conservé l’ancien système sur ordinateur |
| Rôle | Lead Product Designer |
| Durée | Environ 2 à 3 mois ; dates exactes à confirmer |
| Équipe | Lead Product Designer, une autre Product Designer, responsable produit/projet, parties prenantes métier et logistique, développeur front-end externe |
| Support | iPad partagé en boutique |
| Langues | Anglais, français et chinois |

## Définition en une phrase

Un système d’expédition multilingue sur iPad qui transforme les règles complexes de la logistique internationale en un parcours progressif réalisé conjointement par le personnel et les clients.

## Titre recommandé pour le portfolio

**Une expérience d’expédition assistée à La Vallée Village**

**Un prototype multilingue sur iPad qui transforme les règles de l’expédition internationale en une expérience guidée en boutique.**

## Contexte

FTL souhaitait proposer un service d’expédition près de la sortie de La Vallée Village afin d’aider les visiteurs internationaux à envoyer leurs achats de luxe vers un hôtel ou une adresse à l’étranger.

FTL disposait déjà d’un ancien système de commande sur ordinateur, auquel j’avais également contribué. Le nouveau projet LVV explorait une expérience sur iPad plus premium et assistée par le personnel. Le personnel pouvait guider le parcours, tandis que les clients saisissaient directement certaines informations sensibles, notamment l’adresse de livraison.

L’enjeu n’était donc pas de réduire un formulaire desktop. Il fallait redéfinir les responsabilités, expliquer les arbitrages logistiques, prévenir les erreurs et organiser le passage entre création de commande, paiement, transporteur et suivi.

## North star

Permettre au personnel et aux clients de créer ensemble une expédition internationale complexe en boutique, sans exiger que l’un ou l’autre connaisse au préalable toutes les règles logistiques.

## Recherche et preuves confirmées

- Échanges de cadrage et de besoins avec les parties prenantes ;
- Observation sur place des parcours, de la sortie de LVV et de l’emplacement prévu pour la boutique alors encore en travaux ;
- Revues itératives en équipe du parcours, des wireframes et du prototype haute fidélité ;
- Tests internes du parcours et vérifications d’utilisabilité ;
- Livraison des designs, suivie d’une implémentation front-end terminée.

## Limites de validation

- Pas d’entretien formel avec le personnel de la boutique ;
- Pas de test d’utilisabilité avec de vrais clients ;
- Pas de test dans une boutique LVV en fonctionnement ;
- Pas de données comportementales ou business après lancement.

## Décisions produit principales

### 01 — Commencer par la destination

La destination détermine les transporteurs disponibles, le délai, le prix, l’assurance et les informations requises. La demander en premier permet de réduire les options avant que le client ne saisisse des données potentiellement inutiles.

### 02 — Construire un parcours progressif en sept étapes

Le parcours est divisé en Destination, Weight, Services, Item, Contact, Insurance et Finish. La progression persistante et les actions de retour, d’annulation et de confirmation aident l’utilisateur à se concentrer sur une décision à la fois et à reprendre après une interruption.

### 03 — Concevoir une expérience à contrôle partagé

Un parcours entièrement autonome transférerait la complexité logistique au client. Une saisie entièrement réalisée par le personnel augmenterait sa charge et l’obligerait à saisir des données privées. Le modèle proposé permet au personnel de guider le parcours et au client de saisir directement les informations sensibles.

### 04 — Transformer le choix du transporteur en arbitrage compréhensible

Les options présentent le service, la vitesse et le prix de départ dans une structure commune, complétée par des repères comme « Lowest price » et « Fastest ».

### 05 — Structurer les informations sensibles sur les produits

La marque, la description, la quantité et les photos optionnelles sont séparées afin de limiter les textes ambigus et de créer une trace plus claire pour les produits de valeur.

### 06 — Rendre l’état et les sorties toujours visibles

L’interface affiche continuellement la progression et propose Return, Cancel this order ainsi qu’un état Confirm désactivé. Cela aide à reprendre après une interruption et limite les validations prématurées.

### 07 — Rendre explicite la limite du service

L’écran final présente le numéro de commande, le montant et l’étape suivante avec le personnel. Le paiement, l’exécution par le transporteur et le suivi continuent hors du produit.

## Livrables réalisés

- Parcours utilisateur de bout en bout ;
- Wireframes ;
- Direction d’interface en anglais, français et chinois ;
- Prototype haute fidélité sur iPad ;
- Composants de formulaire, bouton, sélection, progression et statut ;
- Principaux états de saisie et d’erreur ;
- Revues et tests internes ;
- Handoff au développement ;
- Implémentation front-end.

## Résultat réel du projet

Le produit a été conçu et développé, mais n’a pas été mis en service dans la boutique LVV. Le portfolio doit donc présenter la qualité des décisions et le périmètre livré, sans revendiquer un impact utilisateur ou business non mesuré.

La non-adoption révèle également un apprentissage produit : la maintenance et la responsabilité opérationnelle doivent être considérées comme des exigences produit, et non comme des détails après lancement.

## Problèmes actuels de l’interface

- Les textes gris à faible contraste affaiblissent la hiérarchie ;
- Les titres serif très éditoriaux ne correspondent pas toujours à une interface opérationnelle fréquente ;
- Le stepper est dense et les étapes inactives sont trop pâles ;
- Les actions désactivées n’expliquent pas pourquoi elles sont indisponibles ;
- Les champs, cartes et barre d’action basse ont un poids visuel trop proche ;
- Le passage de l’iPad entre personnel et client n’est pas explicitement conçu ;
- L’écran final doit préciser davantage la prochaine action.

## Stratégie de présentation 2026

Le case study doit présenter deux niveaux :

1. **Prototype original** — preuve du projet réel et du parcours livré.
2. **Focused refinement** — amélioration rétrospective de 3 à 4 écrans, clairement identifiée comme telle.

## Storytelling web recommandé

1. **Hero** — proposition de valeur, rôle, statut et démo interactive sur iPad.
2. **Context** — situation de la boutique, ancien système desktop et ambition de service.
3. **Frame** — acteurs, iPad partagé, langues, règles logistiques et limite du système.
4. **Map** — transformation des règles en parcours destination-first de sept étapes.
5. **Decide** — contrôle partagé, architecture du choix transporteur et prévention des erreurs.
6. **Prototype** — démonstration de 4 à 5 interactions critiques à partir des ressources Figma réelles.
7. **Validate** — cadrage stakeholder, visite du site, revues d’équipe et tests internes, avec leurs limites.
8. **Deliver** — composants, handoff et implémentation front-end.
9. **Learn** — pourquoi la préparation au déploiement inclut maintenance et responsabilité opérationnelle.
10. **Next case** — lien vers l’ancien système desktop ou vers un autre projet.

## Affirmations interdites sans preuve

- Déploiement réussi dans la boutique LVV ;
- Réduction du temps de commande de six minutes à 2,5 minutes ;
- Réduction du taux d’erreur d’adresse ou de poids ;
- Amélioration de la satisfaction du personnel ;
- Validation auprès de vrais utilisateurs ;
- Tout pourcentage d’enquête ou indicateur business sans source retrouvée.

## Questions ouvertes

- Dates exactes de début et de fin ;
- Responsabilité précise de la seconde Product Designer ;
- Participants et fréquence des échanges stakeholder ;
- Participants, résultats et modifications issues des tests internes ;
- Existence de captures ou d’un enregistrement du front-end développé ;
- Possibilité de mentionner publiquement le problème de maintenance et d’ownership ;
- Choix entre un case study séparé pour l’ancien système desktop ou son intégration à cette histoire.

