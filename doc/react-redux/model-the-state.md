# Model the state

Before going further, we need to think about how to model the application state. We will not discuss the following choices here, but if you to know more about it, you can read [normalizing state shape](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html):
- each code has an unique `id` and a `label` ;
- each code list has an unique `id` and a `label`;
- a code list holds an array of code `id`s.

Hence, the state of our application can be represented like this:
```javascript
{
  codeListById: {
    code_list_1: { //we will actually use random ids
      label: 'mood',
      codes: ['code_1', 'code_2', 'code_3']
    },
    code_list_2: {
      label: 'appetite',
      codes: ['code_4', 'code_5', 'code_6]
    }
  },
  codeById: {
    code_1: {
      label: 'unhappy',
    },
    code_2: {
      label: 'happy'
    },
    code_3: {
      label: 'very happy'
    },
    code_4: {
      label: 'not hungry'
    },
    code_5: {
      label: 'hungry'
    },
    code_6: {
      label: 'starving'
    }
  }
}
```
Notice that instead of a nested structure where a code list would contain some codes, we opted for a database like representation, where each code list references some code ids, and the actual code descriptions are held in the dedicated `codeById` object. We will see in the [split and combine reducers section](./reducers-split-combine.md) why this choice make writing the application easier.