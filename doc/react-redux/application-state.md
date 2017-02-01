# Application state

In the previous sections, we saw how a component could manage its own state to keep track of updates and re-render the UI accordingly.

## The issue

It works fine fine for small applications, or when the state is mainly used to track local non persistent changes (for instance, a visible/hidden state for a button). But this approach does not always scale seamlessly when application complexity grows. Let's for instance have a look at the expected behavior if the user created a list of codes, referenced it in two different places in the questionnaire, and then add or edit some codes to the list:

![sync](/doc/img/sync.gif "Code list editors should be kept in sync")

(The edition panels have been toggled on for each of these questions, and the UI has been slightly modified to make the editors stand closer one to the other.)

The two code list editors should be **kept in sync**. This goal will be difficult to achieve with our previous approach. Indeed, if the codes are stored in the state of the first `CodeListEditor`, the second code list editor will not be aware of any updates to the codes, and, as a consequence, won't be able to update accordingly. 

This problem with keeping code list editors in sync is a very common issue with complex web applications in general, and with Pogues in particular:  there are many other scenarios where **an action might have some effects on different parts of the UI**. To illustrate, we can think about what should happen when the user edits the `id` of a question referenced in a `goTo`.  In this situation, the application needs:
- to update every visible redirection that can be impacted by this edition (for example a redirection referring to the previous `id` should be now marked as invalid);
- to adjust the integrity controls panel at the top of the questionnaire to update the messages accordingly (for instance by adding an error message concerning the redirection which has just become invalid).

![Keep in sync multiple components](/doc/img/keep-in-sync-multiple-components.png "Keep in sync multiple components")

## The solution

To tackle these "might be very complex" updates, React and Redux promote the use of a [unidirectional data flow](http://redux.js.org/docs/basics/DataFlow.html). This [presentation of the flux pattern](https://facebook.github.io/flux/docs/in-depth-overview.html) can be a useful reading, even if there might be at some point some slight differences with Redux (which can be seen as one implementation of the `flux` architecture; in Redux, there is only one store).

### In a few words

The idea is to store the codes a code list is made of not in the component state, but in a "higher" level abstraction that will make the data potentially available to every component . This abstraction is called the "application state" and gathers in one place all the data needed to build and update the UI. In `Redux`, the application state is handled by a [store](http://redux.js.org/docs/api/Store.html).

Then, we use actions to notify the application that something happened and that the state should be updated accordingly. To do this with Redux, we create:
- [actions](http://redux.js.org/docs/basics/Actions.html) that describe what happened (for instance, we added a code to a list of codes); actions will be dispatched to the store;
- some [reducers](http://redux.js.org/docs/basics/Reducers.html) which specify how the application state should be updated to react to a given action.

Finally, the whole application will be re-rendered according to the new state (`setState` will be called automatically on the top component of our application), but thanks to React diffing algorithm, only parts of the UI actually modified will be updated in the DOM.

![https://github.com/facebook/flux/tree/master/examples/flux-concepts#flow-of-data](/doc/img/flux-diagram.png "Flux data flow")
