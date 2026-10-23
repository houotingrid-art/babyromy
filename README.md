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
