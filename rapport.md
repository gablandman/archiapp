# Rapport TP ArchiApp - Gabriel Landman

## Partie Client (SujetClient)

###  HTML
Page unique avec un header, une liste `<ul>` pour les messages, un `<textarea>` et un bouton pour envoyer. J'ai aussi ajouté un champ pseudo et un bouton pour changer le thème.

### CSS
Style geocities :)

### JS

**Exo 3.1** : fonction `fact(n)` récursive et `applique(f, tab)` qui applique une fonction à chaque élément d'un tableau.

**Exo 3.2** : variable `msgs` qui est un tableau d'objets. Fonction `update(tab)` qui vide la liste et recrée des `<li>` pour chaque message.

**Exo 3.3** : ajout de pseudo et date dans chaque objet message. Le bouton envoyer push un nouvel objet dans `msgs` avec la date courante puis rappelle `update()`. Le bouton thème toggle la classe `dark`.

Structure de données :
```js
var msgs = [
    { pseudo: "Alice", msg: "Premier message", date: "2026-03-20 09:00" },
    ...
];
```

## Partie Serveur (SujetServeur)


Serveur Node.js avec Express. Les fichiers statiques du client sont servis depuis le dossier `public/`.

### Routes implémentées

- `/test/*` : retourne le contenu de l'url en json
- `/cpt/query` : retourne la valeur du compteur
- `/cpt/inc` et `/cpt/inc?v=X` : incrémente le compteur, valide avec une regex, retourne `{"code": 0}` ou `{"code": -1}` si invalide
- `/msg/post/[message]` : ajoute un message dans le tableau, retourne l'id
- `/msg/get/[id]` : retourne le message ou `{"code": 0}` si pas trouvé
- `/msg/getAll` : retourne tout le tableau
- `/msg/nber` : retourne le nombre de messages
- `/msg/del/[id]` : met le message à null dans le tableau

Le stockage des messafges se fait via un simple tableau javascript en mémoire :
```js
var messages = [];
```
Les messages sont des strings, quand on supprime on met `null` à l'index pour garder les ids stables. `getAll` filtre les null.

### Intégration client-serveur
Le client dans `public/` utilise `fetch()` avec `.then()` pour communiquer avec l'API. Au chargement il appelle `/msg/getAll` pour afficher les messages existants. Le bouton envoyer fait un `fetch` sur `/msg/post/` puis recharge la liste. Un champ permet de changer l'url du serveur pour tester avec le serveur d'un autre.

### Déploiement
Déployé sur Railway, connecté au repo GitHub. Le `package.json` racine lance `node SujetServeur/index.js`.