# Bootstrap the application

Le point d'entrée dans l'application est la page `index.html`, qui charge le script `js/pogues.js` et contient une balise `div` qui accueillera l'application.

Le script `pogues.js` résulte de la [compilation](./build-process) des différents fichiers `javascript` qui constituent le code source de l'application. Le point d'entrée est `main.js`, qui [affiche à l'écran](https://facebook.github.io/react/blog/2015/10/01/react-render-and-top-level-api.html) le composant React `Root`, au sein de la balise `div` mentionnée plus haut. La méthode `renders` du composant `Root` renvoie un composant `Provider` fourni par [React Redux](https://github.com/reactjs/react-redux).

Ce `Provider` recevra en propriété un `store` créé par le fichier [src/js/store/configure-store.js](https://github.com/InseeFr/Pogues/blob/master/src/js/store/configure-store.js) par la fonctoin [createStore](https://github.com/reactjs/redux/blob/master/docs/api/createStore.md) de Redux, qui prend en arguments:

* `reducer`: le reducer principal de l'application;
* `preloadedState`: `undefined` pour l'instant;
* `enhancer`: une [composition](https://github.com/reactjs/redux/blob/master/docs/api/compose.md) de 2 Redux middlewares ([Redux Thunk](https://github.com/gaearon/redux-thunk) et [Redux Logger](https://github.com/evgenyrodionov/redux-logger)) et d'extension [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension).

Le `Provider` initialise l'état de l'application et le rend accessible à l'ensemble des composants.

Le composant visuel de plus haut niveau dans l'application est [PoguesApp](https://github.com/InseeFr/Pogues/blob/master/src/js/components/pogues-app.js)
