<p align="center">
  <img alt="Pogues" src="../docs/img/pogues-logo.png" style="max-width: 100%;">
</p>

# Pogues

Navigation: **Website** | [Back-office][1] | [Pogues model][2]

[1]: https://github.com/InseeFr/Pogues-Back-Office
[2]: https://github.com/InseeFr/Pogues-Model

[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=inseefr_pogues-next&metric=alert_status)](https://sonarcloud.io/dashboard?id=inseefr_pogues-next)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=inseefr_pogues-next&metric=security_rating)](https://sonarcloud.io/dashboard?id=inseefr_pogues-next)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=inseefr_pogues-next&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=inseefr_pogues-next)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=inseefr_pogues-next&metric=coverage)](https://sonarcloud.io/dashboard?id=inseefr_pogues-next)

## Introduction

Pogues is a tool that allow to design questionnaires with components that are structural (sequences, questions...) and dynamic (filters, controls, loops...).

This is the repository of the front-end part of Pogues.

For more information on how to use the application, a [utilisateur documentation](https://inseefr.github.io/Bowie/1._Pogues/) is available (French only).

## Local installation

### With Keycloak + Pogues API

```bash
pnpm i
pnpm dev
```

Config: `.env`

### Without backend (mock)

```bash
pnpm i
pnpm dev:standalone
```

Config: `../.env.standalone`  
→ Guybrush / `FAKEPERMISSION`, demo questionnaires.  
→ Opening a questionnaire goes to **details** (no legacy remote in Vite DEV).  
→ **Variables / codes-lists** (VTL + antlr-editor) via the sidebar.

### With Pogues API locally (no Keycloak)

Start the API first (see Pogues-API README, profile `local`), then:

```bash
pnpm i
pnpm dev:api
```

Config: `../.env.local-api`  
→ same fake user (Guybrush / `FAKEPERMISSION`), real API on `http://localhost:8081/api`.  
→ Same commands on macOS, Linux and Windows.  
→ Extra questionnaires: drop a Pogues `.json` in `Pogues-API/local-questionnaires/`, then refresh.  
→ Question editor (legacy) is not loaded in Vite DEV; `/questionnaire/:id` goes to **details**. Use root `pnpm preview:api` for next + legacy against the local API.

### Full stack next + legacy, mocked

```bash
# from the repository root
pnpm install:all
pnpm standalone
```

→ http://localhost:4173 — next + federated legacy + mock API.
