# Le Grand Pari — site de naissance

## Déploiement GitHub Pages

1. Créer un dépôt GitHub (par exemple `le-grand-pari`).
2. Décompresser cette archive et envoyer `index.html` et `.nojekyll` à la racine du dépôt.
3. Dans **Settings > Pages**, choisir **Deploy from a branch**, puis **main** et **/(root)**.
4. Le site sera accessible à l’adresse `https://VOTRE-PSEUDO.github.io/le-grand-pari/`.

## À savoir

Les images de l’illustration sont intégrées dans `index.html` : aucun fichier image séparé n’est requis.
Les pronostics sont actuellement stockés dans le navigateur de chaque visiteur (localStorage) : GitHub Pages ne les partage pas entre les invités. Pour des résultats collectifs, il faudra connecter une base de données.
La chanson n’est pas fournie. Le site peut rechercher `allons-voir.mp3` si vous possédez un fichier audio que vous avez le droit d’utiliser.
