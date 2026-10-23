# Le grand pari — Vercel + Blob (Hobby)

## Installation

1. Décompressez ce ZIP et **remplacez les fichiers du dépôt GitHub** par son contenu (`index.html`, `api/`, `package.json`, `vercel.json`). Ne téléversez pas le ZIP lui-même dans GitHub.
2. Dans Vercel, ouvrez votre projet `babynouailhat` et créez un **Blob Store privé** via Storage. Connectez-le au projet : Vercel crée normalement `BLOB_READ_WRITE_TOKEN`.
3. Le pilotage est accessible via « ··· » avec le mot de passe **nouailhat**. Aucun réglage ADMIN_PASSWORD nécessaire. Attention : ce mot de passe est intégré au code du serveur et ne protège pas fortement les données.
4. Redéployez le projet après les changements de variables (nouveau commit ou Redeploy).
5. Ouvrez le site, entrez un nom et votez. Cliquez sur **···** dans la barre de navigation, saisissez le mot de passe : le tableau affiche les participants, leurs réponses et l'export CSV.

## Fonctionnement

- Les réponses sont enregistrées **côté serveur** dans Vercel Blob, un fichier JSON privé par navigateur/participant. Le bouton de pilotage est visible, mais ses données nécessitent le mot de passe.
- Les jauges et le nuage de prénoms utilisent les réponses partagées. Actualisez la page pour récupérer les nouveaux votes des autres visiteurs.
- Le navigateur garde un identifiant local : effacer ses données ou utiliser un autre navigateur crée une nouvelle participation. Ce n'est pas une protection forte contre les votes multiples.
- Les participants peuvent voir les statistiques anonymisées, pas les noms des votants.
- Le mot de passe administrateur est comparé côté serveur, jamais exposé au navigateur autrement que pendant la demande d'accès. Utilisez HTTPS (Vercel le fournit).
- L'API relit les fichiers pour calculer les statistiques : solution adaptée à une **petite fête privée** et aux quotas Hobby, pas à un site très fréquenté.
- Les requêtes d'écriture simultanées sur un même identifiant peuvent se concurrencer ; les participants utilisent normalement une seule session à la fois.
- La limite gratuite dépend des quotas Vercel en vigueur. Vérifiez l'onglet Usage du compte.
- Le fichier `allons-voir.mp3` est optionnel : la musique ne se jouera que si vous l'ajoutez à la racine.

## Vérifications

Dans Vercel, les variables doivent s'appeler exactement `BLOB_READ_WRITE_TOKEN` uniquement. Si les votes échouent, regardez **Logs** pour la fonction `/api/votes`.

## Correction accès pilotage
Cette version corrige la lecture des fichiers Blob : l’API utilise désormais l’URL des blobs renvoyée par `list()` plutôt que leur chemin, qui provoquait l’erreur « The string did not match the expected pattern ». Le mot de passe reste `nouailhat`. Si le tableau ne charge pas, vérifier la connexion Blob et les logs de la fonction `/api/admin`.


## Correction du 23 octobre
La dependance @vercel/blob a ete mise a jour vers la version 2 pour utiliser get() avec les blobs prives. Redeployez depuis GitHub et verifiez que BLOB_READ_WRITE_TOKEN est configure.


## Connexion Vercel Blob avec OIDC (2026)

Le stockage privé connecté au projet utilise OIDC. Aucune variable `BLOB_READ_WRITE_TOKEN` n’est nécessaire dans ce mode. Vérifier dans Storage > Projects que `babynouailhat` est connecté en Production, puis redéployer. Le SDK `@vercel/blob` v2 utilise les informations de connexion du déploiement. Ne pas créer de jeton manuel.


## Correction affichage (23 octobre)
Après une sauvegarde réussie, l'API renvoie les statistiques pour actualiser immédiatement le nuage des prénoms et la jauge de poids. Les erreurs d'enregistrement restent visibles 9 secondes et sont inscrites dans la console. Si les votes ne sont toujours pas visibles, consulter les Runtime Logs Vercel de /api/votes : un problème de permissions Blob ne peut pas être résolu par le seul affichage.


Correction : le bulletin final est maintenant affiché et centré automatiquement après validation du poids (sans rechargement).


## Correctif affichage immediat
Le prenom, le poids et le bulletin final se mettent a jour immediatement apres confirmation de l API. Les chargements plus anciens ne peuvent plus ecraser les nouveaux votes.


## Mise à jour : affichage immédiat et nouvelle partie
- Les réponses confirmées restent affichées lors du rafraîchissement des statistiques.
- Le bulletin final propose « Rejouer avec un autre participant ». Chaque nouvelle partie reçoit un nouvel identifiant ; les anciennes réponses restent enregistrées.
- Pour éviter les doublons dans le pilotage, ne pas rejouer avec le même nom pour simuler une autre personne.


## Correctif affichage immédiat
Les prénoms, le poids et le bulletin Sherlock sont maintenant affichés dès le clic, puis confirmés par l'API. Si l'API refuse le vote, l'interface revient à l'état précédent et indique clairement l'erreur. Le bouton d'indices est mis en évidence.
