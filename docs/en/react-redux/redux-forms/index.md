# Redux Forms

The library [Redux Forms](http://redux-form.com/7.0.3/) give the possibility to manage the state of our forms thanks to `Redux`.

The three main parts of the configuration of Redux Forms in our application are :

* the use of the `reduxForm` method, in order to detect automatically all interactions the user has with your form, and call the dedicated `Redux` actions.
* the use of `Field` or `FieldArray` components, in order to create the form. These components can be used with standard HTML inputs (`input`, `textarea`), but also with our own components. An interface has to be respected, and will be explained later in this documentation.
* the use of the reducer of the library, in order to manage the triggered actions. In our project, this configuration is defined in the [src/reducers/index.js](https://github.com/InseeFr/Pogues/blob/zenika-dev/src/reducers/index.js) file.

```
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

export default integrityChecker(
  combineReducers({
    form,
  }),
);
```

## reduxForm

In order to connect or form to the `Redux` `store`, we need to export the component returned by the [`reduxForm`](http://redux-form.com/7.0.3/docs/api/ReduxForm.md/) method. This will give to Redux Forms the possibility to detect all interactions the user has with your form, in order to update the `store`. You can have a look to the [form used when creating a new formulaire](https://github.com/InseeFr/Pogues/blob/zenika-dev/src/questionnaire/components/component/component-new-edit.jsx)

```
export default reduxForm({
  form: 'component',
})(QuestionNewEdit);
```

This method take one object, with only on mandatory parameter : the name of the form, that will be used for naming your data in the store.

The data inserted in your form will be passed as a parameter to the method executed when the `submit` event of the form is triggered. For example, in the same form, here is the method managing the `submit` event (defined in the [ComponentNewContainer](https://github.com/InseeFr/Pogues/blob/zenika-dev/src/questionnaire/containers/component/component-new.jsx) component)

```
const submit = values => {
    createComponent(values, parentId, weight, type).then(updateParentChildren).then(orderComponents).then(result => {
        const { payload: { id } } = result;
        setSelectedComponentId(id);
        if (onSuccess) onSuccess(id);
    });
};
```

Here are some actions managed by Redux Forms. For each actions, Redux Forms will udate the store, and rerender the component : `FOCUS`, `CHANGE`, `BLUR`, `SUBMIT`, ...

## Custom Components

It is necessary to use the [`Field`](http://redux-form.com/7.0.3/docs/api/Field.md/) component, in order to connect our form to the `store`.

This component can be used with standard HTML input, but also with our own components, if you want to factorize your code. These components are defined in the `src/layout/forms/controls` folder. These components will give the possibility to standardize the stylesheets of our inputs, their labels or error messages.

These components have to follow a specific interface in order to be used with Redux Forms.
If you do not have to modify the inserted data, you just need to pass the `input` property, managed by the `Field` component, as a `props` to the HTML/React component. You can have a look the implementation of the `input.jsx` component.

[include](../../../../src/forms/controls/input.jsx)

If you need to modify the data, before the sync with the `store`, during the initialisation of your component, you can have access to the default value thanks to the property `props.input.value`, and when the user has inserted a data, you need to call manually the `props.input.onChange` method.

In order to specify the component you want to use with the `Field` component, you need to specify the `component` parameter:

```html
<Field
    name="name"
    type="text"
    component={Input}
    required
    />
```

Thanks to the `meta` property, you have access to the metadatas managed by Redux Forms, for example is my input valid or not,... These properties are automatically updated when actions defined previously (`FOCUS`, ...) are triggered by the library.

## Data Validation

You can validate your data with two different syntaxes.

* By defining a validation function as a parameter to the `reduxForm` method. This function will take as a parameter the datas of your form, and will need to return an object with the different errors.

Here is an example of validating a form with this syntax :

```
import React from 'react'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.age) {
    errors.age = 'Required'
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number'
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }
  return errors
}

const warn = values => {
  const warnings = {}
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error &&
          <span>
            {error}
          </span>) ||
          (warning &&
            <span>
              {warning}
            </span>))}
    </div>
  </div>

const SyncValidationForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="username"
        type="text"
        component={renderField}
        label="Username"
      />
      <Field name="email" type="email" component={renderField} label="Email" />
      <Field name="age" type="number" component={renderField} label="Age" />
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'syncValidation',
  validate,
})(SyncValidationForm)
```

* For the second syntax, we can define an array of validation functions for each input of our form. Redux Form do not provide validators, you need to implement these methods manually. In our application, these fonctions are defined in the [validation-rules.js](https://github.com/InseeFr/Pogues/blob/zenika-dev/src/layout/forms/validation-rules.js) file.

You will find an example of this syntax in the [questionnaire-new-edit](https://github.com/InseeFr/Pogues/blob/zenika-dev/src/home/components/questionnaire-new-edit.jsx) component.
