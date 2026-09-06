<p align="center">
  <img alt="Pogues" src="docs/img/pogues-logo.png" style="max-width: 100%;">
</p>

# Pogues

Navigation: **Client** | [Back-office][1] | [Pogues model][2]

[1]: https://github.com/InseeFr/Pogues-Back-Office
[2]: https://github.com/InseeFr/Pogues-Model

### Legacy client

[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=InseeFr_Pogues&metric=alert_status)](https://sonarcloud.io/dashboard?id=InseeFr_Pogues)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=InseeFr_Pogues&metric=security_rating)](https://sonarcloud.io/dashboard?id=InseeFr_Pogues)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=InseeFr_Pogues&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=InseeFr_Pogues)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=InseeFr_Pogues&metric=coverage)](https://sonarcloud.io/dashboard?id=InseeFr_Pogues)

### New client

[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=inseefr_pogues-next&metric=alert_status)](https://sonarcloud.io/dashboard?id=inseefr_pogues-next)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=inseefr_pogues-next&metric=security_rating)](https://sonarcloud.io/dashboard?id=inseefr_pogues-next)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=inseefr_pogues-next&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=inseefr_pogues-next)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=inseefr_pogues-next&metric=coverage)](https://sonarcloud.io/dashboard?id=inseefr_pogues-next)

## Introduction

Pogues is a tool that allow to design questionnaires with components that are structural (sequences, questions...) and dynamic (filters, controls, loops...).

This is the repository of the front-end part of Pogues.

For more information on how to use the application, a [user documentation](https://inseefr.github.io/Bowie/1._Pogues/) is available (French only).

## New client

A new client development is currently in progress. It can be accessed in the `next` folder and will gradually replace the legacy client.

Thanks to **Module Federation**, both can be deployed at the same time and allow to use new features while keeping the old client in a dedicated page.

New features are developed there if possible.

### Next only

```bash
cd next
pnpm i
pnpm dev
```

Needs a real OIDC issuer and Pogues API (see `next/.env`).

Without backend / Keycloak (mock auth + fake API):

```bash
cd next
pnpm i
pnpm dev:standalone
```

→ http://localhost:5173 — VTL editor via sidebar (variables / codes-lists).

### Next + Pogues API in local (no Keycloak)

Front and back talk to each other. Fake auth (Guybrush / `FAKEPERMISSION`), Postgres started with the API (no Docker), one demo questionnaire.

Prerequisites: Java 25, Maven, Node 24, pnpm.

Same commands on macOS, Linux and Windows (PowerShell, Git Bash or cmd).

Terminal 1 — API (from the Pogues-API repo):

```bash
mvn spring-boot:run
```

Postgres is started automatically on port 5433. API listens on http://localhost:8081. Swagger: http://localhost:8081/

Terminal 2 — front (from this repo):

```bash
pnpm install
pnpm --dir next install
pnpm dev:api
```

→ http://localhost:5173 — questionnaire sheet, variables, code lists. The question editor (legacy) is not loaded in Vite DEV: `/questionnaire/:id` redirects to `/details`.

For the full editor (next + legacy) against the same API:

```bash
pnpm install:all
pnpm preview:api
```

→ http://localhost:4173

To add a questionnaire, drop a Pogues `.json` in `Pogues-API/local-questionnaires/` and refresh the UI. The file overwrites the same id (on drop and on API restart).

To wipe the local database, stop the API and delete `Pogues-API/.local-postgres/`.

Config: `.env.local-api` at the repository root. Details: Pogues-API README.

### Next + legacy together

`root`, `next` and `legacy` each have their own `node_modules` (not a pnpm workspace).

```bash
pnpm install:all
pnpm build
pnpm preview
```

Same without backend / Keycloak:

```bash
pnpm install:all
pnpm standalone
```

→ http://localhost:4173 — next + legacy MFE + mock API.

Config: `.env.standalone` at the repository root.

## Legacy client

The legacy client can be launched in standalone if the new client is not needed:

```bash
cd legacy
pnpm i
pnpm dev
```
