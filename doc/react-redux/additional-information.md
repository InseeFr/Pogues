# Miscellaneous informations about React and Redux

This section presents some additional information you might find useful if you are new to these technologies.

## Proptypes

TODO 
A good way to document React components.

## Design process

Adding some new components to our application can follow this process:
1. first, create some elementary static components;
2. then combine these components to build a more complex component;
3. eventually, connect the resulting component to the store if we need to pass it some data or some action creators which would not be available to its parent component. 

There is not one unique way to choose which components need to be connected to the store. In our example, we could have chosen not to connect the `CodeListEditor`, but instead, pass it all the props it needed from its parent component (the `CodeListPicker` component), which, in turn, could be connected or not to the store. Choosing the right component to connect to the store can be in some way a matter of [personal preferences](https://github.com/reactjs/redux/issues/419), but, still, [avoiding to connect too many component to the store](http://redux.js.org/docs/basics/UsageWithReact.html#presentational-and-container-components) can be a rule of thumb. 


