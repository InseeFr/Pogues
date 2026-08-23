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

### Full stack next + legacy, mocked

```bash
# from the repository root
pnpm install:all
pnpm standalone
```

→ http://localhost:4173 — next + federated legacy + mock API.
