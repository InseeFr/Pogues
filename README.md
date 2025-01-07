<p align="center">
  <img alt="Pogues" src="docs/img/pogues-logo.png" style="max-width: 100%;">
</p>

Pogues is a questionnaire design and test tool.

[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=InseeFr_Pogues&metric=alert_status)](https://sonarcloud.io/dashboard?id=InseeFr_Pogues)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=InseeFr_Pogues&metric=security_rating)](https://sonarcloud.io/dashboard?id=InseeFr_Pogues)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=InseeFr_Pogues&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=InseeFr_Pogues)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=InseeFr_Pogues&metric=coverage)](https://sonarcloud.io/dashboard?id=InseeFr_Pogues)

---

The developer documentation can be found in the [doc](https://github.com/InseeFr/Pogues/tree/master/docs) folder and [browsed online](https://inseefr.github.io/Bowie/pogues).

## Developer

There are currently two versions in this depot:

- the **legacy** app, code base is located at root
- the **next** app, code base is located at [next](./next/) folder.

### How to dev ?

- To develop the legacy version, simply continue developing in the code base.
- To develop the next version, simply work in the next folder, as for a normal application.

But if you want to see both at the same time, you'll need to build and serve both applications:

1. Build and serve **legacy** app

```bash
yarn
yarn build
yarn preview
```

2. In another terminal : Build and serve **next** app

```bash
cd next
yarn
yarn build
yarn preview
```
