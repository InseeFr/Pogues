# Stateless vs stateful components

Before diving into Redux, let's do a brief recap of the differences between a stateless component and a stateful component:
- The `CodeEditor` is a stateless component written as a function. A stateless component can also be written as a `class`: that's what we did first when we write the `CodeListEditor` class without calling `setState`. If a component is stateless, its appearance and behavior are fully determined by the initial props it is given.
- The final `CodeListEditor` component is a stateful component: we wrote it as a `class`, we initialized the state within the constructor, and we defined some methods which use the `setState` method to update the state and trigger a re-rendering of the component.