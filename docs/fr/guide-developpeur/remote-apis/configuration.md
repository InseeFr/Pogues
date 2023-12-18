# Configuration

Les services de visualisation et de persistance partage l'URL de base de l'API, fournie par la méthode `getBaseURI`. Lorsque que l'on travaille sur un serveur de développement, cette URL doit être définie dans le fichier [.env](https://github.com/InseeFr/Pogues/blob/main/.env) dans la variable `VITE_API_URL`. Pour un déploiement sur un serveur apache, il faut surcharger la variable `POGUES_API_BASE_HOST` dans le fichier [configuration.json](https://github.com/InseeFr/Pogues/blob/main/public/configuration.json) se trouvant dans le dossier `public`.
