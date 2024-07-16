# Configuration

The visualization and persistence services share the base URL of the API, provided by the `getBaseURI` method. When working on a development server, this URL must be defined in the [.env](https://github.com/InseeFr/Pogues/blob/main/.env) file in the `VITE_API_URL` variable. For deployment on an apache server, the `POGUES_API_BASE_HOST` variable must be overridden in the [configuration.json](https://github.com/InseeFr/Pogues/blob/main/public/configuration.json) file located in the `public` folder.
