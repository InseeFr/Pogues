# Configuration

The visualization and persistence services share the base URL of the API, provided by the `VITE_API_URL` variable.

In development:

- front mock: `.env.standalone` (`VITE_USE_MOCK_API=true`)
- local API without Keycloak: `.env.local-api` (`VITE_API_URL=http://localhost:8081/api`)
- existing Keycloak + API: `next/.env`

