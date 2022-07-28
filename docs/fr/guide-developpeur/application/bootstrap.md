# Amorcer l'application

Le point d'entrée du code `JavaScript` est [src/index.js](https://github.com/InseeFr/Pogues/blob/master/src/index.js), qui [affiche à l'écran](https://facebook.github.io/react/blog/2015/10/01/react-render-and-top-level-api.html) le composant React `Root`, au sein de la balise `div` mentionnée plus haut. La méthode `render` du composant `Root` renvoie un composant `Provider` fourni par [React Redux](https://github.com/reactjs/react-redux).

Ce `Provider` recevra en paramètre un `store` créé par la fonction [createStore](https://github.com/reactjs/redux/blob/master/docs/api/createStore.md) de Redux, dans le fichier [src/js/store/configure-store.js](https://github.com/InseeFr/Pogues/blob/main/src/store/configure-store.js). La fonction `createStore` prend en arguments:

- `reducer`: le reducer principal de l'application;
- `preloadState`: `NONE` ou `OIDC`, valeur fournie par le back sur le endpoint `/init`;
- `enhancer`: une [composition](https://github.com/reactjs/redux/blob/master/docs/api/compose.md) de 2 Redux middlewares ([Redux Thunk](https://github.com/gaearon/redux-thunk) et [Redux Logger](https://github.com/evgenyrodionov/redux-logger)) et de l'extension [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension).

Le `Provider` initialise l'état de l'application et le rend accessible à l'ensemble des composants.

Le composant visuel de plus haut niveau dans l'application est [App](https://github.com/InseeFr/Pogues/blob/main/src/layout/app/components/app.jsx)
