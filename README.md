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

It can be launched in standalone if the old client is not needed:

```bash
cd next
pnpm i
pnpm dev
```

Or with the legacy client (in build only so you need to rebuild when you edit something):

```bash
pnpm build
pnpm serve -s dist -l 5145
```

```bash
cd next
pnpm build
pnpm serve -s dist -l 5000
```

## Legacy client

The legacy client can be launched in standalone if the new client is not needed:

```bash
pnpm i
pnpm start
```
