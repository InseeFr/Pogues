# Remote APIs

Pogues serves as a front-end application to design questionnaires and represent them in a [formal way](./schema.md). It relies on tiers web services to:
- [visualize](./visualization.md) questionnaires;
- [store and retrieve](./persistence.md) questionnaires;
- use existing objects from an external [repository](./repository.md).

For now, Pogues is tightly coupled to the implementation of the services within its original organization (INSEE). In a near future, a more modular and documented approach will be provided to facilitate its re-use by other organizations. 

Have a look at the [swagger documentation](./swagger.md) to know more about what these services provide (it does not include the "repository" service).

A fake server [implementation](https://github.com/InseeFr/Pogues/tree/cc5ee57a6dabaeaa3a752ec48e632b3f7e04801d/utils/backend) is provided to illustrate the expected behavior of these services. This server can be launched with `npm run start:backend`.

