# Remote APIs

Pogues serves as a front-end application to design questionnaires and represent them in a [formal way](./schema.md). It relies on tiers web services to:
- [store and retrieve questionnaires](./persistence.md);
- [visualize questionnaires](./visualization.md);
- use existing objects from an external [repository](./repository.md).

For now, Pogues is tightly coupled to the implementation of the services within its original organization (INSEE). In a near future, a more modular and documented approach will be provided to facilitate its re-use in other organizations. 

Have a look at the [swagger documentation](./swagger.md) to know more about what these services provide (it does not include the "repository" service).

