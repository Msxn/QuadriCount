Framework JS

# Introduction

Cette application s'appelle QuadriCount. Elle permet aux utilisateurs de lister les dépenses attribuées ainsi que les catégories de dépenses et les utilisateurs liés à la fiche de dépenses.
Celle-ci est développée en Node.js pour le back ainsi qu'en React JS pour le front.

# Justification des choix

React JS a été choisi pour sa simplicité d'installation ainsi que par choix de connaissances. NodeJS est utilisé car c'est la manière
la plus rapide de récupérer un document en format JSON d'une base de données avec un minimum de modifications.

Dépendances React JS : 
- react-router-dom
- bootstrap

Dépendances Node JS :
- mongoose
- express
- base de données MONGODB 6.0+

# Lancement de l'application

Pour l'api :
- lancer un shell cmd/powershell et entrer la commande : cd API pour se situer dans le dossier
- lancer la commande : supervisor app

Pour le front :
- lancer un shell cmd/powershell et entrer la commande : cd quadricount pour se situer dans le dossier
- lancer la commande : npm start
